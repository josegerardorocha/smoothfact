import QtQuick
import QtQuick.Layouts
import QtQuick.Controls
import "customcontrols"

Rectangle{
    id: root
    Layout.fillHeight: true
    Layout.fillWidth: true
    color: "white"
    property alias username: usernameField.text
    property alias password: passwordField.text

    signal loginSuccess(string username)

    ColumnLayout {
        anchors.centerIn: parent
        anchors.topMargin: 100
        spacing: 10
        width: parent.width * 0.8

        Text{
            //Layout.topMargin: 100
            font.pixelSize: 24
            text: "Login"
            color: "#FF04AA6D"
            font.bold: true
            Layout.alignment: Qt.AlignHCenter
            Layout.bottomMargin: 20
        }

        CustomTextField{
            id: usernameField
            placeholderText: "Username"
            Layout.fillWidth: true
        }

        CustomTextField {
            id: passwordField
            placeholderText: "Password"
            echoMode: TextInput.Password
            Layout.fillWidth: true
        }

        Button {
            id: submitButton
            text: "Submit"
            implicitHeight: 48
            implicitWidth: 160
            Layout.alignment: Qt.AlignHCenter
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
                                         : submitButton.hovered ? "#AAFFAA"   // light green on hover
                                                                : "transparent"

                //Behavior on color { ColorAnimation { duration: 120 } }
            }
            onClicked: {
                var params = "username=" + encodeURIComponent(root.username) +
                        "&password=" + encodeURIComponent(root.password)

                HttpRequest.post("backend/login.php", params,
                                 function(success, response) {
                                     if (success && response.success) {
                                         console.log("Login OK, user:", response.username)
                                         root.loginSuccess(response.username)
                                     } else {
                                         console.log("Login failed")
                                         errorAnim.restart()
                                     }
                                 }
                )
            }
        }
        Text {
            id: errorText
            text: "Login failed"
            color: "red"
            font.pixelSize: 16
            opacity: 0.0
            Layout.alignment: Qt.AlignHCenter
        }

        SequentialAnimation {
            id: errorAnim
            running: false
            PropertyAnimation { target: errorText; property: "opacity"; from: 0; to: 1; duration: 50 }
            PauseAnimation { duration: 750 }
            PropertyAnimation { target: errorText; property: "opacity"; from: 1; to: 0; duration: 600 }
        }
    }
}
