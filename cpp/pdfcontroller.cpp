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
#include "pdfloaninstallmentinvoice.h"
#include "pdfbuysellnvoice.h"
#include "pdfseguros.h"
#include "pdfalfandega.h"
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

// TODO; remover daqui. Está implementada em pdfinvoice.cpp
/*
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
*/

/*
QImage PDFController::generateQrCode(const QString &text)
{
    QString qrData = text;
    std::vector<uint8_t> qr0 = qrcodegen::QrCode::encodeText(qrData.toStdString().c_str(), qrcodegen::QrCode::Ecc::HIGH);
    int size = qr0.getSize();
    QImage image(size, size, QImage::Format_RGB32);
    image.fill(Qt::white);
    for(int row = 0; row < size; row++) {
        for(int col = 0; col < size; col++) {
            if(qr0.getModule(col, row)) {
                image.setPixel(col, row, qRgb(0, 0, 0));
            } else {
                image.setPixel(col, row, qRgb(255, 255, 255));
            }
        }
    }
    QImage scaledImage = image.scaled(200, 200, Qt::KeepAspectRatio, Qt::SmoothTransformation);
    return scaledImage;
}
*/

/*
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

/*
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
*/

/*
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
*/

/*
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
*/

/*
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
*/

/*
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
*/

void PDFController::generateBuySellInvoicePDF(QPainter &painter)
{
    qDebug() << "=== generateBuySellInvoicePDF ===";
    QJsonDocument doc(m_pdfData);
    QString jsonStr = QString::fromUtf8(doc.toJson(QJsonDocument::Indented));
    qDebug() << "m_pdfData (JSON):";
    qDebug().noquote() << jsonStr;

    // Extract data from m_pdfData
    const QJsonObject header = m_pdfData["header"].toObject();
    const QJsonObject seller = header["seller"].toObject();
    const QJsonObject buyer = header["buyer"].toObject();
    const QJsonArray rowsArray = m_pdfData["rows"].toArray();
    const QJsonObject totals = m_pdfData["totais"].toObject();

    // Create and populate BuySellInvoiceData
    BuySellInvoiceData data;

    // Seller information
    data.sellerCompany = seller["company"].toString("Empresa Fornecedora");
    data.sellerAddress = seller["address"].toString("");
    // data.sellerPostalCode = seller["postalCode"].toString("");
    data.sellerVAT = seller["VAT"].toString("");
    data.sellerCountry = seller["country"].toString("");

    // Buyer information
    data.buyerCompany = buyer["company"].toString("Cliente");
    data.buyerAddress = buyer["address"].toString("");
    // data.buyerPostalCode = buyer["postalCode"].toString("");
    data.buyerVAT = buyer["VAT"].toString("");
    data.buyerCountry = buyer["country"].toString("");

    // Document information
    data.number = header["number"].toString("FT 001");
    data.date = header["date"].toString(QDate::currentDate().toString("dd/MM/yyyy"));
    data.invoiceType = "FATURA";
    data.country = header["country"].toString("Portugal");

    // Load line items
    for (const QJsonValue &value : std::as_const(rowsArray)) {
        QJsonObject row = value.toObject();
        BuySellLineItem item;
        
        item.tipo = row["tipo"].toString("");
        item.designacao = row["designacao"].toString("");
        item.quantidade = row["quantidade"].toDouble(0.0);
        item.preco = row["preco"].toDouble(0.0);
        item.desconto = row["desconto"].toDouble(0.0);
        item.iva = row["iva"].toDouble(0.0);
        item.total = row["total"].toDouble(0.0);
        item.motivoIsencao = row["motivoIsencao"].toString("");
        
        data.lineItems.push_back(item);
    }

    // Totals
    data.totalSemIva = totals["totalSemIva"].toDouble(0.0);
    data.descontoTotal = totals["descontoTotal"].toDouble(0.0);
    data.totalDeIva = totals["totalDeIva"].toDouble(0.0);
    data.totalGeral = totals["totalGeral"].toDouble(0.0);
    data.baseIvaInt = totals["baseIvaInt"].toDouble(0.0);
    data.baseIvaIsento = totals["baseIvaIsento"].toDouble(0.0);
    data.baseIvaNorm = totals["baseIvaNorm"].toDouble(0.0);
    data.baseIvaRed = totals["baseIvaRed"].toDouble(0.0);
    data.descontoTotal = totals["descontoTotal"].toDouble(0.0);
    data.ivaInt = totals["ivaInt"].toDouble(0.0);
    data.ivaNorm = totals["ivaNorm"].toDouble(0.0);
    data.ivaRed = totals["ivaRed"].toDouble(0.0);

    // Loading Unloading addresses information
    data.loadingAddress = header["carga"].toString("");
    data.unloadingAddress = header["descarga"].toString("");

    // Additional information
    data.atcudCode = header["atcud"].toString("");
    data.qrCodeData = computeInvoiceQRCode(m_pdfData);
    //data.exemptionReason = "Não sujeito";
    //data.disclaimer = "";

    // Create PDFBuySellInvoice generator and generate the PDF
    PDFBuySellInvoice generator(painter, data);
    generator.generate();
}

