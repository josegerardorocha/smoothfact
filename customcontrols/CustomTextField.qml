import QtQuick 2.15
import QtQuick.Controls 2.15

Item {
    id: root
    // width: 200
    // height: textField.implicitHeight + 20
    implicitHeight: textField.implicitHeight + 20
    property alias echoMode: textField.echoMode
    property alias text: textField.text
    property alias inputMask: textField.inputMask
    property alias validator: textField.validator
    property string placeholderText: "Enter text"

    // Base TextField
    TextField {
        id: textField
        anchors.left: parent.left
        anchors.right: parent.right
        //anchors.bottom: parent.bottom
        height: implicitHeight + 10
        placeholderText: ""  // disable default placeholder
        leftPadding: 6
        topPadding: 6
        font.pixelSize: 16
        background: Rectangle {
            radius: 4
            border.width: 1
            border.color: textField.activeFocus ? "#FF04AA6D" : "gray"
            color: "transparent"
        }
    }

    // Floating placeholder
    Text {
        id: floatingLabel
        text: root.placeholderText
        color: textField.activeFocus ? "#FF04AA6D" : "gray"
        anchors.left: textField.left
        anchors.leftMargin: 6
        font.pixelSize: 14
        z: 2

        Behavior on y { NumberAnimation { duration: 100; easing.type: Easing.InOutQuad } }
        Behavior on font.pixelSize { NumberAnimation { duration: 100; easing.type: Easing.InOutQuad } }
        Behavior on color { ColorAnimation { duration: 100 } }
        // Component.onCompleted: {
        //     console.log("textField.height", textField.height, "height", height, "textField.y", textField.y);
        // }
    }
    // --- Small rectangle that wraps the floating label ---
    Rectangle {
        id: labelBox
        radius: 4
        z: 1                              // behind the floatingLabel
        color: "white"                    // white background when visible
        border.width: 0

        // size follows the painted size of the Text + padding
        width: floatingLabel.paintedWidth + 2
        height: floatingLabel.paintedHeight + 2

        // position follows the floating label
        x: floatingLabel.x - 1
        y: floatingLabel.y - 1

        visible: (textField.activeFocus || textField.text.length > 0)
    }

    states: [
        State {
            name: "floating"
            when: textField.activeFocus || textField.text.length > 0
            PropertyChanges { target: floatingLabel; y: -height+6; font.pixelSize: 12 }
        },
        State {
            name: "normal"
            when: !textField.activeFocus && textField.text.length === 0
            PropertyChanges { target: floatingLabel; y: textField.height/2 - floatingLabel.height/2; font.pixelSize: 14 }
        }
    ]
}
