import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
Rectangle {
    color: "white"
    //anchors.fill: parent
    Layout.fillWidth: true
    Layout.fillHeight: true
    property string username: "User"

    Text {
        anchors.centerIn: parent
        text: "Welcome, " + username
        font.pixelSize: 24
        color: "green"
    }
}
