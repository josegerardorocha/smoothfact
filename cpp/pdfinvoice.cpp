#include "pdfinvoice.h"
#include <QPainter>
#include <QFont>
#include <QRectF>

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

    return grouped + ',' + decimalPart;
}