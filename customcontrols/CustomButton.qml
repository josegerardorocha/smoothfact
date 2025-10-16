import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

Button {
    id: submitButton
    implicitHeight: 48
    implicitWidth: 160
    // Layout.alignment: Qt.AlignHCenter
    flat: true

    // center the text
    contentItem: Text {
        text: submitButton.text
        font.pixelSize: 16
        color: submitButton.down ? "white" : "green"
        horizontalAlignment: Text.AlignHCenter
        verticalAlignment: Text.AlignVCenter
        anchors.fill: parent
    }

    // custom background with rounded corners & green border
    background: Rectangle {
        radius: 12
        border.color: "#FF04AA6D"
        border.width: 2
        // Colors depending on state
        color: submitButton.down ? "#FF04AA6D"
                                 : submitButton.enabled && submitButton.hovered ? "#AAFFAA"   // light green on hover
                                                        : "transparent"
    }
}
