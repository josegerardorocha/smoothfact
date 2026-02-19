cmake_minimum_required(VERSION 3.16)

project(smoothfact VERSION 0.1 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_BUILD_TYPE Debug)

find_package(Qt6 REQUIRED COMPONENTS Quick QuickControls2 Pdf)

qt_standard_project_setup(REQUIRES 6.8)

qt_add_executable(appsmoothfact
    main.cpp
)

set_source_files_properties(CompanyData.qml
    PROPERTIES QT_QML_SINGLETON_TYPE TRUE)

qt_add_qml_module(appsmoothfact
    URI Smoothfact
    VERSION 1.0
    QML_FILES
        customcontrols/CustomTextField.qml
        customcontrols/CustomCaeCombo.qml
        customcontrols/CustomButton.qml
        customcontrols/CustomTextArea.qml
        customcontrols/CustomSwitch.qml
        customcontrols/CustomIbanCombo.qml
        customcontrols/CustomBinCheckbox.qml
        customcontrols/CustomDateField.qml
        customcontrols/fuse.min.js
        customcontrols/cae.js
        customcontrols/iban_prefix.js
        customcontrols/country_codes.js
        customcontrols/CustomCountryCombo.qml
        customcontrols/CustomCombo.qml
        customcontrols/CustomCustomerSupplierCombo.qml

        #Alfandega/nomenclatura-capitulo.js

        menu/MainMenu.qml
        menu/MainStack.qml
        menu/LogoutIcon.qml

        #invoices/sellinvoice/SellInvoicePage.qml
        #invoices/sellinvoice/SellInvoiceForm.qml
        invoices/InvoicePage.qml
        invoices/InvoiceForm.qml

        invoices/seguros/SegurosPage.qml
        invoices/seguros/SeguroMultirrisco.qml
        invoices/seguros/SeguroAT.qml
        invoices/seguros/SeguroRS.qml
        invoices/seguros/SeguroAuto.qml


        Main.qml
        LoginForm.qml
        LoginDialog.qml
        InfoPage.qml

        javascripts/HttpRequest.js
        javascripts/formatnumber.js
        javascripts/VatCheck.js
        javascripts/VatGen.js
        WorkersPage.qml

        CountryAddresses.js
        CompanyNames.js
        CompanyData.qml
        IrnPage.qml
        DocAlfandegaPage.qml
        EstadoOutrosPage.qml

        invoices/ShowPDF.qml
        InvoiceShowData.qml
        InvoiceShowHeader.qml
        InvoiceShowRows.qml
        InvoiceShowTail.qml

        bankloans/BankLoanPage.qml
        bankloans/BankLoanForm.qml
        bankloans/BankLoanShowData.qml

    SOURCES
        cpp/pdfcontroller.h       cpp/pdfcontroller.cpp
        cpp/pdfimageProvider.h    cpp/pdfimageprovider.cpp
        cpp/qrcode.h              cpp/qrcode.cpp
        cpp/pdfloaninvoice.h      cpp/pdfloaninvoice.cpp

    RESOURCES
        README.txt

)


# Qt for iOS sets MACOSX_BUNDLE_GUI_IDENTIFIER automatically since Qt 6.1.
# If you are developing for iOS or macOS you should consider setting an
# explicit, fixed bundle identifier manually though.
set_target_properties(appsmoothfact PROPERTIES
    #    MACOSX_BUNDLE_GUI_IDENTIFIER com.example.appsmoothfact
    MACOSX_BUNDLE_BUNDLE_VERSION ${PROJECT_VERSION}
    MACOSX_BUNDLE_SHORT_VERSION_STRING ${PROJECT_VERSION_MAJOR}.${PROJECT_VERSION_MINOR}
    MACOSX_BUNDLE TRUE
    #WIN32_EXECUTABLE TRUE
)

target_include_directories(appsmoothfact
    PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/cpp
)

target_link_libraries(appsmoothfact
    PRIVATE Qt6::Quick
    PRIVATE Qt6::QuickControls2
    PRIVATE Qt6::Pdf
)

include(GNUInstallDirs)
install(TARGETS appsmoothfact
    BUNDLE DESTINATION .
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
    RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
)
