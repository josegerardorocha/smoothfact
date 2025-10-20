import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

ApplicationWindow {
    id: root
    width: 1400
    height: 600
    visible: true
    title: qsTr("SmoothFact")

    property Item loginPageRef: null

    StackView {
        id: stack
        anchors.fill: parent
        initialItem: loginComponent
    }
    Component {
        id: loginComponent

        LoginForm {
            id: loginForm
            onLoginSuccess: (username) => {
                                //  console.log("Login successful for user:", username)
                                // Push MainMenu page with 'username' property set
                                root.loginPageRef = loginForm
                                stack.push(mainMenuComponent, { username: username })
                            }
        }
    }

    // Define MainMenu component separately
    Component {
        id: mainMenuComponent

        MainMenu {
            id: infoPage
            property string username: ""

            onLogout: {
                // console.log("Logged out, returning to login screen")
                HttpRequest.post("backend/logout.php", "", function(success, response) {
                    if (success) {
                        // console.log("Logout response:", response)
                        if (response.status === "ok") {
                            // console.log("User logged out successfully.")
                        } else {
                            console.log("Unexpected response:", response)
                        }
                    } else {
                        console.log("Logout request failed.")
                    }
                })
                // Go back to LoginForm
                root.loginPageRef.clear()
                stack.pop()
            }
        }
    }
}
