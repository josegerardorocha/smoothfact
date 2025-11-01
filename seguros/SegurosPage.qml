import QtQuick
import QtQuick.Layouts
import Smoothfact

Rectangle {
    id: root
    color: "white"
    //anchors.fill: parent
    Layout.fillWidth: true
    Layout.fillHeight: true
    ColumnLayout{
        anchors.fill: parent
        anchors.margins: 20
        spacing: 20

        CustomCombo {
            id: combo
            placeholderText: "Tipo de seguro"
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignBottom
            model: ListModel {
                ListElement { name: "Seguro de Acidentes de Trabalho" }
                ListElement { name: "Seguro de Responsabilidade Civil" }
                ListElement { name: "Seguro Automóvel" }
                ListElement { name: "Seguro Multirriscos" }
            }
            onIndexChanged: {
                console.log("Seguro selecionado:", combo.index)
                //titleText.text = combo.selectedText
                stack.currentIndex = combo.index
                console.log("Stack index alterado para:", stack.currentIndex)
            }
        }
        Item{
            Layout.fillWidth: true
            Layout.fillHeight: true
            StackLayout {
                anchors.fill: parent
                id: stack
                visible: combo.index >= 0
                Text{
                    Layout.fillWidth: true
                    Layout.fillHeight: true
                    text: "Seguro de Acidentes de Trabalho"
                    font.pixelSize: 24
                }
                Text{
                    Layout.fillWidth: true
                    Layout.fillHeight: true
                    text: "Seguro de Responsabilidade Civil"
                    font.pixelSize: 24
                }
                Text{
                    Layout.fillWidth: true
                    Layout.fillHeight: true
                    text: "Seguro Automóvel"
                    font.pixelSize: 24
                }
                SeguroMultirrisco{
                    Layout.fillWidth: true
                    Layout.fillHeight: true
                }
            }
        }
    }
}
