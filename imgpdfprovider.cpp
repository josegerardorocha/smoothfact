#include "imgpdfprovider.h"
#include "remotepdfrenderer.h"

ImgPdfProvider::ImgPdfProvider()
    : QQuickImageProvider(QQuickImageProvider::Image, QQuickImageProvider::ForceAsynchronousImageLoading)
{
    qDebug() << "--- ImgPdfProvider::ImgPdfProvider:" << this;
}

QImage ImgPdfProvider::requestImage(const QString &id, QSize *size, const QSize &requestedSize)
{
    Q_UNUSED(id)
    Q_UNUSED(requestedSize)
    QImage img;
    RemotePdfRenderer *renderer = qobject_cast<RemotePdfRenderer *>(m_renderer);
    qDebug() << "--- ImgPdfProvider::requestImage renderer:" << renderer;
    qDebug() << "--- ImgPdfProvider::requestImage:" << this << id;
    img = renderer->image();
    if (size)
        *size = img.size();
    return img;
    // QImage image(500, 600, QImage::Format_RGB32);
    // image.fill(QColor(100, 50, 200));
    // return image;
}

