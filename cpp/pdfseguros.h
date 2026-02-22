#ifndef PDFSEGUROS_H
#define PDFSEGUROS_H

#include <QPainter>
#include <QString>
#include <QDate>
#include "pdfinvoice.h"

// Data structure for insurance (seguros) invoice
struct SegurosInvoiceData {
    // Seller (insurance company) information
    QString sellerCompany;
    QString sellerAddress;
    QString sellerVAT;
    
    // Buyer (customer) information
    QString buyerCompany;
    QString buyerAddress;
    QString buyerVAT;
    
    // Document information
    QString number;         // Recibo number
    QString date;           // Issue date
    QString endDate;        // Expiry date
    QString apolice;        // Policy number
    QString currentDate;    // Date of issue (can be current date)
    QString receiptType;    // Type of receipt (e.g., "Anual", "Fraccionado")
    
    // Insurance details
    QString ramo;           // Insurance type (e.g., "Automóvel")
    QString matricula;      // Vehicle registration (for auto)
    QString marca;          // Vehicle brand (for auto)
    
    // Premium information
    double premio;          // Premium amount
    double total;           // Total with charges
    
    // Charge details
    double impostoSelo;     // Stamp duty
    double inem;            // INEM charge
    double fat;             // FAT (Work accident fund)
    double fga;             // FGA (Auto guarantee fund)
    double cartaVerde;      // Green card charge
    double encargosLegais;  // Legal charges
    double encargos;        // Other charges
    double bombeiros;       // National Fire Department charges
    double agravamento;     // Aggravation charge
    double taxaGestao;      // Management fee

    double percentImpostoSelo; // Stamp duty percentage (for reference)
    double percentInem;        // INEM percentage (for reference)
    double percentBombeiros;     // Fire department percentage (for reference)
    double percentFAT;         // FAT percentage (for reference)
    double percentFGA;         // FGA percentage (for reference)
    // Tax information
    QString atcudCode;      // Portuguese AT code
    QString qrCodeData;     // QR code content
};

class PDFSegurosInvoice : public PDFInvoice {
private:
    const SegurosInvoiceData& data;
    
    // Section drawing methods
    // void drawHeader();
    void drawSellerInfo();
    // void drawPolicyTable();
    // 
    void drawTable();
    void drawTableInfo();
    void drawCarInfo();
    void drawChargesTable();
    void drawCustomerInfo();
    void drawFooter();
    
public:
    PDFSegurosInvoice(QPainter& p, const SegurosInvoiceData& d);
    void generate();
};

#endif // PDFSEGUROS_H
