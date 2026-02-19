#ifndef PDFLOANINVOICE_H
#define PDFLOANINVOICE_H

#include <QPainter>
#include <QString>
#include <QDate>

// Data structure for the loan invoice
struct LoanInvoiceData {
    // Bank information
    QString bankName = "Banco IPCA, S.A.";
    QString bankAddress = "Rua da Simulação, n.º 10";
    QString bankPostalCode = "4750-810 Barcelos";
    QString bankTaxNumber = "530004585";
    QString bankCapital = "10 000 000.00 €";
    QString bankRegistry = "Barcelos";
    
    // Document information
    QString documentNumber = "2050";
    QString paymentMethod = "Débito Direto";
    QString documentType = "Factura-Recibo IS / 2025";
    
    // Customer information
    QString customerTaxNumber = "525000194";
    QString customerName = "Empresa Modelo";
    QString customerAddress = "R. Elias Garcia nº 74";
    QString customerPostalCode = "4750-144 Barcelos";
    QString contractNumber = "20256634";
    QDate contractDate = QDate(2025, 10, 25);
    QDate dueDate = QDate(2025, 10, 25);
    
    // Transaction details
    QString currency = "EUR";
    double exchangeRate = 1.0000;
    
    // Line item
    QString itemDescription = "Imposto Selo Verba 17.1.2 - 0,5%";
    double itemAmount = 4000.00;
    
    // Totals
    double stampDuty = 4000.00; // Imposto Selo
    double vat = 0.00;
    double totalAmount = 4000.00;
    
    // VAT details
    QString vatRate = "0%";
    double vatBase = 0.00;
    double vatAmount = 0.00;
    
    // Footer
    QString exemptionReason = "Não sujeito";
    QString certificationNumber = "731/AT";
    QString disclaimer = "Documento elaborado no âmbito do Projeto em Simulação Empresarial - IPCA.";
};

class PDFLoanInvoice {
private:
    QPainter& painter;
    const LoanInvoiceData& data;
    int currentY;
    int margin;
    int pageWidth;
    int pageHeight;
    int contentWidth;
    
    // Helper methods
    QString formatCurrency(double amount);
    void drawHLine(int y, int startX = -1, int endX = -1);
    void drawVLine(int x, int startY, int endY);
    void drawRightAlignedText(int x, int y, const QString& text);
    void drawCenteredText(int y, const QString& text);
    
    // Section drawing methods
    void drawHeader();
    void drawTitle();
    void drawClientInfoBox();
    void drawCurrencyInfo();
    void drawLineItemsTable();
    void drawVATSummary();
    void drawFooter();

public:
    PDFLoanInvoice(QPainter& p, const LoanInvoiceData& d);
    void generate();
};

#endif // PDFLOANINVOICE_H
