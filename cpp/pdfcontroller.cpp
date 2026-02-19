#include "pdfcontroller.h"
//#include "pdfimageProvider.h"
#include <QPdfWriter>
// #include <QPainter>
#include <QBuffer>
// #include <QDebug>
// #include <QDateTime>
#include <QJsonArray>
#include <QFile>
#include <QTextDocument>

// Simple QR generator using Nayuki’s library
// (Download https://github.com/nayuki/QR-Code-generator and include QrCode.hpp)
#include "qrcode.h"
#include "pdfloaninvoice.h"
using qrcodegen::QrCode;

//PDFController::PDFController(PDFImageProvider *provider, QObject *parent)
//    : QObject(parent)
//    , m_provider(provider)
//    , m_pageCount(0)
//    , m_currentPage(0)
//    , m_zoom(1.0)
//{
//}
PDFController::PDFController(QObject *parent)
    : QObject(parent)
    , m_pageCount(0)
    , m_currentPage(0)
    , m_zoom(1.0)
{
}
void PDFController::setCurrentPage(int page) {
    if (page != m_currentPage && page >= 0 && page < m_pageCount) {
        m_currentPage = page;
        emit currentPageChanged();
    }
}

void PDFController::setZoom(double zoom) {
    if (zoom != m_zoom && zoom >= 0.25 && zoom <= 4.0) {
        m_zoom = zoom;
        emit zoomChanged();
    }
}

/*
 * 🇵🇹 QR Code Data Fields (simplified)
 *
 * For invoices (“FT”), these fields are typically:
 *
 * Code	Meaning
 * A	Seller VAT
 * B	Buyer VAT (or 999999990 if consumer)
 * C	Country code
 * D	Document type (e.g., FT)
 * E	Document status (e.g., N for normal, A for canceled)
 * F	Date (YYYYMMDD)
 * G	Document number
 * H	Hash
 * I1	Seller country code
 * I7	Total tax
 * I8	Total excluding tax
 * N	Total VAT
 * O	Total including VAT
 * Q	Operation type (P/S etc.)
 * R	ATCUD (if available; otherwise omitted)
 * S	Payment info (TB;iban;amount)
 */
QString PDFController::computeInvoiceQRCode(const QJsonObject &invoice)
{
    const QJsonObject header = invoice["header"].toObject();
    const QJsonObject totals = invoice["totais"].toObject();

    // --- Seller / Buyer ---
    QString sellerVAT = header["seller"].toObject()["VAT"].toString();
    QString buyerVAT = header["buyer"].toObject()["VAT"].toString("999999990");
    // if (buyerVAT.isEmpty())
    //     buyerVAT = "999999990"; // Consumer fallback

    QString countryCode = header["country"].toString("PT");
    QString docType = "FT";  // Default document type (could be header["tipoDocumento"])
    QString docStatus = "N"; // N = Normal, A = Anulado
    QString docDateStr = header["date"].toString(); // "dd/MM/yyyy"
    QDate docDate = QDate::fromString(docDateStr, "dd/MM/yyyy");
    QString formattedDate = docDate.toString("yyyyMMdd");

    QString docNumber = header["number"].toString(); // e.g. "FT 2024/001"
    QString hash = header["hash"].toString();
    QString iban = header["iban"].toString();
    QString operationType = header["QType"].toString("P/tl");
    QString atcud = header["atcud"].toString("2842"); // optional

    // --- Totals ---
    // double ivaRed = totals["ivaRed"].toDouble();
    // double ivaInt = totals["ivaInt"].toDouble();
    // double ivaNorm = totals["ivaNorm"].toDouble();
    //double totalIVA = ivaRed + ivaInt + ivaNorm;
    double totalIVA = totals["totalDeIva"].toDouble();

    // double baseRed = totals["baseIvaRed"].toDouble();
    // double baseInt = totals["baseIvaInt"].toDouble();
    // double baseNorm = totals["baseIvaNorm"].toDouble();
    // double totalBeforeIVA = baseRed + baseInt + baseNorm - totals["descontoTotal"].toDouble();
    double totalBeforeIVA = totals["totalSemIva"].toDouble();

    double totalWithIVA = totals["totalGeral"].toDouble();

    // Helper to format decimals
    auto fmt = [](double val) {
        return QString::number(val, 'f', 2);
    };

    QString qr;
    QTextStream s(&qr);
    s << "A:" << sellerVAT << "*"
      << "B:" << buyerVAT << "*"
      << "C:" << countryCode << "*"
      << "D:" << docType << "*"
      << "E:" << docStatus << "*"
      << "F:" << formattedDate << "*"
      << "G:" << docNumber << "*"
      << "H:" << hash << "*"
      << "I1:" << countryCode << "*"
      << "I7:" << fmt(totalBeforeIVA) << "*"  // base before VAT
      << "I8:" << fmt(totalIVA) << "*"        // VAT amount
      << "N:" << fmt(totalIVA) << "*"
      << "O:" << fmt(totalWithIVA) << "*"
      << "Q:" << operationType << "*"
      << "R:" << atcud << "*"
      << "S:TB;" << iban << ";" << fmt(totalWithIVA);

    return qr.trimmed();
}

QImage PDFController::generateQrCode(const QString &text)
{
    const QrCode qr = QrCode::encodeText(text.toUtf8().constData(), QrCode::Ecc::LOW);
    const int mult=4;
    const int qrSize = qr.getSize();
    QImage image(qrSize*mult, qrSize*mult, QImage::Format_ARGB32);
    image.fill(Qt::white);

    QPainter painter(&image);
    painter.setBrush(Qt::black);
    painter.setPen(Qt::NoPen);
    for (int y = 0; y < qrSize; ++y) {
        for (int x = 0; x < qrSize; ++x) {
            if (qr.getModule(x, y))
                painter.drawRect(x*mult, y*mult, mult, mult);
        }
    }
    painter.end();

    //return image.scaled(size, size, Qt::KeepAspectRatio, Qt::SmoothTransformation);
    return image;
}

void PDFController::drawCustomerData(const QJsonObject &customer, QPainter &painter, const QPoint &pos)
{
    QRect pageRect = painter.viewport();
    QRect rect(pos.x(), pos.y(), pageRect.width()*1/2-100, 180);
    QString company = customer["company"].toString();
    QString address = customer["address"].toString();
    QString country = customer["country"].toString();
    QString vat = customer["VAT"].toString();

    QString text = QString() +
                    "<table border='1' cellspacing='0' cellpadding='6' width='100%'>"
                    "  <tr><td>"
                    "    <div style='text-align: left;'>"
                    "      <span style='font-size:18pt; font-weight:bold;'>" + company + "</span><br>"
                    "      <span style='font-size:12pt;'>"
                                + address + "<br>"
                                + country + "<br>"
                    "           <b>NIF:</b> " + vat + "</span>"
                    "    </div>"
                    "  </td></tr>"
                    "</table>";
    paintHtml(rect, text, painter);
    // QTextDocument doc;
    // doc.setHtml(text);
    // doc.setTextWidth(rect.width());  // so it wraps properly

    // painter.save();
    // painter.translate(rect.topLeft());  // move to target rect
    // doc.drawContents(&painter);
    // painter.restore();
}

