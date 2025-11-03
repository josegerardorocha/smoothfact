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
    function addOneYear(dateStr) {
      // Expect input in DD/MM/YYYY format
      const [day, month, year] = dateStr.split("/").map(Number);

      // Create a Date object (months are 0-based in JS)
      const date = new Date(year + 1, month - 1, day);

      // Format back to DD/MM/YYYY
      const newDay = String(date.getDate()).padStart(2, "0");
      const newMonth = String(date.getMonth() + 1).padStart(2, "0");
      const newYear = date.getFullYear();

      return `${newDay}/${newMonth}/${newYear}`;
    }
    function updateTotals(){
        form.premio = (form.remuneracoes*14+form.subsidioRefeicao*11) * 0.02
        form.is = form.premio * 0.005
        form.inem = form.premio * 0.0025
        form.fat = form.premio * 0.0015
        form.total = form.premio + form.is + form.inem + form.fat
        premio.text = "Prémio: " + form.premio.toFixed(2)
        impostoSelo.text = "Imposto do selo: " + form.is.toFixed(2)
        inem.text = "INEM: " + form.inem.toFixed(2)
        fat.text = "FAT (Fundo de Acidentes de Trabalho): " + form.fat.toFixed(2)
        form.encargosLegais = form.is + form.inem + form.fat
        total.text = "Total: " + form.total.toFixed(2)
    }

    StackLayout{
        anchors.fill: parent
        //anchors.margins: 20
        id: stackLayout
        RowLayout {
            id: form
            //anchors.fill: parent
            Layout.fillWidth: true
            Layout.fillHeight: true
            property real remuneracoes: 0.0
            property real subsidioRefeicao: 0.0
            property real premio: 0.0
            property real is: 0.0
            property real inem: 0.0
            property real fat: 0.0
            property real encargosLegais: 0.0
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
                        text: "Seguro de Acidentes de Trabalho"
                        font.pixelSize: 24
                    }
                    CustomTextField{
                        //id: capital
                        Layout.fillWidth: true
                        placeholderText: "Total Remunerações Base mês"
                        onTextChanged: {
                            form.remuneracoes = parseFloat(text)
                            updateTotals()
                        }
                    }
                    CustomTextField{
                        //id: capital
                        Layout.fillWidth: true
                        placeholderText: "Total de Subsídio de Alimentação mês"
                        onTextChanged: {
                            form.subsidioRefeicao = parseFloat(text)
                            updateTotals()
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
                border.width: 0
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
                        text: "Imposto do selo:"
                        font.pixelSize: 14
                    }
                    Text{
                        id: inem
                        Layout.fillWidth: true
                        text: "INEM:"
                        font.pixelSize: 14
                    }
                    Text{
                        id: fat
                        Layout.fillWidth: true
                        text: "FAT (Fundo de Acidentes de Trabalho):"
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
                                "header": {
                                    "buyer":{
                                        "VAT":CompanyData.nif,
                                        "address":CompanyData.address,
                                        "company": CompanyData.name,
                                        "country":"Portugal",
                                        "countryCode":"PT"
                                    },
                                    //"dataInicio": form.dataInicio,
                                    "ramo": "Acidentes de Trabalho",
                                    "premio": form.premio,
                                    "impostoSelo": form.is,
                                    "inem": form.inem,
                                    "fat": form.fat,
                                    "encargosLegais": form.encargosLegais,
                                    "total": form.total,
                                    "apolice": "AP3421" + invoiceNumber(),
                                    "country":"PT",
                                    "date":form.dataInicio,
                                    "endDate":addOneYear(form.dataInicio),
                                    "number": "RC " + year(form.dataInicio) + "/"+ invoiceNumber(),
                                    "hash":"ABCD1234EFGH5678IJKL9012MNOP3456",
                                    "iban":"PT50000201231234567890154",
                                    "atcud":"JJRD3W6T-3",
                                    "seller":{
                                        "VAT":"563292610",
                                        "address":"Rua do Ipca, 145",
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
            // onVisibleChanged: {
            //     console.log("SeguroMultirrisco.qml: InvoiceShowPDF visibility changed to", visible)
            // }
        }
    }
}
