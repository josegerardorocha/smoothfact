#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQuickStyle>
#include <QQmlContext>
#include "imgpdfprovider.h"

int main(int argc, char *argv[])
{


    QGuiApplication app(argc, argv);
    QQuickStyle::setStyle("Fusion");
    QQmlApplicationEngine engine;

    auto *provider = new ImgPdfProvider;
    engine.addImageProvider("imgPdfProvider", provider);
    engine.rootContext()->setContextProperty("imgPdfProvider", provider);

    QObject::connect(
        &engine,
        &QQmlApplicationEngine::objectCreationFailed,
        &app,
        []() { QCoreApplication::exit(-1); },
        Qt::QueuedConnection);
    engine.loadFromModule("Smoothfact", "Main");

    return app.exec();
}
