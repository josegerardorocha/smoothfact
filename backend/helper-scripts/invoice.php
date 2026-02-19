<?php

require_once __DIR__ . "/../session_start.php";

require __DIR__ . '/../vendor/autoload.php';

use Dompdf\Dompdf;
use Dompdf\Options;
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\Label\LabelAlignment;
use Endroid\QrCode\Label\Font\OpenSans;
use Endroid\QrCode\RoundBlockSizeMode;
use Endroid\QrCode\Writer\PngWriter;

$json = file_get_contents('php://input');
$postData = json_decode($json, true);

/*
QJsonObject({
"header":{
    "buyer":{
        "VAT":"123456789",
        "address":"123 Sample Street, Lisbon",
        "company":"Sample Company Lda",
        "country":"Portugal",
        "countryCode":"PT"
    },
    "country":"PT",
    "date":"25/02/2024",
    "number":"FT 2024/001",
    "hash":"ABCD1234EFGH5678IJKL9012MNOP3456",
    "iban":"PT50000201231234567890154",
    "atcud":"JJRD3W6T-3",
    "seller":{
        "VAT":"987654321",
        "address":"456 Another Ave, Porto",
        "company":"Another Company SA",
        "country":"Portugal",
        "countryCode":"PT"
    },
    "tipoOperacao":"buy"
},
"totais":{
    "totalSemIva":300,
    "totalDeIva":75,
    "baseIvaIsento":0,
    "baseIvaRed":100,
    "baseIvaInt":100,
    "baseIvaNorm":200,
    "descontoTotal":15,
    "ivaRed":6,
    "ivaInt": 13,
    "ivaNorm":23,
    "totalGeral":337
    "motivoIsencao":"",
},
"rows":[
    {
        "desconto":0,
        "designacao":"Product A",
        "iva":23,
        "motivoIsencao":"",
        "preco":50,
        "quantidade":2,
        "tipo":"P",
        "total":123
    },
    {"desconto":10,"designacao":"Product B","iva":23,"motivoIsencao":"","preco":100,"quantidade":1,"tipo":"P","total":110.7},
    {"desconto":5,"designacao":"Service C","iva":6,"motivoIsencao":"","preco":20,"quantidade":5,"tipo":"S","total":95}]})
postData = {
        "header": {
            "tipoOperacao": tipoOperacao,
            "country": country,
            "buyer": {
                "company": company,
                "address": address,
                "country": country,
                "VAT":     vat
            },
            "seller": {
                "company": company,
                "address": address,
                "country": country,
                "VAT":     vat
            },
            "date": formatDate( new Date()),
            "number": randomInvoiceNumber()
        },
        "rows": [
        {
            "tipo": tipo,
            "designacao": designacao,
            "quantidade": quantidade,
            "preco": preco,
            "desconto": desconto,
            "iva": iva,
            "total": total,
            "motivoIsencao": motivoIsencao
        }
        ]
    }
*/
$username = $postData['username'] ?? 'Unknown User';
$tipoOperacao = $postData['header']['tipoOperacao'] ?? 'Buy';
$country = $postData['header']['country'] ?? 'Unknown Country';
$buyer = $postData['header']['buyer'] ?? [];
$seller = $postData['header']['seller'] ?? [];
$date = $postData['header']['date'] ?? date('Y-m-d');
$number = $postData['header']['number'] ?? '0000';
$rows = $postData['rows'] ?? [];

// Input data
// $type = $_POST['type'] ?? 'Buy';
// $companyName = $_POST['name'] ?? 'Unknown Company';
// $companyAddress = $_POST['address'] ?? 'No Address';
// $companyNif = $_POST['nif'] ?? '---';
// $companyNiss = $_POST['niss'] ?? '---';
// $username = $_SESSION['username']; // current logged-in user

// Build QR code
$builder = new Builder(
    writer: new PngWriter(),
    writerOptions: [],
    validateResult: false,
    data: "Invoice: $type - $companyName",
    encoding: new Encoding('UTF-8'),
    errorCorrectionLevel: ErrorCorrectionLevel::High,
    size: 120,
    margin: 5,
    roundBlockSizeMode: RoundBlockSizeMode::Margin,
    logoResizeToWidth: 50,
    logoPunchoutBackground: true,
    labelText: 'Generated PHP/Dompdf',
    labelFont: new OpenSans(20),
    labelAlignment: LabelAlignment::Center
);

$qrCode = $builder->build();
$qrBase64 = base64_encode($qrCode->getString());

// Logo (optional)
$logoPath = __DIR__ . "/logo.png";
$logoBase64 = '';
if (file_exists($logoPath)) {
    $logoBase64 = base64_encode(file_get_contents($logoPath));
}

// Build HTML
$html = '
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: DejaVu Sans, sans-serif; margin: 20px; }
        h1 { text-align: center; color: #04AA6D; }
        .header { display: flex; justify-content: space-between; align-items: center; }
        .company-info {
            margin-top: 20px;
            border: 1px solid #04AA6D;
            padding: 10px;
            background: #f9fdfb;
        }
        .company-info strong { color: #04AA6D; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        table, th, td { border: 1px solid black; }
        th, td { padding: 8px; text-align: left; }
        .footer { text-align: center; margin-top: 40px; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <div>
            <h1>Invoice (' . htmlspecialchars($type) . ')</h1>
        </div>';

if ($logoBase64) {
    $html .= '<div><img src="data:image/png;base64,' . $logoBase64 . '" width="120"></div>';
}

$html .= '
    </div>

    <div class="company-info">
        <p><strong>Generated for user:</strong> ' . htmlspecialchars($username) . '</p>
        <p><strong>Company Name:</strong> ' . htmlspecialchars($companyName) . '</p>
        <p><strong>Address:</strong><br>' . nl2br(htmlspecialchars($companyAddress)) . '</p>
        <p><strong>NIF:</strong> ' . htmlspecialchars($companyNif) . '</p>
        <p><strong>NISS:</strong> ' . htmlspecialchars($companyNiss) . '</p>
    </div>

    <table>
        <tr><th>Item</th><th>Quantity</th><th>Price</th></tr>
        <tr><td>Sample Item 1</td><td>2</td><td>$20</td></tr>
        <tr><td>Sample Item 2</td><td>1</td><td>$15</td></tr>
        <tr><td colspan="2" style="text-align:right"><strong>Total</strong></td><td><strong>$55</strong></td></tr>
    </table>

    <div style="margin-top:20px; text-align:right;">
        <img src="data:image/png;base64,' . $qrBase64 . '" width="120">
    </div>

    <div class="footer">
        Generated by PdfGen + PHP/Dompdf | Page {PAGE_NUM} of {PAGE_COUNT}
    </div>
</body>
</html>
';

// Configure Dompdf
$options = new Options();
$options->set('isRemoteEnabled', true);
$dompdf = new Dompdf($options);

// Render PDF
$dompdf->loadHtml($html);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();

// Instead of stream(), send proper headers and echo output
header('Content-Type: application/pdf');
header('Cache-Control: public, must-revalidate, max-age=0');
header('Pragma: public');
header('Expires: 0');

echo $dompdf->output();
