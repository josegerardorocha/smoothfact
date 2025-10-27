import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
//import QtQuick.Pdf
import Smoothfact

Rectangle {
    id: root
    color: "white"
    //anchors.fill: parent
    Layout.fillWidth: true
    Layout.fillHeight: true

    property string username: "User"

    function formatCustomer(country, company, address, vat){
        return {
            "company": company,
            "address": address,
            "country": country,
            "VAT":     vat
        }
    }
    function formatDate(today){
        let day = String(today.getDate()).padStart(2, '0')
        let month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-based
        let year = today.getFullYear()
        return {
            "day": day,
            "month": month,
            "year": year
        }
    }
    function invoiceNumber() {
        return Math.floor(Math.random() * 900000) + 100000
    }

    function updateShowDataHeader(tipoOperacao, country, company, address, vat){
        //console.log("InvoicePage.qml: updateShowDataHeader called")
        let c1 = formatCustomer(country, company, address, vat)
        let c2 = formatCustomer("Portugal", CompanyData.name, CompanyData.address, CompanyData.nif)
        let buyer = tipoOperacao ==="venda" ? c2 : c1
        let seller = tipoOperacao ==="venda" ? c1 : c2
        showData.header = {
            "tipoOperacao": tipoOperacao,
            "country": country,
            // "company": company,
            // "address": address,
            // "vat": vat,
            "buyer": buyer,
            "seller": seller,
            "date": formatDate( new Date()),
            "number": invoiceNumber()
        }
    }
    function updateAddRow(tipo, designacao, quantidade, preco, desconto, iva, total, motivoIsencao){
        console.log("InvoicePage.qml: updateAddRow called")
        let row = {
            "tipo": tipo,
            "designacao": designacao,
            "quantidade": quantidade,
            "preco": preco,
            "desconto": desconto,
            "iva": iva,
            "total": total,
            "motivoIsencao": motivoIsencao
        }
        showData.model.append(row)
    }
    RemotePdfRenderer {
        id: pdfRenderer
        onPageCountChanged: {
            console.log("++++++++++ Page count changed:", pageCount)
            viewer.visible = pageCount > 0
        }
        onDownloadProgress: (bytesReceived, bytesTotal) => {
                                console.log("++++++++++++++ Download progress:", bytesReceived, "bytes of", bytesTotal)
                            }
        onCurrentPageChanged: {
            console.log("++++++++++++++ Current page changed:", currentPage)
        }
    }

    //SplitView {
    //    id: mainSplitView
    //    anchors.fill: parent
    //    orientation: Qt.Horizontal
    //    handle: Rectangle {
    //        implicitWidth: 2
    //        implicitHeight: 2
    //    }
    RowLayout {
        anchors.fill: parent
        anchors.margins: 20
        spacing: 20
        SellInvoiceForm{
            id: sellInvoiceForm
            Layout.fillWidth: true
            Layout.fillHeight: true
            onAddHeader: (tipoOperacao, countryCode, company, address, vat) => {
                             console.log("InvoicePage.qml: Received addHeader signal from InvoiceForm")
                             updateShowDataHeader(tipoOperacao, countryCode, company, address, vat)
                         }
            onAddRow: (tipo, designacao, quantidade, preco, desconto, iva, total, motivoIsencao) => {
                          updateAddRow(tipo, designacao, quantidade, preco, desconto, iva, total, motivoIsencao)
                      }
        }
        InvoiceShowData{
            id: showData
            Layout.fillWidth: true
            Layout.fillHeight: true
            visible: true
            onGeneratePdf: {
                let postData = {
                    "username": username,
                    "header": showData.header,
                    "rows": []
                }
                for(let i=0; i< showData.model.count; i++){
                    postData.rows.push(showData.model.get(i))
                }
                console.log("Generating PDF with data:", JSON.stringify(postData))
                pdfRenderer.urlToLoad = "http://localhost/faturas/backend/invoice.php?user=" + username
                imgPdfProvider.renderer = pdfRenderer
            }
            onClearInvoiceData: {
                sellInvoiceForm.headerVisible = true
            }
        }
        InvoiceShowPDF {
            id: viewer
            Layout.fillWidth: true
            Layout.fillHeight: true
            renderer: pdfRenderer
            visible: false
        }
    }
}

