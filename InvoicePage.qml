import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
//import QtQuick.Pdf
import Smoothfact

Rectangle {
    color: "white"
    //anchors.fill: parent
    Layout.fillWidth: true
    Layout.fillHeight: true
    property string username: "User"

    function formatCustomer(country, company, address, vat){
        return "<b>Company: </b>" + company + "<br>" +
               "<b>Address: </b>" + address + "<br>" +
               "<b>Country: </b>" + country + "<br>" +
               "<b>VAT: </b>"     + vat
    }
    function formatDateAndNumber(){
        let today = new Date()
        let day = String(today.getDate()).padStart(2, '0')
        let month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-based
        let year = today.getFullYear()
        let formattedDate = day + "/" + month + "/" + year
        let invoiceNumber = Math.floor(Math.random() * 900000) + 100000 // Random 6-digit number
        return "<b>Date: </b>" + formattedDate + "<br>" +
               "<b>Invoice Number: </b> " + invoiceNumber
    }

    function updateShowDataHeader(isCompra, country, company, address, vat){
        console.log("InvoicePage.qml: updateShowDataHeader called")
        let c1 = formatCustomer(country, company, address, vat)
        let c2 = formatCustomer("Portugal", CompanyData.name, CompanyData.address, CompanyData.nif)
        let buyer = isCompra ? c2 : c1
        let seller = isCompra ? c1 : c2
        showData.header =
                "<html>"
                + "<body style=\"font-family: sans-serif; font-size: 14px;\">"
                + "<table cellspacing=\"0\" cellpadding=\"6\" width=\"100%\">"
                + "    <tr>"
                + "        <td width=\"50%\"><b>Supplier:</b><br>" + seller + "</td>"
                + "        <td width=\"50%\">" + formatDateAndNumber() + "</td>"
                + "    </tr>"
                + "    <tr>"
                + "        <td></td>"
                + "        <td width=\"50%\"><b>Customer:</b><br>" + buyer + "</td>"
                + "    </tr>"
                + "</table>"
                + "</body>"
                + "</html>"
        console.log("showData.header", showData.header)
    }
    // RemotePdfRenderer {
    //     id: pdfRenderer
    //     onPageCountChanged: {
    //         console.log("++++++++++ Page count changed:", pageCount)
    //         viewer.visible = pageCount > 0
    //     }
    //     onDownloadProgress: (bytesReceived, bytesTotal) => {
    //                             console.log("++++++++++++++ Download progress:", bytesReceived, "bytes of", bytesTotal)
    //                         }
    //     onCurrentPageChanged: {
    //         console.log("++++++++++++++ Current page changed:", currentPage)
    //     }
    // }

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
        InvoiceForm{
            Layout.fillWidth: true
            Layout.fillHeight: true
            onAddHeader: (isCompra, countryCode, company, address, vat) => {
                             console.log("InvoicePage.qml: Received addHeader signal from InvoiceForm")
                             //showData.header = company
                             //showData.visible = true
                updateShowDataHeader(isCompra, countryCode, company, address, vat)
            }
        }
        InvoiceShowData{
            id: showData
            Layout.fillWidth: true
            Layout.fillHeight: true
            visible: true
            onGeneratePdf: {
                pdfRenderer.urlToLoad = "http://localhost/faturas/backend/invoice.php?user=" + username
                imgPdfProvider.renderer = pdfRenderer
            }
        }
        InvoiceShowPDF {
            id: viewer
            Layout.fillWidth: true
            Layout.fillHeight: true
            //renderer: pdfRenderer
            visible: false
        }
    }
}

