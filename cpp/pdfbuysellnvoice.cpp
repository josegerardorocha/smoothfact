#include "pdfbuysellnvoice.h"
#include <QPainter>
#include <QFont>
#include <QDebug>

PDFBuySellInvoice::PDFBuySellInvoice(QPainter& p, const BuySellInvoiceData& d)
    : PDFInvoice(p), data(d)
{
}

void PDFBuySellInvoice::generate()
{
    inPortugal = data.country == "Portugal";

    // TODO: if not in Portugal, write texts in english
    drawTitle();
    drawSellerInfo();
    drawBuyerInfo();
    drawLineItemsTable();
    drawTotalsSection();

    // Only draw exemption reasons for Portuguese invoices
    if (inPortugal) {
        drawExemptionReasons();
        drawQRCode();
    }
    
    if(drawLoadingUnloadingBox)
        drawLoadingUnloading();
    drawVATSummary();
    drawDisclaimer();
}

void PDFBuySellInvoice::drawTitle()
{
    int curreentX = margin() + contentWidth() / 2 + mm2Pixels(5);
    int currentY = mm2Pixels(30);
    int rectWidth = contentWidth()/2-mm2Pixels(5);

    
    QFont normalfont("Arial", 12);
    painter().setFont(normalfont);
    drawLeftAlignedText(curreentX + mm2Pixels(1), currentY - mm2Pixels(2), "Original");

    painter().setPen(Qt::red);
    painter().drawRect(curreentX, currentY, rectWidth, mm2Pixels(10));
    painter().setPen(Qt::black);

    QFont headerFont("Arial", 8, QFont::Bold);
    painter().setFont(headerFont);
    drawCenteredText(curreentX + rectWidth/6, currentY + mm2Pixels(4), "Document number");
    drawCenteredText(curreentX + rectWidth*3/6, currentY + mm2Pixels(4), "VAT Number");
    drawCenteredText(curreentX + rectWidth*5/6, currentY + mm2Pixels(4), "Date");
    
    painter().setFont(QFont("Arial", 8));
    drawCenteredText(curreentX + rectWidth/6, currentY + mm2Pixels(8), data.number);
    drawCenteredText(curreentX + rectWidth*3/6, currentY + mm2Pixels(8), data.buyerVAT);
    drawCenteredText(curreentX + rectWidth*5/6, currentY + mm2Pixels(8), data.date);
}

void PDFBuySellInvoice::drawSellerInfo()
{
    int currentY = mm2Pixels(45);
    painter().setPen(Qt::black);
    //painter().drawRect(margin(), currentY, contentWidth()/2-mm2Pixels(5), mm2Pixels(25));
    
    QFont headerFont("Arial", 12, QFont::Bold);
    painter().setFont(headerFont);
    painter().drawText(margin()+mm2Pixels(1), currentY + mm2Pixels(6), data.sellerCompany);
    
    QFont normalFont("Arial", 10);
    painter().setFont(normalFont);
    
    painter().drawText(margin()+mm2Pixels(1), currentY + mm2Pixels(11), data.sellerAddress);
    painter().drawText(margin()+mm2Pixels(1), currentY + mm2Pixels(16), data.sellerCountry);
    painter().drawText(margin()+mm2Pixels(1), currentY + mm2Pixels(21), QString("NIF: %1").arg(data.sellerVAT));
}

void PDFBuySellInvoice::drawBuyerInfo()
{
    int curreentX = margin() + contentWidth() / 2 + mm2Pixels(5);
    int currentY = mm2Pixels(45);
    painter().setPen(Qt::black);
    //painter().drawRect(curreentX, currentY, contentWidth()/2-mm2Pixels(5), mm2Pixels(30));
    
    painter().setFont(QFont("Arial", 10));
    painter().drawText(curreentX+mm2Pixels(1), currentY + mm2Pixels(4), "Exmo.(s) Senhor(es):");

    QFont headerFont("Arial", 12, QFont::Bold);
    painter().setFont(headerFont);
    painter().drawText(curreentX+mm2Pixels(1), currentY + mm2Pixels(10), data.buyerCompany);
    
    QFont normalFont("Arial", 10);
    painter().setFont(normalFont);
    
    painter().drawText(curreentX+mm2Pixels(1), currentY + mm2Pixels(15), data.buyerAddress);
    painter().drawText(curreentX+mm2Pixels(1), currentY + mm2Pixels(20), data.buyerCountry);
    //painter().drawText(curreentX+mm2Pixels(1), currentY + mm2Pixels(25), QString("NIF: %1").arg(data.buyerVAT));
}

