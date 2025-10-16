import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import QtQuick.Pdf

Rectangle {
    color: "white"
    //anchors.fill: parent
    Layout.fillWidth: true
    Layout.fillHeight: true
    property string username: "User"

    // RowLayout {
    //     spacing: 20
    //     CheckBox {
    //         text: "Buy"
    //         checked: invoiceType === "Buy"
    //         enabled: editable
    //         onToggled: if (checked) invoiceType = "Buy"
    //     }
    //     CheckBox {
    //         text: "Sell"
    //         checked: invoiceType === "Sell"
    //         enabled: editable
    //         onToggled: if (checked) invoiceType = "Sell"
    //     }
    // }
    RowLayout {
        anchors.fill: parent
        anchors.margins: 20
        spacing: 20
        Rectangle {
            Layout.fillWidth: true
            Layout.fillHeight: true
            color: "transparent"
            Button {
                text: "Generate PDF"
                // anchors.bottom: parent.bottom
                // anchors.horizontalCenter: parent.horizontalCenter
                Layout.alignment: Qt.AlignHCenter | Qt.AlignBottom
                onClicked: {
                    var params = "name=" + encodeURIComponent("John")

                    HttpRequest.postBinary("backend/invoice.php", params,
                                           function(success, response) {
                                               if (success) {
                                                   console.log("PDF received, size:", response.byteLength, "bytes")

                                                   // Convert ArrayBuffer to Base64 data URI for PdfDocument
                                                   var uInt8Array = new Uint8Array(response)
                                                   var binary = ""
                                                   for (var i = 0; i < uInt8Array.length; i++) {
                                                       binary += String.fromCharCode(uInt8Array[i])
                                                   }
                                                   var base64 = Qt.btoa(binary)
                                                   pdfDoc.source = "data:application/pdf;base64," + base64
                                               } else {
                                                   console.log("HttpRequest.postBinary Failed to load PDF")
                                               }
                                           } )
                }
            }
        }
        // Text {
        //     Layout.fillWidth: true
        //     Layout.fillHeight: true
        //     Layout.alignment: Qt.AlignVCenter | Qt.AlignLeft
        //     text: "Welcome, " + username
        //     font.pixelSize: 24
        //     color: "green"
        // }
        // Item{
        //     Layout.fillWidth: true
        //     Layout.fillHeight: true
        // }
        Rectangle {
            Layout.fillWidth: true
            Layout.fillHeight: true
            color: "white"

            PdfDocument {
                id: pdfDoc
            }

            // Top toolbar
            RowLayout {
                spacing: 8
                anchors.top: parent.top
                anchors.left: parent.left
                anchors.right: parent.right
                height: 40
                //spacing: 8
                Rectangle {
                    color: "#f0f0f0";
                    Layout.fillWidth: true;
                    Layout.fillHeight: true;
                    radius: 4;
                    opacity: 0.9
                }

                Button { text: "Zoom -" ; onClicked: pdfView.renderScale = Math.max(0.1, pdfView.renderScale / 1.2) }
                Button { text: "Zoom +" ; onClicked: pdfView.renderScale = Math.min(10, pdfView.renderScale * 1.2) }
                Button { text: "Reset";  onClicked: pdfView.resetScale() }
                Button { text: "Rotate ⟲"; onClicked: pdfView.pageRotation -= 90 }
                Button { text: "Rotate ⟳"; onClicked: pdfView.pageRotation += 90 }

                // slider bound to renderScale
                Slider {
                    id: zoomSlider
                    from: 0.25; to: 4.0; stepSize: 0.05
                    value: 1.0
                    onValueChanged: pdfView.renderScale = value
                    Layout.fillWidth: true
                }

                Label { text: Math.round(pdfView.renderScale*100) + "%" }
            }

            PdfMultiPageView {
                id: pdfView
                anchors.top: parent.top; anchors.topMargin: 48
                anchors.left: parent.left
                anchors.right: parent.right
                anchors.bottom: parent.bottom
                document: pdfDoc

                // initial values
                renderScale: 1.0
                pageRotation: 0

                Component.onCompleted: {
                    // if you want to fit width automatically:
                    // pdfView.scaleToWidth(width, height)
                }
            }
        }
    }
}