void PDFController::drawDateNumber(const QString &date, const QString &number,
                                   QPainter &painter, const QPoint &pos)
{
    QRect pageRect = painter.viewport();
    QRect rect(pos.x(), pos.y(), pageRect.width()*1/3-100, 180);
    QString text = QString() +
                    "<table border='0' cellspacing='0' cellpadding='6' width='100%' style='background-color: rgb(200, 200, 200);'>"
                    "  <tr><td>"
                    "    <div style='text-align: left;'>"
                    "      <span style='font-size:18pt; font-weight:bold;'>" + number + "</span>"
                    "      <span style='font-size:16pt;'>" + date + "</span>"
                    "    </div>"
                    "  </td></tr>"
                    "</table>";
    paintHtml(rect, text, painter);
    // QTextDocument doc;
    // doc.setHtml(text);
    // doc.setTextWidth(rect.width());  // so it wraps properly
    // painter.save();
    // painter.translate(rect.topLeft());  // move to target rect
    // doc.drawContents(&painter);
    // painter.restore();
}

QString PDFController::qrCodeHtml(const QString &qrData, QSize &qrSize)
{
    QImage qr = generateQrCode(qrData);
    qrSize = qr.size();
    QByteArray byteArray;
    QBuffer buffer(&byteArray);
    buffer.open(QIODevice::WriteOnly);
    qr.save(&buffer, "PNG");
    QString base64 = QString::fromLatin1(byteArray.toBase64().data());
    return QString("data:image/png;base64,") + base64;
}

QSizeF PDFController::paintHtml(const QRect &rect, const QString &html, QPainter &painter)
{
    QTextDocument doc;
    //int yposition = rect.y();
    //QRect tableRect(100, yposition, pageRect.width()-200, pageRect.height()-600);
    doc.setHtml(html);
    doc.setTextWidth(rect.width());
    painter.save();
    painter.translate(rect.topLeft());
    doc.drawContents(&painter);
    //qDebug() << "doc.size():" << doc.size();
    painter.restore();
    return doc.size();
}

