import QtQuick
import QtQuick.Layouts
import Smoothfact
// import "../sellinvoice"
//import ".."

StackLayout {
    id: root
    property string username: ""
    signal logout()

    InfoPage {  // Configuração
        id: infoPage
        username: root.username
        Layout.fillWidth: true
    }
    WorkersPage { // Trabalhadores
        id: workerspage
        username: root.username
        Layout.fillWidth: true
    }

    SellInvoicePage {   // Vendas
        id: sellInvoicePage
    }
    SegurosPage{   // Seguros
        id: segurosPage
    }
    InvoicePage {   // Compras
        id: invoicePage
    }
    BankMovementPage {
        id: bankPage
    }

    onCurrentIndexChanged: {    // logout
        //console.log("MainStack: currentIndex changed to", currentIndex)
        if(currentIndex === 1000){
            //console.log("Logout selected - returning to login screen")
            currentIndex = -1
            root.logout()
        }
    }
}
