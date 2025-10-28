import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
// import QtQuick.Pdf
import Smoothfact

Rectangle{
    property alias pdfData: pdfController.pdfData
    property bool refresh: false
    // anchors.fill: parent
    // JavaScript function to trigger download
    signal closeInvoiceShowPDF()
    onRefreshChanged: {
        // Reset status label when component becomes visible
        if (refresh) {
            pdfController.generateSamplePDF()
        }
    }
    function downloadBlob(base64Data, filename) {
        // This JavaScript code will run in the browser
        var jsCode = "
            (function() {
                // Convert base64 to blob
                var byteCharacters = atob('" + base64Data + "');
                var byteNumbers = new Array(byteCharacters.length);
                for (var i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                var blob = new Blob([byteArray], {type: 'application/pdf'});

                // Create download link
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = '" + filename + "';

                // Trigger download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Clean up
                setTimeout(function() {
                    window.URL.revokeObjectURL(link.href);
                }, 100);
            })();
        ";

        // Execute JavaScript in browser context
        if (typeof Qt !== 'undefined' && Qt.platform.os === "wasm") {
            eval(jsCode);
        }
    }

    // Alternative method using Qt's WebAssembly API
    function downloadPdfWeb() {
        if (!pdfController.hasPdf) return;

        var base64 = pdfController.getPdfAsBase64();
        var filename = "document_" + Date.now() + ".pdf";

        // Create a data URL and trigger download
        var dataUrl = "data:application/pdf;base64," + base64;

        // Create invisible link and click it
        var link = Qt.createQmlObject('
            import QtQuick
            Item {
                Component.onCompleted: {
                    Qt.openUrlExternally("' + dataUrl + '");
                }
            }
        ', window, "dynamicLink");
    }

    ToolBar {
        id: toolbar
        anchors.top: parent.top
        anchors.left: parent.left
        anchors.right: parent.right
        height: 30

        PDFController{
            id: pdfController
            provider: imageProvider
        }
        RowLayout {
            anchors.fill: parent
            anchors.margins: 2

            // Button {
            //     text: "Generate PDF"
            //     icon.name: "document-new"
            //     onClicked: pdfController.generateSamplePDF()
            //     Layout.preferredWidth: 120
            // }
            Button {
                text: "Download"
                //icon.name: "document-save"
                enabled: pdfController.hasPdf
                onClicked: pdfController.downloadPdf()
                // Layout.preferredWidth: 80

                ToolTip.visible: hovered
                ToolTip.text: "Download PDF to your computer"
            }

            Item {
                Layout.fillWidth: true
            }

            Button {
                text: "<<"
                enabled: pdfController.hasPdf && pdfController.currentPage > 0
                onClicked: pdfController.firstPage()
                Layout.preferredWidth: 30
            }

            Button {
                text: "<"
                enabled: pdfController.hasPdf && pdfController.currentPage > 0
                onClicked: pdfController.previousPage()
                Layout.preferredWidth: 30
            }

            Label {
                text: pdfController.hasPdf ?
                          " " + (pdfController.currentPage + 1) + "/" + pdfController.pageCount :
                          "No PDF loaded"
                horizontalAlignment: Text.AlignHCenter
                // Layout.preferredWidth: 150
            }

            Button {
                text: ">"
                enabled: pdfController.hasPdf && pdfController.currentPage < pdfController.pageCount - 1
                onClicked: pdfController.nextPage()
                Layout.preferredWidth: 30
            }

            Button {
                text: ">>"
                enabled: pdfController.hasPdf && pdfController.currentPage < pdfController.pageCount - 1
                onClicked: pdfController.lastPage()
                Layout.preferredWidth: 30
            }

            Item {
                Layout.fillWidth: true
            }

            Button {
                text: "-"
                enabled: pdfController.zoom > 0.25
                onClicked: pdfController.zoomOut()
                Layout.preferredWidth: 30
            }

            Label {
                text: Math.round(pdfController.zoom * 100) + "%"
                horizontalAlignment: Text.AlignHCenter
                //Layout.preferredWidth: 60
            }

            Button {
                text: "+"
                enabled: pdfController.zoom < 4.0
                onClicked: pdfController.zoomIn()
                Layout.preferredWidth: 30
            }

            Button {
                text: "Reset"
                onClicked: pdfController.resetZoom()
                //Layout.preferredWidth: 50
            }

            Item {
                Layout.fillWidth: true
            }
            Button {
                text: "Close"
                //icon.name: "window-close"
                onClicked: closeInvoiceShowPDF()
                //Layout.preferredWidth: 100
            }
            // Label {
            //     id: statusLabel
            //     text: pdfController.hasPdf ?
            //               "Memory PDF (" + pdfController.pageCount + " pages)" : ""
            //     color: "gray"
            // }
        }
    }

    Rectangle {
        anchors.top: toolbar.bottom
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.bottom: parent.bottom
        //anchors.fill: parent
        color: "#e0e0e0"

        ScrollView {
            id: scroll
            anchors.fill: parent
            clip: true

            // Container that ensures centering behavior
            Item {
                id: contentItem
                width: Math.max(scroll.width, pdfImage.width)
                height: Math.max(scroll.height, pdfImage.height)
                implicitHeight: pdfImage.height
                implicitWidth: pdfImage.width

                Image {
                    id: pdfImage
                    anchors.centerIn: parent

                    source: pdfController.hasPdf ?
                                "image://pdf/" + pdfController.currentPage + "?zoom=" + pdfController.zoom + "&t=" + Date.now() :
                                ""

                    sourceSize.width: 800 * pdfController.zoom
                    sourceSize.height: 1200 * pdfController.zoom

                    fillMode: Image.PreserveAspectFit
                    smooth: true
                    cache: false  // Important for dynamic updates
                    asynchronous: true  // Load images asynchronously

                    // Loading indicator
                    BusyIndicator {
                        anchors.centerIn: parent
                        running: pdfImage.status === Image.Loading
                    }

                    // Error message
                    Label {
                        anchors.centerIn: parent
                        text: "Failed to load page"
                        visible: pdfImage.status === Image.Error && pdfController.hasPdf
                    }
                }
            }
        }

        // No PDF loaded message
        Label {
            anchors.centerIn: parent
            text: "Click 'Generate PDF' to create a sample PDF in memory"
            font.pixelSize: 18
            color: "gray"
            visible: !pdfController.hasPdf
        }
    }
    // Handle download signal
    Connections {
        target: pdfController

        function onDownloadReady(base64Data, filename) {
            downloadBlob(base64Data, filename);
            statusLabel.text = "Download started: " + filename;
            statusLabel.color = "green";
        }
    }

    // // Keyboard shortcuts
    // Shortcut {
    //     sequence: "Left"
    //     onActivated: pdfController.previousPage()
    // }
    //
    // Shortcut {
    //     sequence: "Right"
    //     onActivated: pdfController.nextPage()
    // }
    //
    // Shortcut {
    //     sequence: "Home"
    //     onActivated: pdfController.firstPage()
    // }
    //
    // Shortcut {
    //     sequence: "End"
    //     onActivated: pdfController.lastPage()
    // }
    //
    // Shortcut {
    //     sequence: StandardKey.ZoomIn
    //     onActivated: pdfController.zoomIn()
    // }
    //
    // Shortcut {
    //     sequence: StandardKey.ZoomOut
    //     onActivated: pdfController.zoomOut()
    // }
    //
    // Shortcut {
    //     sequence: "Ctrl+0"
    //     onActivated: pdfController.resetZoom()
    // }
}
