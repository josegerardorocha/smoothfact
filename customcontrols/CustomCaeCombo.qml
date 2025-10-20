import QtQuick 2.15
import QtQuick.Controls 2.15
import "cae.js" as CAE
import "fuse.min.js" as FuseJS

Item {
    id: root
    property alias text: combo.editText
    property string placeholderText: "Enter text"

    implicitWidth: combo.implicitWidth
    implicitHeight: combo.implicitHeight

    // helper function that returns the prefixed Designacao string
    function getCAEprefix(item, normalizedDesignacao) {
        let prefix = "";

        if ("Seccao" in item) {
            prefix = item.Seccao;
        }
        if ("Subclasse" in item) {
            if (prefix !== "") prefix += ".";
            prefix += item.Subclasse.toString();
        }
        if ("Classe" in item) {
            if (prefix !== "") prefix += ".";
            prefix += item.Classe.toString();
        }
        if ("Grupo" in item) {
            if (prefix !== "") prefix += ".";
            prefix += item.Grupo.toString();
        }
        if ("Divisao" in item) {
            if (prefix !== "") prefix += ".";
            prefix += item.Divisao.toString();
        }
        return `${prefix} - ${normalizedDesignacao}`;
    }

    ComboBox {
        id: combo
        anchors.fill: parent
        model: ListModel { id: caeModel }
        currentIndex: 0
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
        contentItem: TextField {
            text: combo.editText
            anchors.fill: parent
            anchors.leftMargin: combo.leftPadding
            anchors.rightMargin: combo.rightPadding
            verticalAlignment: Text.AlignVCenter
            horizontalAlignment: Text.AlignLeft
            //color: "black"
            property var fuse

            background: Rectangle {
                border.width: 0
                color: "transparent"
            }
            Component.onCompleted: {
                for (let i = 0; i < CAE.data.length; ++i)
                    caeModel.append(CAE.data[i])
                combo.currentIndex = -1 // No selection initially

                // Normalize strings (remove accents, lower case)
                const normalize = s => s ? s.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : ""
                // const normalizedData = CAE.data.map(item => ({
                //                                                  Designacao: normalize(item.Designacao),
                //                                                  original: item
                //                                              }))
                const normalizedData = CAE.data.map(item => ({
                    Designacao: getCAEprefix(item, normalize(item.Designacao)),
                    original: item
                }));
                const options = {
                    keys: ["Designacao"],
                    includeScore: true,
                    threshold: 0.4
                }
                fuse = new Fuse(normalizedData, options)
            }

            onTextEdited: {
                // console.log("User typed:", text)
                // Call your search algorithm here
                combo.popup.open()
                let term = text
                term = term.trim()
                caeModel.clear()

                if (term === "") {
                    // show all if empty
                    for (let i = 0; i < CAE.data.length; ++i)
                        caeModel.append(CAE.data[i])
                }
                else {
                    const normalizedTerm = term.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
                    const results = fuse.search(normalizedTerm)
                    for (let i = 0; i < results.length; ++i)
                        caeModel.append(results[i].item.original)
                }
                // console.log("User typed:", text)
            }
        }
        popup: Popup {
            y: combo.height + 1 // Aligns the top of the popup with the bottom of the ComboBox
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
                    z:20
                    contentItem: Rectangle {
                        radius: 3
                        color: "gray"
                    }
                }
                delegate: ItemDelegate {
                    id: delegate
                    width: listView.width - scrollBar.width
                    padding: 0
                    text: getCAEprefix(model, model.Designacao)
                    highlighted: ListView.isCurrentItem
                    enabled: model.Seccao === ""  // Disable items with Seccao

                    // Custom background based on the item content
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
                        root.text = delegate.text
                        combo.popup.close() // Close the popup after selection
                        // console.log("cae=", root.text)
                    }
                }
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
    // --- Small rectangle that wraps the floating label ---
    Rectangle {
        id: labelBox
        radius: 4
        z: 1                              // behind the floatingLabel
        color: "white"                    // white background when visible
        border.width: 0

        // size follows the painted size of the Text + padding
        width: floatingLabel.paintedWidth + 2
        height: floatingLabel.paintedHeight + 2

        // position follows the floating label
        x: floatingLabel.x - 1
        y: floatingLabel.y - 1

        visible: (combo.activeFocus || combo.editText.length > 0)
    }

    states: [
        State {
            name: "floating"
            when: combo.activeFocus || combo.editText.length > 0
            PropertyChanges { target: floatingLabel; y: -height+6; font.pixelSize: 12 }
        },
        State {
            name: "normal"
            when: !combo.activeFocus && combo.editText.length === 0
            PropertyChanges {
                target: floatingLabel;
                y: combo.height/2 - floatingLabel.height/2;
                font.pixelSize: 14
            }
        }
    ]
}
