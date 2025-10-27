import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import "menu"

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
        Item{
            id: mainItem
            property int currentPage: -1
            property string username: ""
            Component { // logout icon
                id: logout
                LogoutIcon {
                    color: "white"
                    fillColor: "transparent"
                    strokeWidth: 2
                    width: 24
                    height: 24
                }
            }
            MainMenu {
                id: myMenu
                anchors.top: parent.top
                anchors.left: parent.left
                anchors.right: parent.right
                //property string username: ""

                model: [
                    { title: "Empresa",
                        submenus: ["Configuração", "Trabalhadores", "Venda"], baseIndex: 0,
                        //icon: empresa
                    },
                    { title: "Faturas",
                        submenus: ["Seguros", "Compra"], baseIndex: 3,
                        //icon: faturas
                    },
                    { title: "Banco",
                        submenus: ["Banco"], baseIndex: 5,
                        //icon: banco
                    },
                    { title: "Logout",
                        submenus: ["Logout"], baseIndex: 1000,
                        icon: logout
                    }
                ]
                onSubmenuClicked: (menuTitle, submenuTitle, submenuIndex) => {
                                      console.log("Clicked: menuTitle", menuTitle, "submenuTitle", submenuTitle, "submenuIndex:", submenuIndex)
                                      // Change the page in the StackLayout
                                      currentPage = submenuIndex
                                  }
            }
            MainStack{
                id: mainStack
                username: mainItem.username
                anchors.top: myMenu.bottom
                anchors.left: parent.left
                anchors.right: parent.right
                anchors.bottom: parent.bottom
                currentIndex: currentPage

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
}
