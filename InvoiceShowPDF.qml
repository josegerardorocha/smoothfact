import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import QtQuick.Pdf//

Rectangle{
    border.width: 1
    border.color: "red"
    color: "lightgray"
    property var renderer: null

    ColumnLayout{
        anchors.fill: parent
        RowLayout {
            Layout.fillWidth: true
            height: 40
            spacing: 12
            //anchors.horizontalCenter: parent.horizontalCenter
            Layout.alignment: Qt.AlignHCenter

            Button {
                text: "Zoom in"
                enabled: renderer.pageCount > 0
                onClicked: renderer.zoomLevel++
            }
            Button {
                text: "Zoom out"
                enabled: renderer.pageCount > 0
                onClicked: renderer.zoomLevel--
            }
            Button {
                text: "Previous"
                enabled: renderer.currentPage > 0
                onClicked: renderer.currentPage--
            }

            Label {
                text: (renderer.pageCount > 0)
                      ? `${renderer.currentPage + 1} / ${renderer.pageCount}`
                      : "No pages"
            }

            Button {
                text: "Next"
                enabled: renderer.currentPage < renderer.pageCount - 1
                onClicked: renderer.currentPage++
            }
        }
        ScrollView {
            Layout.fillWidth: true
            Layout.fillHeight: true
            ScrollBar.horizontal.policy: ScrollBar.AsNeeded
            ScrollBar.vertical.policy: ScrollBar.AsNeeded
            clip: true

            contentWidth: pageView.implicitWidth
            contentHeight: pageView.implicitHeight

            Image {
                id: pageView
                source: renderer.currentPage >= 0 ?
                            "image://imgPdfProvider/page?ver=" + renderer.imageVersion : ""
                fillMode: Image.Pad  // keeps real image size (no scaling)
                smooth: true
                cache: false
                // width: parent.width  <-- remove this!
            }
        }
    }

}
