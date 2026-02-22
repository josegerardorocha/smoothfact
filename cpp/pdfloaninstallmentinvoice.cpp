#include "pdfloaninstallmentinvoice.h"
#include <QPainter>
#include <QFont>
#include <QFontMetrics>
#include <QRect>
#include <QPen>
#include <QBrush>

// Constructor
PDFLoanInstallmentInvoice::PDFLoanInstallmentInvoice(QPainter& p, const LoanInstallmentInvoiceData& d)
    : PDFInvoice(p)
    , data(d)
{
}

// Main generate function
void PDFLoanInstallmentInvoice::generate() {
    drawHeader();
    drawTitle();
    drawClientInfoBox();
    drawLineItemsTable();
    drawVATSummary();
    drawISSummary();
    drawFooter();
}
 
// Section drawing methods
void PDFLoanInstallmentInvoice::drawHeader() {
    // Save current Y position
    int currentY = margin(); // Start from top margin
    
    // Left side - Bank information with logo
    // Load and draw logo
    QImage logo(":/qt/qml/Smoothfact/images/logo-banco.png");
    if (!logo.isNull()) {
        int width = mm2Pixels(50);
        int height = (logo.height() * width) / logo.width();
        painter().drawImage(QRect(margin(), currentY - mm2Pixels(2), width, height), logo);
    }
    
    int currentX = margin() + mm2Pixels(52);
    QFont headerFont("Arial", 9, QFont::Bold);
    painter().setFont(headerFont);
    painter().setPen(Qt::black);
    painter().drawText(currentX, currentY, data.bankName);
    currentY += mm2Pixels(4); // Add 4mm spacing
    
    QFont normalFont("Arial", 8);
    painter().setFont(normalFont);
    
    drawMultilineLeftText(currentX, currentY, data.bankAddress);
    currentY += mm2Pixels(8);
    painter().drawText(currentX, currentY, QString("Contribuinte Nº: %1").arg(data.bankTaxNumber));
    currentY += mm2Pixels(4);
    painter().drawText(currentX, currentY, QString("Capital Social: %1").arg(data.bankCapital));
    currentY += mm2Pixels(4);
    painter().drawText(currentX, currentY, QString("Cons. Reg. Com. %1").arg(data.bankRegistry));
    currentY += mm2Pixels(4);
    painter().drawText(currentX, currentY, QString("Matricula Nº %1").arg(data.bankTaxNumber));
    
    // Right side - Customer information
    int rightX = pageWidth()/2 + mm2Pixels(26); // Start 10mm to the right of center
    int rightY = margin() + mm2Pixels(26);
    
    painter().setFont(headerFont);
    painter().drawText(rightX, rightY, "Exmo.(s) Sr.(s)");
    rightY += mm2Pixels(4);
    
    painter().setFont(normalFont);
    painter().drawText(rightX, rightY, data.customerName);
    rightY += mm2Pixels(4);
    drawMultilineLeftText(rightX, rightY, data.customerAddress);
}

void PDFLoanInstallmentInvoice::drawTitle() {
    QFont docNumberFont("Arial", 14, QFont::Bold);
    painter().setFont(docNumberFont);
    int currentY = mm2Pixels(60);
    drawCenteredText(pageWidth()/2, currentY, data.documentType + QString::number(data.documentNumber));
}

