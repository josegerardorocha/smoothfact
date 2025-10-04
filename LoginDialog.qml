import QtQuick
import QtQuick.Layouts
import QtQuick.Controls

Rectangle{
    Layout.fillHeight: true
    Layout.fillWidth: true
    //Layout.preferredWidth: 400
    color: "white"

    signal loginSuccess(string username)
    // function sha256(str) {
    //     // returns a hex string of SHA-256 hash
    //     if (typeof crypto !== "undefined" && crypto.subtle) {
    //         var enc = new TextEncoder()
    //         var data = enc.encode(str)
    //         return crypto.subtle.digest("SHA-256", data).then(function(hashBuffer) {
    //             var hashArray = Array.from(new Uint8Array(hashBuffer))
    //             return hashArray.map(b => b.toString(16).padStart(2,'0')).join('')
    //         })
    //     } else {
    //         console.warn("Crypto API not available, sending plaintext!")
    //         return str
    //     }
    // }

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
                // 1. Get the text
                var username = usernameField.text
                var password = passwordField.text

                // 2. Hash the password (SHA-256)
                // var hashedPassword = sha256(password)

                // 3. Send POST request to PHP
                var xhr = new XMLHttpRequest()
                xhr.open("POST", "http://localhost/faturas/backend/login.php")
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        console.log("Server response:", xhr.responseText)
                        var response = JSON.parse(xhr.responseText)
                        console.log("Username:", response.username)
                        root.loginSuccess(response.username)
                    }
                }
                var params = "username=" + encodeURIComponent(username) +
                        "&password=" + encodeURIComponent(password)
                xhr.send(params)
            }
        }
    }
}
