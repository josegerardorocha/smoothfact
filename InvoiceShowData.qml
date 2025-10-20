import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import "customcontrols"

ScrollView {
    id: root
    property string username: "User"
    property alias header: header.text
    property alias model: textModel
    signal clearAll()
    signal generatePdf()

    ScrollBar.horizontal.policy: ScrollBar.AlwaysOff
    ScrollBar.vertical.policy: ScrollBar.AsNeeded
    // Match horizontal size to parent container (StackLayout page)
    contentWidth: availableWidth
    contentHeight: formLayout.implicitHeight + 80
    clip: true

    ListModel {
        id: textModel
        // Component.onCompleted: {
        //     console.log("Loading workers from backend...")

        //     HttpRequest.get("backend/workers.php", function(success, response) {
        //         if (success && response.status === "ok") {
        //             console.log("Workers loaded:", response.count)
        //             textModel.clear()
        //             for (var i = 0; i < response.workers.length; i++) {
        //                 textModel.append(response.workers[i])
        //             }
        //         } else {
        //             console.log("Failed to load workers:", response)
        //         }
        //     })
        // }
    }
    ColumnLayout {
        id: formLayout
        width: root.width
        spacing: 10

        ColumnLayout {  // Header
            Layout.fillWidth: true
            spacing: 4
            visible: header.text !== ""

            RowLayout {
                Layout.fillWidth: true
                spacing: 10

                // Header text
                Text {
                    id: header
                    Layout.fillWidth: true
                    Layout.preferredWidth: 8
                    textFormat: Text.RichText
                    wrapMode: Text.Wrap
                    font.pointSize: 12
                    color: "#333"
                }

                // Delete button
                CustomButton {
                    Layout.fillWidth: true
                    Layout.preferredWidth: 1
                    text: "Delete"
                    onClicked: {textModel.clear(); clearAll()}
                    Layout.alignment: Qt.AlignBottom
                }
            }

            // Divider line
            Rectangle {
                Layout.fillWidth: true
                height: 1
                color: "#DDDDDD"
            }
        }
        ListView { // lines
            id: listView
            model: textModel
            clip: true
            spacing: 10
            Layout.fillWidth: true
            Layout.preferredHeight: contentHeight
            Layout.leftMargin: 10
            Layout.rightMargin: 10

            delegate: ColumnLayout {
                width: listView.width
                spacing: 4

                RowLayout {
                    Layout.fillWidth: true
                    spacing: 10

                    // Worker text
                    Text {
                        Layout.fillWidth: true
                        Layout.preferredWidth: 8
                        textFormat: Text.RichText
                        text: workerText(model)
                        wrapMode: Text.Wrap
                        font.pointSize: 12
                        color: "#333"
                    }

                    // Delete button
                    CustomButton {
                        Layout.fillWidth: true
                        Layout.preferredWidth: 1
                        text: "Delete"
                        onClicked: textModel.remove(index)
                        Layout.alignment: Qt.AlignBottom
                    }
                }

                // Divider line
                Rectangle {
                    Layout.fillWidth: true
                    height: 1
                    color: "#DDDDDD"
                }
            }
        }
        //Rectangle{
        //    Layout.fillWidth: true
        //    height: 1
        //    color: "#FF04AA6D"
        //}

        //RowLayout{
        //    Layout.fillWidth: true
        //    spacing: 10
        //    Layout.leftMargin: 10
        //    Layout.rightMargin: 10
        //    CustomBinCheckbox{
        //        id: genderCheckbox
        //        // Layout.fillWidth: true
        //        // Layout.preferredWidth: 1
        //        title: "Género"
        //        b1Label: "Masculino"
        //        b2Label: "Feminino"
        //        b1Checked: true
        //        Layout.alignment: Qt.AlignBottom
        //    }

        //    CustomIbanCombo {
        //        id: ibanCombo
        //        placeholderText: "Banco"
        //        Layout.fillWidth: true
        //        Layout.preferredWidth: 3
        //        Layout.alignment: Qt.AlignBottom
        //        //text: companyBanco
        //        //onTextChanged: if (editable) companyBanco = text
        //        //enabled: editable
        //    }
        //    CustomButton {
        //        Layout.fillWidth: true
        //        Layout.preferredWidth: 1
        //        text: "Generate"
        //        onClicked: generateWorker()
        //        Layout.alignment: Qt.AlignBottom
        //    }
        //    CustomButton {
        //        Layout.fillWidth: true
        //        Layout.preferredWidth: 1
        //        //Layout.rightMargin: 10
        //        text: "Submit"
        //        onClicked: submitWorkers()
        //        Layout.alignment: Qt.AlignBottom
        //    }
        //}
        //Text {
        //    // Layout.fillWidth: true
        //    id: errorText
        //    Layout.rightMargin: 10
        //    text: ""
        //    wrapMode: Text.Wrap
        //    font.pointSize: 14
        //    color: "red"
        //    opacity: 0.0
        //    Layout.alignment: Qt.AlignRight
        //    // Behavior defines the fade-out animation
        //    SequentialAnimation {
        //        id: errorAnim
        //        running: false
        //        PropertyAnimation { target: errorText; property: "opacity"; from: 0; to: 1; duration: 50 }
        //        PauseAnimation    { duration: 750 }
        //        PropertyAnimation { target: errorText; property: "opacity"; from: 1; to: 0; duration: 600 }
        //    }
        //}
        CustomButton {
            text: "Gerar PDF"
            Layout.alignment: Qt.AlignHCenter | Qt.AlignBottom
            onClicked: {
                generatePdf()
            }
            enabled: header.text !== "" && textModel.count > 0
        }
    }
}
