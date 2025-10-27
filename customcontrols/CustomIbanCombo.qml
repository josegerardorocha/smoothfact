import QtQuick 2.15
import QtQuick.Controls 2.15
import "iban_prefix.js" as IBAN

Item {
    id: root
    property alias text: displayTextItem.text
    property string placeholderText: "Banco"
    property string bancoPrefix: ""

    implicitHeight: 40
    //implicitWidth: 250

    ComboBox {
        id: combo
        anchors.fill: parent
        model: ListModel {
            id: bancoModel
            Component.onCompleted: {
                for (let i = 0; i < IBAN.data.length; ++i)
                    bancoModel.append(IBAN.data[i])
                //combo.currentIndex = -1 // No selection initially
            }
        }

        currentIndex: -1
        editable: false
        leftPadding: 6
        topPadding: 6
        rightPadding: 16
        font.pixelSize: 16
        height: contentItem.implicitHeight + 10

        background: Rectangle {
            radius: 4
            border.width: 1
            border.color: combo.activeFocus ? "#FF04AA6D" : "gray"
            color: "transparent"
        }
        contentItem: Text {
            id: displayTextItem
            text: combo.currentIndex >= 0 ? combo.model.get(combo.currentIndex).nome : ""
            anchors.fill: parent
            anchors.leftMargin: combo.leftPadding
            anchors.rightMargin: combo.rightPadding
            verticalAlignment: Text.AlignVCenter
            horizontalAlignment: Text.AlignLeft
            font.pixelSize: 16
            //enabled: root.enabled
            color: root.enabled ? "black" : "gray"
        }
        popup: Popup {
            y: combo.height + 1 // Aligns the top of the popup with the bottom of the ComboBox
            width: combo.width
            background: Rectangle {
                border.color: "green"
                border.width: 0
            }

            contentItem: ListView {
                id: listView
                anchors.fill: parent
                anchors.margins: 0
                implicitWidth: combo.width
                implicitHeight: 200
                model: combo.model
                clip: true
                currentIndex: combo.currentIndex

                ScrollBar.vertical: ScrollBar {
                    id: scrollBar
                    policy: ScrollBar.AsNeeded
                    width: 6
                    active: true
                    z:20
                    contentItem: Rectangle {
                        radius: 3
                        color: "gray"
                    }
                }
                delegate: ItemDelegate {
                    id: delegate
                    width: listView.width - scrollBar.width
                    padding: 0
                    text: model.nome
                    highlighted: ListView.isCurrentItem

                    // Custom background based on the item content
                    background: Rectangle {
                        anchors.fill: parent
                        anchors.margins: 0
                        color: highlighted ? "lightblue" : (enabled && hovered ? "lightgray" : "white")
                    }
                    contentItem: Text {
                        text: delegate.text
                        color: enabled ? (highlighted ? "red" : "black") : "gray"
                        verticalAlignment: Text.AlignVCenter
                        elide: Text.ElideRight
                        leftPadding: 4
                        font.pixelSize: 14
                    }

                    onClicked: {
                        combo.currentIndex = index
                        combo.popup.close()
                        displayTextItem.text = delegate.text
                    }
                }
            }
        }
        onCurrentIndexChanged: {
            if (currentIndex >= 0){
                root.bancoPrefix = model.get(currentIndex).prefixo
                //console.log("onCurrentIndexChanged, root.bancoPrefix=", root.bancoPrefix)
            }
        }
    }
    // Floating placeholder
    Text {
        id: floatingLabel
        text: root.placeholderText
        color: combo.activeFocus ? "#FF04AA6D" : "gray"
        anchors.left: combo.left
        anchors.leftMargin: 6
        font.pixelSize: 14
        z: 2

        Behavior on y { NumberAnimation { duration: 100; easing.type: Easing.InOutQuad } }
        Behavior on font.pixelSize { NumberAnimation { duration: 100; easing.type: Easing.InOutQuad } }
        Behavior on color { ColorAnimation { duration: 100 } }
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

        visible: (combo.activeFocus || displayTextItem.text.length > 0)
    }

    states: [
        State {
            name: "floating"
            when: combo.activeFocus || displayTextItem.text.length > 0
            PropertyChanges { target: floatingLabel; y: -height+6; font.pixelSize: 12 }
        },
        State {
            name: "normal"
            when: !combo.activeFocus && displayTextItem.text.length === 0
            PropertyChanges {
                target: floatingLabel;
                y: combo.height/2 - floatingLabel.height/2;
                font.pixelSize: 14
            }
        }
    ]
}
