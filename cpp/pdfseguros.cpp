#include "pdfseguros.h"
#include <QTextDocument>

PDFSegurosInvoice::PDFSegurosInvoice(QPainter& p, const SegurosInvoiceData& d)
    : PDFInvoice(p), data(d)
{
}

void PDFSegurosInvoice::generate()
{
    // QRect pageRect = painter().viewport();
    // painter().fillRect(pageRect, Qt::white);
    // 
    // drawHeader();
    drawSellerInfo();
    // drawPolicyTable();
    // drawChargesTable();
    // 
    // 
    drawTable();
    drawTableInfo();
    if(data.ramo == "Automóvel") {
        drawCarInfo();
    }
    drawCustomerInfo();
    drawChargesTable();
    drawFooter();
}
void PDFSegurosInvoice::drawTable()
{
    QString svg = R"SVG(
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="595.2px" height="841.68px" viewBox="0 0 595.2 841.68" enable-background="new 0 0 595.2 841.68" xml:space="preserve">
<rect x="50.88" y="137.9" fill="#70AD47" stroke="#000000" stroke-miterlimit="10" width="487.679" height="14.64"/>
<rect x="50.88" y="166.946" fill="#70AD47" stroke="#000000" stroke-miterlimit="10" width="487.679" height="14.664"/>
<rect x="50.88" y="196.01" fill="#70AD47" stroke="#000000" stroke-miterlimit="10" width="487.679" height="14.64"/>
<rect x="325.991" y="255.29" fill="#70AD47" stroke="#000000" stroke-miterlimit="10" width="212.568" height="14.64"/>
<rect x="50.88" y="343.03" fill="#70AD47" stroke="#000000" stroke-miterlimit="10" width="487.679" height="15.24"/>
<line fill="none" stroke="#000000" stroke-linecap="square" stroke-linejoin="round" stroke-miterlimit="10" x1="336.571" y1="196.138" x2="336.571" y2="225.17"/>
<line fill="none" stroke="#000000" stroke-linecap="square" stroke-linejoin="round" stroke-miterlimit="10" x1="265.43" y1="196.138" x2="265.43" y2="225.17"/>
<line fill="none" stroke="#000000" stroke-linecap="square" stroke-linejoin="round" stroke-miterlimit="10" x1="443.68" y1="196.138" x2="443.68" y2="225.23"/>
<line fill="none" stroke="#000000" stroke-linecap="square" stroke-linejoin="round" stroke-miterlimit="10" x1="51.9" y1="225.23" x2="537.42" y2="225.23"/>
<line fill="none" stroke="#000000" stroke-linecap="square" stroke-linejoin="round" stroke-miterlimit="10" x1="325.991" y1="270.224" x2="325.991" y2="343.03"/>
<rect x="50.88" y="137.9" fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" width="487.679" height="220.37"/>
</svg>
    )SVG";
    renderSvg(svg);
}

// void PDFSegurosInvoice::drawHeader()
// {
//     int currentY = mm2Pixels(20);
//     QFont titleFont("Arial", 14, QFont::Bold);
//     painter().setFont(titleFont);
//     drawCenteredText(pageWidth() / 2, currentY, "RECIBO DE PRÉMIO DE SEGURO");
// }

void PDFSegurosInvoice::drawSellerInfo()
{
    int currentY = mm2Pixels(23);
    int leftX = margin()+ mm2Pixels(57);
    int boxWidth = (contentWidth() - mm2Pixels(61));
    
    // Load and draw logo
    QImage logo(":/qt/qml/Smoothfact/images/logo-seguros.png");
    if (!logo.isNull()) {
        int width = mm2Pixels(50);
        int height = (logo.height() * width) / logo.width();
        painter().drawImage(QRect(margin() + mm2Pixels(2), currentY, width, height), logo);
    }
    
    // Draw seller box with border
    painter().drawRect(leftX, currentY, boxWidth, mm2Pixels(22));
    
    QFont boldFont("Arial", 10, QFont::Bold);
    QFont normalFont("Arial", 9);
    
    painter().setFont(boldFont);
    painter().drawText(leftX + mm2Pixels(2), currentY + mm2Pixels(5), "ENTIDADE SEGURADORA:");
    
    painter().setFont(normalFont);
    painter().drawText(leftX + mm2Pixels(2), currentY + mm2Pixels(9), data.sellerCompany);
    drawMultilineLeftText(leftX + mm2Pixels(2), currentY + mm2Pixels(13), data.sellerAddress);
    painter().drawText(leftX + mm2Pixels(2), currentY + mm2Pixels(21), "NIF: " + data.sellerVAT);
}

