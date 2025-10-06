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
        text: "Bank movement, " + username
        font.pixelSize: 24
        color: "green"
    }
}
