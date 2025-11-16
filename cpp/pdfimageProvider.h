#ifndef PDFIMAGEPROVIDER_H
#define PDFIMAGEPROVIDER_H

#include <QQuickImageProvider>
#include <QByteArray>
#include <QPainter>  // Add this include
#include <memory>

QT_BEGIN_NAMESPACE
class QPdfDocument;
QT_END_NAMESPACE

class PDFImageProvider : public QQuickImageProvider {

    //Q_OBJECT
    //QML_SINGLETON
    //QML_ELEMENT
public:
    PDFImageProvider();
    ~PDFImageProvider();

    // Set PDF data from memory
    void setPdfData(const QByteArray &data);

    // Clear current PDF
    void clear();

    // Get page count
    int pageCount() const;

    // Get page size
    QSizeF pageSize(int page) const;

    // Override from QQuickImageProvider
    QImage requestImage(const QString &id, QSize *size, const QSize &requestedSize) override;

private:
    QByteArray m_pdfData;
    std::unique_ptr<QPdfDocument> m_document;
};

#endif // PDFIMAGEPROVIDER_H
