import QtQuick 2.15
import QtQuick.Controls 2.15

Item {
    id: root
    // width: 200
    // height: textField.implicitHeight + 20
    implicitHeight: textField.implicitHeight + 20
    property alias echoMode: textField.echoMode
    property alias text: textField.text
    property string placeholderText: "Enter text"
    property bool validDate: false
    //signal dateAccepted(string date)

    function formatDate(){
        let today = new Date()
        let day = String(today.getDate()).padStart(2, '0')
        let month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-based
        let year = today.getFullYear()
        return day + "/" + month + "/" + year
    }

    // Base TextField
    TextField {
        id: textField
        text: formatDate()
        anchors.left: parent.left
        anchors.right: parent.right
        //anchors.bottom: parent.bottom
        height: implicitHeight + 10
        placeholderText: ""  // disable default placeholder
        leftPadding: 6
        topPadding: 6
        font.pixelSize: 16
        background: Rectangle {
            id: backgroundRectangle
            radius: 4
            border.width: 1
            border.color: textField.activeFocus ? "#FF04AA6D" : "gray"
            color: "transparent"
        }
        // validator: RegularExpressionValidator {
        //     // Matches DD/MM/YYYY
        //     regularExpression: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/
        // }

        //onAccepted: {
        onTextChanged: {
            console.log("<<<<<<<<<<<<<<<<<<< CustomDateField: onAccepted text =", text)
            // if (validator.regularExpression.test(text)) {
                // Optional deeper check (e.g., handle invalid days in February)
                const parts = text.split("/");
                if (parts.length !== 3){
                    backgroundRectangle.border.color = "red"
                    validDate = false
                    return
                }

                const day = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-based (0 = January)
                const year = parseInt(parts[2], 10);

                const dateObj = new Date(year, month, day);
                if (!isNaN(dateObj.getTime())) {
                    backgroundRectangle.border.color = textField.activeFocus ? "#FF04AA6D" : "gray"
                    //dateAccepted(text)
                    validDate = true
                } else {
                    backgroundRectangle.border.color = "red"
                    validDate = false
                }
            // } else {
            //     backgroundRectangle.border.color = "red"
            //     validDate = false
            // }
        }
    }

    // Floating placeholder
    Text {
        id: floatingLabel
        text: root.placeholderText
        color: textField.activeFocus ? "#FF04AA6D" : "gray"
        anchors.left: textField.left
        anchors.leftMargin: 6
        font.pixelSize: 14
        z: 2

        Behavior on y { NumberAnimation { duration: 100; easing.type: Easing.InOutQuad } }
        Behavior on font.pixelSize { NumberAnimation { duration: 100; easing.type: Easing.InOutQuad } }
        Behavior on color { ColorAnimation { duration: 100 } }
        // Component.onCompleted: {
        //     console.log("textField.height", textField.height, "height", height, "textField.y", textField.y);
        // }
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

        visible: (textField.activeFocus || textField.text.length > 0)
    }

    states: [
        State {
            name: "floating"
            when: textField.activeFocus || textField.text.length > 0
            PropertyChanges { target: floatingLabel; y: -height+6; font.pixelSize: 12 }
        },
        State {
            name: "normal"
            when: !textField.activeFocus && textField.text.length === 0
            PropertyChanges { target: floatingLabel; y: textField.height/2 - floatingLabel.height/2; font.pixelSize: 14 }
        }
    ]
}
