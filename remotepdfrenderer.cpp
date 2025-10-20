#include "remotepdfrenderer.h"
#include <QQmlApplicationEngine>
#include <QNetworkRequest>
#include <QBuffer>
#include <QDebug>

RemotePdfRenderer::RemotePdfRenderer(QObject *parent)
    : QObject(parent)
    , m_currentPage(-1)
    , m_imageVersion(0)
    , m_zoom(1.0)
    , m_zoomLevel(4)
{
    qDebug() << "--- RemotePdfRenderer::RemotePdfRenderer:" << this;
    connect(&m_manager, &QNetworkAccessManager::finished, this, &RemotePdfRenderer::onReplyFinished);
}

void RemotePdfRenderer::setUrlToLoad(const QUrl &url)
{
    if (m_url == url)
        return;

    qDebug() << "--- setUrlToLoad: Loading PDF from URL:" << url  << this;
    m_url = url;
    emit urlToLoadChanged();

    if (!m_url.isEmpty() && m_url.isValid()) {
        QNetworkRequest req(m_url);
        auto *reply = m_manager.get(req);
        connect(reply, &QNetworkReply::downloadProgress, this, &RemotePdfRenderer::downloadProgress);
    }
}

void RemotePdfRenderer::setCurrentPage(int index)
{
    if (index < 0 || index >= m_doc.pageCount())
        return;
    if (m_currentPage == index)
        return;

    m_currentPage = index;
    emit currentPageChanged();
    renderPage();
}

void RemotePdfRenderer::onReplyFinished(QNetworkReply *reply)
{
     qDebug() << "--- onReplyFinished";
    if (reply->error() != QNetworkReply::NoError) {
        emit loadError(reply->errorString());
        reply->deleteLater();
        return;
    }

    QByteArray pdfData = reply->readAll();
    QBuffer buffer(&pdfData);
    buffer.open(QIODevice::ReadOnly);
    m_doc.load(&buffer);

    if (m_doc.status() != QPdfDocument::Status::Ready) {
        emit loadError(QStringLiteral("Failed to load PDF (status=%1)")
                           .arg(static_cast<int>(m_doc.status())));
        reply->deleteLater();
        return;
    }

    qDebug() << "--- onReplyFinished: PDF loaded successfully with" << m_doc.pageCount() << "pages"  << this;
    emit pageCountChanged();
    m_currentPage = 0;
    renderPage();
    emit currentPageChanged();
    reply->deleteLater();
}

 void RemotePdfRenderer::setZoom(qreal zoom)
{
     zoom = std::clamp(zoom, 0.25, 4.0); // limit range
     if (!qFuzzyCompare(m_zoom, zoom)) {
         m_zoom = zoom;
         renderPage(); // re-render at new zoom
         emit zoomChanged(m_zoom);
     }
}

void RemotePdfRenderer::setZoomLevel(int level)
{
    if (level < 0 || level >= 10)
        return;
    m_zoomLevel = level;
    setZoom(ZOOM_LEVEL[level]);
}

void RemotePdfRenderer::renderPage()
{
    if (m_doc.pageCount() == 0)
        return;

    QSizeF sizePt = m_doc.pagePointSize(m_currentPage);
    const qreal dpi = 96.0;
    QSize sizePx(qRound(sizePt.width() * dpi / 72.0 * m_zoom),
                 qRound(sizePt.height() * dpi / 72.0 * m_zoom));

    QPdfDocumentRenderOptions opts;
    opts.setRenderFlags(QPdfDocumentRenderOptions::RenderFlag::Annotations);

    m_pageImage = m_doc.render(m_currentPage, sizePx, opts);

    ++m_imageVersion;
    emit imageVersionChanged();
}

