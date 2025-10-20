#ifndef IMGPDFPROVIDER_H
#define IMGPDFPROVIDER_H

#include <QQuickImageProvider>

class ImgPdfProvider: public QQuickImageProvider {
    Q_OBJECT
    //QML_ELEMENT

    Q_PROPERTY(QObject *renderer READ renderer WRITE setRenderer NOTIFY rendererChanged)
public:
    ImgPdfProvider();
    QImage requestImage(const QString &id, QSize *size, const QSize &requestedSize) override;

    QObject *renderer() const { return m_renderer; }
    void setRenderer(QObject *renderer) {
        if (m_renderer != renderer) {
            m_renderer = renderer;
            emit rendererChanged();
        }
    }
signals:
    void rendererChanged();
private:
    QObject *m_renderer;
};

#endif // IMGPDFPROVIDER_H
