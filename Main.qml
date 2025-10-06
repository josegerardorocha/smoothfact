import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

ApplicationWindow {
    width: 1400
    height: 800
    visible: true
    title: qsTr("SmoothFact")

    StackLayout {
        id: stack
        anchors.fill: parent
        currentIndex: 0
        LoginForm {
            id: loginForm
            visible: true
            onLoginSuccess: (username) => {
                                stack.currentIndex = 1
                                infoPage.username = username
                                console.log("Login successful for user:", username)
                            }
        }
        MainMenu {
            id: infoPage
            onLogout: {
                stack.currentIndex = 0
                loginForm.username = ""
                loginForm.password = ""
                console.log("Logged out, returning to login screen")
            }
        }
    }
}
