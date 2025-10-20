import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import "customcontrols"

Rectangle {
    border.width: 1
    border.color: "lightgray"
    width: 600

    signal addHeader(bool isCompra, string country, string company, string address, string vat)

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

    ColumnLayout {
        id: headerColumn
        anchors.fill: parent
        anchors.margins: 12
        spacing: 12
        CustomBinCheckbox{
            id: tipoCheckbox
            // Layout.fillWidth: true
            // Layout.preferredWidth: 1
            title: "Tipo"
            b1Label: "Compra"
            b2Label: "Venda"
            b1Checked: true
            //Layout.alignment: Qt.AlignBottom
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
                //text: companyIban
                //onTextChanged: if (editable) companyIban = text
                //enabled: editable
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
                // text: companyNif
                // inputMask: "999999999"   // optional
                // onTextChanged: if (editable) companyNif = text
                // enabled: editable
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
                // text: companyNif
                // inputMask: "999999999"   // optional
                // onTextChanged: if (editable) companyNif = text
                // enabled: editable
            }
            CustomButton {
                implicitHeight: vatTextField.implicitHeight-10
                text: "Gerar"
                enabled: countryCombo.countryCode != ""
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
                console.log("Tipo (Compra/Venda):", tipoCheckbox.b1Checked ? "Compra" : "Venda")
                console.log("País:", countryCombo.country)
                console.log("Empresa:", companyTextField.text)
                console.log("Morada:", addressTextArea.text)
                console.log("VAT:", vatTextField.text)
                addHeader(tipoCheckbox.b1Checked, countryCombo.country, companyTextField.text,
                          addressTextArea.text, vatTextField.text)
                headerColumn.visible = false
                rowDataColumn.visible = true
            }
        }
    }
    ColumnLayout {
        id: rowDataColumn
        anchors.fill: parent
        anchors.margins: 12
        spacing: 12
        visible: false

        CustomButton {
            text: "Adicionar linha"
            Layout.alignment: Qt.AlignRight | Qt.AlignBottom
            onClicked: {
                console.log("Adicionar linha:")
            }
        }
    }
}
