#ifndef PDFLOANINSTALLMENTINVOICE_H
#define PDFLOANINSTALLMENTINVOICE_H

#include <QPainter>
#include <QString>
#include <QDate>
#include "pdfinvoice.h"

// Data structure for the loan installment invoice
struct LoanInstallmentInvoiceData {
    // Bank information
    QString bankName = "Banco IPCA, S.A.";
    QString bankAddress = "Rua da Simulação, n.º 10";
    //QString bankPostalCode = "4750-810 Barcelos";
    QString bankTaxNumber = "530004585";
    QString bankCapital = "10 000 000.00 €";
    QString bankRegistry = "Barcelos";
    
    // Document information
    int documentNumber = 2050;
    QString paymentMethod = "Débito Direto";
    QString paymentCondition = "Pronto Pagamento";
    QString documentType = "Fatura-Recibo IS / 2025";
    
    // Customer information
    QString customerTaxNumber = "525000194";
    QString customerName = "Empresa Modelo";
    QString customerAddress = "R. Elias Garcia nº 74";
    //QString customerPostalCode = "4750-144 Barcelos";
    QString contractNumber = "20256634";
    QDate contractDate = QDate(2025, 10, 25);
    QDate dueDateFrom = QDate(2025, 10, 25);
    QDate dueDateTo = QDate(2025, 11, 25);
    
    // Transaction details
    QString currency = "EUR";
    double exchangeRate = 1.0000;
    
    // Installment information
    int installmentNumber = 1;
    double installmentAmount = 500.00;
    double principal = 4000.00;
    double interest = 100.00;
    double processingCommission = 10.00;
    double commissionStampDuty = 2.50; // Imposto Selo
    
    // Totals
    double stampDuty = 2.50; // Imposto Selo
    double vat = 0.00;
    double totalAmount = 502.50;
    
    // VAT details
    QString vatRate = "0%";
    double vatBase = 0.00;
    double vatAmount = 0.00;
    
    // Tax exemption
    QString exemptionReason = "Não sujeito";
};

class PDFLoanInstallmentInvoice : public PDFInvoice {
private:
    const LoanInstallmentInvoiceData &data;

public:
    PDFLoanInstallmentInvoice(QPainter& p, const LoanInstallmentInvoiceData& d);
    virtual void generate() override;

private:
    void drawHeader();
    void drawTitle();
    void drawClientInfoBox();
    void drawLineItemsTable();
    void drawVATSummary();
    void drawISSummary();
    void drawFooter();
};

#endif // PDFLOANINSTALLMENTINVOICE_H
