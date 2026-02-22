#include "pdfalfandega.h"

PDFAlfandega::PDFAlfandega(QPainter& p, const AlfandegaInvoiceData& d)
    : PDFInvoice(p), data(d)
{
}
// TODO: Implement the DAU form without html
void PDFAlfandega::generate()
{
    QRect pageRect = painter().viewport();
    painter().fillRect(pageRect, Qt::white);
    
    // Generate the customs declaration form as HTML
    // This is a complex EU customs form (DAU - Declaração Aduaneira Unificada)
    
    int currentY = mm2Pixels(10);
    QRect tableRect(margin(), currentY, pageWidth() - 2 * margin(), pageHeight() - 2 * margin() - mm2Pixels(10));
    
    // Build the complete HTML form
    QString htmlText =
        "<!DOCTYPE html>"
        "<html lang='pt'>"
        "<head>"
        "    <meta charset='UTF-8'>"
        "    <title>Declaração Aduaneira Unificada (DAU)</title>"
        "    <style>"
        "    body { font-family: Arial, sans-serif; font-size: 11px; margin: 0; padding: 0; }"
        "    table { width: 100%; border-collapse: collapse; border: 1px solid black; }"
        "    td, th { border: 1px solid #aaa; padding: 2px; vertical-align: top; }"
        "    .header { background-color: #f0f0f0; font-weight: bold; text-align: center; }"
        "    .title { font-size: 12px; font-weight: bold; padding: 3px; }"
        "    .data { font-weight: 600; }"
        "    </style>"
        "</head>"
        "<body>"
        "<table>"
        "<tr><td colspan='12' class='header'>DECLARAÇÃO ADUANEIRA UNIFICADA (DAU)</td></tr>"
        "<tr><td colspan='12' class='title'>1. INFORMAÇÃO GERAL</td></tr>"
        "<tr>"
        "  <td colspan='4'>Estância Aduaneira de Destino:<br/><span class='data'>" + data.customsAuthority + "</span></td>"
        "  <td colspan='4' style='text-align:center; font-weight:bold;'>COMUNIDADE EUROPEIA</td>"
        "  <td colspan='4' style='text-align:center;'>Versão 1<br/>Revisão 0</td>"
        "</tr>"
        "<tr><td colspan='12' class='title'>2. DECLARANTE</td></tr>"
        "<tr>"
        "  <td colspan='6'>Expedidor/Exportador:<br/><span class='data'>" + data.shipperCompany + "</span><br/>" + data.shipperAddress + "</td>"
        "  <td colspan='6'>Destinatário:<br/><span class='data'>" + data.consigneeCompany + "</span><br/>" + data.consigneeAddress + "</td>"
        "</tr>"
        "<tr><td colspan='12' class='title'>3. TRANSPORTE</td></tr>"
        "<tr>"
        "  <td colspan='3'>País de Origem:<br/><span class='data'>" + data.originCountry + "</span></td>"
        "  <td colspan='3'>País de Destino:<br/><span class='data'>" + data.destinationCountry + "</span></td>"
        "  <td colspan='3'>Modo de Transporte:<br/><span class='data'>" + data.transportMode + "</span></td>"
        "  <td colspan='3'>Modo Interior:<br/><span class='data'>" + data.inlandTransportMode + "</span></td>"
        "</tr>"
        "<tr><td colspan='12' class='title'>4. MERCADORIAS</td></tr>"
        "<tr>"
        "  <td colspan='12'>Descrição:<br/><span class='data'>" + data.goodsDescription + "</span></td>"
        "</tr>"
        "<tr>"
        "  <td colspan='4'>Código Tarifário:<br/><span class='data'>" + data.commodityCode + "</span></td>"
        "  <td colspan='4'>Massa Bruta (kg):<br/><span class='data'>" + data.grossWeight + "</span></td>"
        "  <td colspan='4'>Massa Líquida (kg):<br/><span class='data'>" + data.netWeight + "</span></td>"
        "</tr>"
        "<tr><td colspan='12' class='title'>5. VALORES</td></tr>"
        "<tr>"
        "  <td colspan='4'>Moeda:<br/><span class='data'>" + data.currency + "</span></td>"
        "  <td colspan='4'>Montante:<br/><span class='data'>" + data.invoicedAmount + "</span></td>"
        "  <td colspan='4'>Taxa de Câmbio:<br/><span class='data'>" + data.exchangeRate + "</span></td>"
        "</tr>"
        "<tr><td colspan='12' class='title'>6. IMPOSIÇÕES</td></tr>"
        "<tr>"
        "  <td colspan='6'>Tipo: <span class='data'>" + data.dutyType + "</span><br/>"
        "  Base: <span class='data'>" + data.dutyBase + "</span><br/>"
        "  Taxa: <span class='data'>" + data.dutyRate + "</span></td>"
        "  <td colspan='6'>Montante: <span class='data'>" + data.dutyAmount + "</span></td>"
        "</tr>"
        "<tr><td colspan='12' class='title'>7. CONTROLO</td></tr>"
        "<tr>"
        "  <td colspan='4'>Resultado:<br/><span class='data'>" + data.controlResult + "</span></td>"
        "  <td colspan='4'>Autorização:<br/><span class='data'>" + data.controlAuthorization + "</span></td>"
        "  <td colspan='4'>Data:<br/><span class='data'>" + data.controlDate + "</span></td>"
        "</tr>"
        "</table>"
        "</body>"
        "</html>";
    
    paintHtml(tableRect, htmlText);
}
