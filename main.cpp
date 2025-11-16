#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQuickStyle>
#include <QQmlContext>
#include "cpp/pdfimageProvider.h"

int main(int argc, char *argv[])
{


    QGuiApplication app(argc, argv);
    QQuickStyle::setStyle("Fusion");
    QQmlApplicationEngine engine;

    // Create and register the image provider
    PDFImageProvider *imageProvider = new PDFImageProvider();
    engine.addImageProvider("pdf", imageProvider);
    engine.rootContext()->setContextProperty("imageProvider", imageProvider);

    QObject::connect(
        &engine,
        &QQmlApplicationEngine::objectCreationFailed,
        &app,
        []() { QCoreApplication::exit(-1); },
        Qt::QueuedConnection);
    engine.loadFromModule("Smoothfact", "Main");

    return app.exec();
}
