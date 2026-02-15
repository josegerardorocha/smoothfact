import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import Smoothfact

Rectangle {
    color: "white"
    Layout.fillWidth: true
    Layout.fillHeight: true

    //property string username: "User"

    StackLayout{
        anchors.fill: parent
        //anchors.margins: 20
        id: stackLayout
        // Layout.fillWidth: true
        // Layout.fillHeight: true
        ColumnLayout {
            Text {
                Layout.fillWidth: true
                //anchors.centerIn: parent
                text: "Documento da Alfândega"
                font.pixelSize: 24
                color: "green"
            }
            CustomButton {
                text: "Gerar PDF"
                Layout.alignment: Qt.AlignHCenter | Qt.AlignBottom
                onClicked: {
                    // var rows = []
                    // for(let i=0; i< showData.model.count; i++){
                    //     rows.push(showData.model.get(i))
                    // }
                    viewer.pdfData = {
                        "id": PDFController.ALFANDEGA,
                        // "header": showData.header,
                        // "totais": showData.totals,
                        // "rows": rows
                    }
                    stackLayout.currentIndex = 1
                    viewer.updatePdf()
                }
                //visible: root.header ? true : false
                //enabled: header.text !== "" && textModel.count > 0
            }
        }
        InvoiceShowPDF {
            id: viewer
            Layout.fillWidth: true
            Layout.fillHeight: true
            // refresh: stackLayout.currentIndex === 1
            onCloseInvoiceShowPDF: {
                stackLayout.currentIndex = 0
            }
        }
    }
}
