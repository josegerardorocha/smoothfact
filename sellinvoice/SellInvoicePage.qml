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
    // function formatDate(today){
    //     let day = String(today.getDate()).padStart(2, '0')
    //     let month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-based
    //     let year = today.getFullYear()
    //     return {
    //         "day": day,
    //         "month": month,
    //         "year": year
    //     }
    // }
    function year(dateText) {
        // Match DD/MM/YYYY
        const match = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/.exec(dateText)
        if (!match)
            return ""  // Invalid format
        return match[3] // Return year part
    }
    function invoiceNumber() {
        return Math.floor(Math.random() * 900000) + 100000
    }

    function updateShowDataHeader(data){
        console.log("-------------SellInvoicePage.qml: updateShowDataHeader called", JSON.stringify(data))
        let c1 = formatCustomer(data.country, data.company, data.address, data.nif)
        let c2 = formatCustomer("Portugal", CompanyData.name, CompanyData.address, CompanyData.nif)
        let buyer  = data.tipoOperacao === "venda" ? c1 : c2
        let seller = data.tipoOperacao === "venda" ? c2 : c1
        showData.header = {
            "tipoOperacao": data.tipoOperacao,
            "country": data.country,
            "buyer": buyer,
            "seller": seller,
            "date": data.date,
            "number": "FT " + year(data.date) + "/"+ invoiceNumber(),
            "QType": "P/tl",
            "hash": "ABCD1234EFGH5678IJKL9012MNOP3456",
            "iban": "PT50000201231234567890154",
            "atcud": "JJRD3W6T-3",
        }
    }
    function updateAddRow(data){
        console.log("InvoicePage.qml: updateAddRow called")
        showData.model.append(data)
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
        SellInvoiceForm{
            id: sellInvoiceForm
            Layout.fillWidth: true
            Layout.fillHeight: true
            onAddHeader: (data) => {
                // console.log("InvoicePage.qml: Received addHeader signal from InvoiceForm")
                updateShowDataHeader(data)
                         }
            onAddRow: (data) => {
                          updateAddRow(data)
                          updateTotals()
                      }
        }
        StackLayout{
            id: stackLayout
            Layout.fillWidth: true
            Layout.fillHeight: true
            InvoiceShowData{
                id: showData
                Layout.fillWidth: true
                Layout.fillHeight: true
                visible: true
                onGeneratePdf: {
                    var rows = []
                    for(let i=0; i< showData.model.count; i++){
                        rows.push(showData.model.get(i))
                    }
                    viewer.pdfData = {
                        "header": showData.header,
                        "totais": showData.totals,
                        "rows": rows
                    }

                    // console.log("---------------------------------------------------------------------------")
                    // console.log("InvoicePage.qml: Generated pdfData:", JSON.stringify( viewer.pdfData))
                    // let postData = {
                    //     "username": username,
                    //     "header": showData.header,
                    //     "rows": []
                    // }
                    // for(let i=0; i< showData.model.count; i++){
                    //     postData.rows.push(showData.model.get(i))
                    // }
                    // console.log("Generating PDF with data:", JSON.stringify(postData))
                    // pdfRenderer.urlToLoad = "http://localhost/faturas/backend/invoice.php?user=" + username
                    // imgPdfProvider.renderer = pdfRenderer
                    // viewer.visible = true
                    // showData.visible = false
                    stackLayout.currentIndex = 1
                    // updatePdfData()
                }
                onClearInvoiceData: {
                    sellInvoiceForm.headerVisible = true
                }
            }
            InvoiceShowPDF {
                id: viewer
                Layout.fillWidth: true
                Layout.fillHeight: true
                //renderer: pdfRenderer
                //visible: false
                refresh: stackLayout.currentIndex === 1
                onCloseInvoiceShowPDF: {
                    // viewer.visible = false
                    // showData.visible = true
                    stackLayout.currentIndex = 0
                }
                // pdfData: {
                //     "header": {
                //         "tipoOperacao": "buy",
                //         "QType": "P/tl",
                //         "country": "PT",
                //         "buyer": {
                //             "company": "Sample Company Lda",
                //             "address": "123 Sample Street, Lisbon",
                //             "country": "Portugal",
                //             "VAT":     "123456789",
                //             "countryCode":"PT"
                //         },
                //         "seller": {
                //             "company": "Another Company SA",
                //             "address": "456 Another Ave, Porto",
                //             "country": "Portugal",
                //             "VAT":     "987654321",
                //             "countryCode":"PT"
                //         },
                //         "date": "25/02/2024",
                //         "number": "FT 2024/001",
                //         "date":"25/02/2024",
                //         "number":"FT 2024/001",
                //         "hash":"ABCD1234EFGH5678IJKL9012MNOP3456",
                //         "iban":"PT50000201231234567890154",
                //         "atcud":"JJRD3W6T-3",
                //     },
                //     "totais":{
                //         "totalSemIva":300,
                //         "totalDeIva":75,
                //         "baseIvaIsento":0,
                //         "baseIvaRed":100,
                //         "baseIvaInt":100,
                //         "baseIvaNorm":200,
                //         "descontoTotal":15,
                //         "ivaRed":6,
                //         "ivaInt": 23,
                //         "ivaNorm":46,
                //         "totalGeral":337
                //     },
                //     "rows": [
                //                 {
                //                     "tipo": "P",
                //                     "designacao": "Product A",
                //                     "quantidade": 2,
                //                     "preco": 50.0,
                //                     "desconto": 0.0,
                //                     "iva": 23.0,
                //                     "total": 123.0,
                //                     "motivoIsencao": ""
                //                 },
                //                 {
                //                     "tipo": "P",
                //                     "designacao": "Product B",
                //                     "quantidade": 1,
                //                     "preco": 100.0,
                //                     "desconto": 10.0,
                //                     "iva": 23.0,
                //                     "total": 110.7,
                //                     "motivoIsencao": ""
                //                 },
                //                 {
                //                     "tipo": "S",
                //                     "designacao": "Service C",
                //                     "quantidade": 5,
                //                     "preco": 20.0,
                //                     "desconto": 5.0,
                //                     "iva": 0,
                //                     "total": 95.0,
                //                     "motivoIsencao": "Artº 23º"
                //                 }
                //             ]
                // }
            }
        }
    }
}