void PDFLoanInstallmentInvoice::drawClientInfoBox() {
    int currentY = mm2Pixels(62);    
    // Draw 1st box
    painter().setPen(QPen(Qt::black, 1));
    painter().setBrush(Qt::NoBrush);
    painter().drawRect(margin(), currentY, contentWidth(), mm2Pixels(10));
    // middle line
    painter().drawLine(margin(), currentY + mm2Pixels(5), margin() + contentWidth(), currentY + mm2Pixels(5));
    // vertical lines at 50mm, 90mm, 110mm, 155mm and 175mm
    int y1 = currentY;
    int y2 = currentY + mm2Pixels(10);
    painter().drawLine(mm2Pixels(50),  y1, mm2Pixels(50), y2);
    painter().drawLine(mm2Pixels(90),  y1, mm2Pixels(90), y2);
    painter().drawLine(mm2Pixels(110), y1, mm2Pixels(110), y2);
    painter().drawLine(mm2Pixels(155), y1, mm2Pixels(155), y2);
    painter().drawLine(mm2Pixels(175), y1, mm2Pixels(175), y2);

    int labelY = currentY + mm2Pixels(4);
    QFont labelFont("Arial", 8, QFont::Bold);
    painter().setFont(labelFont);
    drawCenteredText((margin() + mm2Pixels(50))/2, labelY, "V/Nº Contrib.");
    drawCenteredText((mm2Pixels(50) + mm2Pixels(90))/2, labelY, "Contrato");
    drawCenteredText((mm2Pixels(90) + mm2Pixels(110))/2, labelY, "Renda");
    drawCenteredText((mm2Pixels(110) + mm2Pixels(155))/2, labelY, "Período");
    drawCenteredText((mm2Pixels(155) + mm2Pixels(175))/2, labelY, "Moeda");
    drawCenteredText((margin() + contentWidth() + mm2Pixels(175))/2, labelY, "Câmbio");

    QFont normalFont("Arial", 8);
    painter().setFont(normalFont);
    labelY += mm2Pixels(5);
    drawCenteredText((margin() + mm2Pixels(50))/2, labelY, data.customerTaxNumber);
    drawCenteredText((mm2Pixels(50) + mm2Pixels(90))/2, labelY, QString("Contrato n.º %1").arg(data.contractNumber));
    drawCenteredText((mm2Pixels(90) + mm2Pixels(110))/2, labelY, QString::number(data.installmentNumber));
    drawCenteredText((mm2Pixels(110) + mm2Pixels(155))/2, labelY, data.dueDateFrom.toString("dd/MM/yyyy") + " - " + data.dueDateTo.toString("dd/MM/yyyy"));
    drawCenteredText((mm2Pixels(155) + mm2Pixels(175))/2, labelY, data.currency);
    drawCenteredText((margin() + contentWidth() + mm2Pixels(175))/2, labelY, QString::number(data.exchangeRate, 'f', 4));
    drawRightAlignedText(pageWidth() - margin(), labelY + mm2Pixels(4), "Original");

    // Draw 2nd box
    currentY += mm2Pixels(15);
    painter().drawRect(margin(), currentY, contentWidth(), mm2Pixels(10));
    // middle line
    painter().drawLine(margin(), currentY + mm2Pixels(5), margin() + contentWidth(), currentY + mm2Pixels(5));
    // vertical lines at 53mm, 93mm, 115mm and 162mm
    y1 = currentY;
    y2 = currentY + mm2Pixels(10);

    painter().drawLine(mm2Pixels(53), y1, mm2Pixels(53), y2);
    painter().drawLine(mm2Pixels(93), y1, mm2Pixels(93), y2);
    painter().drawLine(mm2Pixels(115), y1, mm2Pixels(115), y2);
    painter().drawLine(mm2Pixels(162), y1, mm2Pixels(162), y2);

    painter().setFont(labelFont);
    labelY = currentY + mm2Pixels(4);

    drawCenteredText((margin() + mm2Pixels(53))/2, labelY, "Data");
    drawCenteredText((mm2Pixels(53) + mm2Pixels(93))/2, labelY, "Vencimento");
    drawCenteredText((mm2Pixels(93) + mm2Pixels(115))/2, labelY, "Forma Pag.");
    drawCenteredText((mm2Pixels(115) + mm2Pixels(162))/2, labelY, "Condição Pagamento");
    drawCenteredText((margin() + contentWidth() + mm2Pixels(162))/2, labelY, "Pag.");

    painter().setFont(normalFont);
    labelY += mm2Pixels(5);
    drawCenteredText((margin() + mm2Pixels(53))/2, labelY, data.dueDateFrom.toString("dd/MM/yyyy"));
    drawCenteredText((mm2Pixels(53) + mm2Pixels(93))/2, labelY, data.dueDateFrom.toString("dd/MM/yyyy"));
    drawCenteredText((mm2Pixels(93) + mm2Pixels(115))/2, labelY, data.paymentMethod);
    drawCenteredText((mm2Pixels(115) + mm2Pixels(162))/2, labelY, data.paymentCondition);
    drawCenteredText((margin() + contentWidth() + mm2Pixels(162))/2, labelY, "1");
}

