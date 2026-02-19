import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import "../customcontrols"
import "../javascripts/formatnumber.js" as FormatNumber

ScrollView {
    id: root
    property var header: ({})
    property ListModel model: ListModel {}

    signal generateLoanPdf(var loanData)
    signal generateInstallmentPdf(var installmentData)

    ScrollBar.horizontal.policy: ScrollBar.AlwaysOff
    ScrollBar.vertical.policy: ScrollBar.AsNeeded
    contentWidth: availableWidth
    contentHeight: formLayout.implicitHeight + 80
    clip: true
    
    /**
     * Calcula o pagamento de principal para um determinado período de um investimento/empréstimo
     * Replica a função PPMT do Excel
     * 
     * @param {number} rate - Taxa de juros por período
     * @param {number} per - Período para o qual deseja calcular o principal (deve estar entre 1 e nper)
     * @param {number} nper - Número total de períodos de pagamento
     * @param {number} pv - Valor presente (principal do empréstimo)
     * @param {number} fval - Valor futuro (opcional, padrão = 0)
     * @param {number} type - Quando os pagamentos vencem (opcional: 0 = fim do período, 1 = início do período)
     * @returns {number} Pagamento de principal para o período especificado
     */
    function ppmt(rate, per, nper, pv, fval = 0, type = 0) {
        // Valida se o período está dentro do intervalo válido
        if (per < 1 || per > nper) {
            throw new Error("O período (per) deve estar entre 1 e nper");
        }
        // Calcula o pagamento total (PMT)
        const pmtValue = pmt(rate, nper, pv, fval, type);
        // Calcula o pagamento de juros para este período
        const ipmtValue = ipmt(rate, per, nper, pv, fval, type);
        // O pagamento de principal é o pagamento total menos os juros
        return pmtValue - ipmtValue;
    }
    
    /**
     * Calcula o pagamento de juros para um determinado período de um investimento/empréstimo
     * Replica a função IPMT do Excel
     */
    function ipmt(rate, per, nper, pv, fval = 0, type = 0) {
        if (per < 1 || per > nper) {
            throw new Error("O período (per) deve estar entre 1 e nper");
        }
        const pmtValue = pmt(rate, nper, pv, fval, type);
        const fvPrev = fv(rate, per - 1, pmtValue, pv, type);
        
        let ipmtValue = fvPrev * rate;
        if (type === 1) {
            ipmtValue = ipmtValue / (1 + rate);
        }
        return ipmtValue;
    }
    
    /**
     * Calcula o pagamento periódico de um empréstimo
     */
    function pmt(rate, nper, pv, fv = 0, type = 0) {
        if (rate === 0) {
            return -(pv + fv) / nper;
        }
        
        const pvif = Math.pow(1 + rate, nper);
        let pmtValue = rate / (pvif - 1) * -(pv * pvif + fv);
        if (type === 1) {
            pmtValue = pmtValue / (1 + rate);
        }
        return pmtValue;
    }
    
    /**
     * Calcula o valor futuro de um investimento
     */
    function fv(rate, nper, pmt, pv, type = 0) {
        if (rate === 0) {
            return -pv - pmt * nper;
        }
        
        const pvif = Math.pow(1 + rate, nper);
        let fvValue = -pv * pvif - pmt * (pvif - 1) / rate;
        if (type === 1) {
            fvValue = fvValue * (1 + rate);
        }
        return fvValue;
    }

    // function getRandomDate(baseDate) {
    //     const parts = baseDate.split('/')
    //     if (parts.length !== 3) return baseDate
    //     
    //     const day = parseInt(parts[0])
    //     const month = parseInt(parts[1])
    //     const year = parseInt(parts[2])
    //     const date = new Date(year, month - 1, day)
    //     const d = date.getDate().toString().padStart(2, '0')
    //     const m = (date.getMonth() + 1).toString().padStart(2, '0')
    //     const y = date.getFullYear()
    //     return `${d}/${m}/${y}`
    // }

    function calculateData(firstPaymentDate, i, periods) {
        if (!firstPaymentDate) return "-"
        // return the first payment date plus i times the periodicity (months)
        const parts = firstPaymentDate.split('/')
        if (parts.length !== 3) return firstPaymentDate
        const day = parseInt(parts[0])
        const month = parseInt(parts[1])
        const year = parseInt(parts[2])
        const date = new Date(year, month - 1, day)
        date.setMonth(date.getMonth() + i * 12 / periods)
        const d = date.getDate().toString().padStart(2, '0')
        const m = (date.getMonth() + 1).toString().padStart(2, '0')
        const y = date.getFullYear()
        return `${d}/${m}/${y}`
    }

    function generateModel() {
        model.clear()
        let periods = calculatePeriods()
        let capitalEmDivida = parseFloat(root.header.loanAmount || 0)
        let interestRate = parseFloat(root.header.interestRate/periods/100 || 0)
        let loanTerm = parseInt(root.header.loanTerm || 0)
        console.log("................... Generating model with:", capitalEmDivida, interestRate, loanTerm, periods)

        for (let i = 0; i < loanTerm; i++) {
            let capital = -ppmt(interestRate, 1, loanTerm-i, capitalEmDivida)
            let juros = -ipmt(interestRate, 1, loanTerm-i, capitalEmDivida)
            capitalEmDivida -= capital
            model.append({
                "numero": i+1,
                "prestacaoMensal": FormatNumber.formatCurrency(juros + capital),
                "juros": FormatNumber.formatCurrency(juros),
                "capital": FormatNumber.formatCurrency(capital),
                "capitalEmDivida": FormatNumber.formatCurrency(capitalEmDivida),
                "data": calculateData(root.header.firstPaymentDate, i, periods)
            })
        }
    }
    function calculatePeriods() {
        const periodicity = root.header.periodicity || "Mensal"
        switch (periodicity) {
            case "Mensal": return 12
            case "Bimensal": return 6
            case "Trimestral": return 4
            case "Quadrimestral": return 3
            case "Semestral": return 2
            case "Anual": return 1
            default: return 12
        }
    }
    function calculateIS() {
        const loanAmount = parseFloat(root.header.loanAmount || 0)
        if(loanAmount <= 0) {
            return {
                "description": "",
                "value": "0.00",
                "descriptionAndValue": ""
            }
        }
        const loanTerm = parseInt(root.header.loanTerm || 0)
        const anos = loanTerm / calculatePeriods()
        let taxCode = ""
        //let taxDescription = ""
        let taxValue = 0.0
        if (anos >= 5) {
            taxCode = "17.1.3"
            //taxDescription = "Crédito de prazo igual ou superior a cinco anos"
            taxValue = 0.006
        } else if (anos >= 1) {
            taxCode = "17.1.2"
            //taxDescription = "Crédito de prazo igual ou superior a um ano e inferior a cinco anos"
            taxValue = 0.005
        } else {
            taxCode = "17.1.1"
            //taxDescription = "Crédito de prazo inferior a um ano"
            taxValue = 0.004
        }
        let taxDescription = "Imposto do Selo Verba " + taxCode + " - " + (taxValue * 100).toFixed(2) + "%"
        let taxDue = loanAmount * taxValue
        return {
            "description": taxDescription,
            "value": taxDue.toFixed(2),
            "descriptionAndValue": taxDescription + ": " + FormatNumber.formatCurrency(taxDue)
        }
    }

    ColumnLayout {
        id: formLayout
        width: root.width
        spacing: 32
        anchors.margins: 12

        // Header area - Loan summary
        Rectangle {
            Layout.fillWidth: true
            Layout.preferredHeight: 120
            color: "#f5f5f5"
            border.color: "lightgray"
            border.width: 1
            radius: 4

            ColumnLayout {
                anchors.fill: parent
                anchors.margins: 12
                spacing: 8

                Text {
                    text: "Resumo do Empréstimo"
                    font.pixelSize: 16
                    font.bold: true
                    color: "#04AA6D"
                }
                RowLayout {
                    spacing: 40
                    ColumnLayout {
                        spacing: 4
                        Text { text: "Data:"; font.bold: true }
                        Text { text: root.header.date || "-"; font.pixelSize: 12 }
                    }
                    ColumnLayout {
                        spacing: 4
                        Text { text: "Montante:"; font.bold: true }
                        Text { text: "€ " + (root.header.loanAmount || "0"); font.pixelSize: 12 }
                    }
                    ColumnLayout {
                        spacing: 4
                        Text { text: "Imposto do Selo:"; font.bold: true }
                        Text { text: calculateIS().descriptionAndValue; font.pixelSize: 12; color: "red" }
                    }
                    Item { Layout.fillWidth: true }
                    CustomButton {
                        text: "Gerar PDF"
                        enabled: root.header.loanAmount > 0 && root.header.date
                        onClicked: root.generateLoanPdf({
                            "date": root.header.date, 
                            "loanAmount": root.header.loanAmount,
                            "IS": calculateIS()
                            })
                    }
                }
            }
        }

        // Installments table
        Rectangle {
            Layout.fillWidth: true
            Layout.preferredHeight: 300
            color: "white"
            border.color: "lightgray"
            border.width: 1
            radius: 4

            ColumnLayout {
                anchors.fill: parent
                anchors.margins: 8
                spacing: 8

                Text {
                    text: "Mapa da dívida"
                    font.pixelSize: 14
                    font.bold: true
                    color: "#04AA6D"
                }

                // Table header
                Rectangle {
                    Layout.fillWidth: true
                    Layout.preferredHeight: 30
                    color: "#04AA6D"
                    radius: 3

                    RowLayout {
                        anchors.fill: parent
                        anchors.margins: 4
                        spacing: 4

                        Text {
                            text: "Nº"
                            font.bold: true
                            color: "white"
                            Layout.preferredWidth: parent.width * 0.08
                            Layout.alignment: Qt.AlignVCenter
                        }
                        Text {
                            text: "Prestação mensal"
                            font.bold: true
                            color: "white"
                            Layout.preferredWidth: parent.width * 0.16
                            Layout.alignment: Qt.AlignVCenter
                        }

                        Text {
                            text: "Juros"
                            font.bold: true
                            color: "white"
                            Layout.preferredWidth: parent.width * 0.13
                            Layout.alignment: Qt.AlignVCenter
                        }
                        Text {
                            text: "Capital"
                            font.bold: true
                            color: "white"
                            Layout.preferredWidth: parent.width * 0.13
                            Layout.alignment: Qt.AlignVCenter
                        }
                        Text {
                            text: "Capital em dívida"
                            font.bold: true
                            color: "white"
                            Layout.preferredWidth: parent.width * 0.16
                            Layout.alignment: Qt.AlignVCenter
                        }
                        Text {
                            text: "Data"
                            font.bold: true
                            color: "white"
                            Layout.preferredWidth: parent.width * 0.14
                            Layout.alignment: Qt.AlignVCenter
                        }
                        Item {
                            Layout.preferredWidth: parent.width * 0.2
                            Layout.alignment: Qt.AlignVCenter
                        }
                    }
                }

                // Table content
                ListView {
                    Layout.fillWidth: true
                    Layout.fillHeight: true
                    clip: true
                    model: root.model

                    delegate: Rectangle {
                        width: ListView.view.width
                        height: 35
                        color: index % 2 === 0 ? "#f9f9f9" : "white"
                        border.color: "#e0e0e0"
                        border.width: 1

                        RowLayout {
                            anchors.fill: parent
                            anchors.margins: 4
                            spacing: 4

                            Text {
                                text: model.numero
                                Layout.preferredWidth: parent.width * 0.08
                                Layout.alignment: Qt.AlignVCenter
                                font.pixelSize: 12
                            }

                            Text {
                                text: model.prestacaoMensal
                                Layout.preferredWidth: parent.width * 0.16
                                Layout.alignment: Qt.AlignVCenter
                                font.pixelSize: 12
                            }

                            Text {
                                text: model.juros
                                Layout.preferredWidth: parent.width * 0.13
                                Layout.alignment: Qt.AlignVCenter
                                font.pixelSize: 12
                                color: "red"
                            }

                            Text {
                                text: model.capital
                                Layout.preferredWidth: parent.width * 0.13
                                Layout.alignment: Qt.AlignVCenter
                                font.pixelSize: 12
                            }
                             Text {
                                text: model.capitalEmDivida
                                Layout.preferredWidth: parent.width * 0.16
                                Layout.alignment: Qt.AlignVCenter
                                font.pixelSize: 12
                            }
                            Text {
                                text: model.data
                                Layout.preferredWidth: parent.width * 0.14
                                Layout.alignment: Qt.AlignVCenter
                                font.pixelSize: 12
                            }

                            CustomButton {
                                text: "Gerar PDF"
                                Layout.preferredWidth: parent.width * 0.2
                                Layout.alignment: Qt.AlignVCenter
                                onClicked: {
                                    console.log("Generate PDF for installment:", model.numero)
                                    root.generateInstallmentPdf(model)
                                }
                            }
                        }
                    }

                    ScrollBar.vertical: ScrollBar {
                        policy: ScrollBar.AsNeeded
                    }
                }
            }
        }
        Item {
            Layout.fillHeight: true
        }
    }

    Component.onCompleted: {
        generateModel()
    }

    Connections {
        target: root
        function onHeaderChanged() {
            generateModel()
        }
    }
}