void PDFBuySellInvoice::drawLineItemsTable()
{
    int currentY = mm2Pixels(80);
    
    // Table headers
    QFont headerFont("Arial", 9, QFont::Bold);
    painter().setFont(headerFont);
    
    int col1X = margin();                                   // Tipo
    int col2X = margin() + mm2Pixels(10);                   // Designação
    int col3X = pageWidth() - margin() - mm2Pixels(80);     // Quantity
    int col4X = pageWidth() - margin() - mm2Pixels(55);     // Price
    int col5X = pageWidth() - margin() - mm2Pixels(40);     // Discount
    int col6X = pageWidth() - margin() - mm2Pixels(25);     // IVA
    int col7X = pageWidth() - margin();                     // Total
    
    painter().drawText(col1X, currentY, "Tipo");
    painter().drawText(col2X, currentY, "Designação");
    drawRightAlignedText(col3X, currentY, "Quant.");
    drawRightAlignedText(col4X, currentY, "Preço");
    drawRightAlignedText(col5X, currentY, "Desc.");
    drawRightAlignedText(col6X, currentY, "IVA");
    drawRightAlignedText(col7X, currentY, "Total");
    
    // currentY += mm2Pixels(5);
    painter().drawLine(margin(), currentY + mm2Pixels(2), pageWidth() - margin(), currentY + mm2Pixels(1));
    
    // Line items
    QFont itemFont("Arial", 9);
    painter().setFont(itemFont);
    currentY += mm2Pixels(5);
    
    drawLoadingUnloadingBox = data.lineItems[0].tipo == "P";
    int markerIndex = 0;
    for (const auto& item : data.lineItems) {
        painter().drawText(col1X, currentY, item.tipo);
        painter().drawText(col2X, currentY, item.designacao);
        drawRightAlignedText(col3X, currentY, QString::number(item.quantidade, 'f', 0));
        drawRightAlignedText(col4X, currentY, formatCurrency(item.preco));
        drawRightAlignedText(col5X, currentY, QString::number(item.desconto, 'f', 2) + "%");
        if (item.iva < 0.01) { // Near zero VAT
            QChar marker = generateExemptionMarker(markerIndex);
            drawRightAlignedText(col6X, currentY, QStringLiteral("%1%(%2)")
                                                   .arg(QString::number(item.iva, 'f', 0), QString(marker)));
        } else {
            drawRightAlignedText(col6X, currentY, QString::number(item.iva, 'f', 0) + "%");
        }
        drawRightAlignedText(col7X, currentY, formatCurrency(item.total));
        currentY += mm2Pixels(4);
    }
    currentY -= mm2Pixels(2);
    painter().drawLine(margin(), currentY, pageWidth() - margin(), currentY);
    totalBoxY = currentY + mm2Pixels(2); // Save Y coordinate for totals section
}

void PDFBuySellInvoice::drawTotalsSection()
{
    int currentY = totalBoxY;
    int rightX = pageWidth() - margin();
    int leftX = rightX - mm2Pixels(60);
    
    painter().setPen(Qt::black);
    painter().drawRect(leftX, currentY, mm2Pixels(60), mm2Pixels(20));
    // Draw horizontal lines at currentY + 5mm, +10mm and +15mm
    painter().drawLine(leftX, currentY + mm2Pixels(5), leftX + mm2Pixels(60), currentY + mm2Pixels(5));
    painter().drawLine(leftX, currentY + mm2Pixels(10), leftX + mm2Pixels(60), currentY + mm2Pixels(10));
    painter().drawLine(leftX, currentY + mm2Pixels(15), leftX + mm2Pixels(60), currentY + mm2Pixels(15));
    // draw vertical line at center of the rectangle
    painter().drawLine(leftX + mm2Pixels(30), currentY, leftX + mm2Pixels(30), currentY + mm2Pixels(20));

    QFont normalFont("Arial", 9);
    painter().setFont(normalFont);
    
    currentY += mm2Pixels(4);
    drawRightAlignedText(rightX - mm2Pixels(31), currentY, "Total sem IVA:");
    drawRightAlignedText(rightX - mm2Pixels(1), currentY, formatCurrency(data.totalSemIva));

    currentY += mm2Pixels(5);
    drawRightAlignedText(rightX - mm2Pixels(31), currentY, "Desconto:");
    drawRightAlignedText(rightX - mm2Pixels(1), currentY, formatCurrency(data.descontoTotal));

    currentY += mm2Pixels(5);
    drawRightAlignedText(rightX - mm2Pixels(31), currentY, "Valor IVA:");
    drawRightAlignedText(rightX - mm2Pixels(1), currentY, formatCurrency(data.totalDeIva));

    currentY += mm2Pixels(5);
    QFont boldFont("Arial", 10, QFont::Bold);
    painter().setFont(boldFont);
    
    drawRightAlignedText(rightX - mm2Pixels(31), currentY, "Total com IVA:");
    drawRightAlignedText(rightX - mm2Pixels(1), currentY, formatCurrency(data.totalGeral));
}