QJsonObject PDFController::titleslanguageJson(const QString &country)
{
    // PT section
    QJsonObject pt;
    pt["Tipo"] = "Tipo";
    pt["Designacao"] = "Designação";
    pt["Quant"] = "Quant.";
    pt["Preco"] = "Preço";
    pt["Desc"] = "Desc.";
    pt["IVA"] = "IVA";
    pt["Total"] = "Total";
    pt["Total sem IVA"] = "Total sem IVA";
    pt["Desconto"] = "Desconto";
    pt["Valor de IVA"] = "Valor de IVA";
    pt["Total com IVA"] = "Total com IVA";

    // EN section (example placeholders)
    QJsonObject en;
    en["Tipo"] = "Type";
    en["Designacao"] = "Description";
    en["Quant"] = "Qty.";
    en["Preco"] = "Price";
    en["Desc"] = "Disc.";
    en["IVA"] = "VAT";
    en["Total"] = "Total";
    en["Total sem IVA"] = "Total excl. VAT";
    en["Desconto"] = "Discount";
    en["Valor de IVA"] = "VAT amount";
    en["Total com IVA"] = "Total incl. VAT";

    if(country == "Portugal")
        return pt;
    else
        return en;
}
void PDFController::generateBuySellInvoicePDFPDF(QPainter &painter)
{
    qDebug() << "...........................................................................";
    qDebug() << " PDFController::generateBuySellInvoicePDFPDF. m_pdfData=" << m_pdfData;
    qDebug() << "...........................................................................";
    const QJsonObject header = m_pdfData["header"].toObject();
    const QJsonObject totals = m_pdfData["totais"].toObject();
    bool isPortugal = (header["country"].toString() == "Portugal");
    QJsonObject titles = titleslanguageJson(header["country"].toString());

    auto isZero = [](double x) {
        constexpr double tol = 1e-6;
        return std::fabs(x) < tol;
    };
    QRect pageRect = painter.viewport();
    painter.fillRect(pageRect, Qt::white);

    drawCustomerData(header["seller"].toObject(), painter, QPoint(100, 160));
    drawDateNumber(header["date"].toString(), header["number"].toString(),
                   painter, QPoint(pageRect.width()*2/3, 160));
    drawCustomerData(header["buyer"].toObject(), painter, QPoint(pageRect.width()/2, 330));

    QString text = QString() +
        "<table border='0' cellspacing='0' cellpadding='0' width='100%'>"
        "  <tr>"
        "    <td width='10%'><div style='text-align: left; '>" + titles["Tipo"].toString() + "</div></td>"
        "    <td width='40%'><div style='text-align: left; '>" + titles["Designacao"].toString() + "</div></td>"
        "    <td width='10%'><div style='text-align: right;'>" + titles["Quant"].toString() + "</div></td>"
        "    <td width='10%'><div style='text-align: right;'>" + titles["Preco"].toString() + "</div></td>"
        "    <td width='10%'><div style='text-align: right;'>" + titles["Desc"].toString() + "</div></td>"
        "    <td width='10%'><div style='text-align: right;'>" + titles["IVA"].toString() + "</div></td>"
        "    <td width='10%'><div style='text-align: right;'>" + titles["Total"].toString() + "</div></td>"
        "  </tr>"
        "</table>"
        ;

    int yposition = 510;
    QRect tableRect(100, yposition, pageRect.width()-200, pageRect.height()-600);
    QSizeF size = paintHtml(tableRect, text, painter);
    yposition += int(size.height());
    painter.drawLine(100, yposition, pageRect.width() - 100, yposition);

    // rows
    QChar alineaIsencao('a');
    QJsonArray rowsArray = m_pdfData["rows"].toArray();
    text = "<table border='0' cellspacing='0' cellpadding='0' width='100%'>";
    for(const QJsonValue &value : std::as_const(rowsArray)){
        QJsonObject row = value.toObject();
        QString ivaText;
        if(isPortugal && isZero(row["iva"].toDouble())){
            ivaText = QString("%1%") + "(" + alineaIsencao + ")";
            alineaIsencao = QChar(alineaIsencao.unicode() + 1);
        }
        else
            ivaText = QString("%1%");
        text +=
            "  <tr>"
            "    <td width='10%'><div style='text-align: left;'>" + row["tipo"].toString() + "</div></td>"
            "    <td width='40%'><div style='text-align: left;'>" + row["designacao"].toString() + "</div></td>"
            "    <td width='10%'><div style='text-align: right;'>" + QString::number(row["quantidade"].toDouble(), 'f', 0) + "</div></td>"
            "    <td width='10%'><div style='text-align: right;'>" + QString("%1€").arg(row["preco"].toDouble(), 8, 'f', 2, QChar(' '))+"</div></td>"
            "    <td width='10%'><div style='text-align: right;'>" + QString("%1%").arg(row["desconto"].toDouble(), 8, 'f', 2, QChar(' '))+"</div></td>"
            "    <td width='10%'><div style='text-align: right;'>" + ivaText.arg(row["iva"].toDouble(), 3, 'f', 0, QChar(' '))+"</div></td>"
            "    <td width='10%'><div style='text-align: right;'>" + QString("%1€").arg(row["total"].toDouble(), 8, 'f', 2, QChar(' '))+"</div></td>"
            "  </tr>"
            ;
    }
    text += "</table>";

    tableRect = QRect(100, yposition, pageRect.width()-200, pageRect.height()-600);
    size = paintHtml(tableRect, text, painter);
    yposition += int(size.height());
    painter.drawLine(100, yposition, pageRect.width() - 100, yposition);

    // motivo isenção
    alineaIsencao = 'a';
    text =
        "<table border='0' cellspacing='0' cellpadding='0' width='100%'>"
        "<tr>"
           "<td width='80%' valign='top'>"
           "<table border='0' cellspacing='0' cellpadding='4' width='100%'>";

    if(isPortugal){
        for(const QJsonValue &value : std::as_const(rowsArray)){
            QJsonObject row = value.toObject();
            if(isZero(row["iva"].toDouble())){
                text += "<tr><td style='text-align: left;'>";
                text += QString("(") + alineaIsencao + ") - " + row["motivoIsencao"].toString() + "</td></tr>";
                alineaIsencao = QChar(alineaIsencao.unicode() + 1);
            }
        }
    }
    text += "</table></td>";

    // totais
    text += "<td width='20%'valign='top'>"
        "<table border='1' cellspacing='0' cellpadding='4' width='100%'>"
        "<tr>"
        "<td width='50%' align='right'>" + titles["Total sem iva"].toString() + ":</td>"
        "<td width='50%' align='right'>" + QString("%1€").arg(totals["totalSemIva"].toDouble(),   8, 'f', 2, QChar(' ')) + "</td>"
        "</tr>"
        "<tr>"
        "<td width='50%' align='right'>" + titles["Desconto"].toString() + ":</td>"
        "<td width='50%' align='right'>" + QString("%1€").arg(totals["descontoTotal"].toDouble(),   8, 'f', 2, QChar(' ')) + "</td>"
        "</tr>"
        "<tr>"
        "<td width='50%' align='right'>" + titles["Valor de IVA"].toString() + ":</td>"
        "<td width='50%' align='right'>" + QString("%1€").arg(totals["totalDeIva"].toDouble(),   8, 'f', 2, QChar(' ')) + "</td>"
        "</tr>"
        "<tr>"
        "<td width='50%' align='right'><b>" + titles["Total com IVA"].toString() + ":</b></td>"
        "<td width='50%' align='right'><b>" + QString("%1€").arg(totals["totalGeral"].toDouble(),   8, 'f', 2, QChar(' ')) + "</b></td>"
        "</tr>"
        ;
    text += "</table>";

    text += "</td></tr></table>";

    tableRect = QRect(100, yposition, pageRect.width()-200, pageRect.height()-600);
    size = paintHtml(tableRect, text, painter);

    if(isPortugal){
        // QR code
        QString qrs = computeInvoiceQRCode(m_pdfData);
        QSize qrSize;
        QString qrStr = qrCodeHtml(qrs, qrSize);

        // resumo do iva e desenho do qr code
        double taxasIva[]{
            0.0,
            totals["ivaRed"].toDouble(),
            totals["ivaInt"].toDouble(),
            totals["ivaNorm"].toDouble()
        };
        double baseesIva[]{
            totals["baseIvaIsento"].toDouble(),
            totals["baseIvaRed"].toDouble(),
            totals["baseIvaInt"].toDouble(),
            totals["baseIvaNorm"].toDouble()
        };

        text =
            "<table border='0' cellspacing='0' cellpadding='0' width='100%'>"
            "<tr>"
            "    <td width='60%' valign='top'>"
            "        <b>Resumo do IVA</b><br>"
            "        <table border='1' cellspacing='0' cellpadding='4' width='100%'>"
            "            <tr>"
            "                <td width='34%' align='left'>Taxa IVA</td>"
            "                <td width='33%' align='left'>Valor base</td>"
            "                <td width='33%' align='left'>Valor IVA</td>"
            "            </tr>";

        for(int i=0; i<4; ++i){
            if(!isZero(baseesIva[i])){
                double valorIvaCalc = baseesIva[i] * taxasIva[i] / 100.0;
                text += QString() +
                        "<tr>"
                        "    <td width='34%' align='left'>" + QString::number(taxasIva[i], 'f', 2) + "%</td>"
                                                                 "    <td width='33%' align='left'>" + QString::number(baseesIva[i], 'f', 2) + "</td>"
                                                                  "    <td width='33%' align='left'>" + QString::number(valorIvaCalc, 'f', 2) + "</td>"
                                                                  "</tr>";
            }
        }
        text +=
            "        </table>"
            "    </td>"
            "    <td width='40%' align='right' valign='top'>ATCUD: " + header["atcud"].toString() + "<br>"
            "        <img src=\"" + qrStr + "\" alt='QR Code'></td>"
            "</tr>"
            "</table>"
            "0r9y - Processado por programa não certificado - SmoothFact<br>"
            "Serve apenas para fins pedagógicos.";

        yposition = pageRect.height() - 200 - qrSize.height();
        tableRect = QRect(100, yposition, pageRect.width()-200, pageRect.height()-600);
        size = paintHtml(tableRect, text, painter);
    }
    else{
        yposition = pageRect.height() - 200;
        tableRect = QRect(100, yposition, pageRect.width()-200, pageRect.height()-600);
        paintHtml(tableRect, "Processado por programa não certificado - SmoothFact<br>"
            "Serve apenas para fins pedagógicos.", painter);
    }

    // local de carga e descarga
    if(!header["carga"].toString().isEmpty() || !header["descarga"].toString().isEmpty()){
        text =
            "<table border='1' cellspacing='0' cellpadding='6' width='100%'>"
            "<tr>"
            "    <td width='50%' valign='top'>"
            "        <b>Local de Carga:</b><br>" + header["carga"].toString().replace("\n", "<br>") +
            "    </td>"
            "    <td width='50%' valign='top'>"
            "        <b>Local de Descarga:</b><br>" + header["descarga"].toString().replace("\n", "<br>") +
            "    </td>"
            "</tr>"
            "</table>";
        yposition -= 200;
        tableRect = QRect(100, yposition, pageRect.width()-200, pageRect.height()-600);
        size = paintHtml(tableRect, text, painter);
    }
}