void PDFSegurosInvoice::drawTableInfo()
{
    int currentY = mm2Pixels(51.5);
    QFont normalFont("Arial", 9);
    painter().setFont(normalFont);
    drawCenteredText(pageWidth() / 2, currentY, "DETALHES DA APÓLICE");
    currentY += mm2Pixels(9.5);
    drawCenteredText(mm2Pixels(34.5), currentY, "APÓLICE Nº");
    drawCenteredText(mm2Pixels(62.2), currentY, "RECIBO");
    drawCenteredText(mm2Pixels(89.8), currentY, "INÍCIO");
    drawCenteredText(mm2Pixels(117.5), currentY, "FIM");
    drawCenteredText(mm2Pixels(145.2), currentY, "EMITIDO");
    drawCenteredText(mm2Pixels(172), currentY, "TIPO RECIBO");
    currentY += mm2Pixels(5);
    drawCenteredText(mm2Pixels(34.5), currentY, data.apolice);
    drawCenteredText(mm2Pixels(62.2), currentY, data.number);
    drawCenteredText(mm2Pixels(89.8), currentY, data.date);
    drawCenteredText(mm2Pixels(117.5), currentY, data.endDate);
    drawCenteredText(mm2Pixels(145.2), currentY, data.currentDate);
    drawCenteredText(mm2Pixels(172), currentY, data.receiptType);
    currentY += mm2Pixels(5);
    drawCenteredText(mm2Pixels(52.5), currentY, "RAMO");
    drawCenteredText(mm2Pixels(104.5), currentY, "PRÉMIO");
    drawCenteredText(mm2Pixels(132), currentY, "ENCARGOS LEGAIS");
    drawCenteredText(mm2Pixels(169), currentY, "PRÉMIO TOTAL");
    currentY += mm2Pixels(5);
    drawCenteredText(mm2Pixels(52.5), currentY, data.ramo);
    drawRightAlignedText(mm2Pixels(114), currentY, formatCurrency(data.premio));
    drawRightAlignedText(mm2Pixels(150.5), currentY, formatCurrency(data.encargosLegais));

    QFont boldFont("Arial", 8, QFont::Bold);
    painter().setFont(boldFont);
    drawRightAlignedText(mm2Pixels(182.5), currentY, formatCurrency(data.total));
}

void PDFSegurosInvoice::drawCarInfo()
{
    int currentY = mm2Pixels(56);
    QFont normalFont("Arial", 9);
    painter().setFont(normalFont);
    drawLeftAlignedText(mm2Pixels(19), currentY, "MATRÍCULA: " + data.matricula);
    drawLeftAlignedText(pageWidth() / 2, currentY, "MARCA: " + data.marca);
}

void PDFSegurosInvoice::drawCustomerInfo()
{
    int currentY = mm2Pixels(92);
    QFont normalFont("Arial", 9);
    painter().setFont(normalFont);

    drawCenteredText(mm2Pixels(151), currentY, "Identificação do Cliente");
    currentY += mm2Pixels(5);
    drawLeftAlignedText(mm2Pixels(113), currentY, "NOME / EMPRESA:");
    drawLeftAlignedText(mm2Pixels(113), currentY + mm2Pixels(5), "ENDEREÇO:");
    drawLeftAlignedText(mm2Pixels(113), currentY + mm2Pixels(15), "NIF:");
    drawLeftAlignedText(mm2Pixels(143), currentY, data.buyerCompany);
    drawMultilineLeftText(mm2Pixels(143), currentY + mm2Pixels(5), data.buyerAddress);
    drawLeftAlignedText(mm2Pixels(143), currentY + mm2Pixels(15), data.buyerVAT);
}

