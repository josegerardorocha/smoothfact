import QtQuick
import QtQuick.Controls

ApplicationWindow {
    width: 1400
    height: 800
    visible: true
    title: qsTr("SmoothFact")

    LoginForm {
        id: loginForm
        anchors.fill: parent
        visible: true

        onLoginSuccess: (username) => {
            loginForm.visible = false
            infoPage.username = username
            infoPage.visible = true
            console.log("Login successful for user:", username)
        }
    }


    Info {
        id: infoPage
        anchors.fill: parent
        visible: false
    }
}