void PDFController::generateSegurosPDF(QPainter &painter)
{
    qDebug() << "=== generateSegurosPDF ===";
    QJsonDocument doc(m_pdfData);
    QString jsonStr = QString::fromUtf8(doc.toJson(QJsonDocument::Indented));
    qDebug() << "m_pdfData (JSON):";
    qDebug().noquote() << jsonStr;

    // Extract data from m_pdfData
    const QJsonObject header = m_pdfData["header"].toObject();
    const QJsonObject seller = header["seller"].toObject();
    const QJsonObject buyer = header["buyer"].toObject();

    // Create and populate SegurosInvoiceData
    SegurosInvoiceData data;

    // Seller (insurance company) information
    data.sellerCompany = seller["company"].toString("Seguradora");
    data.sellerAddress = seller["address"].toString("");
    data.sellerVAT = seller["VAT"].toString("");

    // Buyer (customer) information
    data.buyerCompany = buyer["company"].toString("Cliente");
    data.buyerAddress = buyer["address"].toString("");
    data.buyerVAT = buyer["VAT"].toString("");

    // Document information
    data.number = header["number"].toString("");
    data.date = header["date"].toString(QDate::currentDate().toString("dd/MM/yyyy"));
    data.endDate = header["endDate"].toString("");
    data.apolice = header["apolice"].toString("");
    data.currentDate = header["currentDate"].toString(QDate::currentDate().toString("dd/MM/yyyy"));
    data.receiptType = header["receiptType"].toString("");

    // Insurance details
    data.ramo = header["ramo"].toString("");
    data.matricula = header["matricula"].toString("");
    data.marca = header["marca"].toString("");

    // Premium and charges
    data.premio = header["premio"].toDouble(0.0);
    data.total = header["total"].toDouble(0.0);
    data.impostoSelo = header["impostoSelo"].toDouble(0.0);
    data.inem = header["inem"].toDouble(0.0);
    data.fat = header["fat"].toDouble(0.0);
    data.fga = header["fga"].toDouble(0.0);
    data.cartaVerde = header["cartaVerde"].toDouble(0.0);
    data.encargosLegais = header["encargosLegais"].toDouble(0.0);
    data.encargos = header["encargos"].toDouble(0.0);
    data.bombeiros = header["bombeiros"].toDouble(0.0);
    data.agravamento = header["agravamento"].toDouble(0.0);
    data.taxaGestao = header["taxaGestao"].toDouble(0.0);

    data.percentImpostoSelo = header["percentImpostoSelo"].toDouble(0.0);
    data.percentInem = header["percentInem"].toDouble(0.0);
    data.percentBombeiros = header["percentBombeiros"].toDouble(0.0);
    data.percentFAT = header["percentFAT"].toDouble(0.0);
    data.percentFGA = header["percentFGA"].toDouble(0.0);

    // Tax information
    data.atcudCode = header["atcud"].toString("");
    data.qrCodeData = computeInvoiceQRCode(m_pdfData);

    // Create PDFSegurosInvoice generator and generate the PDF
    PDFSegurosInvoice generator(painter, data);
    generator.generate();
}

