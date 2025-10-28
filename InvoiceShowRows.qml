import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import "customcontrols"

Item{
    property alias model: listView.model
    // border.color: "red"
    // border.width: 1
    height: column.implicitHeight
    implicitHeight: height
    ColumnLayout{
        id: column
        anchors.fill: parent
        RowLayout {
            Layout.fillWidth: true
            spacing: 10

            Text {
                Layout.fillWidth: true
                Layout.preferredWidth: 1
                textFormat: Text.RichText
                text: "Tipo"
                font.pointSize: 12
                color: "#333"
            }
            Text {
                Layout.fillWidth: true
                Layout.preferredWidth: 3
                textFormat: Text.RichText
                text: "Designacao"
                font.pointSize: 12
                color: "#333"
            }
            Text {
                Layout.fillWidth: true
                Layout.preferredWidth: 1
                textFormat: Text.RichText
                text: "Quant."
                font.pointSize: 12
                color: "#333"
            }
            Text {
                Layout.fillWidth: true
                Layout.preferredWidth: 1
                textFormat: Text.RichText
                text: "Preço"
                font.pointSize: 12
                color: "#333"
            }
            Text {
                Layout.fillWidth: true
                Layout.preferredWidth: 1
                textFormat: Text.RichText
                text: "Desc.(%)"
                font.pointSize: 12
                color: "#333"
            }
            Text {
                Layout.fillWidth: true
                Layout.preferredWidth: 1
                textFormat: Text.RichText
                text: "IVA (%)"
                font.pointSize: 12
                color: "#333"
            }
            Text {
                Layout.fillWidth: true
                Layout.preferredWidth: 1
                textFormat: Text.RichText
                text: "Total"
                font.pointSize: 12
                color: "#333"
            }
            Item {
                Layout.fillWidth: true
                Layout.preferredWidth: 1
            }
        }
        Repeater { // lines
            id: listView
            clip: true
            //spacing: 10
            Layout.fillWidth: true
            Layout.preferredHeight: contentHeight
            delegate: ColumnLayout{
                Layout.fillWidth: true
                Layout.preferredHeight: row.implicitHeight
                RowLayout {
                    id: row
                    Layout.fillWidth: true
                    //anchors.fill: parent
                    spacing: 10

                    Text {
                        Layout.fillWidth: true
                        Layout.preferredWidth: 1
                        textFormat: Text.RichText
                        text: model.tipo
                        font.pointSize: 12
                        color: "#333"
                    }
                    Text {
                        Layout.fillWidth: true
                        Layout.preferredWidth: 3
                        textFormat: Text.RichText
                        text: model.designacao
                        font.pointSize: 12
                        color: "#333"
                    }
                    Text {
                        Layout.fillWidth: true
                        Layout.preferredWidth: 1
                        textFormat: Text.RichText
                        text: model.quantidade.toFixed(2)
                        font.pointSize: 12
                        color: "#333"
                    }
                    Text {
                        Layout.fillWidth: true
                        Layout.preferredWidth: 1
                        textFormat: Text.RichText
                        text: model.preco.toFixed(2)
                        font.pointSize: 12
                        color: "#333"
                    }
                    Text {
                        Layout.fillWidth: true
                        Layout.preferredWidth: 1
                        textFormat: Text.RichText
                        text: model.desconto.toFixed(2) + "%"
                        font.pointSize: 12
                        color: "#333"
                    }
                    Text {
                        Layout.fillWidth: true
                        Layout.preferredWidth: 1
                        textFormat: Text.RichText
                        text: model.iva.toFixed(2) + "%"
                        font.pointSize: 12
                        color: "#333"
                    }
                    Text {
                        Layout.fillWidth: true
                        Layout.preferredWidth: 1
                        textFormat: Text.RichText
                        text: model.total.toFixed(2)
                        font.pointSize: 12
                        color: "#333"
                    }

                    // Delete button
                    CustomButton {
                        Layout.fillWidth: true
                        Layout.preferredWidth: 1
                        text: "Apagar"
                        onClicked: listView.model.remove(index)
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
    }
}
