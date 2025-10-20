import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

Rectangle {
    border.width: 1
    border.color: "lightgray"
    width: 600

    signal generatePdf()

    Layout.fillWidth: true
    Layout.fillHeight: true
    color: "transparent"
    Button {
        text: "Gerar PDF"
        Layout.alignment: Qt.AlignHCenter | Qt.AlignBottom
        onClicked: {
            generatePdf()
        }
    }
}
