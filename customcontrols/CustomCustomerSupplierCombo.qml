import QtQuick
import QtQuick.Controls
// import "../javascripts/HttpRequest.js" as Http

Item {
    id: root
    property alias text: displayTextItem.text
    property string placeholderText: "Cliente"
    property string selectedId: ""
    property string selectedCompany: ""
    property string selectedCountry: ""
    property string selectedAddress: ""
    property string selectedNIF: ""
    //property string apiUrl: "http://yourserver.com/api/customers.php" // Set your API endpoint
    property bool isLoading: false
    property string errorMessage: ""

    implicitHeight: 40

    // Signal emitted when data is loaded
    signal dataChanged()
    signal dataError(string error)

    function safeString(value) {
        if (value === undefined || value === null) {
            return ""
        }
        if (typeof value === "object") {
            if (value.$oid !== undefined) {
                return value.$oid
            }
            return ""
        }
        return value
    }

    // Function to load data from server
    function loadData() {
        isLoading = true
        errorMessage = ""
        let apiUrl = placeholderText == "Cliente" ? "backend/customers.php" : "backend/suppliers.php"
        console.log("Loading customers suppliers from backend...")

        HttpRequest.get(apiUrl, function(success, response) {
            isLoading = false
            if (success && response.status === "ok") {
                var items = response.customers || response.suppliers || []
                console.log("customers suppliers loaded:", items.length)
                theModel.clear()
                // Place an entry 'nova empresa' at the top of the list
                theModel.append({ id: "new", company: "Nova Empresa", country: "", address: "", nif: "" })
                for (var i = 0; i < items.length; i++) {
                    theModel.append(items[i])
                    console.log("---------------> customers suppliers:", items[i])
                }
                // Always select first entry ("Nova Empresa") regardless of data loaded
                combo.currentIndex = 0
                dataChanged()
            } else {
                console.log("Failed to load customers suppliers:", response)
                errorMessage = response.error || "Unknown error"
                dataError(errorMessage)
            }
        })
    }

    // Load data when component is completed
    Component.onCompleted: {
        loadData()
    }

    ComboBox {
        id: combo
        anchors.fill: parent
        enabled: !root.isLoading && root.enabled
        
        model: ListModel {
            id: theModel
        }

        currentIndex: -1
        editable: false
        leftPadding: 6
        topPadding: 6
        rightPadding: 16
        font.pixelSize: 16
        height: contentItem.implicitHeight + 10

        background: Rectangle {
            radius: 4
            border.width: 1
            border.color: combo.activeFocus ? "#FF04AA6D" : "gray"
            color: "transparent"
        }

        contentItem: Item {
            anchors.fill: parent
            
            Text {
                id: displayTextItem
                text: root.isLoading ? "Carregando..." : 
                      (combo.currentIndex >= 0 ? combo.model.get(combo.currentIndex).company : "")
                anchors.fill: parent
                anchors.leftMargin: combo.leftPadding
                anchors.rightMargin: combo.rightPadding
                verticalAlignment: Text.AlignVCenter
                horizontalAlignment: Text.AlignLeft
                font.pixelSize: 16
                color: root.isLoading ? "gray" : (root.enabled ? "black" : "gray")
            }
            
            // Loading indicator
            BusyIndicator {
                visible: root.isLoading
                running: root.isLoading
                anchors.right: parent.right
                anchors.verticalCenter: parent.verticalCenter
                anchors.rightMargin: 30
                width: 30
                height: 30
            }
        }

        popup: Popup {
            y: combo.height + 1
            width: combo.width
            
            background: Rectangle {
                border.color: "green"
                border.width: 0
            }

            contentItem: ListView {
                id: listView
                anchors.fill: parent
                anchors.margins: 0
                implicitWidth: combo.width
                implicitHeight: 200
                model: combo.model
                clip: true
                currentIndex: combo.currentIndex

                ScrollBar.vertical: ScrollBar {
                    id: scrollBar
                    policy: ScrollBar.AsNeeded
                    width: 6
                    active: true
                    z: 20
                    
                    contentItem: Rectangle {
                        radius: 3
                        color: "gray"
                    }
                }

                delegate: ItemDelegate {
                    id: delegate
                    width: listView.width - scrollBar.width
                    padding: 0
                    text: model.company
                    highlighted: ListView.isCurrentItem

                    background: Rectangle {
                        anchors.fill: parent
                        anchors.margins: 0
                        color: highlighted ? "lightblue" : (enabled && hovered ? "lightgray" : "white")
                    }

                    contentItem: Text {
                        text: delegate.text
                        color: enabled ? (highlighted ? "red" : "black") : "gray"
                        verticalAlignment: Text.AlignVCenter
                        elide: Text.ElideRight
                        leftPadding: 4
                        font.pixelSize: 14
                    }

                    onClicked: {
                        combo.currentIndex = index
                        combo.popup.close()
                        displayTextItem.text = delegate.text
                    }
                }
            }
        }

        onCurrentIndexChanged: {
            if (currentIndex >= 0) {
                var entry = model.get(currentIndex)
                if (!entry) {
                    return
                }
                root.selectedId = safeString(entry.id || entry._id)
                root.selectedCompany = safeString(entry.company || entry.name)
                root.selectedCountry = safeString(entry.country || entry.countryCode)
                root.selectedAddress = safeString(entry.address)
                root.selectedNIF = safeString(entry.nif || entry.vat)
                root.dataChanged()
            }
        }
    }

    // Floating placeholder
    Text {
        id: floatingLabel
        text: root.placeholderText
        color: combo.activeFocus ? "#FF04AA6D" : "gray"
        anchors.left: combo.left
        anchors.leftMargin: 6
        font.pixelSize: 14
        z: 2

        Behavior on y { NumberAnimation { duration: 100; easing.type: Easing.InOutQuad } }
        Behavior on font.pixelSize { NumberAnimation { duration: 100; easing.type: Easing.InOutQuad } }
        Behavior on color { ColorAnimation { duration: 100 } }
    }

    // Small rectangle that wraps the floating label
    Rectangle {
        id: labelBox
        radius: 4
        z: 1
        color: "white"
        border.width: 0

        width: floatingLabel.paintedWidth + 2
        height: floatingLabel.paintedHeight + 2

        x: floatingLabel.x - 1
        y: floatingLabel.y - 1

        visible: (combo.activeFocus || displayTextItem.text.length > 0)
    }

    states: [
        State {
            name: "floating"
            when: combo.activeFocus || displayTextItem.text.length > 0
            PropertyChanges { target: floatingLabel; y: -height + 6; font.pixelSize: 12 }
        },
        State {
            name: "normal"
            when: !combo.activeFocus && displayTextItem.text.length === 0
            PropertyChanges {
                target: floatingLabel;
                y: combo.height/2 - floatingLabel.height/2;
                font.pixelSize: 14
            }
        }
    ]
}
