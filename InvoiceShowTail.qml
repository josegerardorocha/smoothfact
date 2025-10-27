import QtQuick
import QtQuick.Layouts
import "customcontrols"

ColumnLayout{
    Layout.fillWidth: true
    spacing: 4
    property var headerData : null
    property var rowModel : null
    // property int totalUpdate: 0
    property int nrows: rowModel.count

    // onHeaderDataChanged: {
    //     console.log("++++++++++++++++++ InvoiceShowTail onHeaderDataChanged", JSON.stringify(headerData))
    //     updateTotals()
    // }
    // onRowModelChanged: {
    //     console.log("++++++++++++++++++ InvoiceShowTail onRowModelChanged", JSON.stringify(rowModel))
    //     updateTotals()
    // }
    onNrowsChanged: {
        for(let i=0; i<rowModel.count; i++){
            let row = rowModel.get(i)
            console.log("++++++++++++++++++ InvoiceShowTail onNrowsChanged", JSON.stringify(row))
        }
        updateTotals()
    }

    function updateTotals(){
        if(headerData && rowModel){
            let subtotal = 0.0
            let totalDiscount = 0.0
            let totalVat = 0.0
            let motivoIsencao =  rowModel.get(0).motivoIsencao
            for(let i=0; i<rowModel.count; i++){
                let row = rowModel.get(i)

                // "designacao":"mot",
                // "quantidade":1,
                // "preco":24,
                // "desconto":0,
                // "iva":23,
                // "total":29.52,


                let lineTotal = row.quantidade * row.preco
                let lineDiscount = lineTotal * (row.desconto / 100.0)
                let lineVat = (lineTotal - lineDiscount) * (row.iva / 100.0)
                subtotal += lineTotal
                totalDiscount += lineDiscount
                totalVat += lineVat
            }
            // let vatRate = headerData.vatRate ? headerData.vatRate : 0.0
            // let vatAmount = (subtotal - totalDiscount) * (vatRate / 100.0)
            let total = subtotal - totalDiscount + totalVat

            subtotalText.text = "Subtotal: " + subtotal.toFixed(2) + " €"
            discountText.text = "Desconto: " + totalDiscount.toFixed(2) + " €"
            vatText.text = "IVA: " + (motivoIsencao !== "" ? ("Isento " + motivoIsencao) : (totalVat.toFixed(2) + " €") )
            totalText.text = "<b>Total: " + total.toFixed(2) + " €</b>"
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
