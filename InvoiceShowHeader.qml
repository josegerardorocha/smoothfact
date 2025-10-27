import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import "customcontrols"

ColumnLayout {  // Header
    Layout.fillWidth: true
    spacing: 4
    visible: headerData ? true : false
    //visible: header.text !== ""
    property  var headerData : null
    signal clearAll()

    onHeaderDataChanged: {
        //console.log("++++++++++++++++++ GridLayout onHeaderDataChanged", JSON.stringify(headerData))
        if(headerData){
            sellerText.text = formatHTMLCustomer("Fornecedor", headerData.seller)
            buyerText.text = formatHTMLCustomer("Cliente", headerData.buyer)
            dateInvoiceText.text = formatHTMLDateNumber(headerData.date, headerData.number)
        }
    }

    function formatHTMLCustomer(header, customer){
        // console.log("++++++++++++++++++ formatHTMLCustomer", JSON.stringify(customer))
        let text = "<b>" + header + ":</b><br>"
                + customer.company + "<br>"
                + customer.address + "<br>"
                + customer.country + "<br>"
                + "<b>NIF: </b>"+ customer.VAT
        // console.log("++++++++++++++++++ formatHTMLCustomer text", text)
        return text
    }
    function formatHTMLDateNumber(date, number){
        //console.log("++++++++++++++++++ formatHTMLDate", JSON.stringify(date))
        return "<b>Data: </b>" + date.day + "/" + date.month + "/" + date.year + "<br>"
            + "<font pointSize='18'><b>Fatura número:</b> " + number + "</font>"
    }
    GridLayout {
        id: grid
        Layout.fillWidth: true
        columns: 3
        columnSpacing: 12
        rowSpacing: 8
        clip: true
        // Component.onCompleted: {
        //     console.log("++++++++++++++++++ GridLayout onCompleted", JSON.stringify(headerData))
        // }
        // row 0
        Text{
            id: sellerText
            Layout.fillWidth: true
            Layout.preferredWidth: 3
            textFormat: Text.RichText
            //text: "<b>Fornecedor:</b><br>" + headerData ?? formatHTMLCustomer(headerData.seller)
            //font.bold: true
        }
        Text{
            id: dateInvoiceText
            Layout.fillWidth: true
            Layout.preferredWidth: 3
            textFormat: Text.RichText
            // text: "<b>Data:</b><br>" + headerData ?? formatHTMLDate(headerData.date)
            //       + "<br><b>Fatura número:</b> " + headerData ?? headerData.invoiceNumber
            //font.bold: true
        }
        Item{
            Layout.fillWidth: true
            Layout.preferredWidth: 1
        }
        // row 1
        Item{
            Layout.fillWidth: true
            Layout.preferredWidth: 3
        }
        Text{
            id: buyerText
            Layout.fillWidth: true
            Layout.preferredWidth: 3
            textFormat: Text.RichText
            //text: "<b>Cliente:</b><br>" + headerData ?? formatHTMLCustomer(headerData.buyer)
            //font.bold: true
        }
        CustomButton {
            Layout.fillWidth: true
            Layout.preferredWidth: 1
            text: "Apagar"
            onClicked: clearAll()
            Layout.alignment: Qt.AlignBottom
        }
    }

    // Divider line
    Rectangle {
        Layout.fillWidth: true
        height: 1
        color: "#DDDDDD"
    }
}
