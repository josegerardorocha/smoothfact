import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

Item {
    width: 400
    height: 450

    property bool editable: false
    property string invoiceType: "Buy"
    property string companyName: ""
    property string companyAddress: ""
    property string companyNif: ""
    property string companyNiss: ""

    // --- Load data from server ---
    function loadData() {
        get("info.php", function(success, response) {
            if (success) {
                invoiceType = response.invoiceType
                companyName = response.companyName
                companyAddress = response.companyAddress
                companyNif = response.companyNif
                companyNiss = response.companyNiss
                console.log("Data loaded:", JSON.stringify(response))
            } else {
                console.log("Failed to load data")
            }
        })
    }

    // --- Submit updated data to server ---
    function submitData() {
        var params =
            "invoiceType=" + encodeURIComponent(invoiceType) +
            "&companyName=" + encodeURIComponent(companyName) +
            "&companyAddress=" + encodeURIComponent(companyAddress) +
            "&companyNif=" + encodeURIComponent(companyNif) +
            "&companyNiss=" + encodeURIComponent(companyNiss)

        post("info.php", params, function(success, response) {
            if (success) {
                console.log("Update successful:", response)
            } else {
                console.log("Update failed")
            }
        })
    }

    Component.onCompleted: loadData()

    ColumnLayout {
        anchors.fill: parent
        anchors.margins: 20
        spacing: 10

        RowLayout {
            Layout.alignment: Qt.AlignRight
            spacing: 10
            Label { text: "Enable Editing" }
            Switch {
                checked: editable
                onToggled: editable = checked
            }
        }

        RowLayout {
            spacing: 20
            CheckBox {
                text: "Buy"
                checked: invoiceType === "Buy"
                enabled: editable
                onToggled: if (checked) invoiceType = "Buy"
            }
            CheckBox {
                text: "Sell"
                checked: invoiceType === "Sell"
                enabled: editable
                onToggled: if (checked) invoiceType = "Sell"
            }
        }

        TextField {
            Layout.fillWidth: true
            placeholderText: "Company Name"
            text: companyName
            onTextChanged: if (editable) companyName = text
            enabled: editable
        }

        TextField {
            Layout.fillWidth: true
            placeholderText: "Company Address"
            text: companyAddress
            onTextChanged: if (editable) companyAddress = text
            enabled: editable
        }

        TextField {
            Layout.fillWidth: true
            placeholderText: "Company NIF"
            text: companyNif
            inputMask: "999999999;_"   // optional
            onTextChanged: if (editable) companyNif = text
            enabled: editable
        }

        TextField {
            Layout.fillWidth: true
            placeholderText: "Company NISS"
            text: companyNiss
            inputMask: "99999999999;_" // optional
            onTextChanged: if (editable) companyNiss = text
            enabled: editable
        }

        RowLayout {
            Layout.alignment: Qt.AlignRight
            spacing: 20

            Button {
                text: "Reset"
                onClicked: loadData()
            }
            Button {
                text: "Submit"
                enabled: editable
                onClicked: submitData()
            }
        }
    }
}