void PDFController::generateSegurosPDF(QPainter &painter)
{
    const QJsonObject header = m_pdfData["header"].toObject();
    const QJsonObject buyer = header["buyer"].toObject();
    auto isZero = [](double x) {
        constexpr double tol = 1e-6;
        return std::fabs(x) < tol;
    };
    QRect pageRect = painter.viewport();

    // Page 1
    qDebug() << "m_pdfData=" << m_pdfData;
    painter.fillRect(pageRect, Qt::white);

    drawCustomerData(header["seller"].toObject(), painter, QPoint(100, 160));
    // drawDateNumber(header["date"].toString(), header["number"].toString(),
    //                painter, QPoint(pageRect.width()*2/3, 160));
    // drawCustomerData(header["buyer"].toObject(), painter, QPoint(pageRect.width()/2, 330));

    double is = header["impostoSelo"].toDouble();
    double inem = header["inem"].toDouble();
    double fat = header["fat"].toDouble();
    double fga = header["fga"].toDouble();
    double cartaVerde = header["cartaVerde"].toDouble();
    double encargosLegais = header["encargosLegais"].toDouble();
    double encargos = header["encargos"].toDouble();
    QString text =
        "<table border='1' cellspacing='0' cellpadding='6' width='100%'"
        "  style='border-collapse:collapse; text-align:left;'>"
        "<tr style='background-color: rgb(200, 200, 200);'>"
        "  <td style='text-align: center' colspan='8'><b>RECIBO DE PRÉMIO DE SEGURO</b></td>"
        "</tr>"
        ;
    if(header["ramo"] == "Automóvel"){
        text +=
        "<tr>"
        "    <td style='text-align: right' colspan='2'>Matrícula da Viatura</td>"
        "    <td colspan='2'>"+header["matricula"].toString()+"</td>"
        "    <td style='text-align: right' colspan='2'>Marca da Viatura</td>"
        "    <td colspan='2'>"+header["marca"].toString()+"</td>"
        "</tr>";
    }
    else{
        text +=
            "<tr><td colspan='8'></td></tr>";
    }

    text +=
        "<tr style='background-color: rgb(200, 200, 200);'>"
        "  <td colspan='2'>APÓLICE Nº</td>"
        "  <td colspan='2'>RECIBO</td>"
        "  <td colspan='2'>INICIO</td>"
        "  <td colspan='2'>FIM</td>"
        "</tr>"
        "<tr>"
        "  <td colspan='2'>"+header["apolice"].toString()+"</td>"
        "  <td colspan='2'>"+header["number"].toString()+"</td>"
        "  <td colspan='2'>"+header["date"].toString()+"</td>"
        "  <td colspan='2'>"+header["endDate"].toString()+"</td>"
        "</tr>"
        "  <tr style='background-color: rgb(200, 200, 200);'>"
        "  <th colspan='2'>RAMO</th>"
        "  <th colspan='1'>PRÉMIO</th>"
        "  <th colspan='2'>ENCARGOS LEGAIS</th>"
        "  <th colspan='2'>ENCARGOS</th>"
        "  <th colspan='1'>PRÉMIO TOTAL</th>"
        "</tr>"
        "<tr>"
        "  <td colspan='2'>"+header["ramo"].toString()+"</td>"
        "  <td colspan='1' style='text-align:right;'>"+QString::number(header["premio"].toDouble(), 'f', 2)+"€</td>"
        "  <td colspan='2' style='text-align:right;'>"+QString::number(encargosLegais, 'f', 2)+"€</td>"
        "  <td colspan='2' style='text-align:right;'>"+(encargos > 0.0 ? QString::number(encargos, 'f', 2) + "€" : "") + "</td>"
        "  <td colspan='1' style='text-align:right;'>"+QString::number(header["total"].toDouble(), 'f', 2)+"€</td>"
        "</tr>"
        "<tr style='background-color: rgb(200, 200, 200);'>"
        "  <th colspan='8'>DETALHE DE ENCARGOS</th>"
        "</tr>"
        "<tr>"
        "  <td colspan='4'>SELO (IMPOSTO DO SELO)</td>"
        "  <td colspan='2' style='text-align:right;'>"+ (is > 0.0 ? "0.50%": "") + "</td>"
        "  <td colspan='2 'style='text-align:right;'>"+QString::number(is, 'f', 2)+"€</td>"
        "</tr>"
        "<tr>"
        "  <td colspan='4'>INEM</td>"
        "  <td colspan='2'  style='text-align:right;'>" + (inem > 0.0 ? "0.25%": "") + "</td>"
        "  <td colspan='2' style='text-align:right;'>"+QString::number(inem, 'f', 2)+"€</td>"
        "</tr>"
        "<tr>"
        "  <td colspan='4'>SERV.NAC.BOMBEIROS</td>"
        "  <td colspan='2' style='text-align:right;'></td>"
        "  <td colspan='2' style='text-align:right;'>0.00€</td>"
        "</tr>"
        "<tr>"
        "  <td colspan='4'>FAT (Fundo de Acidentes de Trabalho)</td>"
        "  <td colspan='2' style='text-align:right;'>" + (fat > 0.0 ? "0.15%": "") + "</td>"
        "  <td colspan='2' style='text-align:right;'>"+QString::number(fat, 'f', 2)+"€</td>"
        "</tr>"
        "<tr>"
        "  <td colspan='4'>AGRAVAMENTO</td>"
        "  <td colspan='2' style='text-align:right;'></td>"
        "  <td colspan='2' style='text-align:right;'>0.00€</td>"
        "</tr>"
        "<tr>"
        "  <td colspan='4'>CARTA VERDE</td>"
        "  <td colspan='2' style='text-align:right;'></td>"
        "  <td colspan='2' style='text-align:right;'>"+QString::number(cartaVerde, 'f', 2)+"€</td>"
        "</tr>"
        "<tr>"
        "  <td colspan='4'>TAXA DE GESTÃO</td>"
        "  <td colspan='2' style='text-align:right;'></td>"
        "  <td colspan='2' style='text-align:right;'>0.00€</td>"
        "</tr>"
        "<tr>"
        "  <td colspan='4'>FUNDO DE GARANTIA AUTO</td>"
        "  <td colspan='2' style='text-align:right;'></td>"
        "  <td colspan='2' style='text-align:right;'>"+QString::number(fga, 'f', 2)+"€</td>"
        "</tr>"
        "<tr style='background-color: rgb(200, 200, 200);'>"
        "  <th colspan='8'>IDENTIFICAÇÃO DO CLIENTE</th>"
        "</tr>"
        "<tr>"
        "  <td colspan='2'>Nome:</td>"
        "  <td colspan='6'>"+buyer["company"].toString()+"</td>"
        "</tr>"
        "<tr>"
        "  <td colspan='2'>Morada:</td>"
        "  <td colspan='6'>"+buyer["address"].toString()+"</td>"
        "</tr>"
        "<tr>"
        "  <td colspan='2'>NIF/NIPC:</td>"
        "  <td colspan='6'>"+buyer["VAT"].toString()+"</td>"
        "</tr>"
        "<tr style='background-color: rgb(200, 200, 200);'>"
        "  <th colspan='8'>OUTRAS INFORMAÇÕES</th>"
        "</tr>"
        "<tr>"
        "  <td colspan='2'>Emitido:</td>"
        "  <td colspan='2'>"+header["date"].toString()+"</td>"
        "  <td colspan='2'>Tipo Recibo:</td>"
        "  <td colspan='2'>Anual</td>"
        "</tr>"
        "</table>";

    int yposition = 500;
    QRect tableRect(100, yposition, pageRect.width()-200, pageRect.height()-600);
    paintHtml(tableRect, text, painter);
    // QTextDocument doc;
    // doc.setHtml(text);
    // doc.setTextWidth(tableRect.width());
    // painter.save();
    // painter.translate(tableRect.topLeft());
    // doc.drawContents(&painter);
    // painter.restore();


    // QR code
    QString qrs = computeInvoiceQRCode(m_pdfData);
    QSize qrSize;
    QString qrStr = qrCodeHtml(qrs, qrSize);
    // QImage qr = generateQrCode(qrs);
    // QByteArray byteArray;
    // QBuffer buffer(&byteArray);
    // buffer.open(QIODevice::WriteOnly);
    // qr.save(&buffer, "PNG");
    // QString base64 = QString::fromLatin1(byteArray.toBase64().data());
    // QString qrStr = QString("data:image/png;base64,") + base64;
    text =
        "<table border='0' cellspacing='0' cellpadding='0' width='100%'>"
        "<tr>"
        "    <td width='60%' valign='bottom'>"
        "        0r9y - Processado por programa não certificado - SmoothFact<br>"
        "        Serve apenas para fins pedagógicos."
        "    </td>"
        "    <td width='40%' align='right' valign='top'>ATCUD: " + header["atcud"].toString() + "<br>"
        "        <img src=\"" + qrStr + "\" alt='QR Code'></td>"
        "</tr>"
        "</table>";
    yposition = pageRect.height() - 200 - qrSize.height();
    tableRect = QRect(100, yposition, pageRect.width()-200, pageRect.height()-600);
    paintHtml(tableRect, text, painter);
    // doc.setHtml(text);
    // doc.setTextWidth(tableRect.width());
    // painter.save();
    // painter.translate(tableRect.topLeft());
    // doc.drawContents(&painter);
    // painter.restore();
}

