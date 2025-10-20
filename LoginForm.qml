import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import QtQuick.Shapes

RowLayout{
    id: root
    spacing: 0
    property alias username: loginDialog.username
    property alias password: loginDialog.password
    signal loginSuccess(string username)

    function clear() {
        username = ""
        password = ""
    }

    Rectangle{
        id: container
        Layout.fillHeight: true
        Layout.fillWidth: true
        color: "white"
        border.width: 0
        Layout.preferredWidth: 3
        Shape {
            anchors.fill: parent

            ShapePath {
                strokeWidth: 0
                //fillColor: "#FF04AA6D"
                fillGradient: LinearGradient {
                    x1: 0; y1: 0                 // start point (top)
                    x2: 0; y2: container.height  // end point (bottom)
                    GradientStop { position: 0.0; color: "#FF04AA6D" }
                    GradientStop { position: 1.0; color: "#8804AA6D" }
                }

                startX: 0
                startY: 0

                PathLine { x: container.width; y: 0 }            // top-right
                PathLine { x: container.width * 0.7; y: container.height }  // bottom-right inset
                PathLine { x: 0; y: container.height }           // bottom-left
                PathLine { x: 0; y: 0 }                          // back to top-left
            }
        }
        Text{
            anchors.left: parent.left
            anchors.leftMargin: 20
            anchors.verticalCenter: parent.verticalCenter
            //anchors.topMargin: -12
            text: "SmoothFact"
            font.pixelSize: 48
            color: "white"
            font.bold: true

        }
    }
    LoginDialog{
        id: loginDialog
        onLoginSuccess: (username) => {
                            root.loginSuccess(username)
                            //console.log("LoginForm: Login successful for user:", username)
                        }
    }
}
