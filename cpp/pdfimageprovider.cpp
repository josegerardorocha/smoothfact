#include "pdfimageProvider.h"
#include <QPdfDocument>
#include <QImage>
#include <QDebug>
#include <QBuffer>
#include <QPainter>
#include <QEventLoop>

PDFImageProvider::PDFImageProvider()
    : QQuickImageProvider(QQuickImageProvider::Image)
    , m_document(std::make_unique<QPdfDocument>())
{
}

PDFImageProvider::~PDFImageProvider() = default;

void PDFImageProvider::setPdfData(const QByteArray &data)
{
    qDebug() << "--------------------------------------------------------- ";
    qDebug() << "PDFImageProvider::setPdfData: Loading PDF data of size:" << data.size();
    qDebug() << "--------------------------------------------------------- ";
    m_pdfData = data;

    // Close any existing document
    m_document->close();

    // Load PDF from memory using QBuffer
    QBuffer *buffer = new QBuffer(&m_pdfData);
    buffer->open(QIODevice::ReadOnly);

    // Load the document from the buffer
    m_document->load(buffer);
}

void PDFImageProvider::clear() {
    m_pdfData.clear();
    m_document->close();
}

int PDFImageProvider::pageCount() const {
    return m_document->pageCount();
}

QSizeF PDFImageProvider::pageSize(int page) const {
    if (page < 0 || page >= m_document->pageCount())
        return QSizeF();

    return m_document->pagePointSize(page);
}

QImage PDFImageProvider::requestImage(const QString &id, QSize *size, const QSize &requestedSize)
{
    // Parse the ID which might contain query parameters
    // Format: "pageNumber?zoom=1.5&t=timestamp" or just "pageNumber"

    qDebug() << "--------------------------------------------------------- ";
    qDebug() << "PDFImageProvider::requestImage: Requested ID:" << id;
    qDebug() << "--------------------------------------------------------- ";
    QString pageStr = id;
    double zoomFactor = 1.0;

    // Check if there are query parameters
    int queryIndex = id.indexOf('?');
    if (queryIndex != -1) {
        pageStr = id.left(queryIndex);

        // Parse query parameters
        QString queryString = id.mid(queryIndex + 1);
        QStringList params = queryString.split('&');

        for (const QString &param : params) {
            QStringList keyValue = param.split('=');
            if (keyValue.size() == 2) {
                if (keyValue[0] == "zoom") {
                    bool ok;
                    double zoom = keyValue[1].toDouble(&ok);
                    if (ok) {
                        zoomFactor = zoom;
                    }
                }
                // Ignore timestamp parameter (t), it's just for cache busting
            }
        }
    }

    // Parse page number
    bool ok;
    int pageNumber = pageStr.toInt(&ok);

    if (!ok) {
        qWarning() << "Invalid page number in ID:" << pageStr;
        return QImage();
    }

    // Check if document is loaded
    if (m_document->status() != QPdfDocument::Status::Ready) {
        qWarning() << "PDF document not ready, status:" << static_cast<int>(m_document->status());
        return QImage();
    }

    // Check page bounds
    if (pageNumber < 0 || pageNumber >= m_document->pageCount()) {
        qWarning() << "Page number out of bounds:" << pageNumber << "max:" << m_document->pageCount();
        return QImage();
    }

    // Calculate target size
    QSizeF pageSizeF = m_document->pagePointSize(pageNumber);
    QSize targetSize;

    if (requestedSize.isValid() && requestedSize.width() > 0 && requestedSize.height() > 0) {
        targetSize = requestedSize;
    } else {
        // Use page size with zoom factor
        // Convert points to pixels (assuming 72 DPI base, scale up for better quality)
        const double baseScale = 2.0; // Base quality multiplier
        int width = static_cast<int>(pageSizeF.width() * baseScale * zoomFactor);
        int height = static_cast<int>(pageSizeF.height() * baseScale * zoomFactor);
        targetSize = QSize(width, height);
    }

    if (size) {
        *size = targetSize;
    }

    // Render the page to an image
    QImage image = m_document->render(pageNumber, targetSize);

    if (image.isNull()) {
        qWarning() << "Failed to render page" << pageNumber << "at size" << targetSize;
        // Return a placeholder image with error message
        QImage errorImage(targetSize.isEmpty() ? QSize(400, 300) : targetSize, QImage::Format_RGB32);
        errorImage.fill(Qt::white);
        QPainter painter(&errorImage);
        painter.setPen(Qt::red);
        painter.drawText(errorImage.rect(), Qt::AlignCenter,
                         QString("Error rendering page %1").arg(pageNumber + 1));
        return errorImage;
    }

    return image;
}
