import QtQuick 2.15
import QtQuick.Controls 2.15
import QtQuick.Layouts 1.15

Rectangle {
    id: root
    color: "#ddffdd"
    radius: 8
    property string username: "User"

    // --- Top menu bar ---
    Rectangle {
        id: topBar
        anchors.top: parent.top
        anchors.left: parent.left
        anchors.right: parent.right
        height: 50
        color: "#c8e6c9"
        radius: 8

        RowLayout {
            anchors.fill: parent
            anchors.margins: 10
            spacing: 0
            Layout.alignment: Qt.AlignRight  // Right-align all menu items

            Item{
                Layout.fillWidth: true  // Spacer to push menu items to the right
            }
            Repeater {
                model: [
                    { label: "Info" },
                    { label: "Invoice" },
                    { label: "Bank Movement" },
                    { label: "Logout" }
                ]

                delegate: Component {
                    Item {
                        width: 160
                        height: parent.height

                        RowLayout {
                            anchors.fill: parent
                            spacing: 0
                            Image {
                                id: menuImage
                                source: (modelData.label === "Logout") ? "qrc:/qt/qml/smoothfact/images/logout.png" : ""
                                width: 20
                                height: 20
                                sourceSize.width: width
                                sourceSize.height: height
                                visible: source !== ""
                                Layout.rightMargin: 0
                            }

                            Text {
                                id: menuText
                                text: modelData.label
                                Layout.alignment: Qt.AlignVCenter
                                font.pixelSize: 16
                                color: "#336633"
                                Layout.rightMargin: 50
                            }
                        }

                        MouseArea {
                            anchors.fill: parent
                            hoverEnabled: true
                            cursorShape: Qt.PointingHandCursor

                            onEntered: menuText.color = "#004400"
                            onExited: menuText.color = "#336633"
                            onClicked: {
                                console.log(modelData.label + " clicked")
                                // Trigger page switching here
                            }
                        }
                    }
                }
            }
        }
    }

    // --- Welcome text centered below the menu ---
    Text {
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.verticalCenter: parent.verticalCenter
        anchors.topMargin: topBar.height + 20
        text: "Welcome, " + root.username
        font.pixelSize: 24
        color: "green"
    }
}
