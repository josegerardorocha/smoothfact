import QtQuick
//import QtQuick.Controls
import QtQuick.Layouts
import QtQml
import Smoothfact
import "../javascripts/formatnumber.js" as FormatNumber

Rectangle {
    id: root
    border.width: 1
    border.color: "lightgray"
    color: "transparent"
    width: 600

    // property bool loanDataVisible: false

    signal addLoanData(var data)
    // signal addCondition(var data)

    function addMonthToDate(dateText) {
        // Parse DD/MM/YYYY format
        const parts = dateText.split('/')
        if (parts.length !== 3) return dateText
        
        const day = parseInt(parts[0])
        const month = parseInt(parts[1])
        const year = parseInt(parts[2])
        
        const date = new Date(year, month - 1, day)
        date.setMonth(date.getMonth() + 1)
        
        const d = date.getDate().toString().padStart(2, '0')
        const m = (date.getMonth() + 1).toString().padStart(2, '0')
        const y = date.getFullYear()
        
        return `${d}/${m}/${y}`
    }

    function getTodayDate() {
        const date = new Date()
        const d = date.getDate().toString().padStart(2, '0')
        const m = (date.getMonth() + 1).toString().padStart(2, '0')
        const y = date.getFullYear()
        return `${d}/${m}/${y}`
    }

    function toNumber(value) {
        const num = parseFloat(value)
        return (!isNaN(num) && isFinite(num)) ? num : 0
    }

    function calculateLoan() {
        // console.log("BankLoanForm: Calcular clicado")
        const data = {
            "date": dateTextField.text,
            "loanAmount": loanAmountTextField.text,
            "loanTerm": loanTermTextField.text,
            "periodicity": periodicityCombo.selectedText,
            "interestRate": interestRateTextField.text,
            "firstPaymentDate": firstPaymentDateField.text,
            "loanNumber": FormatNumber.randomInvoiceNumber()
        }
        // console.log("Dados do empréstimo:", JSON.stringify(data))
        addLoanData(data)
        // root.loanDataVisible = true
    }

    ColumnLayout {
        anchors.fill: parent
        anchors.margins: 12
        spacing: 12
        //visible: root.loanDataVisible

        CustomDateField {
            id: dateTextField
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignTop
            placeholderText: "Data"
            Component.onCompleted: text = getTodayDate()
            onTextChanged: {
                firstPaymentDateField.text = addMonthToDate(text)
            }
        }

        CustomTextField {
            id: loanAmountTextField
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignTop
            placeholderText: "Valor do Empréstimo"
            validator: RegularExpressionValidator {
                regularExpression: /^\d+([.,]\d{3})*([.,]\d{1,2})?$/
            }
        }

        CustomTextField {
            id: loanTermTextField
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignTop
            placeholderText: "Nº de Rendas"
            validator: IntValidator { bottom: 0 }
        }

        CustomCombo {
            id: periodicityCombo
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignTop
            placeholderText: "Periodicidade"
            model: ListModel {
                ListElement { name: "Mensal" }
                ListElement { name: "Bimensal" }
                ListElement { name: "Trimestral" }
                ListElement { name: "Quadrimestral" }
                ListElement { name: "Semestral" }
                ListElement { name: "Anual" }
            }
            index: 0
        }

        CustomTextField {
            id: interestRateTextField
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignTop
            placeholderText: "Taxa de Juro (%)"
            validator: RegularExpressionValidator {
                regularExpression: /^(?:100|\d{1,2})(?:[.,]\d{1,2})?$/
            }
        }

        CustomDateField {
            id: firstPaymentDateField
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignTop
            placeholderText: "Data da 1ª Prestação"
            Component.onCompleted: text = addMonthToDate(getTodayDate())
        }

        Item {
            Layout.fillHeight: true
        }

        CustomButton {
            text: "Calcular"
            Layout.alignment: Qt.AlignRight | Qt.AlignBottom
            enabled: dateTextField.text !== "" &&
                     loanAmountTextField.text !== "" &&
                     loanTermTextField.text !== "" &&
                     periodicityCombo.index >= 0 &&
                     interestRateTextField.text !== "" &&
                     firstPaymentDateField.text !== ""
            onClicked: calculateLoan()
        }

        Item {
            Layout.fillHeight: true
        }
    }
}
