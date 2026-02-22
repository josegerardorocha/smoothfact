#ifndef PDFBUYSELLINNVOICE_H
#define PDFBUYSELLINNVOICE_H

#include <QPainter>
#include <QString>
#include <QDate>
#include <QJsonObject>
#include <QJsonArray>
#include "pdfinvoice.h"

// Data structure for buy/sell invoice line items
struct BuySellLineItem {
    QString tipo;           // Product type
    QString designacao;     // Product description
    double quantidade;      // Quantity
    double preco;           // Unit price
    double desconto;        // Discount percentage
    double iva;             // VAT percentage
    double total;           // Total amount
    QString motivoIsencao;  // Exemption reason (if IVA = 0)
};

// Data structure for buy/sell invoice
struct BuySellInvoiceData {
    // Seller (company) information
    QString sellerCompany;
    QString sellerAddress;
    // QString sellerPostalCode;
    QString sellerVAT;
    QString sellerCountry;    // Country (Portugal, Spain, etc.)
    
    // Buyer (customer) information
    QString buyerCompany;
    QString buyerAddress;
    // QString buyerPostalCode;
    QString buyerVAT;
    QString buyerCountry;     // Country (Portugal, Spain, etc.)
    
    // Document information
    QString number;
    QString date;
    QString invoiceType;  // "VENDA", "COMPRA", etc.
    
    // Line items
    QVector<BuySellLineItem> lineItems;
    
    // Totals
    double totalSemIva;     // Total without VAT
    double descontoTotal;   // Total discount
    double totalDeIva;      // Total VAT amount
    double totalGeral;      // Grand total with VAT
    double baseIvaInt;
    double baseIvaIsento;
    double baseIvaNorm;
    double baseIvaRed;
    double ivaInt;
    double ivaNorm;
    double ivaRed;

    
    // Tax information
    QString country;        // Country (Portugal, Spain, etc.)
    QString atcudCode;      // Portuguese AT code
    QString qrCodeData;     // QR code content
    
    // Loading Unloading addresses information
    QString loadingAddress;
    QString unloadingAddress;

    // Footer
    //QString exemptionReason;
    //QString disclaimer;
};

class PDFBuySellInvoice : public PDFInvoice {
private:
    const BuySellInvoiceData& data;
    int totalBoxY; // Y coordinate for the totals box
    bool drawLoadingUnloadingBox;
    bool inPortugal;
    
    // Section drawing methods
    void drawHeader();
    void drawTitle();
    void drawSellerInfo();
    void drawBuyerInfo();
    void drawLineItemsTable();
    void drawTotalsSection();
    void drawExemptionReasons();
    void drawQRCode();
    void drawLoadingUnloading();
    void drawFooter();
    void drawDisclaimer();
    void drawVATSummary();
    
    // Helper methods
    QChar generateExemptionMarker(int &markerIndex);

public:
    PDFBuySellInvoice(QPainter& p, const BuySellInvoiceData& d);
    void generate();
};

#endif // PDFBUYSELLINNVOICE_H
