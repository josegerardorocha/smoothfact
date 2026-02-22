#ifndef PDFINVOICE_H
#define PDFINVOICE_H

#include <QPainter>
#include <QString>
#include <QDate>
#include <QJsonObject>

class PDFInvoice {
private:
    QPainter& m_painter;
    int m_margin;
    int m_pageWidth;
    int m_pageHeight;
    int m_contentWidth;
    int m_resolution;

public:
    PDFInvoice(QPainter& p);
    virtual void generate() = 0; // Pure virtual function to be implemented by derived classes

protected:
    int mm2Pixels(double mm) { return qRound(mm * m_resolution / 25.4); }
    QPainter &painter() { return m_painter; }
    int margin() const { return m_margin; }
    int pageWidth() const { return m_pageWidth; }
    int pageHeight() const { return m_pageHeight; }
    int contentWidth() const { return m_contentWidth; }

    void drawCenteredText(int x, int y, const QString& text);
    void drawLeftAlignedText(int x, int y, const QString& text) { m_painter.drawText(x, y, text);  }
    void drawRightAlignedText(int x, int y, const QString& text);
    void drawMultilineLeftText(int x, int y, const QString& text, int maxWidth = 0);

    QString formatCurrency(double amount);
    QImage generateQrCode(const QString &text);
    QSizeF paintHtml(const QRect &rect, const QString &html);

    void renderSvg(const QString &svgContent);
};

#endif // PDFINVOICE_H
