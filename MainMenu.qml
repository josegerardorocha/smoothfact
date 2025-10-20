import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
// For Qt Creator code model
import "images"

Rectangle {
    id: root
    color: "#ddffdd"
    radius: 8
    property string username: "User"

    signal logout()

    // --- Top menu bar ---
    Rectangle {
        id: topBar
        anchors.top: parent.top
        anchors.left: parent.left
        anchors.right: parent.right
        height: 50
        color: "#04AA6D"
        radius: 8

        RowLayout {
            anchors.fill: parent
            anchors.margins: 10
            spacing: 0
            Layout.alignment: Qt.AlignRight  // Right-align all menu items

            Item{
                Layout.fillWidth: true  // Spacer to push menu items to the right
            }
            ObjectModel{
                id: icons
                Component {
                    Item{
                        property string color: "white"
                    }
                }
                Component {
                    Item{
                        property string color: "white"
                    }
                }
                Component {
                    Item{
                        property string color: "white"
                    }
                }
                Component {
                    Item{
                        property string color: "white"
                    }
                }
                Component {
                    LogoutIcon {
                        color: "white"
                        fillColor: "transparent"
                        strokeWidth: 2
                        width: 24
                        height: 24
                    }
                }
            }

            Repeater {
                model: [
                    { label: "Empresa",       index: 0  },
                    { label: "Trabalhadores", index: 1  },
                    { label: "Faturas",       index: 2  },
                    { label: "Banco",         index: 3  },
                    { label: "Logout",        index: -1 }
                ]
                delegate: Component {
                    Item {
                        width: row.implicitWidth
                        height: parent.height

                        RowLayout {
                            id: row
                            anchors.fill: parent
                            spacing: 0
                            Loader {
                                id: loader
                                Layout.alignment: Qt.AlignBottom
                                sourceComponent: icons.get(index)
                            }
                            Text {
                                id: menuText
                                text: modelData.label
                                Layout.alignment: Qt.AlignBottom
                                font.pixelSize: 20
                                color: (modelData.index === contentStack.currentIndex)
                                           ? "#FFD700"  // yellow if selected
                                           : (mouseArea.containsMouse ? "#004400" : "white")
                                Layout.rightMargin: 50
                                onColorChanged: {
                                    // console.log("text:", text, "menuText color changed to", color)
                                    // console.log("modelData.index === contentStack.currentIndex", modelData.index === contentStack.currentIndex)
                                    if(loader.item && loader.item.color)
                                        loader.item.color = color
                                }
                            }
                        }
                        MouseArea {
                            id: mouseArea
                            anchors.fill: parent
                            hoverEnabled: true
                            cursorShape: Qt.PointingHandCursor

                            // onEntered: menuText.color = "#004400"
                            // onExited: {
                            //     console.log("modelData.index === contentStack.currentIndex", modelData.index === contentStack.currentIndex)
                            //     menuText.color = modelData.index === contentStack.currentIndex ? "#FFD700" : "white"
                            // }
                            onClicked: {
                                if (modelData.index >= 0) {
                                    contentStack.currentIndex = modelData.index
                                    //menuText.color = modelData.index === contentStack.currentIndex ? "#FFD700" : "white"
                                } else {
                                    // console.log("Logout clicked")
                                    root.logout()
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    StackLayout {
        id: contentStack
        anchors.top: topBar.bottom
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.bottom: parent.bottom
        currentIndex: 0
        InfoPage {
            id: infoPage
            username: root.username
            Layout.fillWidth: true
        }
        WorkersPage {
            id: invoicePage
            username: root.username
            Layout.fillWidth: true
        }
        InvoicePage {
            id: workerspage
        }

        BankMovementPage {
            id: bankPage
        }
    }
}
