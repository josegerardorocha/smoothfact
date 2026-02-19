#include "pdfloaninvoice.h"
#include <QPainter>
#include <QFont>
#include <QFontMetrics>
#include <QRect>
#include <QPen>
#include <QBrush>

// Constructor
PDFLoanInvoice::PDFLoanInvoice(QPainter& p, const LoanInvoiceData& d)
    : PDFInvoice(p)
    , data(d)
{
}

// Main generate function
void PDFLoanInvoice::generate() {
    drawHeader();
    drawTitle();
    drawClientInfoBox();
    drawLineItemsTable();
    drawVATSummary();
    drawISSummary();
    drawFooter();
}
 
// Section drawing methods
void PDFLoanInvoice::drawHeader() {
    // Save current Y position
    int currentY = mm2Pixels(10); // Start 10mm from the top
    
    // Left side - Bank information
    QFont headerFont("Arial", 9, QFont::Bold);
    painter().setFont(headerFont);
    painter().setPen(Qt::black);
    painter().drawText(margin(), currentY, data.bankName);
    currentY += mm2Pixels(4); // Add 4mm spacing
    
    QFont normalFont("Arial", 8);
    painter().setFont(normalFont);
    
    painter().drawText(margin(), currentY, data.bankAddress);
    currentY += mm2Pixels(4);
    painter().drawText(margin(), currentY, data.bankPostalCode);
    currentY += mm2Pixels(4);
    painter().drawText(margin(), currentY, QString("Contribuinte Nº: %1").arg(data.bankTaxNumber));
    currentY += mm2Pixels(4);
    painter().drawText(margin(), currentY, QString("Capital Social: %1").arg(data.bankCapital));
    currentY += mm2Pixels(4);
    painter().drawText(margin(), currentY, QString("Cons. Reg. Com. %1").arg(data.bankRegistry));
    currentY += mm2Pixels(4);
    painter().drawText(margin(), currentY, QString("Matricula Nº %1").arg(data.bankTaxNumber));
    
    // Right side - Document number and payment method
    int rightX = pageWidth()/2+mm2Pixels(10); // Start 10mm to the right of center
    int rightY = mm2Pixels(10);
    
    //headerFont
    painter().setFont(headerFont);
    painter().drawText(rightX, rightY, "Exmo.(s) Sr.(s)");
    rightY += mm2Pixels(4);
    
    painter().setFont(normalFont);
    painter().drawText(rightX, rightY, data.customerName);
    rightY += mm2Pixels(4);
    painter().drawText(rightX, rightY, data.customerAddress);
    rightY += mm2Pixels(4);
    painter().drawText(rightX, rightY, data.customerPostalCode);
}

void PDFLoanInvoice::drawTitle() {
    QFont docNumberFont("Arial", 14, QFont::Bold);
    painter().setFont(docNumberFont);
    int currentY = mm2Pixels(55);
    drawCenteredText(pageWidth()/2, currentY, data.documentNumber);
}