void PDFController::generateAlfandegaPDF(QPainter &painter)
{
    qDebug() << "=== generateAlfandegaPDF ===";
    QJsonDocument doc(m_pdfData);
    QString jsonStr = QString::fromUtf8(doc.toJson(QJsonDocument::Indented));
    qDebug() << "m_pdfData (JSON):";
    qDebug().noquote() << jsonStr;

    // Create and populate AlfandegaInvoiceData
    AlfandegaInvoiceData data;

    // Extract data from m_pdfData
    const QJsonObject header = m_pdfData["header"].toObject();
    const QJsonObject shipper = header["shipper"].toObject();
    const QJsonObject consignee = header["consignee"].toObject();
    const QJsonObject declarant = header["declarant"].toObject();

    // Destination customs authority
    data.customsAuthority = header["customsAuthority"].toString("Alfândega do Aeroporto do Porto");

    // Shipper/Exporter information
    data.shipperNumber = shipper["number"].toString("NA");
    data.shipperCompany = shipper["company"].toString("MD TECH ENTERPRISES LIMITED");
    data.shipperAddress = shipper["address"].toString("FLAT C, 23FL, LUCKY PLAZA");
    data.shipperCountry = shipper["country"].toString("Hong Kong");

    // Consignee/Receiver information
    data.consigneeNumber = consignee["number"].toString("PT513014438");
    data.consigneeCompany = consignee["company"].toString("SMOOTHPURPLE-SCIENCE & ENGINEERING LDA");
    data.consigneeAddress = consignee["address"].toString("RUA DE PICOTO N 127");
    data.consigneePostalCode = consignee["postalCode"].toString("4760-083");
    data.consigneeCountry = consignee["country"].toString("Portugal");

    // Declarant/Representative information
    data.declarantNumber = declarant["number"].toString("PT980112664");
    data.declarantCompany = declarant["company"].toString("DHL AVIATION NV/SA SUCRUSAL");
    data.declarantAddress = declarant["address"].toString("AEROPORTO DE LISBOA RUA C EDIFICIO 69 3 GAB 306 308");
    data.declarantPostalCode = declarant["postalCode"].toString("1700-008");
    data.declarantCountry = declarant["country"].toString("Portugal");

    // Reference
    data.shipperNumber = header["referenceNumber"].toString("CE 1509014");

    // Countries
    data.originCountry = header["originCountry"].toString("CN");
    data.destinationCountry = header["destinationCountry"].toString("PT");
    data.departureCountry = header["departureCountry"].toString("HK");

    // Transport
    data.transportMode = header["transportMode"].toString("4");
    data.inlandTransportMode = header["inlandTransportMode"].toString("4");
    data.deliveryTerms = header["deliveryTerms"].toString("DDU VILA NOVA DE FAMALICAO");

    // Transaction
    data.transactionNature = header["transactionNature"].toString("90");

    // Currency
    data.currency = header["currency"].toString("USD");
    data.invoicedAmount = header["invoicedAmount"].toString("196.98");
    data.exchangeRate = header["exchangeRate"].toString("1.0897");

    // Goods
    data.containerCount = header["containerCount"].toString("1");
    data.containerTypes = header["containerTypes"].toString("CT (Carton)");
    data.goodsDescription = header["goodsDescription"].toString("1 LETREIRO OUTROS MOTORES ELÉTRICOS");
    data.goodsLocation = header["goodsLocation"].toString("DTP00000473020PT");
    data.entryCustomsAuthority = header["entryCustomsAuthority"].toString("Alfândega do Aeroporto do Porto");
    data.grossWeight = header["grossWeight"].toString("1.7");
    data.netWeight = header["netWeight"].toString("1.615");
    data.statisticalValue = header["statisticalValue"].toString("180.77");

    // Commodity
    data.commodityCode = header["commodityCode"].toString("85011091");
    data.preference = header["preference"].toString("100");
    data.regime = header["regime"].toString("4000");
    data.supplementaryUnits = header["supplementaryUnits"].toString("3");
    data.specialReferences = header["specialReferences"].toString("N740 8224270530 de 2025-04-23; BEAEOF0000012GDV de 2017-12-21");

    // Tax information
    data.dutyType = header["dutyType"].toString("A00");
    data.dutyBase = header["dutyBase"].toString("180.77");
    data.dutyRate = header["dutyRate"].toString("0.027");
    data.dutyAmount = header["dutyAmount"].toString("4.88");

    data.vatType = header["vatType"].toString("800");
    data.vatBase = header["vatBase"].toString("196.86");
    data.vatRate = header["vatRate"].toString("0.23");
    data.vatAmount = header["vatAmount"].toString("45.28");

    // Accounting
    data.invoiceReference = header["invoiceReference"].toString("DF 50.16€");
    data.invoiceDate = header["invoiceDate"].toString("2025-05-15");
    data.totalTaxes = header["totalTaxes"].toString("50.16");

    // Control
    data.controlResult = header["controlResult"].toString("NSTIMP");
    data.controlAuthorization = header["controlAuthorization"].toString("Aut. Saida");
    data.controlDate = header["controlDate"].toString("2025-04-24");

    // Create PDFAlfandega generator and generate the PDF
    PDFAlfandega generator(painter, data);
    generator.generate();
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
    data.documentType = "Fatura-Recibo IS / 2025"; // Can be customized

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
    /* 
    m_pdfData (JSON):
{
    "header": {
        "buyer": {
            "VAT": "525000194",
            "address": "R. Elias Garcia n║ 74 \n1234-987 Barcelos ",
            "company": "Sigma Delta Aero, Lda",
            "country": "Portugal",
            "countryCode": "PT"
        },
        "contract": "CT3421193293",
        "number": "FR /407488",
        "seller": {
            "CapitalSocial": "5.000.000Ç",
            "Conservatoria": "Barcelos",
            "VAT": "530004585",
            "address": "Rua do Ipca, 10",
            "company": "Banco Ipca, Lda",
            "country": "Portugal",
            "countryCode": "PT"
        }
    },
    "id": 5,
    "installmentData": {
        "IS": 0.556478652287177,
        "dueDate": "22/05/2026",
        "installmentNumber": 3,
        "interest": 139.11966307179424,
        "monthlyPayment": 8423.886728410296,
        "principal": 8284.767065338501,
        "remainingPrincipal": 75187.03077773805
    }
}
    */
    qDebug() << "=== generateEmprestimoPrestacaoPDF ===";
    QJsonDocument doc(m_pdfData);
    QString jsonStr = QString::fromUtf8(doc.toJson(QJsonDocument::Indented));
    qDebug() << "m_pdfData (JSON):";
    qDebug().noquote() << jsonStr;

    // Extract data from m_pdfData
    const QJsonObject header = m_pdfData["header"].toObject();
    const QJsonObject seller = header["seller"].toObject();
    const QJsonObject buyer = header["buyer"].toObject();
    const QJsonObject installmentData = m_pdfData["installmentData"].toObject();
    const QJsonObject isData = installmentData["IS"].toObject();

    // Create and populate LoanInstallmentInvoiceData
    LoanInstallmentInvoiceData data;

    // Bank (seller) information
    data.bankName = seller["company"].toString("");
    data.bankAddress = seller["address"].toString("");
    //data.bankPostalCode = seller["postalCode"].toString("CCCCCCC");
    data.bankTaxNumber = seller["VAT"].toString("");
    data.bankCapital = seller["CapitalSocial"].toString("");
    data.bankRegistry = seller["Conservatoria"].toString("");

    // Document information
    data.documentNumber = header["number"].toInt(0);
    data.paymentMethod = "Débito Direto"; // Default or from header
    data.paymentCondition = "Pronto Pagamento";
    data.documentType = header["type"].toString("Fatura-Recibo FB 2025/"); // Can be customized

    // Customer (buyer) information
    data.customerTaxNumber = buyer["VAT"].toString("");
    data.customerName = buyer["company"].toString("");
    data.customerAddress = buyer["address"].toString("");
    // data.customerPostalCode = buyer["postalCode"].toString("KKKKKKKKKKKK");

    // Contract information
    data.contractNumber = header["contract"].toString("");
    data.contractDate = QDate::fromString(header["date"].toString(), "dd/MM/yyyy");
    data.dueDateFrom = QDate::fromString(installmentData["dueDateFrom"].toString(), "dd/MM/yyyy");
    data.dueDateTo = QDate::fromString(installmentData["dueDateTo"].toString(), "dd/MM/yyyy");

    // Currency and exchange
    data.currency = "EUR";
    data.exchangeRate = 1.0;

    // Installment information
    data.installmentNumber = installmentData["installmentNumber"].toInt(0);
    data.installmentAmount = installmentData["monthlyPayment"].toDouble();
    data.principal = installmentData["principal"].toDouble();
    data.interest = installmentData["interest"].toDouble();
    data.stampDuty = installmentData["IS"].toDouble();
    data.processingCommission = installmentData["processingCommission"].toDouble();
    data.commissionStampDuty = installmentData["commissionStampDuty"].toDouble();
    
    data.vat = 0.00;
    data.totalAmount = installmentData["totalAmount"].toDouble();

    // VAT information
    data.vatRate = "0%";

    // Additional information
    data.exemptionReason = "Não sujeito";

    // Create PDFLoanInstallmentInvoice generator and generate the PDF
    PDFLoanInstallmentInvoice generator(painter, data);
    generator.generate();
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
    case VENDA: generateBuySellInvoicePDF(painter); break;
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

// TODO para remover
QString PDFController::getPdfAsBase64() const {
    if (m_currentPdfData.isEmpty()) {
        return QString();
    }
    return QString(m_currentPdfData.toBase64());
}