void PDFController::generateAlfandegaPDF(QPainter &painter)
{
    QRect pageRect = painter.viewport();
    painter.fillRect(pageRect, Qt::white);
    QRect tableRect(100, 100, pageRect.width()-200, pageRect.height()-600);

    QString text = QString() +
    "<!DOCTYPE html>"
    "<html lang='pt'>"
    "<head>"
    "    <meta charset='UTF-8'>"
    "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>"
    "    <title>Declaração Aduaneira (DAU) - Modelo Simplificado</title>"
    "    <style>"
    "    /* Basic styling to mimic the form structure */"
    "    body {"
    "        font-family: Arial, sans-serif;"
    "        font-size: 12px;"
    "        margin: 20px;"
    "        background-color: red;"//#f4f4f4;"
    "    }"
    "    .dau-container {"
    "        width: " + QString::number(tableRect.width()) + "px;"
    "        height: " + QString::number(tableRect.height()) + "px;"
    "        margin: 0 auto;"
    "        border: 2px solid black;"
    "        background-color: white;"
    "        padding: 5px;"
    "    }"
    "    table {"
    "        width: 100%;"
    "        border-collapse: collapse;"
    "        table-layout: fixed;"
    "        border: 1px solid black;"
    "        background-color: white;"
    "    }"
    "    td, th {"
    //"        border: 1px solid #aaa;"
    "        padding: 3px;"
    "        vertical-align: top;"
    "        height: 30px; /* Standard height for form fields */"
    "        background-color: white;"
    "    }"
    "    .box-title {"
    "        font-weight: bold;"
    "        display: block;"
    "        margin-bottom: 2px;"
    "        background-color:  #f0f0f0;"
    "        padding: 1px 3px;"
    "    }"
    "    .small-text {"
    "        font-size: 10px;"
    "        background-color: white;"
    "    }"
    "    .header-box {"
    "        border: 2px solid black;"
    "        background-color: #f0f0f0;"
    "        font-size: 13px;"
    "        text-align: center;"
    "        font-weight: bold;"
    "    }"
    "    .data {"
    "        font-weight: 600;"
    "        color: #000;"
    "        background-color: white;"
    "    }"
    "    .text-right {"
    "        text-align: right;"
    "        background-color: white;"
    "    }"
    "    .box-47-header th {"
    "        font-size: 10px;"
    "        font-weight: normal;"
    "        background-color: white;"
    "    }"
    "    </style>"
    "</head>"
    "<body>"
    "<table class='dau-container'><tr><td>"
    "    <table>"
    "        <tr>"
    "            <td colspan='4' style='width: 44%;'>"
    "                <p class='box-title'>1. Estância Aduaneira de Destino [cite: 1]</p>"
    "                <p class='data'>Alfândega do Aeroporto do Porto [cite: 16]</p>"
    "            </td>"
    "            <td colspan='4' class='header-box' style='width: 33%;'>"
    "                COMUNIDADE EUROPEIA [cite: 2]"
    "                <div style='font-size: 12px; font-weight: normal; margin-top: 5px;'>"
    "                    DECLARAÇÃO [cite: 3]"
    "                </div>"
    "            </td>"
    "            <td colspan='4' class='text-right' style='width: 23%; padding: 0;'>"
    "                <table style='border: none;'>"
    "                    <tr>"
    "                        <td style='border: none; border-bottom: 1px solid #aaa; padding: 0;'>"
    "                            <div class='small-text text-right'>Versão 1 [cite: 10]</div>"
    "                        </td>"
    "                    </tr>"
    "                    <tr>"
    "                        <td style='border: none; border-bottom: 1px solid #aaa; padding: 0;'>"
    "                            <div class='small-text text-right'>Revisão 0 [cite: 12]</div>"
    "                        </td>"
    "                    </tr>"
    "                    <tr>"
    "                        <td style='border: none; padding: 0;'>"
    "                            <div class='data text-right' style='font-size: 12px;'>2025PT00002062317180 [cite: 11]</div>"
    "                        </td>"
    "                    </tr>"
    "                </table>"
    "            </td>"
    "        </tr>"
    "        <tr>"
    "            <td colspan='6' style='width: 44%;'>"
    "                <div class='box-title'>2. Expedidor/Exportador [cite: 4]</div>"
    "                <span class='small-text'>N.º [cite: 5]: NA [cite: 6]</span>"
    "                <div class='data'>MD TECH ENTERPRISES LIMITED [cite: 7]</div>"
    "                <div class='data'>FLAT C, 23FL, LUCKY PLAZA [cite: 13]</div>"
    "                <div class='data'>WAN CHAI [cite: 14], Hong Kong [cite: 18]</div>"
    "            </td>"
    "            <td colspan='6' style='width: 56%;'>"
    "                <div class='box-title'>8. Destinatário [cite: 29]</div>"
    "                <span class='small-text'>N.º [cite: 30]: PT513014438 [cite: 30]</span>"
    "                <div class='data'>SMOOTHPURPLE-SCIENCE & ENGINEERING LDA [cite: 35]</div>"
    "                <div class='data'>RUA DE PICOTO N 127 [cite: 36]</div>"
    "                <div class='data'>4760-083 VILA NOVA DE FAMALICAO [cite: 37]</div>"
    "                <div class='data'>Portugal [cite: 38]</div>"
    "            </td>"
    "        </tr>"
    "        <tr>"
    "            <td colspan='6'>"
    "                <div class='box-title'>14. Declarante/Representante [cite: 45]</div>"
    "                <span class='small-text'>N.º [cite: 46]: PT980112664 [cite: 46]</span>"
    "                <div class='data' style='margin-top: 3px;'>DHL AVIATION NV/SA SUCRUSAL [cite: 51]</div>"
    "                <div class='small-text'>AEROPORTO DE LISBOA RUA C EDIFICIO 69 3 GAB 306 308 [cite: 51]</div>"
    "                <div class='small-text'>1700-008 LISBOA [cite: 59], Portugal [cite: 60]</div>"
    "            </td>"
    "            <td colspan='6'>"
    "                <div class='box-title'>7. Número de referência [cite: 24]</div>"
    "                <div class='data' style='margin-bottom: 5px;'>CE 1509014 [cite: 27]</div>"
    "                <div class='box-title'>9. Responsável Financeiro [cite: 32]</div>"
    "                <span class='small-text'>N.º[cite: 33]:</span>"
    "            </td>"
    "        </tr>"
    "        <tr>"
    "            <td style='width: 8%;'>"
    "                <div class='box-title'>15. País exped. [cite: 48, 49]</div>"
    "                <div class='data'>HK [cite: 53]</div>"
    "            </td>"
    "            <td style='width: 8%;'>"
    "                <div class='box-title'>16. País origem [cite: 57]</div>"
    "                <div class='data'>CN [cite: 98]</div>"
    "            </td>"
    "            <td style='width: 8%;'>"
    "                <div class='box-title'>17. País destino [cite: 58, 50]</div>"
    "                <div class='data'>PT [cite: 54]</div>"
    "            </td>"
    "            <td colspan='4' style='width: 30%;'>"
    "                <div class='box-title'>18. Identificação e nacionalidade do meio de transporte à partida [cite: 61]</div>"
    "            </td>"
    "            <td colspan='5' style='width: 46%;'>"
    "                <div class='box-title'>20. Condições de Entrega [cite: 63]</div>"
    "                <span class='small-text'>DAEAE [cite: 64]</span> <span class='data'>DDU [cite: 66] VILA NOVA DE FAMALICAO [cite: 67]</span>"
    "            </td>"
    "        </tr>"
    "        <tr>"
    "            <td colspan='4'>"
    "                <div class='box-title'>22. Moeda e montante total facturado [cite: 69]</div>"
    "                <div class='data'>USD [cite: 73] 196,98 [cite: 74]</div>"
    "            </td>"
    "            <td colspan='2'>"
    "                <div class='box-title'>23. Taxa de Câmbio [cite: 70]</div>"
    "                <div class='data'>1,0897 [cite: 75]</div>"
    "            </td>"
    "            <td colspan='2'>"
    "                <div class='box-title'>24. Natureza da Transacção [cite: 71, 76]</div>"
    "                <div class='data'>90 [cite: 101]</div>"
    "            </td>"
    "            <td style='width: 8%;'>"
    "                <div class='box-title'>25. Modo [cite: 77]</div>"
    "                <div class='data'>4 [cite: 81]</div>"
    "            </td>"
    "            <td style='width: 8%;'>"
    "                <div class='box-title'>26. Modo interior [cite: 78, 86]</div>"
    "                <div class='data'>4 [cite: 85]</div>"
    "            </td>"
    "            <td colspan='2'>"
    "                <div class='box-title'>46. Valor Estatístico [cite: 118]</div>"
    "                <div class='data'>180,77 [cite: 120]</div>"
    "            </td>"
    "        </tr>"
    "        <tr>"
    "            <td colspan='12'>"
    "                <div class='box-title'>30. Localização das Mercadorias [cite: 93] / 29. Estância Aduaneira de entrada [cite: 91]</div>"
    "                <div class='data' style='margin-top: 5px;'>DTP00000473020PT [cite: 93] / Alfândega do Aeroporto do Porto [cite: 16]</div>"
    "            </td>"
    "        </tr>"
    "        <tr>"
    "            <td colspan='12'>"
    "                <div class='box-title'>31. Volumes e designação das mercadorias [cite: 88, 89]</div>"
    "                <span class='data'>1 CT Caixa, de cartão ('Carton') 1 LETREIRO OUTROS MOTORES ELÉTRICOS [cite: 90]</span>"
    "                <div class='small-text' style='margin-top: 5px;'>"
    "                    Marcas e números - N.º(s) contentor(es) - Quantidades e natureza: [cite: 92]"
    "                </div>"
    "                <div class='small-text data'>"
    "                    BTI 196.86 € VAD 180.77 € [cite: 90]"
    "                </div>"
    "            </td>"
    "        </tr>"
    "        <tr>"
    "            <td colspan='1' style='width: 5%;'>"
    "                <div class='box-title'>32. Adição N.º [cite: 95]</div>"
    "                <div class='data'>1 [cite: 19]</div>"
    "            </td>"
    "            <td colspan='2' style='width: 15%;'>"
    "                <div class='box-title'>33. Código das mercadorias [cite: 94] (NC)</div>"
    "                <div class='data'>85011091 [cite: 96]</div>"
    "            </td>"
    "            <td style='width: 8%;'>"
    "                <div class='box-title'>35. Massa Bruta (kg) [cite: 102]</div>"
    "                <div class='data'>1,7 [cite: 102]</div>"
    "            </td>"
    "            <td style='width: 8%;'>"
    "                <div class='box-title'>38. Massa Líquida (kg) [cite: 102]</div>"
    "                <div class='data'>1,615 [cite: 102]</div>"
    "            </td>"
    "            <td colspan='1' style='width: 8%;'>"
    "                <div class='box-title'>37. Regime [cite: 99]</div>"
    "                <div class='data'>4000 [cite: 100]</div>"
    "            </td>"
    "            <td style='width: 8%;'>"
    "                <div class='box-title'>36. Preferência [cite: 104]</div>"
    "                <div class='data'>100 [cite: 104]</div>"
    "            </td>"
    "            <td style='width: 8%;'>"
    "                <div class='box-title'>41. Unidades Suplementares [cite: 113]</div>"
    "                <div class='data'>3 [cite: 113]</div>"
    "            </td>"
    "            <td colspan='4' style='width: 38%;'>"
    "                <div class='box-title'>44. Referências especiais/Documentos apresentados [cite: 105, 108]</div>"
    "                <div class='small-text data'>N740 8224270530 de 2025-04-23 [cite: 108]</div>"
    "                <div class='small-text data'>BEAEOF0000012GDV de 2017-12-21 [cite: 108]</div>"
    "                <div class='small-text data'>Menções: DHAB PCEDP VDA 11.21€ [cite: 109]</div>"
    "            </td>"
    "        </tr>"
    "        <tr>"
    "            <td colspan='8'>"
    "                <div class='box-title'>47. Cálculo das imposições [cite: 130]</div>"
    "                <table class='box-47-header'>"
    "                    <thead>"
    "                        <tr>"
    "                            <th style='width: 15%;'>Tipo [cite: 130]</th>"
    "                            <th style='width: 35%;'>Base de tributação [cite: 121]</th>"
    "                            <th style='width: 25%;'>Taxa [cite: 122]</th>"
    "                            <th style='width: 25%;'>Montante [cite: 123]</th>"
    "                        </tr>"
    "                    </thead>"
    "                    <tbody>"
    "                        <tr>"
    "                            <td class='data'>A00 [cite: 126]</td>"
    "                            <td class='data'>180.77 [cite: 127]</td>"
    "                            <td class='data'>0.027 [cite: 128]</td>"
    "                            <td class='data'>4.88 [cite: 129]</td>"
    "                        </tr>"
    "                        <tr>"
    "                            <td class='data'>800 [cite: 126]</td>"
    "                            <td class='data'>196.86 [cite: 127]</td>"
    "                            <td class='data'>0.23 [cite: 128]</td>"
    "                            <td class='data'>45.28 [cite: 129]</td>"
    "                        </tr>"
    "                    </tbody>"
    "                </table>"
    "            </td>"
    "            <td colspan='4'>"
    "                <div class='box-title'>B. DADOS CONTABILÍSTICOS [cite: 135]</div>"
    "                <div class='data' style='margin-top: 5px;'>1) DF 50.16€ [cite: 136]</div>"
    "                <div class='small-text'>T 2025-05-15 2025/0923289 2025-04-24 [cite: 136]</div>"
    "                <div class='box-title' style='margin-top: 10px;'>Total: [cite: 137]</div>"
    "                <div class='data'>50.16 [cite: 138]</div>"
    "            </td>"
    "        </tr>"
    "        <tr>"
    "            <td colspan='12'>"
    "                <div class='box-title'>J. CONTROLO PELA ESTÂNCIA ADUANEIRA DE DESTINO [cite: 144]</div>"
    "                <div style='display: flex; justify-content: space-between; padding: 5px;'>"
    "                    <div>Resultado: <span class='data'>Aut. Saida: NSTIMP [cite: 147]</span></div>"
    "                    <div>Data: <span class='data'>2025-04-24 [cite: 148]</span></div>"
    "                    <div>Assinatura: [cite: 140]</div>"
    "                </div>"
    "            </td>"
    "        </tr>"
    "    </table>"
    "    <div style='text-align: center; margin-top: 10px; font-size: 10px;'>"
    "        PROCESSADO ELETRONICAMENTE, ART 6.º/N.º 1, REG (UE) 952/2013 DO P.E E DO CONSELHO, DE 9/10/2017 E DL 21/2013 [cite: 154]"
    "    </div>"
    "</td></tr></table>"
    "</body>"
    "</html>";

    qDebug() << "----------------------------------------";
    qDebug() << text;
    qDebug() << "----------------------------------------";
    paintHtml(tableRect, text, painter);
}

