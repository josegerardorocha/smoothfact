import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import Smoothfact
import "../javascripts/formatnumber.js" as FormatNumber

Rectangle {
    id: root
    color: "white"
    //anchors.fill: parent
    Layout.fillWidth: true
    Layout.fillHeight: true

    //property string username: "User"
    property alias tipoOperacao: invoiceForm.tipoOperacao

    function formatCustomer(country, company, address, vat){
        return {
            "company": company,
            "address": address,
            "country": country,
            "VAT":     vat
        }
    }

    function updateShowDataHeader(data){
        console.log("-------------InvoicePage.qml: updateShowDataHeader called", JSON.stringify(data))
        let c1 = formatCustomer(data.country, data.company, data.address, data.nif)
        let c2 = formatCustomer("Portugal", CompanyData.name, CompanyData.address, CompanyData.nif)
        let buyer  = data.tipoOperacao === "venda" ? c1 : c2
        let seller = data.tipoOperacao === "venda" ? c2 : c1
        showData.header = {
            "tipoOperacao": data.tipoOperacao,
            "country": seller.country,
            "buyer": buyer,
            "seller": seller,
            "date": data.date,
            "number": "FT " + FormatNumber.year(data.date) + "/" + FormatNumber.randomInvoiceNumber(),
            "QType": "P/tl",
            "hash": "ABCD1234EFGH5678IJKL9012MNOP3456",
            "iban": "PT50000201231234567890154",
            "atcud": "JJRD3W6T-3",
        }
    }
    function updateAddRow(data){
        console.log("InvoicePage.qml: updateAddRow called")
        showData.model.append(data)
        showData.header.carga = data.carga
        showData.header.descarga = data.descarga
    }

    function updateTotals(){
        if(showData.header && showData.model.count > 0){
            const ivaRed = 6
            const ivaInt = 13
            const ivaNorm = 23
            let subtotal = 0.0
            let totalDiscount = 0.0
            let totalVat = 0.0
            let baseIvaIsento = 0
            let baseIvaRed = 0
            let baseIvaInt = 0
            let baseIvaNorm = 0
            //let motivoIsencao =  rowModel.get(0).motivoIsencao
            for(let i=0; i<showData.model.count; i++){
                let row = showData.model.get(i)

                let lineTotal = row.quantidade * row.preco
                let lineDiscount = lineTotal * (row.desconto / 100.0)
                let lineVat = (lineTotal - lineDiscount) * (row.iva / 100.0)
                baseIvaIsento += row.iva === 0 ? (lineTotal - lineDiscount) : 0
                baseIvaRed += row.iva > 0 && row.iva <= ivaRed ? (lineTotal - lineDiscount) : 0
                baseIvaInt += row.iva > ivaRed && row.iva <= ivaInt ? (lineTotal - lineDiscount) : 0
                baseIvaNorm += row.iva > ivaInt ? (lineTotal - lineDiscount) : 0
                subtotal += lineTotal
                totalDiscount += lineDiscount
                totalVat += lineVat
            }
            let total = subtotal - totalDiscount + totalVat

            showData.totals = {
                "totalSemIva": subtotal,
                "totalDeIva": totalVat,
                "baseIvaIsento": baseIvaIsento,
                "baseIvaRed": baseIvaRed,
                "baseIvaInt": baseIvaInt,
                "baseIvaNorm": baseIvaNorm,
                "descontoTotal": totalDiscount,
                "ivaRed": ivaRed,
                "ivaInt": ivaInt,
                "ivaNorm": ivaNorm,
                "totalGeral": total
            }
        }
    }
    StackLayout{
        anchors.fill: parent
        //anchors.margins: 20
        id: stackLayout
        // Layout.fillWidth: true
        // Layout.fillHeight: true
        RowLayout {
            Layout.fillWidth: true
            Layout.fillHeight: true
            spacing: 20
            InvoiceForm{
                id: invoiceForm
                Layout.fillWidth: true
                Layout.fillHeight: true
                tipoOperacao: root.tipoOperacao
                onAddHeader: (data) => {
                                 // console.log("InvoicePage.qml: Received addHeader signal from InvoiceForm")
                                 updateShowDataHeader(data)
                             }
                onAddRow: (data) => {
                              updateAddRow(data)
                              updateTotals()
                          }
            }
            InvoiceShowData{
                id: showData
                Layout.fillWidth: true
                Layout.fillHeight: true
                Layout.rightMargin: 10
                visible: true
                onGeneratePdf: {
                    var rows = []
                    for(let i=0; i< showData.model.count; i++){
                        rows.push(showData.model.get(i))
                    }
                    viewer.pdfData = {
                        "id": PDFController.VENDA,
                        "header": showData.header,
                        "totais": showData.totals,
                        "rows": rows
                    }
                    stackLayout.currentIndex = 1
                    viewer.updatePdf()
                }
                onClearInvoiceData: {
                    console.log("********************* InvoicePage.qml: Clearing InvoiceShowData")
                    invoiceForm.headerVisible = true
                }
            }
        }
        ShowPDF {
            id: viewer
            Layout.fillWidth: true
            Layout.fillHeight: true
            // refresh: stackLayout.currentIndex === 1
            onCloseShowPDF: {
                stackLayout.currentIndex = 0
            }
        }
    }
}


