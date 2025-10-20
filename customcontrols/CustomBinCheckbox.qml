import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

Item {
    id: root
    property alias b1Checked: b1Radio.checked
    property alias b2Checked: b2Radio.checked
    property string title: ""
    property string b1Label: ""
    property string b2Label: ""
    // border.width: 1
    // border.color: "red"

    implicitWidth: groupBox.width
    implicitHeight: groupBox.height + labelBox.height / 2 + 1
    // width: implicitWidth
    // height: implicitHeight
    // Component.onCompleted: {
    //     console.log("labelBox.height", labelBox.height, "groupBox.height", groupBox.height,
    //                 "implicitHeight", implicitHeight);
    // }

    Text {
        id: titleLabel
        text: root.title
        color: (b1Radio.activeFocus || b2Radio.activeFocus)
               ? "#FF04AA6D" : "gray"
        font.pixelSize: 12
        // Layout.alignment: Qt.AlignLeft  // ✅ proper layout alignment
        // Layout.leftMargin: 6
        anchors.left: parent.left
        anchors.top: parent.top
        anchors.leftMargin: 6
        anchors.topMargin: 1
        z: 2
    }
    Rectangle {
        id: labelBox
        anchors.left: parent.left
        anchors.top: parent.top
        anchors.leftMargin: 5
        anchors.topMargin: 0
        radius: 4
        z: 1                              // behind the floatingLabel
        color: "white"                    // white background when visible
        border.width: 0

        // size follows the painted size of the Text + padding
        width: titleLabel.paintedWidth + 2
        height: titleLabel.paintedHeight + 2

        // position follows the floating label
        // x: titleLabel.x - 1
        // y: titleLabel.y - 1

        //visible: (textField.activeFocus || textField.text.length > 0)
    }

    Rectangle {
        id: groupBox
        anchors.left: parent.left
        anchors.top: parent.top
        anchors.topMargin: labelBox.height / 2 + 1
        radius: 4
        border.width: 1
        border.color: (b1Radio.activeFocus || b2Radio.activeFocus)
                      ? "#FF04AA6D" : "gray"
        color: "transparent"
        width: contentRowLayout.implicitWidth + 8
        height: contentColumnLayout.implicitHeight + 8

        ColumnLayout {
            id: contentColumnLayout
            anchors.fill: parent
            anchors.topMargin: 12
            anchors.leftMargin: 4
            spacing: 6

            // Title (no anchors here!)
            RowLayout {
                Layout.fillHeight: true
                Layout.fillWidth: true
                id: contentRowLayout
                spacing: 20
                Layout.leftMargin: 6
                RadioButton {
                    Layout.alignment: Qt.AlignVCenter
                    id: b1Radio
                    text: b1Label
                    //checked: true
                    font.pixelSize: 14
                    onClicked: b2Radio.checked = !checked
                }
                RadioButton {
                    id: b2Radio
                    Layout.alignment: Qt.AlignVCenter
                    text: b2Label
                    font.pixelSize: 14
                    onClicked: b1Radio.checked = !checked
                }
            }
        }
    }
}
