import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import "customcontrols"

ScrollView {
    id: root
    property string username: "User"
    property bool   editable: false
    property string companyName: ""
    property string companyAddress: ""
    property string companyNif: ""
    property string companyNiss: ""
    property string companyIban: ""
    property string companyBanco: ""
    property string companyCae: ""

    ScrollBar.horizontal.policy: ScrollBar.AlwaysOff
    ScrollBar.vertical.policy: ScrollBar.AsNeeded
    // Match horizontal size to parent container (StackLayout page)
    contentWidth: availableWidth
    contentHeight: formLayout.implicitHeight + 80
    clip: true

    // --- Load data from server ---
    function loadData() {
        HttpRequest.get("backend/info.php", function(success, response) {
            if (success) {
                companyName    = response.name
                companyAddress = response.address
                companyNif     = response.nif
                companyNiss    = response.niss
                companyIban    = response.iban
                companyBanco   = response.banco
                companyCae     = response.cae
                // console.log("Data loaded:", JSON.stringify(response))
            } else {
                console.log("Failed to load data")
            }
        })
    }

    // --- Submit updated data to server ---
    function submitData() {
        var params =
                "&name="    + encodeURIComponent(companyName)         +
                "&address=" + encodeURIComponent(companyAddress)      +
                "&nif="     + encodeURIComponent(companyNif)          +
                "&niss="    + encodeURIComponent(companyNiss)         +
                "&iban="    + encodeURIComponent(companyIban)         +
                "&banco="   + encodeURIComponent(companyBanco)        +
                "&cae="     + encodeURIComponent(companyCae)
        // console.log("submitData params=", params)
        HttpRequest.post("backend/info.php", params, function(success, response) {
            if (success) {
                // console.log("Update successful:", response)
            } else {
                console.log("Update failed")
            }
        })
    }
    function generateNif() {
        var params = "&prefix=563";
        HttpRequest.post("backend/generate_nif.php", params, function(success, response) {
            if (success) {
                companyNif = response.value
                // console.log("NIF generated:", response.value)
            } else {
                console.log("NIF generation failed")
            }
        })
    }
    function generateNiss() {
        var params = "&prefix=25";
        HttpRequest.post("backend/generate_niss.php", params, function(success, response) {
            if (success) {
                companyNiss = response.value
                // console.log("NISS generated:", response.value)
            } else {
                console.log("NISS generation failed")
            }
        })
    }
    function generateIban(prefix) {
        // console.log("Generating IBAN with prefix:", prefix)
        var params = "&prefix=" + encodeURIComponent(prefix) + ".0000"
        HttpRequest.post("backend/generate_iban.php", params, function(success, response) {
            if (success) {
                companyIban = response.value
                // console.log("IBAN generated:", response.value)
            } else {
                console.log("IBAN generation failed")
            }
        })
    }
    Component.onCompleted: loadData()

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
            text: companyName
            onTextChanged: if (editable) companyName = text
            enabled: editable
        }
        CustomTextArea {
            id: addressTextArea
            Layout.fillWidth: true
            placeholderText: "Company Address"
            text: companyAddress
            onTextChanged: if (editable) companyAddress = text
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
                text: companyNif
                inputMask: "999999999"   // optional
                onTextChanged: if (editable) companyNif = text
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
                text: companyNiss
                inputMask: "99999999999" // optional
                onTextChanged: if (editable) companyNiss = text
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
                text: companyIban
                onTextChanged: if (editable) companyIban = text
                enabled: editable
            }
            CustomIbanCombo {
                id: ibanCombo
                placeholderText: "Banco"
                Layout.fillWidth: true
                Layout.preferredWidth: 2
                Layout.alignment: Qt.AlignTop
                text: companyBanco
                onTextChanged: if (editable) companyBanco = text
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
            text: companyCae
            onTextChanged: if (editable) companyCae = text
            enabled: editable
        }

        RowLayout {
            Layout.alignment: Qt.AlignRight
            spacing: 20

            CustomButton {
                text: "Reset"
                enabled: editable
                onClicked: loadData()
            }
            CustomButton {
                text: "Submit"
                enabled: editable
                onClicked: submitData()
            }
        }
    }
}