void PDFController::generateLoanPDF(QPainter &painter)
{
    qDebug() << "=== generateLoanPDF ===";
    QJsonDocument doc(m_pdfData);
    QString jsonStr = QString::fromUtf8(doc.toJson(QJsonDocument::Indented));
    qDebug() << "m_pdfData (JSON):";
    qDebug().noquote() << jsonStr;

    // Extract data from m_pdfData
    const QJsonObject header = m_pdfData["header"].toObject();
    const QJsonObject seller = header["seller"].toObject();
    const QJsonObject buyer = header["buyer"].toObject();
    const QJsonObject loanData = m_pdfData["loanData"].toObject();
    const QJsonObject isData = loanData["IS"].toObject();

    // Create and populate LoanInvoiceData
    LoanInvoiceData data;

    // Bank (seller) information
    data.bankName = seller["company"].toString("Banco IPCA, S.A.");
    data.bankAddress = seller["address"].toString("Rua da Simulação, n.º 10");
    data.bankPostalCode = seller["postalCode"].toString("4750-810 Barcelos");
    data.bankTaxNumber = seller["VAT"].toString("530004585");
    data.bankCapital = seller["CapitalSocial"].toString("10 000 000.00 €");
    data.bankRegistry = seller["Conservatoria"].toString("Barcelos");

    // Document information
    data.documentNumber = header["number"].toString("2050");
    data.paymentMethod = "Débito Direto"; // Default or from header
    data.documentType = "Factura-Recibo IS / 2025"; // Can be customized

    // Customer (buyer) information
    data.customerTaxNumber = buyer["VAT"].toString("525000194");
    data.customerName = buyer["company"].toString("Empresa Modelo");
    data.customerAddress = buyer["address"].toString("R. Elias Garcia nº 74");
    data.customerPostalCode = buyer["postalCode"].toString("4750-144 Barcelos");

    // Contract information
    data.contractNumber = header["contract"].toString("20256634");
    data.contractDate = QDate::fromString(header["date"].toString(), "dd/MM/yyyy");
    data.dueDate = QDate::fromString(loanData["date"].toString(), "dd/MM/yyyy");

    // Currency and exchange
    data.currency = "EUR";
    data.exchangeRate = 1.0;

    // Item/amount information
    data.itemDescription = isData["description"].toString("Imposto Selo Verba 17.1.2 - 0,5%");
    data.itemAmount = loanData["loanAmount"].toString("4000.00").toDouble();
    data.stampDuty = isData["value"].toString("4000.00").toDouble();
    data.vat = 0.00;
    data.totalAmount = data.itemAmount + data.stampDuty + data.vat;

    // VAT information
    data.vatRate = "0%";

    // Additional information
    data.exemptionReason = "Não sujeito";
    // data.certificationNumber = "731/AT";
    // data.disclaimer = "Documento elaborado no âmbito do Projeto em Simulação Empresarial - IPCA.";

    // Create PDFLoanInvoice generator and generate the PDF
    PDFLoanInvoice generator(painter, data);
    generator.generate();
}

