#include "pdfloaninvoice.h"
#include <QPainter>
#include <QFont>
#include <QFontMetrics>
#include <QRect>
#include <QPen>
#include <QBrush>

// Constructor
PDFLoanInvoice::PDFLoanInvoice(QPainter& p, const LoanInvoiceData& d)
    : painter(p), data(d), margin(40)
{
    pageWidth = painter.device()->width();
    pageHeight = painter.device()->height();
    contentWidth = pageWidth - 2 * margin;
    currentY = margin;
}

// Main generate function
void PDFLoanInvoice::generate() {
    drawHeader();
    drawTitle();
    drawClientInfoBox();
    drawCurrencyInfo();
    drawLineItemsTable();
    drawVATSummary();
    drawFooter();
}

// Helper method to format currency
QString PDFLoanInvoice::formatCurrency(double amount) {
    return QString::number(amount, 'f', 2).replace('.', ',');
}

// Helper method to draw a horizontal line
void PDFLoanInvoice::drawHLine(int y, int startX, int endX) {
    if (startX == -1) startX = margin;
    if (endX == -1) endX = pageWidth - margin;
    painter.drawLine(startX, y, endX, y);
}

// Helper method to draw a vertical line
void PDFLoanInvoice::drawVLine(int x, int startY, int endY) {
    painter.drawLine(x, startY, x, endY);
}

// Helper method to draw right-aligned text
void PDFLoanInvoice::drawRightAlignedText(int x, int y, const QString& text) {
    int textWidth = painter.fontMetrics().horizontalAdvance(text);
    painter.drawText(x - textWidth, y, text);
}

// Helper method to draw centered text
void PDFLoanInvoice::drawCenteredText(int y, const QString& text) {
    int textWidth = painter.fontMetrics().horizontalAdvance(text);
    painter.drawText((pageWidth - textWidth) / 2, y, text);
}

// Section drawing methods
void PDFLoanInvoice::drawHeader() {
    // Save current Y position
    int startY = currentY;
    
    // Left side - Bank information
    QFont headerFont("Arial", 10, QFont::Bold);
    painter.setFont(headerFont);
    painter.setPen(Qt::black);
    
    painter.drawText(margin, currentY, data.bankName);
    currentY += 15;
    
    QFont normalFont("Arial", 9);
    painter.setFont(normalFont);
    
    painter.drawText(margin, currentY, data.bankAddress);
    currentY += 15;
    painter.drawText(margin, currentY, data.bankPostalCode);
    currentY += 15;
    painter.drawText(margin, currentY, QString("Contribuinte Nº: %1").arg(data.bankTaxNumber));
    currentY += 15;
    painter.drawText(margin, currentY, QString("Capital Social: %1").arg(data.bankCapital));
    currentY += 15;
    painter.drawText(margin, currentY, QString("Cons. Reg. Com. %1").arg(data.bankRegistry));
    currentY += 15;
    painter.drawText(margin, currentY, QString("Matricula Nº %1").arg(data.bankTaxNumber));
    
    // Right side - Document number and payment method
    int rightY = startY;
    
    QFont docNumberFont("Arial", 11, QFont::Bold);
    painter.setFont(docNumberFont);
    drawRightAlignedText(pageWidth - margin, rightY, data.documentNumber);
    rightY += 20;
    
    painter.setFont(normalFont);
    drawRightAlignedText(pageWidth - margin, rightY, "Forma Pag.");
    rightY += 15;
    drawRightAlignedText(pageWidth - margin, rightY, data.paymentMethod);
    
    currentY = startY + 100;
}

void PDFLoanInvoice::drawTitle() {
    QFont titleFont("Arial", 14, QFont::Bold);
    painter.setFont(titleFont);
    drawCenteredText(currentY, data.documentType);
    currentY += 30;
}

void PDFLoanInvoice::drawClientInfoBox() {
    int boxY = currentY;
    int boxHeight = 80;
    
    // Draw box border
    painter.setPen(QPen(Qt::black, 1));
    painter.setBrush(Qt::NoBrush);
    painter.drawRect(margin, boxY, contentWidth, boxHeight);
    
    // Left side labels and values
    QFont labelFont("Arial", 8);
    QFont valueFont("Arial", 9);
    
    int labelX = margin + 5;
    int valueX = margin + 100;
    int labelY = boxY + 15;
    int lineSpacing = 15;
    
    // Labels
    painter.setFont(labelFont);
    painter.drawText(labelX, labelY, "V/Nº Contrib.");
    painter.drawText(labelX, labelY + lineSpacing, "Contrato");
    painter.drawText(labelX, labelY + lineSpacing * 2, "Data");
    painter.drawText(labelX, labelY + lineSpacing * 3, "Vencimento");
    
    // Values
    painter.setFont(valueFont);
    painter.drawText(valueX, labelY, data.customerTaxNumber);
    painter.drawText(valueX, labelY + lineSpacing, 
                    QString("Contrato n.º %1").arg(data.contractNumber));
    painter.drawText(valueX, labelY + lineSpacing * 2, 
                    data.contractDate.toString("dd/MM/yyyy"));
    painter.drawText(valueX, labelY + lineSpacing * 3, 
                    data.dueDate.toString("dd/MM/yyyy"));
    
    // Right side - Customer address
    int rightX = pageWidth - margin - 200;
    
    painter.setFont(labelFont);
    painter.drawText(rightX, boxY + 15, "Exmo.(s) Sr.(s)");
    
    painter.setFont(valueFont);
    painter.drawText(rightX, boxY + 30, data.customerName);
    painter.drawText(rightX, boxY + 45, data.customerAddress);
    painter.drawText(rightX, boxY + 60, data.customerPostalCode);
    
    currentY = boxY + boxHeight + 20;
}

