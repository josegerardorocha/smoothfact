import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

Item {
    id: menuBar
    width: parent ? parent.width : 400
    height: 50

    property alias model: repeater.model
    property int activeIndex: -1
    property alias popupVisible: submenuBar.visible
    signal submenuClicked(string menuTitle, string submenuTitle, int submenuIndex)

    Rectangle {
        anchors.fill: parent
        color: "#04AA6D"
        //height: 50
    }

    RowLayout {
        id: row
        anchors.fill: parent
        spacing: 0
        Layout.alignment: Qt.AlignRight
        //height: 50
        Item{
            Layout.fillWidth: true  // Spacer to push menu items to the right
        }
        Repeater {
            id: repeater
            delegate: Item {
                id: menuItem
                width: itemRow.implicitWidth
                height: parent.height

                RowLayout {
                    id: itemRow
                    anchors.fill: parent
                    spacing: 0
                    Loader {
                        id: loader
                        Layout.alignment: Qt.AlignCenter
                        sourceComponent: modelData.icon
                    }
                    Text {
                        id: textItem
                        Layout.alignment: Qt.AlignCenter
                        color: (menuBar.activeIndex === index) ? "#FFD700" : "white"
                        text: modelData.title
                        font.pixelSize: 20
                        Layout.rightMargin: 20
                        onColorChanged: {
                            if(loader.item && loader.item.color)
                                loader.item.color = color
                        }
                    }
                }

                MouseArea {
                    anchors.fill: parent
                    hoverEnabled: true
                    onEntered: {
                        menuBar.popupVisible = true
                        menuBar.activeIndex = index
                    }
                    onClicked: {
                        menuBar.activeIndex = index
                        menuBar.popupVisible
                    }
                    // onExited: {
                    // }
                }
            }
        }
    }

    // Submenu bar that resizes automatically
    Popup {
        background: Rectangle{
            color: "lightgray"
            border.color: "gray"
            border.width: 1
        }
        id: submenuBar
        width: parent.width
        y: parent.height
        visible: false //menuBar.activeIndex >= 0
        z: 100

        Behavior on opacity { NumberAnimation { duration: 150 } }
        opacity: visible ? 1 : 0

        implicitHeight: submenuRow.implicitHeight + 16
        height: implicitHeight

        RowLayout {
            id: submenuRow
            //anchors.centerIn: parent
            spacing: 0
            anchors.right: parent.right
            anchors.verticalCenter: parent.verticalCenter

            Repeater {
                id: submenuRepeater
                model: (menuBar.activeIndex >= 0 && menuBar.model.length > menuBar.activeIndex)
                       ? menuBar.model[menuBar.activeIndex].submenus
                       : []

                delegate: Item {
                    width: textItem2.implicitWidth+10
                    height: textItem2.implicitHeight + 12

                    Text {
                        id: textItem2
                        anchors.centerIn: parent
                        text: modelData
                        color: mouseArea.containsMouse ? "darkblue" : "black"
                        font.pixelSize: 16
                    }
                    MouseArea {
                        id: mouseArea
                        anchors.fill: parent
                        hoverEnabled: true
                        onClicked: {
                            console.log("Clicked submenu:", modelData)
                            menuBar.popupVisible = false
                            menuBar.submenuClicked(
                                        menuBar.model[menuBar.activeIndex]?.title || "",
                                        modelData,
                                        (menuBar.model[menuBar.activeIndex]?.baseIndex || 0) + index
                                        )
                            menuBar.activeIndex = -1
                        }
                    }
                }
            }
        }
        MouseArea {
            anchors.fill: parent
            hoverEnabled: true
            propagateComposedEvents: true
            acceptedButtons: Qt.NoButton
            // onEntered:{
            // }
            onExited: {
                menuBar.popupVisible = false
            }
        }
    }
}
