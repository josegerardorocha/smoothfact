#include "pdfinvoice.h"
#include <QPainter>
#include <QFont>
#include <QRectF>
#include <QTextDocument>
#include <QSvgRenderer>

// Simple QR generator using Nayuki’s library
// (Download https://github.com/nayuki/QR-Code-generator and include QrCode.hpp)
#include "qrcode.h"

PDFInvoice::PDFInvoice(QPainter& p)
    : m_painter(p)
{
    // Get page dimensions from the painter's device
    m_resolution = m_painter.device()->logicalDpiX(); // Assuming square pixels, logicalDpiX and logicalDpiY should be the same
    m_margin = mm2Pixels(15); // 15mm margin
    m_pageWidth = m_painter.device()->width();
    m_pageHeight = m_painter.device()->height();
    m_contentWidth = m_pageWidth - (2 * m_margin);

    QRect pageRect = m_painter.viewport();
    m_painter.fillRect(pageRect, Qt::white);
    qDebug() << "---------------------> margin:" << m_margin;
}

void PDFInvoice::drawCenteredText(int x, int y, const QString& text) {
    int textWidth = m_painter.fontMetrics().horizontalAdvance(text);
    m_painter.drawText(x - textWidth/2, y, text);
}

// // Helper method to draw right-aligned text
void PDFInvoice::drawRightAlignedText(int x, int y, const QString& text) {
    int textWidth = m_painter.fontMetrics().horizontalAdvance(text);
    m_painter.drawText(x - textWidth, y, text);
}

void PDFInvoice::drawMultilineLeftText(int x, int y, const QString& text, int maxWidth) {
    QStringList lines = text.split('\n');
    int lineHeight = m_painter.fontMetrics().height();
    for (const QString& line : lines) {
        QString elidedLine = line;
        if (maxWidth > 0) {
            elidedLine = m_painter.fontMetrics().elidedText(line, Qt::ElideRight, maxWidth);
        }
        m_painter.drawText(x, y, elidedLine);
        y += lineHeight;
    }
}

QString PDFInvoice::formatCurrency(double amount) {
    QString number = QString::number(amount, 'f', 2);
    const bool isNegative = amount < 0;
    if (isNegative) {
        number.remove(0, 1);
    }

    const int dotIndex = number.indexOf('.');
    const QString integerPart = dotIndex >= 0 ? number.left(dotIndex) : number;
    const QString decimalPart = dotIndex >= 0 ? number.mid(dotIndex + 1) : "00";

    QString grouped;
    int count = 0;
    for (int i = integerPart.size() - 1; i >= 0; --i) {
        grouped.prepend(integerPart[i]);
        ++count;
        if (count == 3 && i > 0) {
            grouped.prepend(' ');
            count = 0;
        }
    }

    if (isNegative) {
        grouped.prepend('-');
    }

    return grouped + ',' + decimalPart + " €";
}

QImage PDFInvoice::generateQrCode(const QString &text)
{
    const qrcodegen::QrCode qr = qrcodegen::QrCode::encodeText(text.toUtf8().constData(), qrcodegen::QrCode::Ecc::LOW);
    const int mult=4;
    const int qrSize = qr.getSize();
    QImage image(qrSize*mult, qrSize*mult, QImage::Format_ARGB32);
    image.fill(Qt::white);

    QPainter painter(&image);
    painter.setBrush(Qt::black);
    painter.setPen(Qt::NoPen);
    for (int y = 0; y < qrSize; ++y) {
        for (int x = 0; x < qrSize; ++x) {
            if (qr.getModule(x, y))
                painter.drawRect(x*mult, y*mult, mult, mult);
        }
    }
    painter.end();

    //return image.scaled(size, size, Qt::KeepAspectRatio, Qt::SmoothTransformation);
    return image;
}

QSizeF PDFInvoice::paintHtml(const QRect &rect, const QString &html)
{
    QTextDocument doc;
    doc.setHtml(html);
    doc.setTextWidth(rect.width());
    m_painter.save();
    m_painter.translate(rect.topLeft());
    doc.drawContents(&m_painter);
    m_painter.restore();
    return doc.size();
}

void PDFInvoice::renderSvg(const QString &svgContent)
{
    m_painter.setRenderHint(QPainter::Antialiasing);
    QSvgRenderer renderer(svgContent.toUtf8()); // QString -> QByteArray
    renderer.render(&m_painter, QRectF(0, 0, m_pageWidth, m_pageHeight));
}