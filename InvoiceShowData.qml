import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import "customcontrols"

ScrollView {
    id: root
    property string username: "User"
    property var header
    property var totals
    property alias model: invoiceRowModel
    signal clearInvoiceData()
    signal generatePdf()

    ScrollBar.horizontal.policy: ScrollBar.AlwaysOff
    ScrollBar.vertical.policy: ScrollBar.AsNeeded
    // Match horizontal size to parent container (StackLayout page)
    contentWidth: availableWidth
    contentHeight: formLayout.implicitHeight + 80
    clip: true

    ListModel {
        id: invoiceRowModel
    }
    ColumnLayout {
        id: formLayout
        width: root.width
        spacing: 10

        InvoiceShowHeader {
            id: invoiceHeader
            headerData: root.header
            onClearAll: {
                invoiceRowModel.clear()
                root.header = null
                clearInvoiceData()
            }
        }

        InvoiceShowRows {
            Layout.fillWidth: true
            id: invoiceRows
            model: invoiceRowModel
            visible: root.header ? true : false
        }
        InvoiceShowTail {
            id: invoiceTail
            totalsData: root.totals
            Layout.fillWidth: true
            //headerData: root.header
            //rowModel: invoiceRowModel
            visible: root.header ? true : false
        }

        CustomButton {
            text: "Gerar PDF"
            Layout.alignment: Qt.AlignHCenter | Qt.AlignBottom
            onClicked: {
                generatePdf()
            }
            visible: root.header ? true : false
            //enabled: header.text !== "" && textModel.count > 0
        }
    }
}
