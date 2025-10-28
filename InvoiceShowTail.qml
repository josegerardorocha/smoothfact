import QtQuick
import QtQuick.Layouts
import "customcontrols"

ColumnLayout{
    Layout.fillWidth: true
    spacing: 4
    // property var headerData: null
    // property var rowModel:   null
    property var totalsData: null
    // property int totalUpdate: 0
    //property int nrows: rowModel.count

    // onHeaderDataChanged: {
    //     console.log("++++++++++++++++++ InvoiceShowTail onHeaderDataChanged", JSON.stringify(headerData))
    //     updateTotals()
    // }
    // onRowModelChanged: {
    //     console.log("++++++++++++++++++ InvoiceShowTail onRowModelChanged", JSON.stringify(rowModel))
    //     updateTotals()
    // }
    // onNrowsChanged: {
    //     for(let i=0; i<rowModel.count; i++){
    //         let row = rowModel.get(i)
    //         console.log("++++++++++++++++++ InvoiceShowTail onNrowsChanged", JSON.stringify(row))
    //     }
    //     updateTotals()
    // }
    onTotalsDataChanged: {
        console.log("++++++++++++++++++ InvoiceShowTail onTotalsDataChanged", JSON.stringify(totalsData))
        updateTotals()
    }

    function updateTotals(){
        if(totalsData){
            subtotalText.text = "Subtotal: " + totalsData.totalSemIva.toFixed(2) + " €"
            discountText.text = "Desconto: " + totalsData.descontoTotal.toFixed(2) + " €"
            vatText.text = "IVA: " + totalsData.totalDeIva.toFixed(2) + " €"
            totalText.text = "<b>Total: " + totalsData.totalGeral.toFixed(2) + " €</b>"
        }
    }

    Text{
        id: subtotalText
        Layout.fillWidth: true
        Layout.alignment: Qt.AlignRight
        textFormat: Text.RichText
        text: "Subtotal: 0.00 €"
        font.pointSize: 12
        color: "#333"
    }
    Text{
        id: discountText
        Layout.fillWidth: true
        Layout.alignment: Qt.AlignRight
        textFormat: Text.RichText
        text: "Desconto: 0.00 €"
        font.pointSize: 12
        color: "#333"
    }
    Text{
        id: vatText
        Layout.fillWidth: true
        Layout.alignment: Qt.AlignRight
        textFormat: Text.RichText
        text: "IVA (0.00%): 0.00 €"
        font.pointSize: 12
        color: "#333"
    }
    Text {
        id: totalText
        Layout.fillWidth: true
        Layout.alignment: Qt.AlignRight
        textFormat: Text.RichText
        text: "<b>Total: 0.00 €</b>"
        font.pointSize: 12
        color: "#333"
    }
}
