import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import Smoothfact
import "../javascripts/formatnumber.js" as FormatNumber

Rectangle {
    id: root
    color: "white"
    //border.width: 2
    //border.color: "pink"

    StackLayout {
        anchors.fill: parent
        id: stackLayout

        RowLayout {
            Layout.fillWidth: true
            Layout.fillHeight: true
            spacing: 20

            BankLoanForm {
                id: bankLoanForm
                Layout.fillWidth: true
                Layout.fillHeight: true
                onAddLoanData: (data) => {
                    console.log("BankLoanPage.qml: onAddLoanData called with:", JSON.stringify(data))
                    showData.header = {
                        "loanNumber": "EMP " + Math.floor(Math.random() * 900000) + 100000,
                        "date": data.date,
                        "loanAmount": data.loanAmount,
                        "loanTerm": data.loanTerm,
                        "periodicity": data.periodicity,
                        "interestRate": data.interestRate,
                        "firstPaymentDate": data.firstPaymentDate
                    }
                }
            }

            BankLoanShowData {
                id: showData
                Layout.fillHeight: true
                Layout.fillWidth: true
                onGenerateLoanPdf: (loanData) => {
                    console.log("BankLoanPage.qml: onGenerateLoanPdf called with loanData:", JSON.stringify(loanData))
                    viewer.pdfData = {
                        "id": PDFController.EMPRESTIMO,
                        "header": {
                            "buyer":{
                                "VAT":CompanyData.nif,
                                "address":CompanyData.address,
                                "company": CompanyData.name,
                                "country":"Portugal",
                                "countryCode":"PT"
                            },
                            "number": "FR " + FormatNumber.year(loanData.date) + "/" + FormatNumber.randomInvoiceNumber(),
                            "contract": "CT3421" + FormatNumber.randomInvoiceNumber(),
                            "date": loanData.date,
                            "seller":{
                                "VAT":"530004585",
                                "address":"Rua do Ipca, 10",
                                "company":"Banco Ipca, Lda",
                                "country":"Portugal",
                                "CapitalSocial": "5.000.000€",
                                "Conservatoria": "Barcelos",
                                "countryCode":"PT"
                            }
                        },
                        "loanData": loanData
                    }
                    stackLayout.currentIndex = 1
                    viewer.updatePdf()
                }
                onGenerateInstallmentPdf: (installmentData) => {
                    console.log("BankLoanPage.qml: onGenerateInstallmentPdf called with data:",
                        JSON.stringify(installmentData))
                    const cleanPdfData = {
                        "id": 6,
                        "installment": installmentData,
                        "company": CompanyData
                    }
                    viewer.pdfData = cleanPdfData
                    stackLayout.currentIndex = 1
                    viewer.updatePdf()
                }
            }
        }

        ShowPDF {
            id: viewer
            Layout.fillWidth: true
            Layout.fillHeight: true
            onCloseShowPDF: {
                stackLayout.currentIndex = 0
            }
        }
    }
}