void PDFBuySellInvoice::drawExemptionReasons()
{
    int currentY = totalBoxY + mm2Pixels(3);
    QFont labelFont("Arial", 8, QFont::Bold);
    painter().setFont(labelFont);
    
    int markerIndex = 0;
    QFont normalFont("Arial", 8);
    painter().setFont(normalFont);
    
    for (const auto& item : data.lineItems) {
        if (item.iva < 0.01) { // Near zero VAT
            QChar marker = generateExemptionMarker(markerIndex);
            painter().drawText(margin(), currentY, 
                              QString("(%1) - %2").arg(marker, item.motivoIsencao));
            currentY += mm2Pixels(3);
        }
    }
}

void PDFBuySellInvoice::drawQRCode()
{
    QImage qr = generateQrCode(data.qrCodeData);
    QSize qrSize = qr.size();
    int currentX = pageWidth() - margin() - qrSize.width();
    int currentY = pageHeight() - mm2Pixels(73);
    painter().drawImage(currentX, currentY, qr);
    drawLeftAlignedText(currentX, currentY - mm2Pixels(2), data.atcudCode);
}

void PDFBuySellInvoice::drawDisclaimer()
{
    int currentY = pageHeight() - margin() - mm2Pixels(10);
    QFont disclaimerFont("Arial", 8);
    painter().setFont(disclaimerFont);
    drawLeftAlignedText(margin(), currentY, "or9y - Processado por programa não certificado - Smoothfact");
    currentY += mm2Pixels(3);
    drawLeftAlignedText(margin(), currentY, "Serve apenas para fins pedagógicos");
}

void PDFBuySellInvoice::drawLoadingUnloading()
{
    int currentY = pageHeight() - mm2Pixels(110);
    int leftX = margin();
    int rightX = pageWidth() - margin();
    int centerX = (leftX + rightX) / 2;
    
    painter().setPen(Qt::black);
    painter().drawRect(leftX, currentY, rightX - leftX, mm2Pixels(22));
    // draw vertical line at center of the rectangle
    painter().drawLine(centerX, currentY, centerX, currentY + mm2Pixels(22));

    QFont chargeFont("Arial", 9, QFont::Bold);
    painter().setFont(chargeFont);
    drawLeftAlignedText(leftX + mm2Pixels(1), currentY + mm2Pixels(4), "Local de Carga");
    drawLeftAlignedText(centerX + mm2Pixels(1), currentY + mm2Pixels(4), "Local de Descarga");

    QFont normalFont("Arial", 9);
    painter().setFont(normalFont);
    drawMultilineLeftText(leftX + mm2Pixels(1), currentY + mm2Pixels(10), data.loadingAddress);
    drawMultilineLeftText(centerX + mm2Pixels(1), currentY + mm2Pixels(10), data.unloadingAddress);
}

 void PDFBuySellInvoice::drawVATSummary()
{
    
    int currentY = pageHeight() - mm2Pixels(75);
    int startY = currentY + mm2Pixels(1);   // start of the rectangle to be drawn around the VAT summary
    painter().setPen(Qt::black);
    QFont labelFont("Arial", 9, QFont::Bold);
    painter().setFont(labelFont);
    painter().drawText(margin(), currentY, "Resumo de IVA:");

    QFont normalFont("Arial", 8);
    painter().setFont(normalFont);
    currentY += mm2Pixels(4);
    drawLeftAlignedText(margin() + mm2Pixels(1), currentY, "Taxa IVA");
    drawLeftAlignedText(margin() + mm2Pixels(36), currentY, "Valor base");
    drawLeftAlignedText(margin() + mm2Pixels(71), currentY, "Valor IVA");

    double bases[] = {data.baseIvaIsento, data.baseIvaRed, data.baseIvaInt, data.baseIvaNorm};
    double taxas[] = {0.0, data.ivaRed, data.ivaInt, data.ivaNorm};

    for(int i=0; i<4; i++) {
        if(bases[i] > 0.00) {
            // draw horizontal line before each row
            painter().drawLine(margin(), currentY + mm2Pixels(1), margin() + mm2Pixels(105), currentY + mm2Pixels(1));
            currentY += mm2Pixels(4);
            drawLeftAlignedText(margin() + mm2Pixels(1), currentY, QString("%1%").arg(QString::number(taxas[i], 'f', 0)));
            drawLeftAlignedText(margin() + mm2Pixels(36), currentY, formatCurrency(bases[i]));
            drawLeftAlignedText(margin() + mm2Pixels(71), currentY, formatCurrency(bases[i] * taxas[i] / 100));
            
        }
    }
    currentY += mm2Pixels(1);
    
    painter().drawRect(margin(), startY, mm2Pixels(105), currentY - startY);
    // draw 2 vertical lines to divide the rectangle into 3 columns
    painter().drawLine(margin() + mm2Pixels(35), startY, margin() + mm2Pixels(35), currentY);
    painter().drawLine(margin() + mm2Pixels(70), startY, margin() + mm2Pixels(70), currentY);
}

QChar PDFBuySellInvoice::generateExemptionMarker(int &markerIndex)
{
    return QChar('a' + markerIndex++);
}
