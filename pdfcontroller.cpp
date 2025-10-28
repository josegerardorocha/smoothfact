#include "pdfcontroller.h"
//#include "pdfimageProvider.h"
#include <QPdfWriter>
// #include <QPainter>
#include <QBuffer>
// #include <QDebug>
// #include <QDateTime>
#include <QJsonArray>
#include <QFile>
// Simple QR generator using Nayuki’s library
// (Download https://github.com/nayuki/QR-Code-generator and include QrCode.hpp)
#include "qrcode.h"
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

void PDFController::generateSamplePDF() {

    const QJsonObject header = m_pdfData["header"].toObject();
    const QJsonObject totals = m_pdfData["totais"].toObject();
    auto isZero = [](double x) {
        constexpr double tol = 1e-6;
        return std::fabs(x) < tol;
    };

    QByteArray pdfData;
    QBuffer buffer(&pdfData);
    buffer.open(QIODevice::WriteOnly);

    // Create PDF writer
    QPdfWriter writer(&buffer);
    writer.setPageSize(QPageSize::A4);
    writer.setResolution(150);
    writer.setTitle(header["number"].toString());
    writer.setCreator("SmoothFact by SmoothPurple");

    // Get page rect for drawing
    QPainter painter(&writer);
    QRect pageRect = painter.viewport();

    // Page 1
    qDebug() << m_pdfData;
    painter.fillRect(pageRect, Qt::white);

    QFont titleFont("Arial", 24, QFont::Bold);
    painter.setFont(titleFont);
    painter.setPen(Qt::black);
    painter.drawText(100, 200, header["seller"].toObject()["company"].toString());

    QFont normalFont("Arial", 12);
    painter.setFont(normalFont);
    painter.drawText(100, 240, header["seller"].toObject()["address"].toString());
    painter.drawText(100, 270, header["seller"].toObject()["country"].toString());
    painter.drawText(100, 300, "NIF: " + header["seller"].toObject()["VAT"].toString());

    // number and date
    painter.drawText(720, 270, header["number"].toString());
    painter.drawText(720, 300, header["date"].toString());

    // buyer info
    painter.drawText(720, 390, header["buyer"].toObject()["company"].toString());
    painter.drawText(720, 420, header["buyer"].toObject()["address"].toString());
    painter.drawText(720, 450, header["buyer"].toObject()["country"].toString());
    painter.drawText(720, 480, "NIF: " + header["buyer"].toObject()["VAT"].toString());

    // line
    QFont smallArialFont("Arial", 10);
    painter.setFont(smallArialFont);
    int right=pageRect.width() - 100;
    QRect tipoRect      (100, 540, 80,  30);
    QRect designacaoRect(170, 540, 380, 30);
    QRect qtdRect       (right-510, 540, 80,  30);
    QRect precoRect     (right-400, 540, 100, 30);
    QRect descRect      (right-260, 540, 80,  30);
    QRect ivaRect       (right-180, 540, 80,  30);
    QRect totalRect     (right-100, 540, 100, 30);
    painter.drawText(tipoRect,       Qt::AlignLeft  | Qt::AlignVCenter, "Tipo");
    painter.drawText(designacaoRect, Qt::AlignLeft  | Qt::AlignVCenter, "Designação");
    painter.drawText(qtdRect,        Qt::AlignRight | Qt::AlignVCenter, "Quant.");
    painter.drawText(precoRect,      Qt::AlignRight | Qt::AlignVCenter, "Preço");
    painter.drawText(descRect,       Qt::AlignRight | Qt::AlignVCenter, "Desc.");
    painter.drawText(ivaRect,        Qt::AlignRight | Qt::AlignVCenter, "IVA");
    painter.drawText(totalRect,      Qt::AlignRight | Qt::AlignVCenter, "Total");
    painter.setPen(QPen(Qt::black, 1));
    //painter.setBrush(QBrush(Qt::lightGray));
    painter.drawLine(100, 575, pageRect.width() - 100, 575);
    // rows
    QJsonArray rowsArray = m_pdfData["rows"].toArray();
    int y = 575;
    int rowHeight = 30;
    // QFont smallFont("Courier New", 10);  // monospace helps alignment visually
    painter.setFont(smallArialFont);
    QChar alineaIsencao('a');
    for(const QJsonValue &value : std::as_const(rowsArray)){
        QJsonObject row = value.toObject();

        QRect tipoRect      (100, y, 80,  rowHeight);
        QRect designacaoRect(170, y, 380, rowHeight);
        QRect qtdRect       (right-510, y, 80,  rowHeight);
        QRect precoRect     (right-400, y, 100, rowHeight);
        QRect descRect      (right-260, y, 80,  rowHeight);
        QRect ivaRect       (right-180, y, 80,  rowHeight);
        QRect totalRect     (right-100, y, 100, rowHeight);

        // Left-aligned text
        painter.drawText(tipoRect, Qt::AlignLeft | Qt::AlignVCenter, row["tipo"].toString());
        painter.drawText(designacaoRect, Qt::AlignLeft | Qt::AlignVCenter, row["designacao"].toString());

        // Right-aligned numbers
        painter.drawText(qtdRect, Qt::AlignRight | Qt::AlignVCenter,
                         QString::number(row["quantidade"].toDouble(), 'f', 0));

        painter.drawText(precoRect, Qt::AlignRight | Qt::AlignVCenter,
                         QString("%1€").arg(row["preco"].toDouble(), 8, 'f', 2, QChar(' ')));

        painter.drawText(descRect, Qt::AlignRight | Qt::AlignVCenter,
                         QString("%1%").arg(row["desconto"].toDouble(), 8, 'f', 2, QChar(' ')));

        QString ivaText;
        if(isZero(row["iva"].toDouble())){
            ivaText = QString("%1%") + "(" + alineaIsencao + ")";
            alineaIsencao = QChar(alineaIsencao.unicode() + 1);
        }
        else
            ivaText = QString("%1%");

        painter.drawText(ivaRect, Qt::AlignRight | Qt::AlignVCenter,
                         ivaText.arg(row["iva"].toDouble(), 3, 'f', 0, QChar(' ')));

        painter.drawText(totalRect, Qt::AlignRight | Qt::AlignVCenter,
                         QString("%1€").arg(row["total"].toDouble(), 8, 'f', 2, QChar(' ')));

        y += rowHeight;
    }

    alineaIsencao = 'a';
    int isencoesY = y + rowHeight;
    for(const QJsonValue &value : std::as_const(rowsArray)){
        QJsonObject row = value.toObject();
        if(isZero(row["iva"].toDouble())){
            painter.drawText(100, isencoesY, QString("(") + alineaIsencao + ") - " +
                                                 row["motivoIsencao"].toString());
            alineaIsencao = QChar(alineaIsencao.unicode() + 1);
            isencoesY += rowHeight;
        }
    }
    // // Draw some shapes
    // painter.setPen(QPen(Qt::blue, 3));
    // painter.setBrush(QBrush(Qt::lightGray));
    // painter.drawRect(100, 450, 200, 100);

    // painter.setPen(QPen(Qt::red, 3));
    // painter.setBrush(QBrush(Qt::yellow));
    // painter.drawEllipse(350, 450, 150, 150);

    painter.drawLine(100,  y, pageRect.width() - 100, y);
    y+=10;
    QRect totalSemIva   (right-380, y, 280, rowHeight);
    QRect totalSemIvaVal(right-100, y, 100, rowHeight);
    y+=rowHeight;
    QRect desconto      (right-380, y, 280, rowHeight);
    QRect descontoVal   (right-100, y, 100, rowHeight);
    y+=rowHeight;
    QRect valorDeIva    (right-380, y, 280, rowHeight);
    QRect valorDeIvaVal (right-100, y, 100, rowHeight);
    y+=rowHeight;
    QRect totalComIva   (right-380, y, 280,  rowHeight);
    QRect totalComIvaVal(right-100, y, 100,  rowHeight);
    painter.drawText(totalSemIva,    Qt::AlignRight  | Qt::AlignVCenter, "Total sem IVA:");
    painter.drawText(desconto,       Qt::AlignRight  | Qt::AlignVCenter, "Desconto:");
    painter.drawText(valorDeIva,     Qt::AlignRight  | Qt::AlignVCenter, "Valor de IVA:");
    painter.drawText(totalComIva,    Qt::AlignRight  | Qt::AlignVCenter, "Total com IVA:");

    qDebug() << "----Totals: " << totals;
    qDebug() << "----header: " << header;
    painter.drawText(totalSemIvaVal, Qt::AlignRight  | Qt::AlignVCenter,
                     QString("%1€").arg(totals["totalSemIva"].toDouble(),   8, 'f', 2, QChar(' ')));
    painter.drawText(descontoVal,    Qt::AlignRight  | Qt::AlignVCenter,
                     QString("%1€").arg(totals["descontoTotal"].toDouble(), 8, 'f', 2, QChar(' ')));
    painter.drawText(valorDeIvaVal,  Qt::AlignRight  | Qt::AlignVCenter,
                     QString("%1€").arg(totals["totalDeIva"].toDouble(),    8, 'f', 2, QChar(' ')));
    painter.drawText(totalComIvaVal, Qt::AlignRight  | Qt::AlignVCenter,
                     QString("%1€").arg(totals["totalGeral"].toDouble(),    8, 'f', 2, QChar(' ')));


    // Generate and draw QR code
    int qrcodeX = pageRect.width()*2/3;
    painter.setFont(smallArialFont);
    QString qrs = computeInvoiceQRCode(m_pdfData);
    QImage qr = generateQrCode(qrs);
    y = pageRect.height() - 100 - qr.height();
    painter.drawImage(QPointF(qrcodeX + 50, y), qr);

    QRect atcudRect(qrcodeX+50, y - rowHeight, qr.width(), rowHeight);
    painter.drawText(atcudRect, Qt::AlignCenter | Qt::AlignVCenter,
                     "ATCUD: " + header["atcud"].toString());

    // Resumo do IVA
    painter.drawText(100, y, "Resumo do IVA");
    y+=10;
    painter.drawLine(100, y, qrcodeX, y);
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

    QRect taxaIva(120, y, 80, rowHeight);
    QRect baseIva(qrcodeX/2, y, 100, rowHeight);
    QRect valorIva(qrcodeX - 120, y, 100, rowHeight);
    painter.drawText(taxaIva,    Qt::AlignRight  | Qt::AlignVCenter, "Taxa IVA");
    painter.drawText(baseIva,    Qt::AlignRight  | Qt::AlignVCenter, "Valor base");
    painter.drawText(valorIva,   Qt::AlignRight  | Qt::AlignVCenter, "Valor IVA");
    y+=rowHeight;
    for(int i=0; i<4; ++i){
        if(!isZero(baseesIva[i])){
            QRect taxaIvaVal(120, y, 80, rowHeight);
            QRect baseIvaVal(qrcodeX/2, y, 100, rowHeight);
            QRect valorIvaVal(qrcodeX - 120, y, 100, rowHeight);

            painter.drawText(taxaIvaVal,  Qt::AlignRight  | Qt::AlignVCenter,
                             QString("%1%").arg(taxasIva[i], 3, 'f', 0, QChar(' ')));
            painter.drawText(baseIvaVal,  Qt::AlignRight  | Qt::AlignVCenter,
                             QString("%1€").arg(baseesIva[i], 8, 'f', 2, QChar(' ')));
            double valorIvaCalc = baseesIva[i] * taxasIva[i] / 100.0;
            painter.drawText(valorIvaVal, Qt::AlignRight  | Qt::AlignVCenter,
                             QString("%1€").arg(valorIvaCalc, 8, 'f', 2, QChar(' ')));
            y+=rowHeight;
        }
    }
    painter.drawLine(100, y, qrcodeX, y);
    y += rowHeight;
    painter.drawText(100, y, "0r9y - Processado por programa não certificado - SmoothFact");
    y += rowHeight;
    painter.drawText(100, y, "Serve apenas para fins educativos.");



    // // Page 2
    // writer.newPage();
    // painter.fillRect(pageRect, Qt::white);

    // painter.setFont(titleFont);
    // painter.setPen(Qt::darkBlue);
    // painter.drawText(100, 200, "Page 2 - Charts");

    // // Draw a simple bar chart
    // painter.setFont(normalFont);
    // painter.setPen(Qt::black);
    // painter.drawText(100, 300, "Sample Bar Chart:");

    // int barWidth = 60;
    // int barSpacing = 80;
    // int startX = 100;
    // int baseY = 600;

    // QStringList labels = {"Q1", "Q2", "Q3", "Q4"};
    // QList<int> values = {120, 200, 150, 250};
    // QList<QColor> colors = {Qt::red, Qt::green, Qt::blue, Qt::magenta};

    // for (int i = 0; i < labels.size(); ++i) {
    //     int x = startX + i * barSpacing;
    //     int height = values[i];

    //     painter.fillRect(x, baseY - height, barWidth, height, colors[i]);
    //     painter.setPen(Qt::black);
    //     painter.drawText(x + barWidth/2 - 10, baseY + 30, labels[i]);
    //     painter.drawText(x + barWidth/2 - 15, baseY - height - 10, QString::number(values[i]));
    // }

    // // Page 3
    // writer.newPage();
    // painter.fillRect(pageRect, Qt::white);

    // painter.setFont(titleFont);
    // painter.setPen(Qt::darkGreen);
    // painter.drawText(100, 200, "Page 3 - Table");

    // // Draw a simple table
    // painter.setFont(normalFont);
    // painter.setPen(QPen(Qt::black, 1));

    // int tableX = 100;
    // int tableY = 300;
    // int cellWidth = 150;
    // int cellHeight = 40;
    // int rows = 5;
    // int cols = 3;

    // QStringList headers = {"Name", "Value", "Status"};
    // QVector<QStringList> data = {
    //     {"Item 1", "100", "Active"},
    //     {"Item 2", "200", "Pending"},
    //     {"Item 3", "150", "Active"},
    //     {"Item 4", "75", "Inactive"}
    // };

    // // Draw headers
    // painter.fillRect(tableX, tableY, cellWidth * cols, cellHeight, Qt::lightGray);
    // for (int col = 0; col < cols; ++col) {
    //     painter.drawRect(tableX + col * cellWidth, tableY, cellWidth, cellHeight);
    //     painter.drawText(tableX + col * cellWidth + 10, tableY + 25, headers[col]);
    // }

    // // Draw data
    // for (int row = 0; row < data.size(); ++row) {
    //     for (int col = 0; col < cols; ++col) {
    //         int x = tableX + col * cellWidth;
    //         int y = tableY + (row + 1) * cellHeight;
    //         painter.drawRect(x, y, cellWidth, cellHeight);
    //         painter.drawText(x + 10, y + 25, data[row][col]);
    //     }
    // }

    // // Page 4 - Text content
    // writer.newPage();
    // painter.fillRect(pageRect, Qt::white);

    // painter.setFont(titleFont);
    // painter.setPen(Qt::black);
    // painter.drawText(100, 200, "Page 4 - Text Content");

    // painter.setFont(normalFont);
    // QRect textRect(100, 250, pageRect.width() - 200, pageRect.height() - 300);
    // QString longText = "This is a demonstration of longer text content in the PDF. "
    //                    "The PDF is created entirely in memory without writing to disk. "
    //                    "This approach is useful for:\n\n"
    //                    "• Web applications that generate PDFs on-the-fly\n"
    //                    "• Embedded systems with read-only filesystems\n"
    //                    "• Cloud environments with restricted file access\n"
    //                    "• Applications requiring temporary PDF generation\n\n"
    //                    "The PDF content is stored in a QByteArray and displayed "
    //                    "using a QQuickImageProvider that renders each page as an image. "
    //                    "This provides smooth scrolling and zooming capabilities while "
    //                    "keeping everything in memory.";

    // painter.drawText(textRect, Qt::TextWordWrap | Qt::AlignLeft, longText);

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

    QString filename = "output.pdf";

    QFile file(filename);
    if (!file.open(QIODevice::WriteOnly)) {
        qWarning() << "Could not open file for writing:" << file.errorString();
        return;
    }

    qint64 bytesWritten = file.write(data);
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

void PDFController::downloadPdf(const QString &filename) {
    if (m_currentPdfData.isEmpty()) {
        qWarning() << "No PDF data to download";
        return;
    }

    QString finalFilename = filename;
    if (finalFilename.isEmpty()) {
        QString timestamp = QDateTime::currentDateTime().toString("yyyyMMdd_HHmmss");
        finalFilename = QString("document_%1.pdf").arg(timestamp);
    }

    // Convert to Base64 for JavaScript
    QString base64Data = m_currentPdfData.toBase64();

    // Emit signal that will be handled by QML/JavaScript
    emit downloadReady(base64Data, finalFilename);

    qDebug() << "PDF ready for download:" << finalFilename << "Size:" << m_currentPdfData.size();
}

QString PDFController::getPdfAsBase64() const {
    if (m_currentPdfData.isEmpty()) {
        return QString();
    }
    return QString(m_currentPdfData.toBase64());
}
