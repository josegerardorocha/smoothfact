import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

Rectangle {
    color: "white"
    Layout.fillWidth: true
    Layout.fillHeight: true

    property string username: "User"

    Text {
        anchors.centerIn: parent
        text: "Outro recibo do estado, " + username
        font.pixelSize: 24
        color: "green"
    }
}