void PDFLoanInvoice::drawClientInfoBox() {
    int currentY = mm2Pixels(62);    
    // Draw box border
    painter().setPen(QPen(Qt::black, 1));
    painter().setBrush(Qt::NoBrush);
    painter().drawRect(margin(), currentY, contentWidth(), mm2Pixels(10));
    // middle line
    painter().drawLine(margin(), currentY + mm2Pixels(5), margin() + contentWidth(), currentY + mm2Pixels(5));

    // vertical lines at 50mm, 90mm, 110mm, 130mm, 150mm, 162mm, 175mm and 190mm
    int y1 = currentY;
    int y2 = currentY + mm2Pixels(10);
    int x[] = {
        mm2Pixels(50),        mm2Pixels(90),        mm2Pixels(110),        mm2Pixels(130),
        mm2Pixels(150),       mm2Pixels(162),       mm2Pixels(175)
    };
    for (int i = 0; i < 7; ++i) {
        painter().drawLine(x[i], y1, x[i], y2);
    }
    const QString labels[] = {
        "V/Nº Contrib.", "Contrato", "Data", "Vencimento",
        "Forma Pag.", "Moeda", "Câmbio", "Pag."
    };
    const QString labelValues[] = {
        data.customerTaxNumber,
        QString("Contrato n.º %1").arg(data.contractNumber),
        data.contractDate.toString("dd/MM/yyyy"),
        data.dueDate.toString("dd/MM/yyyy"),
        data.paymentMethod,
        data.currency,
        QString::number(data.exchangeRate, 'f', 4),
        "1.0000"
    };
    QFont labelFont("Arial", 8, QFont::Bold);
    painter().setFont(labelFont);
    int labelY = currentY + mm2Pixels(4);
    drawCenteredText((margin() + x[0])/2, labelY, labels[0]);
    for (int i = 1; i < 7; ++i) {
        drawCenteredText((x[i-1] + x[i])/2, labelY, labels[i]);
    }
    drawCenteredText((margin() + contentWidth() + x[6])/2, labelY, labels[7]);
    
    QFont normalFont("Arial", 8);
    painter().setFont(normalFont);
    drawCenteredText((margin() + x[0])/2, labelY + mm2Pixels(5), labelValues[0]);
    for (int i = 1; i < 7; ++i) {
        drawCenteredText((x[i-1] + x[i])/2, labelY + mm2Pixels(5), labelValues[i]);
    }
    drawCenteredText((margin() + contentWidth() + x[6])/2, labelY + mm2Pixels(5), labelValues[7]);
    drawRightAlignedText(pageWidth() - margin(), labelY + mm2Pixels(10), "Original");
}

void PDFLoanInvoice::drawLineItemsTable() {

    int currentY = mm2Pixels(78);
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
    drawLeftAlignedText(margin() + mm2Pixels(1), currentY, data.itemDescription);
    drawRightAlignedText(mm2Pixels(125) - mm2Pixels(1), currentY, formatCurrency(data.stampDuty));
    drawRightAlignedText(margin() + contentWidth() - mm2Pixels(1), currentY, formatCurrency(data.stampDuty));

}

void PDFLoanInvoice::drawVATSummary() {

    int currentY = mm2Pixels(125);
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

void PDFLoanInvoice::drawISSummary() {
    int currentX = margin() + contentWidth() - mm2Pixels(60);
    int currentY = mm2Pixels(125);

    painter().drawRect(currentX, currentY, mm2Pixels(60), mm2Pixels(15));
    // middle lines
    painter().drawLine(currentX, currentY + mm2Pixels(5), currentX + mm2Pixels(60), currentY + mm2Pixels(5));
    painter().drawLine(currentX, currentY + mm2Pixels(10), currentX + mm2Pixels(60), currentY + mm2Pixels(10));
    // vertical line at center
    painter().drawLine(currentX + mm2Pixels(30), currentY, currentX + mm2Pixels(30), currentY + mm2Pixels(15));

    QFont normalFont("Arial", 8);
    painter().setFont(normalFont);
    drawLeftAlignedText(currentX + mm2Pixels(1), currentY + mm2Pixels(4), "Imposto Selo");
    drawRightAlignedText(currentX + mm2Pixels(60) - mm2Pixels(1), currentY + mm2Pixels(4), formatCurrency(data.stampDuty));
    drawLeftAlignedText(currentX + mm2Pixels(1), currentY + mm2Pixels(9),"IVA");
    drawRightAlignedText(currentX + mm2Pixels(60) - mm2Pixels(1), currentY + mm2Pixels(9), formatCurrency(data.vatAmount));
    
    QFont labelFont("Arial", 8, QFont::Bold);
    painter().setFont(labelFont);
    drawLeftAlignedText(currentX + mm2Pixels(1), currentY + mm2Pixels(14),"Total");
    drawRightAlignedText(currentX + mm2Pixels(60) - mm2Pixels(1), currentY + mm2Pixels(14), formatCurrency(data.stampDuty + data.vatAmount));
}

void PDFLoanInvoice::drawFooter() {

    int currentY = mm2Pixels(145);
    QFont normalFont("Arial", 8);
    painter().setFont(normalFont);
    drawLeftAlignedText(margin(), currentY, "65kJ - Processado por Programa não Certificado n.º 731/AT - Smoothfact");
    drawLeftAlignedText(margin(), currentY + mm2Pixels(4), "Documento elaborado para fins pedagógicos");
}
