import QtQuick
import QtQuick.Layouts
import Smoothfact
Rectangle{
    function invoiceNumber() {
        return Math.floor(Math.random() * 900000) + 100000
    }
    function year(dateText) {
        // Match DD/MM/YYYY
        const match = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/.exec(dateText)
        if (!match)
            return ""  // Invalid format
        return match[3] // Return year part
    }
    StackLayout{
        anchors.fill: parent
        //anchors.margins: 20
        id: stackLayout
        RowLayout {
            id: form
            anchors.fill: parent
            property real premio: 0.0
            property real is: 0.0
            property real total: 0.0
            property string dataInicio: ""
            Item{
                Layout.fillWidth: true
                Layout.fillHeight: true
                //border.width: 1
                //border.color: "red"
                ColumnLayout{
                    anchors.fill: parent
                    spacing: 20
                    Text{
                        Layout.fillWidth: true
                        text: "Seguro Multirriscos"
                        font.pixelSize: 24
                    }
                    CustomTextField{
                        //id: capital
                        Layout.fillWidth: true
                        placeholderText: "Capital (inventários, imóveis, ativos)"
                        onTextChanged: {
                            form.premio = parseFloat(text) * 0.002
                            form.is = form.premio * 0.005
                            form.total = form.premio + form.is
                            premio.text = "Prémio: " + form.premio.toFixed(2)
                            impostoSelo.text = "Imposto de selo: " + form.is.toFixed(2)
                            total.text = "Total: " + form.total.toFixed(2)
                            //form.totalAPagar = form.total
                        }
                    }
                    CustomDateField{
                        //id: dataInicio
                        Layout.fillWidth: true
                        placeholderText: "Data de início"
                        onTextChanged: {
                            form.dataInicio = text
                            //console.log("Capital changed to:", text)
                            dataInicio.text = "Data de início: " + text
                        }
                    }
                    Item {
                        Layout.fillWidth: true
                        Layout.fillHeight: true
                    }
                }
            }
            Rectangle{
                Layout.fillWidth: true
                Layout.fillHeight: true
                border.width: 1
                border.color: "blue"
                ColumnLayout{
                    anchors.fill: parent
                    anchors.margins: 10
                    spacing: 10
                    Text{
                        id: dataInicio
                        Layout.fillWidth: true
                        text: "Data de início:"
                        font.pixelSize: 14
                    }
                    Text{
                        id: premio
                        Layout.fillWidth: true
                        text: "Prémio:"
                        font.pixelSize: 14
                    }
                    Text{
                        id: impostoSelo
                        Layout.fillWidth: true
                        text: "Imposto de selo:"
                        font.pixelSize: 14
                    }
                    Text{
                        id: total
                        Layout.fillWidth: true
                        text: "Total"
                        font.pixelSize: 14
                        font.bold: true
                    }
                    Item {
                        Layout.fillWidth: true
                        Layout.fillHeight: true
                    }
                    CustomButton {
                        text: "Gerar PDF"
                        Layout.alignment: Qt.AlignHCenter | Qt.AlignBottom
                        onClicked: {
                            //generatePdf()
                            viewer.pdfData = {
                                "id": PDFController.MULTIRRISCOS,
                                "dataInicio": form.dataInicio,
                                "premio": form.premio,
                                "impostoSelo": form.is,
                                "total": form.total,
                                "header": {
                                    "buyer":{
                                        "VAT":CompanyData.nif,
                                        "address":CompanyData.address,
                                        "company": CompanyData.name,
                                        "country":"Portugal",
                                        "countryCode":"PT"
                                    },
                                    "country":"PT",
                                    "date":form.dataInicio,
                                    "number": "FT " + year(form.dataInicio) + "/"+ invoiceNumber(),
                                    "hash":"ABCD1234EFGH5678IJKL9012MNOP3456",
                                    "iban":"PT50000201231234567890154",
                                    "atcud":"JJRD3W6T-3",
                                    "seller":{
                                        "VAT":"563292610",
                                        "address":"rua do Ipca, 145",
                                        "company":"Seguros Ipca, Lda",
                                        "country":"Portugal",
                                        "countryCode":"PT"
                                    }
                                }
                            }
                            viewer.updatePdf()
                            // viewer.visible = true
                            // form.visible = false
                            stackLayout.currentIndex = 1
                        }
                        enabled: form.total > 0.0
                    }
                }
            }
        }
        InvoiceShowPDF {
            id: viewer
            Layout.fillWidth: true
            Layout.fillHeight: true
            // refresh: stackLayout.currentIndex === 1
            onCloseInvoiceShowPDF: {
                //stackLayout.currentIndex = 0
                //form.visible = true
                //viewer.visible = false
                stackLayout.currentIndex = 0
            }
            visible: false
            onVisibleChanged: {
                console.log("SeguroMultirrisco.qml: InvoiceShowPDF visibility changed to", visible)
            }
        }
    }
}