void PDFSegurosInvoice::drawChargesTable()
{
    int currentY = mm2Pixels(81);
    QFont normalFont("Arial", 8);
    painter().setFont(normalFont);
    drawLeftAlignedText(mm2Pixels(19), currentY, "SELO (IMPOSTO DO SELO)");
    drawLeftAlignedText(mm2Pixels(19), currentY + mm2Pixels(5), "INEM");
    drawLeftAlignedText(mm2Pixels(19), currentY + mm2Pixels(10), "SERV. NAC. BOMBEIROS");
    drawLeftAlignedText(mm2Pixels(19), currentY + mm2Pixels(15), "FAT (Fundo de Acidentes de Trabalho)");
    drawLeftAlignedText(mm2Pixels(19), currentY + mm2Pixels(20), "AGRAVAMENTO");
    drawLeftAlignedText(mm2Pixels(19), currentY + mm2Pixels(25), "CARTA VERDE");
    drawLeftAlignedText(mm2Pixels(19), currentY + mm2Pixels(30), "TAXA DE GESTÃO");
    drawLeftAlignedText(mm2Pixels(19), currentY + mm2Pixels(35), "FGA (Fundo de Garantia Automóvel)");

    drawLeftAlignedText(mm2Pixels(74), currentY, QString::number(data.percentImpostoSelo, 'f', 2) + "%");
    drawLeftAlignedText(mm2Pixels(74), currentY + mm2Pixels(5), QString::number(data.percentInem, 'f', 2) + "%");
    drawLeftAlignedText(mm2Pixels(74), currentY + mm2Pixels(10), QString::number(data.percentBombeiros, 'f', 2) + "%");
    drawLeftAlignedText(mm2Pixels(74), currentY + mm2Pixels(15), QString::number(data.percentFAT, 'f', 2) + "%");
    drawLeftAlignedText(mm2Pixels(74), currentY + mm2Pixels(35), QString::number(data.percentFGA, 'f', 2) + "%");

    drawRightAlignedText(mm2Pixels(100), currentY, formatCurrency(data.impostoSelo));
    drawRightAlignedText(mm2Pixels(100), currentY + mm2Pixels(5), formatCurrency(data.inem));
    drawRightAlignedText(mm2Pixels(100), currentY + mm2Pixels(10), formatCurrency(data.bombeiros));
    drawRightAlignedText(mm2Pixels(100), currentY + mm2Pixels(15), formatCurrency(data.fat));
    drawRightAlignedText(mm2Pixels(100), currentY + mm2Pixels(20), formatCurrency(data.agravamento));
    drawRightAlignedText(mm2Pixels(100), currentY + mm2Pixels(25), formatCurrency(data.cartaVerde));
    drawRightAlignedText(mm2Pixels(100), currentY + mm2Pixels(30), formatCurrency(data.taxaGestao));
    drawRightAlignedText(mm2Pixels(100), currentY + mm2Pixels(35), formatCurrency(data.fga));
}

void PDFSegurosInvoice::drawFooter()
{
    int currentY = mm2Pixels(122);
    QFont normalFont("Arial", 9);
    painter().setFont(normalFont);
    drawLeftAlignedText(mm2Pixels(19), currentY, "Recebemos de " + data.buyerCompany + " a quantia de " + formatCurrency(data.total) + " através de transferência bancária.");

    painter().setFont(QFont("Arial", 8));
    drawLeftAlignedText(mm2Pixels(19), currentY + mm2Pixels(6), "jTf3 - Processado por programa não certificado - Smoothfact");
    drawLeftAlignedText(mm2Pixels(19), currentY + mm2Pixels(10), "Serve apenas para fins pedagógicos");
}