void PDFLoanInstallmentInvoice::drawLineItemsTable() {

    int currentY = mm2Pixels(90);
    // Draw box border
    painter().setPen(QPen(Qt::black, 1));
    painter().setBrush(Qt::NoBrush);
    painter().drawRect(margin(), currentY, contentWidth(), mm2Pixels(40));
    // middle line
    painter().drawLine(margin(), currentY + mm2Pixels(5), margin() + contentWidth(), currentY + mm2Pixels(5));
    // vertical lines at 85mm, 125mm and 160mm
    painter().drawLine(mm2Pixels(85), currentY, mm2Pixels(85), currentY + mm2Pixels(40));
    painter().drawLine(mm2Pixels(125), currentY, mm2Pixels(125), currentY + mm2Pixels(40));
    painter().drawLine(mm2Pixels(160), currentY, mm2Pixels(160), currentY + mm2Pixels(40));
    // table labels
    QFont labelFont("Arial", 8, QFont::Bold);
    painter().setFont(labelFont);
    drawCenteredText((margin() + mm2Pixels(85))/2, currentY + mm2Pixels(4), "Descrição");
    drawCenteredText((mm2Pixels(85) + mm2Pixels(125))/2, currentY + mm2Pixels(4), "Pr. Unitário");
    drawCenteredText((mm2Pixels(125) + mm2Pixels(160))/2, currentY + mm2Pixels(4), "IVA");
    drawCenteredText((mm2Pixels(160) + margin() + contentWidth())/2, currentY + mm2Pixels(4), "Total Líquido");
    // line item values
    currentY += mm2Pixels(9);
    QFont normalFont("Arial", 8);
    painter().setFont(normalFont);
    drawLeftAlignedText(margin() + mm2Pixels(1), currentY, "Amortização");
    drawRightAlignedText(mm2Pixels(125) - mm2Pixels(1), currentY, formatCurrency(data.principal));
    drawRightAlignedText(margin() + contentWidth() - mm2Pixels(1), currentY, formatCurrency(data.principal));
    currentY += mm2Pixels(5);
    drawLeftAlignedText(margin() + mm2Pixels(1), currentY, "Juros");
    drawRightAlignedText(mm2Pixels(125) - mm2Pixels(1), currentY, formatCurrency(data.interest));
    drawRightAlignedText(margin() + contentWidth() - mm2Pixels(1), currentY, formatCurrency(data.interest));
    currentY += mm2Pixels(5);
    drawLeftAlignedText(margin() + mm2Pixels(1), currentY, "Imposto Selo");
    drawRightAlignedText(mm2Pixels(125) - mm2Pixels(1), currentY, formatCurrency(data.stampDuty));
    drawRightAlignedText(margin() + contentWidth() - mm2Pixels(1), currentY, formatCurrency(data.stampDuty));
    currentY += mm2Pixels(8);
    drawLeftAlignedText(margin() + mm2Pixels(1), currentY, "Comissão de Processamento");
    drawRightAlignedText(mm2Pixels(125) - mm2Pixels(1), currentY, formatCurrency(data.processingCommission));
    drawRightAlignedText(margin() + contentWidth() - mm2Pixels(1), currentY, formatCurrency(data.processingCommission));
    currentY += mm2Pixels(5);
    drawLeftAlignedText(margin() + mm2Pixels(1), currentY, "Imposto Selo sobre Comissão");
    drawRightAlignedText(mm2Pixels(125) - mm2Pixels(1), currentY, formatCurrency(data.commissionStampDuty));
    drawRightAlignedText(margin() + contentWidth() - mm2Pixels(1), currentY, formatCurrency(data.commissionStampDuty));
}

