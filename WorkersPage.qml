import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import "customcontrols"

ScrollView {
    id: root
    property string username: "User"

    ScrollBar.horizontal.policy: ScrollBar.AlwaysOff
    ScrollBar.vertical.policy: ScrollBar.AsNeeded
    // Match horizontal size to parent container (StackLayout page)
    contentWidth: availableWidth
    contentHeight: formLayout.implicitHeight + 80
    clip: true

    function generateWorker() {
        //console.log("Generate Worker button clicked", ibanCombo.bancoPrefix)
        if(ibanCombo.bancoPrefix === "") {
            errorText.text = "Selecionar banco"
            errorAnim.restart()
            return
        }
        // Implement worker generation logic here
        //textModel.append({"text": `<b>New item</b><br>Added at ${new Date().toLocaleTimeString()}`})
        var params =
                "&gender=" + (genderCheckbox.b1Checked ? "male" : "female") +
                "&nif_prefix=" + "267" +
                "&niss_prefix=" + "12" +
                "&iban_prefix=" + ibanCombo.bancoPrefix + "0000";
        console.log("+++++++++++++ params: ", params)
        HttpRequest.post("backend/generate_portuguese_name.php", params, function(success, response) {
            if (success) {
                textModel.append({
                                     "name": response.name,
                                     "gender": response.gender,
                                     "address": {
                                         "address": response.address.address,
                                         "street": response.address.street,
                                         "number": response.address.number,
                                         "suffix": response.address.suffix,
                                         "postalCode": response.address.postalCode,
                                         "city": response.address.city,
                                     },
                                     "nif": response.nif,
                                     "niss": response.niss,
                                     "iban": response.iban
                                 })
                console.log("+++++++++++++ Data loaded:", JSON.stringify(response))
            } else {
                console.log("+++++++++++++++++ Failed to load data")
            }
        })
    }
    function workerText(model)
    {
        return `<b>Name:</b> ${model.name}<br>
        <b>Gender:</b> ${model.gender}<br>
        <b>Address:</b> ${model.address.street} ${model.address.number}${model.address.suffix}, ${model.address.postalCode} ${model.address.city}<br>
        <b>NIF:</b> ${model.nif}<br>
        <b>NISS:</b> ${model.niss}<br>
        <b>IBAN:</b> ${model.iban}`
    }
    function submitWorkers()
    {
        var array = [];
        for (var i = 0; i < textModel.count; i++) {
            var item = textModel.get(i);  // get returns an object with all roles
            array.push(item);
        }
        var params = JSON.stringify(array)
        console.log("json array=", params);

        HttpRequest.post("backend/workers.php", params, function(success, response) {
            // console.log("response:", response)
            if (success) {
                console.log("Update successful. Received:", response.insertedCount)
            } else {
                console.log("Update failed")
            }
        }, { "Content-Type": "application/json" })
    }

    ListModel {
        id: textModel
        Component.onCompleted: {
            console.log("Loading workers from backend...")

            HttpRequest.get("backend/workers.php", function(success, response) {
                if (success && response.status === "ok") {
                    console.log("Workers loaded:", response.count)
                    textModel.clear()
                    for (var i = 0; i < response.workers.length; i++) {
                        textModel.append(response.workers[i])
                    }
                } else {
                    console.log("Failed to load workers:", response)
                }
            })
        }
    }
    ColumnLayout {
        id: formLayout
        // anchors.fill: parent
        // anchors.margins: 12
        width: root.width
        spacing: 10

        // The list of HTML-formatted text elements


        ListView {
            id: listView
            model: textModel
            clip: true
            spacing: 10
            Layout.fillWidth: true
            Layout.preferredHeight: contentHeight
            Layout.leftMargin: 10
            Layout.rightMargin: 10

            delegate: ColumnLayout {
                width: listView.width
                spacing: 4

                RowLayout {
                    Layout.fillWidth: true
                    spacing: 10

                    // Worker text
                    Text {
                        Layout.fillWidth: true
                        Layout.preferredWidth: 16
                        textFormat: Text.RichText
                        text: workerText(model)
                        wrapMode: Text.Wrap
                        font.pointSize: 12
                        color: "#333"
                    }

                    // Delete button
                    CustomButton {
                        Layout.fillWidth: true
                        Layout.preferredWidth: 1
                        text: "Delete"
                        onClicked: textModel.remove(index)
                        Layout.alignment: Qt.AlignBottom
                    }
                }

                // Divider line
                Rectangle {
                    Layout.fillWidth: true
                    height: 1
                    color: "#DDDDDD"
                }
            }
        }
        Rectangle{
            Layout.fillWidth: true
            height: 1
            color: "#FF04AA6D"
        }

        RowLayout{
            Layout.fillWidth: true
            spacing: 10
            Layout.leftMargin: 10
            Layout.rightMargin: 10
            CustomBinCheckbox{
                id: genderCheckbox
                // Layout.fillWidth: true
                // Layout.preferredWidth: 1
                title: "Género"
                b1Label: "Masculino"
                b2Label: "Feminino"
                b1Checked: true
                Layout.alignment: Qt.AlignBottom
            }

            CustomIbanCombo {
                id: ibanCombo
                placeholderText: "Banco"
                Layout.fillWidth: true
                Layout.preferredWidth: 3
                Layout.alignment: Qt.AlignBottom
                //text: companyBanco
                //onTextChanged: if (editable) companyBanco = text
                //enabled: editable
            }
            CustomButton {
                Layout.fillWidth: true
                Layout.preferredWidth: 1
                text: "Generate"
                onClicked: generateWorker()
                Layout.alignment: Qt.AlignBottom
            }
            CustomButton {
                Layout.fillWidth: true
                Layout.preferredWidth: 1
                //Layout.rightMargin: 10
                text: "Submit"
                onClicked: submitWorkers()
                Layout.alignment: Qt.AlignBottom
            }
        }
        Text {
            // Layout.fillWidth: true
            id: errorText
            Layout.rightMargin: 10
            text: ""
            wrapMode: Text.Wrap
            font.pointSize: 14
            color: "red"
            opacity: 0.0
            Layout.alignment: Qt.AlignRight
            // Behavior defines the fade-out animation
            SequentialAnimation {
                id: errorAnim
                running: false
                PropertyAnimation { target: errorText; property: "opacity"; from: 0; to: 1; duration: 50 }
                PauseAnimation    { duration: 750 }
                PropertyAnimation { target: errorText; property: "opacity"; from: 1; to: 0; duration: 600 }
            }
        }
    }
}
