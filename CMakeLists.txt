cmake_minimum_required(VERSION 3.16)

project(smoothfact VERSION 0.1 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD_REQUIRED ON)

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
        Main.qml
        LoginForm.qml
        LoginDialog.qml
        InfoPage.qml
        InvoicePage.qml
        BankMovementPage.qml
        HttpRequest.js
        WorkersPage.qml
        VatCheck.js
        VatGen.js
        InvoiceShowPDF.qml
        InvoiceForm.qml
        customcontrols/country_codes.js
        customcontrols/CustomCountryCombo.qml
        CountryAddresses.js
        CompanyNames.js
        InvoiceShowData.qml
        CompanyData.qml
        InvoiceShowHeader.qml
        InvoiceShowRows.qml
        InvoiceShowTail.qml
        menu/MainMenu.qml
        menu/MainStack.qml
        menu/LogoutIcon.qml
        sellinvoice/SellInvoicePage.qml
        sellinvoice/SellInvoiceForm.qml
        seguros/SegurosPage.qml
    SOURCES
        pdfcontroller.h       pdfcontroller.cpp
        pdfimageProvider.h    pdfimageprovider.cpp
        qrcode.h              qrcode.cpp
        QML_FILES customcontrols/CustomCombo.qml
        QML_FILES seguros/SeguroMultirrisco.qml
    RESOURCES
        README.txt
        QML_FILES seguros/SeguroAT.qml
        QML_FILES seguros/SeguroRS.qml
        QML_FILES seguros/SeguroAuto.qml
)


# Qt for iOS sets MACOSX_BUNDLE_GUI_IDENTIFIER automatically since Qt 6.1.
# If you are developing for iOS or macOS you should consider setting an
# explicit, fixed bundle identifier manually though.
set_target_properties(appsmoothfact PROPERTIES
    #    MACOSX_BUNDLE_GUI_IDENTIFIER com.example.appsmoothfact
    MACOSX_BUNDLE_BUNDLE_VERSION ${PROJECT_VERSION}
    MACOSX_BUNDLE_SHORT_VERSION_STRING ${PROJECT_VERSION_MAJOR}.${PROJECT_VERSION_MINOR}
    MACOSX_BUNDLE TRUE
    WIN32_EXECUTABLE TRUE
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