void PDFController::generateEmprestimoPrestacaoPDF(QPainter &painter)
{
    qDebug() << "=== generateEmprestimoPrestacaoPDF ===";
    QJsonDocument doc(m_pdfData);
    QString jsonStr = QString::fromUtf8(doc.toJson(QJsonDocument::Indented));
    qDebug() << "m_pdfData (JSON):";
    qDebug().noquote() << jsonStr;
}

void PDFController::generateSamplePDF()
{
    QByteArray pdfData;
    QBuffer buffer(&pdfData);
    buffer.open(QIODevice::WriteOnly);

    // Create PDF writer
    QPdfWriter writer(&buffer);
    writer.setPageSize(QPageSize::A4);
    writer.setResolution(150);
    const QJsonObject header = m_pdfData["header"].toObject();
    writer.setTitle(header["number"].toString());
    writer.setCreator("SmoothFact by SmoothPurple");

    // Get page rect for drawing
    QPainter painter(&writer);

    const InvoiceIDs id = static_cast<InvoiceIDs>(m_pdfData["id"].toInt());
    switch(id){
    case VENDA: generateBuySellInvoicePDFPDF(painter); break;
    case MULTIRRISCOS: generateSegurosPDF(painter); break;
    case ALFANDEGA: generateAlfandegaPDF(painter); break;
    case EMPRESTIMO: generateLoanPDF(painter); break;
    case EMPRESTIMO_PRESTACAO: generateEmprestimoPrestacaoPDF(painter); break;
    default:
        qWarning() << "Unknown invoice ID for PDF generation:" << static_cast<int>(id);
        break;
    }

    painter.end();
    buffer.close();

    // Load the generated PDF
    loadPdfData(pdfData);
}

