cmake_minimum_required(VERSION 3.16)

project(smoothfact VERSION 0.1 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt6 REQUIRED COMPONENTS Quick QuickControls2)

qt_standard_project_setup(REQUIRES 6.8)

qt_add_executable(appsmoothfact
    main.cpp
)

qt_add_qml_module(appsmoothfact
    URI Smoothfact
    VERSION 1.0
    QML_FILES
        Main.qml
        LoginForm.qml
        LoginDialog.qml
        CustomTextField.qml
        MainMenu.qml
        images/LogoutIcon.qml
    RESOURCES
        #images/logout_icon.svg
        QML_FILES InfoPage.qml
        QML_FILES InvoicePage.qml
        QML_FILES BankMovementPage.qml
        QML_FILES HttpRequest.js
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
)

include(GNUInstallDirs)
install(TARGETS appsmoothfact
    BUNDLE DESTINATION .
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
    RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
)
