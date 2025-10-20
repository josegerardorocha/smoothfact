import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
//import QtQuick.Pdf
import Smoothfact

Rectangle {
    color: "white"
    //anchors.fill: parent
    Layout.fillWidth: true
    Layout.fillHeight: true
    property string username: "User"

    RemotePdfRenderer {
        id: pdfRenderer
        onPageCountChanged: {
            console.log("++++++++++ Page count changed:", pageCount)
            viewer.visible = pageCount > 0
        }
        onDownloadProgress: (bytesReceived, bytesTotal) => {
                                console.log("++++++++++++++ Download progress:", bytesReceived, "bytes of", bytesTotal)
                            }
        onCurrentPageChanged: {
            console.log("++++++++++++++ Current page changed:", currentPage)
        }
    }

    SplitView {
        id: mainSplitView
        anchors.fill: parent
        orientation: Qt.Horizontal
        handle: Rectangle {
            implicitWidth: 2
            implicitHeight: 2
        }
    //RowLayout {
        //anchors.fill: parent
        //anchors.margins: 20
        //spacing: 20
        InvoiceForm{
            Layout.fillWidth: true
            Layout.fillHeight: true
            onGeneratePdf: {
                pdfRenderer.urlToLoad = "http://localhost/faturas/backend/invoice.php?user=" + username
                imgPdfProvider.renderer = pdfRenderer
            }
        }
        InvoiceShowPDF {
            id: viewer
            renderer: pdfRenderer
            visible: false
            Layout.fillWidth: true
            Layout.fillHeight: true
        }
    }
}
