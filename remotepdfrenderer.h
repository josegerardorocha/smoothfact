#ifndef REMOTEPDFRENDERERH_H
#define REMOTEPDFRENDERERH_H

// #include <QObject>
#include <QQuickImageProvider>
#include <QPdfDocument>
#include <QPdfDocumentRenderOptions>
#include <QNetworkAccessManager>
#include <QNetworkReply>
#include <QJsonObject>
// #include <QImage>
// #include <QBuffer>
// #include <QQmlEngine>
// #include "imgrenderer.h"

// class QQmlApplicationEngine;

class RemotePdfRenderer: public QObject {
    Q_OBJECT
    // QML_SINGLETON
    QML_ELEMENT

    Q_PROPERTY(QUrl urlToLoad READ urlToLoad WRITE setUrlToLoad NOTIFY urlToLoadChanged)
    Q_PROPERTY(int currentPage READ currentPage WRITE setCurrentPage NOTIFY currentPageChanged)
    Q_PROPERTY(int pageCount READ pageCount NOTIFY pageCountChanged)
    Q_PROPERTY(int imageVersion READ imageVersion NOTIFY imageVersionChanged)
    Q_PROPERTY(qreal zoom READ zoom WRITE setZoom NOTIFY zoomChanged)
    Q_PROPERTY(int zoomLevel READ zoomLevel WRITE setZoomLevel NOTIFY zoomChanged)
    // write a Q_PROPERTY to store a json object. Call it postData
    Q_PROPERTY(QJsonObject postData WRITE setPostData NOTIFY postDataChanged)

public:
    const qreal ZOOM_LEVEL[10]{0.25, 0.5, 0.75, 0.90, 1.0, 1.25, 1.5, 2.0, 3.0, 4.0};

public:
    explicit RemotePdfRenderer(QObject *parent = nullptr);

    // void registerProvider(QQmlApplicationEngine &engine);

    QUrl urlToLoad() const { return m_url; }
    void setUrlToLoad(const QUrl &url);

    int currentPage() const { return m_currentPage; }
    void setCurrentPage(int index);

    int pageCount() const { return m_doc.pageCount(); }
    int imageVersion() const { return m_imageVersion; }

    QImage image() {
        qDebug() << "--- RemotePdfRenderer::image() size:" << m_pageImage.size() << this;
        return m_pageImage;
    }
    qreal zoom() const { return m_zoom; }
    void setZoom(qreal zoom);
    int zoomLevel() const { return m_zoomLevel; }
    void setZoomLevel(int level);
    void setPostData(const QJsonObject &data) {
        m_postData = data;
        emit postDataChanged();
    }

signals:
    void urlToLoadChanged();
    void downloadProgress(qint64 bytesReceived, qint64 bytesTotal);
    void loadError(const QString &message);
    void currentPageChanged();
    void pageCountChanged();
    void imageVersionChanged();
    void zoomChanged(qreal zoom);
    void postDataChanged();

private slots:
    void onReplyFinished(QNetworkReply *reply);

private:
    void renderPage();

// public:
//     QImage requestImage(const QString &id, QSize *size, const QSize &requestedSize) override;

private:
    QUrl m_url;
    QPdfDocument m_doc;
    QNetworkAccessManager m_manager;
    QImage m_pageImage;
    int m_currentPage;
    int m_imageVersion;
    qreal m_zoom;
    int m_zoomLevel;
    QJsonObject m_postData;
};

#endif // REMOTEPDFDOCUMENT_H