void PDFLoanInvoice::drawCurrencyInfo() {
    QFont labelFont("Arial", 8);
    QFont valueFont("Arial", 9);
    
    painter.setFont(labelFont);
    painter.drawText(margin + 5, currentY, "Moeda");
    painter.drawText(margin + 80, currentY, "Câmbio");
    painter.drawText(margin + 160, currentY, "Pag.");
    painter.drawText(margin + 220, currentY, "Original");
    
    painter.setFont(valueFont);
    painter.drawText(margin + 5, currentY + 12, data.currency);
    painter.drawText(margin + 80, currentY + 12, 
                    QString::number(data.exchangeRate, 'f', 4));
    painter.drawText(margin + 220, currentY + 12, "1.0000");
    
    currentY += 30;
}

void PDFLoanInvoice::drawLineItemsTable() {
    // Table header border
    drawHLine(currentY);
    currentY += 2;
    
    QFont tableHeaderFont("Arial", 9, QFont::Bold);
    QFont valueFont("Arial", 9);
    
    // Column positions
    int descX = margin + 5;
    int prUnitX = margin + 300;
    int ivaX = margin + 400;
    int totalX = pageWidth - margin - 80;
    
    // Header row
    painter.setFont(tableHeaderFont);
    painter.drawText(descX, currentY + 12, "Descricao");
    painter.drawText(prUnitX, currentY + 12, "Pr. Unitário");
    painter.drawText(ivaX, currentY + 12, "IVA");
    painter.drawText(totalX, currentY + 12, "Total Líquido");
    
    currentY += 18;
    drawHLine(currentY);
    currentY += 15;
    
    // Line item
    painter.setFont(valueFont);
    painter.drawText(descX, currentY, data.itemDescription);
    painter.drawText(prUnitX, currentY, formatCurrency(data.itemAmount));
    painter.drawText(totalX, currentY, formatCurrency(data.itemAmount));
    
    currentY += 20;
    drawHLine(currentY);
    currentY += 15;
    
    // Subtotals
    painter.setFont(tableHeaderFont);
    painter.drawText(descX, currentY, "Imposto Selo");
    painter.drawText(prUnitX, currentY, formatCurrency(data.stampDuty));
    currentY += 15;
    
    painter.drawText(descX, currentY, "IVA");
    painter.drawText(prUnitX, currentY, formatCurrency(data.vat));
    currentY += 20;
    
    drawHLine(currentY);
    currentY += 15;
    
    // Total
    QFont totalFont("Arial", 11, QFont::Bold);
    painter.setFont(totalFont);
    painter.drawText(descX, currentY, "Total");
    painter.drawText(totalX, currentY, formatCurrency(data.totalAmount));
    
    currentY += 5;
    drawHLine(currentY);
    currentY += 2;
    drawHLine(currentY); // Double line
    
    currentY += 30;
}

void PDFLoanInvoice::drawVATSummary() {
    QFont tableHeaderFont("Arial", 9, QFont::Bold);
    QFont vatHeaderFont("Arial", 8, QFont::Bold);
    QFont valueFont("Arial", 9);
    
    painter.setFont(tableHeaderFont);
    painter.drawText(margin, currentY, "Quadro Resumo do IVA");
    currentY += 15;
    
    // VAT table dimensions
    int boxWidth = 300;
    int boxHeight = 40;
    int col1Width = 100;
    int col2Width = 100;
    
    // Draw table border
    painter.setPen(QPen(Qt::black, 1));
    painter.drawRect(margin, currentY, boxWidth, boxHeight);
    
    // Vertical dividers
    drawVLine(margin + col1Width, currentY, currentY + boxHeight);
    drawVLine(margin + col1Width + col2Width, currentY, currentY + boxHeight);
    
    // Horizontal divider (header row)
    drawHLine(currentY + 15, margin, margin + boxWidth);
    
    // Header labels
    painter.setFont(vatHeaderFont);
    painter.drawText(margin + 35, currentY + 12, "Taxa");
    painter.drawText(margin + 120, currentY + 12, "Incidência");
    painter.drawText(margin + 220, currentY + 12, "Valor IVA");
    
    // Data row
    painter.setFont(valueFont);
    painter.drawText(margin + 40, currentY + 30, data.vatRate);
    
    currentY += boxHeight + 20;
}

void PDFLoanInvoice::drawFooter() {
    QFont labelFont("Arial", 8);
    QFont footerFont("Arial", 7);
    QFont disclaimerFont("Arial", 8);
    disclaimerFont.setItalic(true);
    
    // Exemption reason
    painter.setFont(labelFont);
    painter.drawText(margin, currentY, 
                    QString("Motivo Isenção: %1").arg(data.exemptionReason));
    currentY += 20;
    
    // Certification
    painter.setFont(footerFont);
    painter.drawText(margin, currentY, 
                    QString("83J - Processado por Programa Certificado n.º %1")
                    .arg(data.certificationNumber));
    currentY += 15;
    
    // Disclaimer
    painter.setFont(disclaimerFont);
    painter.drawText(margin, currentY, data.disclaimer);
}

// // Main function implementation
// void PDFController::generateEmprestimoPDF(QPainter &painter) {
//     // Create receipt data (you can populate this from your database or model)
//     EmprestimoReceiptData data;
//     
//     // You can customize the data here or pass it as a parameter
//     // data.customerName = "Your Customer";
//     // data.totalAmount = 5000.00;
//     // etc.
//     
//     // Generate the PDF
//     PDFLoanInvoice generator(painter, data);
//     generator.generate();
// }
