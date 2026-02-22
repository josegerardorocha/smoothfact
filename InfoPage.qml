import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
//import Smoothfact
import "customcontrols"


ScrollView {
    id: root
    property string username: "User"
    property bool   editable: false
    // property string companyName: ""
    // property string companyAddress: ""
    // property string companyNif: ""
    // property string companyNiss: ""
    // property string companyIban: ""
    // property string companyBanco: ""
    // property string companyCae: ""

    ScrollBar.horizontal.policy: ScrollBar.AlwaysOff
    ScrollBar.vertical.policy: ScrollBar.AsNeeded
    // Match horizontal size to parent container (StackLayout page)
    contentWidth: availableWidth
    contentHeight: formLayout.implicitHeight + 80
    clip: true

    // --- Submit updated data to server ---
    function generateNif() {
        var params = "&prefix=563";
        HttpRequest.post("backend/generate_nif.php", params, function(success, response) {
            if (success) {
                CompanyData.nif = response.value
                // console.log("NIF generated:", response.value)
            } else {
                // console.log("NIF generation failed")
            }
        })
    }
    function generateNiss() {
        var params = "&prefix=25";
        HttpRequest.post("backend/generate_niss.php", params, function(success, response) {
            if (success) {
                CompanyData.niss = response.value
                // console.log("NISS generated:", response.value)
            } else {
                // console.log("NISS generation failed")
            }
        })
    }
    function generateIban(prefix) {
        // console.log("Generating IBAN with prefix:", prefix)
        var params = "&prefix=" + encodeURIComponent(prefix) + ".0000"
        HttpRequest.post("backend/generate_iban.php", params, function(success, response) {
            if (success) {
                CompanyData.iban = response.value
                // console.log("IBAN generated:", response.value)
            } else {
                // console.log("IBAN generation failed")
            }
        })
    }
    Component.onCompleted: CompanyData.loadData();

    ColumnLayout {
        id: formLayout
        anchors.fill: parent
        anchors.margins: 20
        spacing: 10
        width: root.availableWidth

        // RowLayout {
        //    Layout.alignment: Qt.AlignRight
        //     spacing: 10
        // Label { text: "Enable Editing" }
        CustomSwitch {
            checked: editable
            onToggled: editable = checked
            text: "Enable Editing"
            Layout.alignment: Qt.AlignRight
        }
        //}
        CustomTextArea{
            id: nameTextArea
            placeholderText: "Company Name"
            Layout.fillWidth: true
            text: CompanyData.name
            onTextChanged: if (editable) CompanyData.name = text
            enabled: editable
        }
        CustomTextArea {
            id: addressTextArea
            Layout.fillWidth: true
            placeholderText: "Company Address"
            text: CompanyData.address
            onTextChanged: if (editable) CompanyData.address = text
            enabled: editable
        }
        RowLayout {
            Layout.alignment: Qt.AlignRight
            height: nifTextField.implicitHeight
            spacing: 20
            CustomTextField{
                id: nifTextField
                Layout.fillWidth: true
                Layout.alignment: Qt.AlignTop
                placeholderText: "NIF"
                text: CompanyData.nif
                inputMask: "999999999"   // optional
                onTextChanged: if (editable) CompanyData.nif = text
                enabled: editable
            }
            CustomButton {
                implicitHeight: nifTextField.implicitHeight-10
                text: "Generate"
                enabled: editable
                onClicked: generateNif()
                Layout.alignment: Qt.AlignTop
            }
        }
        RowLayout {
            Layout.alignment: Qt.AlignRight
            spacing: 20
            CustomTextField {
                id: nissTextField
                Layout.fillWidth: true
                Layout.alignment: Qt.AlignTop
                placeholderText: "NISS"
                text: CompanyData.niss
                inputMask: "99999999999" // optional
                onTextChanged: if (editable) CompanyData.niss = text
                enabled: editable
            }
            CustomButton {
                implicitHeight: nissTextField.implicitHeight-10
                text: "Generate"
                enabled: editable
                onClicked: generateNiss()
                Layout.alignment: Qt.AlignTop
            }
        }
        RowLayout {
            Layout.alignment: Qt.AlignRight
            spacing: 20
            CustomTextField {
                id: ibanTextField
                Layout.fillWidth: true
                Layout.preferredWidth: 3
                Layout.alignment: Qt.AlignTop
                placeholderText: "IBAN"
                text: CompanyData.iban
                onTextChanged: if (editable) CompanyData.iban = text
                enabled: editable
            }
            CustomIbanCombo {
                id: ibanCombo
                placeholderText: "Banco"
                Layout.fillWidth: true
                Layout.preferredWidth: 2
                Layout.alignment: Qt.AlignTop
                text: CompanyData.banco
                onTextChanged: if (editable) CompanyData.companyBanco = text
                enabled: editable
            }
            CustomButton {
                implicitHeight: ibanTextField.implicitHeight-10
                text: "Generate"
                enabled: editable
                onClicked: generateIban(ibanCombo.bancoPrefix)
                Layout.alignment: Qt.AlignTop
            }
        }
        CustomCaeCombo {
            id: caeCombo
            placeholderText: "Classificação CAE"
            Layout.fillWidth: true
            text: CompanyData.cae
            onTextChanged: if (editable) CompanyData.cae = text
            enabled: editable
        }

        RowLayout {
            Layout.alignment: Qt.AlignRight
            spacing: 20

            CustomButton {
                text: "Reset"
                enabled: editable
                onClicked: CompanyData.loadData()
            }
            CustomButton {
                text: "Submit"
                enabled: editable
                onClicked: CompanyData.submitData();
            }
        }
    }
}
