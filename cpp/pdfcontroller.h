#ifndef PDFCONTROLLER_H
#define PDFCONTROLLER_H

#include <QObject>
#include <QByteArray>
#include <QQmlEngine>
#include <QJsonObject>
#include "pdfimageProvider.h"
//class PDFImageProvider;

class PDFController : public QObject {
    Q_OBJECT
    QML_ELEMENT

    Q_PROPERTY(int pageCount READ pageCount NOTIFY pageCountChanged)
    Q_PROPERTY(int currentPage READ currentPage WRITE setCurrentPage NOTIFY currentPageChanged)
    Q_PROPERTY(bool hasPdf READ hasPdf NOTIFY hasPdfChanged)
    Q_PROPERTY(double zoom READ zoom WRITE setZoom NOTIFY zoomChanged)
    Q_PROPERTY(QObject *provider READ provider WRITE setProvider NOTIFY providerChanged)
    Q_PROPERTY(QJsonObject pdfData WRITE setPdfData NOTIFY pdfDataChanged)

public:
    enum InvoiceIDs{
        NULLID,
        VENDA,
        MULTIRRISCOS
    };
    Q_ENUM(InvoiceIDs)
    //explicit PDFController(PDFImageProvider *provider, QObject *parent = nullptr);
    explicit PDFController(QObject *parent = nullptr);

    int pageCount() const { return m_pageCount; }
    int currentPage() const { return m_currentPage; }
    bool hasPdf() const { return m_pageCount > 0; }
    double zoom() const { return m_zoom; }

    void setCurrentPage(int page);
    void setZoom(double zoom);
    QObject *provider() const { return m_provider; }
    void setProvider(QObject *provider) {
        if (m_provider != static_cast<PDFImageProvider *>(provider)) {
            m_provider = static_cast<PDFImageProvider *>(provider);
            emit providerChanged();
        }
    }
    void setPdfData(const QJsonObject &data) {
        m_pdfData = data;
        emit pdfDataChanged();
    }

    Q_INVOKABLE void generateSamplePDF();
    Q_INVOKABLE void loadPdfData(const QByteArray &data);
    Q_INVOKABLE void nextPage();
    Q_INVOKABLE void previousPage();
    Q_INVOKABLE void firstPage();
    Q_INVOKABLE void lastPage();
    Q_INVOKABLE void zoomIn();
    Q_INVOKABLE void zoomOut();
    Q_INVOKABLE void resetZoom();

    // Save functions for WebAssembly
    //Q_INVOKABLE void downloadPdf(const QString &filename = QString());
    Q_INVOKABLE void saveFile(const QString &filename = QString());
    Q_INVOKABLE QString getPdfAsBase64() const;
    Q_INVOKABLE QByteArray getPdfData() const { return m_currentPdfData; }

signals:
    void pageCountChanged();
    void currentPageChanged();
    void hasPdfChanged();
    void zoomChanged();
    void pdfUpdated();
    void providerChanged();
    void pdfDataChanged();
    //void downloadReady(const QString &base64Data, const QString &filename);

private:
    PDFImageProvider *m_provider;
    int m_pageCount;
    int m_currentPage;
    double m_zoom;
    QJsonObject m_pdfData;
    QByteArray m_currentPdfData;

    QImage generateQrCode(const QString &text);
    QString computeInvoiceQRCode(const QJsonObject &invoice);
    void drawCustomerData(const QJsonObject &customer, QPainter &painter, const QPoint &pos);
    void drawDateNumber(const QString &date, const QString &number, QPainter &painter, const QPoint &pos);
    void generateFaturaPDF(QPainter &painter);
    void generateSegurosPDF(QPainter &painter);
    QString qrCodeHtml(const QString &qrData, QSize &qrSize);
    QSizeF paintHtml(const QRect &rect, const QString &html, QPainter &painter);
    QJsonObject titleslanguageJson(const QString &country);
};

#endif // PDFCONTROLLER_H