void PDFLoanInstallmentInvoice::drawVATSummary() {

    int currentY = mm2Pixels(132);
    // Draw box border
    painter().setPen(QPen(Qt::black, 1));
    painter().setBrush(Qt::NoBrush);
    painter().drawRect(margin(), currentY, mm2Pixels(120)-margin(), mm2Pixels(15));
    // middle lines
    painter().drawLine(margin(), currentY + mm2Pixels(5), mm2Pixels(120), currentY + mm2Pixels(5));
    painter().drawLine(margin(), currentY + mm2Pixels(10), mm2Pixels(120), currentY + mm2Pixels(10));
    // vertical lines at 30mm, 60mm and 90mm
    painter().drawLine(mm2Pixels(30), currentY + mm2Pixels(5), mm2Pixels(30), currentY + mm2Pixels(15));
    painter().drawLine(mm2Pixels(60), currentY + mm2Pixels(5), mm2Pixels(60), currentY + mm2Pixels(15));
    painter().drawLine(mm2Pixels(90), currentY + mm2Pixels(5), mm2Pixels(90), currentY + mm2Pixels(15));

    QFont labelFont("Arial", 8, QFont::Bold);
    painter().setFont(labelFont);
    drawCenteredText((margin() + mm2Pixels(120))/2, currentY + mm2Pixels(4), "Quadro Resumo do IVA");
    
    QFont normalFont("Arial", 8);
    painter().setFont(normalFont);
    drawCenteredText((margin() + mm2Pixels(30))/2, currentY + mm2Pixels(9), "Taxa");
    drawCenteredText((mm2Pixels(30) + mm2Pixels(60))/2, currentY + mm2Pixels(9), "Incidência");
    drawCenteredText((mm2Pixels(60) + mm2Pixels(90))/2, currentY + mm2Pixels(9), "Valor IVA");
    drawCenteredText((mm2Pixels(90) + mm2Pixels(120))/2, currentY + mm2Pixels(9), "Motivo Isenção");

    drawRightAlignedText(mm2Pixels(30) - mm2Pixels(1), currentY + mm2Pixels(14), data.vatRate);
    drawRightAlignedText(mm2Pixels(60) - mm2Pixels(1), currentY + mm2Pixels(14), formatCurrency(data.vatBase));
    drawRightAlignedText(mm2Pixels(90) - mm2Pixels(1), currentY + mm2Pixels(14), formatCurrency(data.vatAmount));
    drawCenteredText((mm2Pixels(90) + mm2Pixels(120))/2, currentY + mm2Pixels(14), data.exemptionReason);
}

void PDFLoanInstallmentInvoice::drawISSummary() {
    int currentX = margin() + contentWidth() - mm2Pixels(60);
    int currentY = mm2Pixels(132);

    painter().drawRect(currentX, currentY, mm2Pixels(60), mm2Pixels(15));
    // middle lines
    painter().drawLine(currentX, currentY + mm2Pixels(5), currentX + mm2Pixels(60), currentY + mm2Pixels(5));
    painter().drawLine(currentX, currentY + mm2Pixels(10), currentX + mm2Pixels(60), currentY + mm2Pixels(10));
    // vertical line at center
    painter().drawLine(currentX + mm2Pixels(30), currentY, currentX + mm2Pixels(30), currentY + mm2Pixels(15));

    QFont normalFont("Arial", 8);
    painter().setFont(normalFont);
    drawLeftAlignedText(currentX + mm2Pixels(1), currentY + mm2Pixels(4), "Incidência");
    drawRightAlignedText(currentX + mm2Pixels(60) - mm2Pixels(1), currentY + mm2Pixels(4), formatCurrency(data.totalAmount));
    drawLeftAlignedText(currentX + mm2Pixels(1), currentY + mm2Pixels(9),"IVA");
    drawRightAlignedText(currentX + mm2Pixels(60) - mm2Pixels(1), currentY + mm2Pixels(9), formatCurrency(data.vatAmount));
    
    QFont labelFont("Arial", 8, QFont::Bold);
    painter().setFont(labelFont);
    drawLeftAlignedText(currentX + mm2Pixels(1), currentY + mm2Pixels(14),"Total");
    drawRightAlignedText(currentX + mm2Pixels(60) - mm2Pixels(1), currentY + mm2Pixels(14), formatCurrency(data.totalAmount + data.vatAmount));
}

void PDFLoanInstallmentInvoice::drawFooter() {

    int currentY = mm2Pixels(150);
    QFont normalFont("Arial", 8);
    painter().setFont(normalFont);
    drawLeftAlignedText(margin(), currentY, "65kJ - Processado por Programa não Certificado - Smoothfact");
    drawLeftAlignedText(margin(), currentY + mm2Pixels(4), "Documento elaborado para fins pedagógicos");
}
