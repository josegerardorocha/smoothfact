import QtQuick
import QtQuick.Controls

Switch {
    id: mySwitch
    checked: false
    text: "Enable feature"

    indicator: Rectangle {
        implicitWidth: 50
        implicitHeight: 30
        radius: height / 2
        color: mySwitch.checked ? "#4CAF50" : "#ccc" // green when ON, gray when OFF

        Rectangle {
            width: 26
            height: 26
            radius: height / 2
            anchors.verticalCenter: parent.verticalCenter
            x: mySwitch.checked ? parent.width - width - 2 : 2
            color: "white"
            Behavior on x { NumberAnimation { duration: 120 } }
        }
    }
}
