import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import Smoothfact
//import "../customcontrols"

Rectangle {
    id: root
    border.width: 1
    border.color: "lightgray"
    width: 600
    property string tipoOperacao: ""
    property bool headerVisible: true

    signal addHeader(var data)
    signal addRow(var data)
    Layout.fillWidth: true
    Layout.fillHeight: true
    color: "transparent"

    function generateCompanyName(){
        console.log("countryCombo.countryCode =", countryCombo.countryCode)
        let name = CompanyNames.generateCompanyName(countryCombo.countryCode)
        console.log("Company Name:", name)
        companyTextField.text = name
    }

    function generateAddress(){
        console.log("countryCombo.countryCode =", countryCombo.countryCode)
        let address = CountryAddresses.generateRandomAddress(countryCombo.countryCode)
        console.log("Address:", address)
        addressTextArea.text = address
    }
    function generateVAT(){
        console.log("countryCombo.countryCode =", countryCombo.countryCode)
        let vat = VatGen.generateVat(countryCombo.countryCode)
        console.log("Generated VAT:", vat)
        vatTextField.text = vat
    }
    function toNumber(value) {
        var num = parseFloat(value)
        return (!isNaN(num) && isFinite(num)) ? num : 0
    }
    function computeTotalLine() {
        let quantidade = toNumber(quantidadeTextField.text)
        let preco = toNumber(precoTextField.text)
        let desconto = toNumber(descontoTextField.text)
        let iva = toNumber(ivaTextField.text)

        let totalBeforeTax = quantidade * preco * (1 - desconto / 100)
        let totalWithTax = totalBeforeTax * (1 + iva / 100)

        //rowDataColumn.totalLine = totalWithTax
        return totalWithTax.toFixed(2)
    }

    ColumnLayout {
        id: headerColumn
        anchors.fill: parent
        anchors.margins: 12
        spacing: 12
        visible: root.headerVisible
        CustomDateField{
            id: dateTextField
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignTop
            placeholderText: "Data"
        }
        CustomCustomerSupplierCombo {
            id: customerSupplierCombo
            placeholderText: "Cliente"
            Layout.fillWidth: true
            //Layout.preferredWidth: 3
            Layout.alignment: Qt.AlignBottom
        }
        CustomCountryCombo {
            id: countryCombo
            placeholderText: "País"
            Layout.fillWidth: true
            //Layout.preferredWidth: 3
            Layout.alignment: Qt.AlignBottom
        }
        RowLayout {
            Layout.alignment: Qt.AlignRight
            height: companyTextField.implicitHeight
            spacing: 20
            CustomTextField {
                id: companyTextField
                Layout.fillWidth: true
                //Layout.preferredWidth: 3
                Layout.alignment: Qt.AlignTop
                placeholderText: "Empresa"
            }
            CustomButton {
                implicitHeight: addressTextArea.implicitHeight-10
                text: "Gerar"
                enabled: countryCombo.countryCode != ""
                onClicked: generateCompanyName()
                Layout.alignment: Qt.AlignTop
            }
        }
        RowLayout {
            Layout.alignment: Qt.AlignRight
            height: addressTextArea.implicitHeight
            spacing: 20
            CustomTextArea{
                id: addressTextArea
                Layout.fillWidth: true
                Layout.alignment: Qt.AlignTop
                placeholderText: "Morada"
            }
            CustomButton {
                implicitHeight: addressTextArea.implicitHeight-10
                text: "Gerar"
                enabled: countryCombo.countryCode != ""
                onClicked: generateAddress()
                Layout.alignment: Qt.AlignTop
            }
        }
        RowLayout {
            Layout.alignment: Qt.AlignRight
            height: addressTextArea.implicitHeight
            spacing: 20
            CustomTextField{
                id: vatTextField
                Layout.fillWidth: true
                Layout.alignment: Qt.AlignTop
                placeholderText: "NIF"
            }
            CustomButton {
                implicitHeight: vatTextField.implicitHeight-10
                text: "Gerar"
                enabled: countryCombo.countryCode !== ""
                onClicked: generateVAT()
                Layout.alignment: Qt.AlignTop
            }
        }
        Item{
            Layout.fillHeight: true
        }
        CustomButton {
            text: "Adicionar"
            Layout.alignment: Qt.AlignRight | Qt.AlignBottom
            enabled: dateTextField.validDate && companyTextField.text !== "" && addressTextArea.text !== "" &&
                     vatTextField.text !== "" && countryCombo.countryCode !== ""
            onClicked: {
                var data = {
                    "tipoOperacao": root.tipoOperacao,
                    "country": countryCombo.country,
                    "countryCode": countryCombo.countryCode,
                    "company": companyTextField.text,
                    "address": addressTextArea.text,
                    "nif": vatTextField.text,
                    "date": dateTextField.text
                }
                console.log("InvoiceForm.qml: Emitting addHeader with data:", JSON.stringify(data))

                addHeader(data)
                root.headerVisible = false
            }
        }
        Item{
            Layout.fillHeight: true
        }
    }
    ColumnLayout {
        id: rowDataColumn
        anchors.fill: parent
        anchors.margins: 12
        spacing: 12
        visible: !root.headerVisible
        property real totalLine: 0.0

        CustomBinCheckbox{
            id: tipoCheckbox
            // Layout.fillWidth: true
            // Layout.preferredWidth: 1
            title: "Tipo"
            b1Label: "Serviço"
            b2Label: "Produto"
            b1Checked: true
        }
        CustomTextField{
            id: designacaoTextField
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignTop
            placeholderText: "Designação"
        }
        CustomTextField{
            id: quantidadeTextField
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignTop
            placeholderText: "Quantidade"
            onTextChanged: { rowDataColumn.totalLine = computeTotalLine(); }
        }
        CustomTextField{
            id: precoTextField
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignTop
            placeholderText: "Preço"
            onTextChanged: { rowDataColumn.totalLine = computeTotalLine(); }
        }
        CustomTextField{
            id: descontoTextField
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignTop
            placeholderText: "Desconto (%)"
            onTextChanged:{ rowDataColumn.totalLine = computeTotalLine(); }
        }
        CustomTextField{
            id: ivaTextField
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignTop
            placeholderText: "Iva (%)"
            onTextChanged: { rowDataColumn.totalLine = computeTotalLine(); }
        }
        CustomTextField{
            id: isencaoTextField
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignTop
            placeholderText: "Motivo da isenção do IVA"
            visible: toNumber(ivaTextField.text) <= 0
        }
        Text{
            textFormat: Text.RichText
            text: "<b>Total: " + rowDataColumn.totalLine + "</b>"
            Layout.alignment: Qt.AlignRight
        }
        Item{
            Layout.fillWidth: true
            Layout.fillHeight: true
        }
        CustomTextArea{
            id: cargaTextField
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignTop
            placeholderText: "Local da carga"
            text: {
                if(root.tipoOperacao === "venda")
                    return CompanyData.address + "\nPortugal"
                else
                    return addressTextArea.text + "\n" + countryCombo.country
            }
            visible: tipoCheckbox.b1Checked === false
        }
        CustomTextArea{
            id: descargaTextField
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignTop
            placeholderText: "Local da descarga"
            text: {
                if(root.tipoOperacao === "venda")
                    return addressTextArea.text + "\n" + countryCombo.country
                else
                    return CompanyData.address + "\nPortugal"
            }
            visible: tipoCheckbox.b1Checked === false
        }
        CustomButton {
            text: "Adicionar linha"
            Layout.alignment: Qt.AlignRight | Qt.AlignBottom
            enabled: {
                designacaoTextField.text !== "" &&
                toNumber(quantidadeTextField.text) > 0 &&
                toNumber(precoTextField.text) >= 0 &&
                (toNumber(ivaTextField.text) > 0 || isencaoTextField.text !== "")
            }

            onClicked: {
                console.log("Adicionar linha:")
                var data = {
                    "tipo": tipoCheckbox.b1Checked ? 'S': 'P',
                    "designacao": designacaoTextField.text,
                    "quantidade": toNumber(quantidadeTextField.text),
                    "preco": toNumber(precoTextField.text),
                    "desconto": toNumber(descontoTextField.text),
                    "iva": toNumber(ivaTextField.text),
                    "total": rowDataColumn.totalLine,
                    "motivoIsencao": isencaoTextField.text,
                    "carga": cargaTextField.text,
                    "descarga": descargaTextField.text
                }
                addRow(data)
            }
        }
    }
}