void PDFController::loadPdfData(const QByteArray &data) {
    m_currentPdfData = data;
    m_provider->setPdfData(data);
    m_pageCount = m_provider->pageCount();
    m_currentPage = 0;

    emit pageCountChanged();
    emit currentPageChanged();
    emit hasPdfChanged();
    emit pdfUpdated();

    qDebug() << "PDF loaded with" << m_pageCount << "pages";
    qDebug() << "m_currentPdfData.size() =" << m_currentPdfData.size();

    QString filename = "output.pdf";

    QFile file(filename);
    if (!file.open(QIODevice::WriteOnly)) {
        qWarning() << "Could not open file for writing:" << file.errorString();
        return;
    }

    qint64 bytesWritten = file.write(m_currentPdfData);
    if (bytesWritten == -1) {
        qWarning() << "Failed to write data to file";
    } else {
        qDebug() << "Wrote" << bytesWritten << "bytes to" << filename;
    }

    file.close();
}

void PDFController::nextPage() {
    setCurrentPage(m_currentPage + 1);
}

void PDFController::previousPage() {
    setCurrentPage(m_currentPage - 1);
}

void PDFController::firstPage() {
    setCurrentPage(0);
}

void PDFController::lastPage() {
    setCurrentPage(m_pageCount - 1);
}

void PDFController::zoomIn() {
    setZoom(m_zoom * 1.25);
}

void PDFController::zoomOut() {
    setZoom(m_zoom / 1.25);
}

void PDFController::resetZoom() {
    setZoom(1.0);
}

// void PDFController::downloadPdf(const QString &filename)
// {
//     if (m_currentPdfData.isEmpty()) {
//         qWarning() << "No PDF data to download";
//         return;
//     }
//
//     QString finalFilename = filename;
//     if (finalFilename.isEmpty()) {
//         QString timestamp = QDateTime::currentDateTime().toString("yyyyMMdd_HHmmss");
//         finalFilename = QString("document_%1.pdf").arg(timestamp);
//     }
//
//     // Convert to Base64 for JavaScript
//     QString base64Data = m_currentPdfData.toBase64();
//
//     // Emit signal that will be handled by QML/JavaScript
//     emit downloadReady(base64Data, finalFilename);
//
//     qDebug() << "PDF ready for download:" << finalFilename << "Size:" << m_currentPdfData.size();
// }

void PDFController::saveFile(const QString &filename)
{
    if (filename.isEmpty()) {
        qWarning() << "No file name specified.";
        return;
    }

    // Convert QML's "file://" URL to a local file path
    const QString localPath = QUrl(filename).toLocalFile();

    QFile file(localPath);
    if (!file.open(QIODevice::WriteOnly)) {
        qWarning() << "Could not open file for writing:" << localPath;
        return;
    }

    qDebug() << "PDFController::saveFile. m_currentPdfData.size() =" << m_currentPdfData.size();
    qint64 bytesWritten = file.write(m_currentPdfData);
    file.close();
    if (bytesWritten < 0)
        qWarning() << "Error writing to file:" << localPath;
}

QString PDFController::getPdfAsBase64() const {
    if (m_currentPdfData.isEmpty()) {
        return QString();
    }
    return QString(m_currentPdfData.toBase64());
}
