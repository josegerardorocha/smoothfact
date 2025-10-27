import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import "../customcontrols"

Rectangle {
    border.width: 1
    border.color: "lightgray"
    width: 600
    property string tipoOperacao: "venda"
    property bool headerVisible: true

    signal addHeader(string tipoOperacao, string country, string company, string address, string vat)
    signal addRow(bool tipo, string designacao, real quantidade, real preco, real desconto,
                  real iva, real total, string motivoIsencao)
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
        visible: headerVisible
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
                placeholderText: "VAT"
            }
            CustomButton {
                implicitHeight: vatTextField.implicitHeight-10
                text: "Gerar"
                enabled: countryCombo.countryCode !== ""
                onClicked: generateVAT()
                Layout.alignment: Qt.AlignTop
            }
        }
        CustomButton {
            text: "Adicionar"
            Layout.alignment: Qt.AlignRight | Qt.AlignBottom
            enabled: companyTextField.text !== "" && addressTextArea.text !== "" &&
                     vatTextField.text !== "" && countryCombo.countryCode !== ""
            onClicked: {
                console.log("Adicionar header com os seguintes dados:")
                console.log("Tipo (Compra/Venda):", tipoOperacao)
                console.log("País:", countryCombo.country)
                console.log("Empresa:", companyTextField.text)
                console.log("Morada:", addressTextArea.text)
                console.log("VAT:", vatTextField.text)
                addHeader(tipoOperacao, countryCombo.country, companyTextField.text,
                          addressTextArea.text, vatTextField.text)
                //headerColumn.visible = false
                //rowDataColumn.visible = true
                headerVisible = false
            }
        }
    }
    ColumnLayout {
        id: rowDataColumn
        anchors.fill: parent
        anchors.margins: 12
        spacing: 12
        visible: !headerVisible
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
            onTextChanged: { rowDataColumn.totalLine = computeTotalLine(); }
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
        CustomButton {
            text: "Adicionar linha"
            Layout.alignment: Qt.AlignRight | Qt.AlignBottom
            onClicked: {
                console.log("Adicionar linha:")
                addRow(
                            tipoCheckbox.b1Checked,
                            designacaoTextField.text,
                            toNumber(quantidadeTextField.text),
                            toNumber(precoTextField.text),
                            toNumber(descontoTextField.text),
                            toNumber(ivaTextField.text),
                            rowDataColumn.totalLine,
                            isencaoTextField.text
                            )
            }
        }
    }
}
