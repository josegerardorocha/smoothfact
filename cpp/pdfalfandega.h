#ifndef PDFALFANDEGA_H
#define PDFALFANDEGA_H

#include <QPainter>
#include <QString>
#include <QDate>
#include "pdfinvoice.h"

// Data structure for customs declaration (Alfândega) invoice
struct AlfandegaInvoiceData {
    // Destination customs authority
    QString customsAuthority;
    
    // Shipper/Exporter information
    QString shipperNumber;
    QString shipperCompany;
    QString shipperAddress;
    QString shipperCountry;
    
    // Consignee/Receiver information
    QString consigneeNumber;
    QString consigneeCompany;
    QString consigneeAddress;
    QString consigneePostalCode;
    QString consigneeCountry;
    
    // Declarant/Representative information
    QString declarantNumber;
    QString declarantCompany;
    QString declarantAddress;
    QString declarantPostalCode;
    QString declarantCountry;
    
    // Shipping details
    QString originCountry;
    QString destinationCountry;
    QString departureCountry;
    QString transportIdentification;
    QString deliveryTerms;
    
    // Currency and financial
    QString currency;
    QString invoicedAmount;
    QString exchangeRate;
    
    // Transaction details
    QString transactionNature;
    QString transportMode;
    QString inlandTransportMode;
    
    // Goods information
    QString goodsLocation;
    QString entryCustomsAuthority;
    QString containerCount;
    QString containerTypes;
    QString goodsDescription;
    QString grossWeight;
    QString netWeight;
    QString statisticalValue;
    
    // Commodity codes
    QString commodityCode;
    QString preference;
    QString regime;
    QString supplementaryUnits;
    QString specialReferences;
    
    // Tax calculations
    QString dutyType;
    QString dutyBase;
    QString dutyRate;
    QString dutyAmount;
    QString vatType;
    QString vatBase;
    QString vatRate;
    QString vatAmount;
    
    // Accounting information
    QString invoiceReference;
    QString invoiceDate;
    QString totalTaxes;
    
    // Control section
    QString controlResult;
    QString controlAuthorization;
    QString controlDate;
};

class PDFAlfandega : public PDFInvoice {
private:
    const AlfandegaInvoiceData& data;
    
    // Section drawing methods
    void drawDestinationAndDeclaration();
    void drawShipperAndConsignee();
    void drawDeclarant();
    void drawTransportDetails();
    void drawCurrencyAndFinancials();
    void drawGoodsLocation();
    void drawGoodsDescription();
    void drawCommodityDetails();
    void drawTaxCalculations();
    void drawAccountingData();
    void drawControlSection();
    
public:
    PDFAlfandega(QPainter& p, const AlfandegaInvoiceData& d);
    void generate();
};

#endif // PDFALFANDEGA_H
