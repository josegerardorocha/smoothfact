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

        CustomButton {
            id: submitButton
            text: "Submit"
            onClicked: {
                var params = "username=" + encodeURIComponent(root.username) +
                        "&password=" + encodeURIComponent(root.password)

                HttpRequest.post("backend/login.php", params,
                                 function(success, response) {
                                     if (success && response.success) {
                                         console.log("Login OK, user:", response.username)
                                         root.loginSuccess(response.username)
                                     } else {
                                         console.log("Login failed: ", response ? response.message : "No response")
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
