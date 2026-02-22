import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

Button {
    id: root
    implicitHeight: 48
    implicitWidth: 160
    // Layout.alignment: Qt.AlignHCenter
    flat: true
    property alias radius: bg.radius

    // center the text
    contentItem: Text {
        text: root.text
        font.pixelSize: 16
        color: root.enabled ? (root.down ? "white" : "green") : "lightgray"
        horizontalAlignment: Text.AlignHCenter
        verticalAlignment: Text.AlignVCenter
        anchors.fill: parent
    }

    // custom background with rounded corners & green border
    background: Rectangle {
        id: bg
        radius: 12
        border.color: root.enabled ? "#FF04AA6D" : "gray"
        border.width: 2
        // Colors depending on state
        color: root.down ? "#FF04AA6D"
                         : root.enabled && root.hovered ? "#AAFFAA"   // light green on hover
                                                        : "transparent"
    }
    // animation to simulate a brief button press
    SequentialAnimation {
        id: flashAnim
        running: false
        PropertyAnimation { target: bg; property: "color"; to: "#FF04AA6D"; duration: 0 }
        PauseAnimation { duration: 50 } // how long the pressed color stays
        PropertyAnimation { target: bg; property: "color"; to: "transparent"; duration: 150 }
    }
    function simulatePress() {
        flashAnim.restart()
    }
}
