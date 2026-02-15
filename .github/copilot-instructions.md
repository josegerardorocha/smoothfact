# SmoothFact - AI Coding Instructions

## Architecture Overview

**SmoothFact** is a Portuguese invoice management desktop application with a three-tier architecture:
- **Frontend**: Qt/QML 6.8+ desktop application (Windows primary target)
- **Backend**: PHP REST API with session-based authentication
- **Database**: MongoDB (local instance at `mongodb://localhost:27017/faturas`)

The app is specialized for Portuguese business operations (NIF, NISS, IBAN generation) and handles multiple invoice types: regular invoices, insurance documents (seguros), and customs documentation (alfândega).

## Project Structure

```
Main.qml                    # Entry point: StackView navigation with LoginForm → MainMenu
customcontrols/             # Reusable UI components (all prefixed "Custom")
backend/                    # PHP endpoints (all return JSON)
├── db.php                  # MongoDB connection setup
├── session_start.php       # Session guard (currently permissive)
└── *.php                   # REST endpoints (invoice, login, workers, etc.)
cpp/                        # C++ QML extensions
├── pdfcontroller.{h,cpp}   # PDF generation with QPainter
└── qrcode.{h,cpp}          # QR code generation for invoices
invoices/                   # Invoice forms and display components
menu/                       # MainMenu/MainStack navigation components
```

## Critical Conventions

### QML Custom Controls Pattern
All custom controls follow a consistent pattern with **floating label** animation:
```qml
// Located in customcontrols/, always prefixed "Custom"
Item {
    property alias text: textField.text
    property string placeholderText: "Label text"
    TextField { id: textField /* ... */ }
    Text { id: floatingLabel /* animated label */ }
}
```
Examples: `CustomTextField.qml`, `CustomCombo.qml`, `CustomDateField.qml`

### Backend Communication
All HTTP requests use [HttpRequest.js](HttpRequest.js) with centralized base URL:
```javascript
// BASE_URL = "http://localhost/faturas/"
HttpRequest.post("backend/login.php", params, function(success, response) {
    if (success) { /* response is parsed JSON */ }
})
```
- PHP endpoints always return JSON with `{"success": bool, ...}`
- Use `session_start.php` require for authenticated endpoints
- Binary responses (PDFs) use `postBinary()` with `arraybuffer` responseType

### Global State Management
[CompanyData.qml](CompanyData.qml) is a **QML Singleton** for company configuration:
```qml
pragma Singleton
import QtQuick
QtObject {
    property string name: ""
    property string nif: ""
    function loadData() { /* HTTP call */ }
}
```
Configure in [CMakeLists.txt](CMakeLists.txt#L16-L17):
```cmake
set_source_files_properties(CompanyData.qml
    PROPERTIES QT_QML_SINGLETON_TYPE TRUE)
```

### Navigation Architecture
- Root: `ApplicationWindow` with `StackView` ([Main.qml](Main.qml))
- Login flow: `LoginForm` → `MainMenu` → `MainStack` (StackLayout of pages)
- Menu structure: Multi-level menu model in [MainMenu.qml](menu/MainMenu.qml#L60-L80) with `baseIndex` for page routing

### PDF Generation
PDF creation happens in C++ [PDFController](cpp/pdfcontroller.cpp), not backend:
- Receives JSON invoice data via `pdfData` property
- Uses `QPainter` to draw directly on `QImage`
- Generates AT-compliant QR codes with invoice signature
- Multiple invoice types via `InvoiceIDs` enum: `VENDA`, `MULTIRRISCOS`, `ALFANDEGA`
- Exposed to QML: `controller.saveFile(filename)`, `controller.getPdfAsBase64()`

### Portuguese Business Logic
The app includes Portugal-specific generators scattered across files:
- **NIF/NISS**: [backend/generate_nif.php](backend/generate_nif.php), [backend/generate_niss.php](backend/generate_niss.php)
- **IBAN**: [backend/generate_iban.php](backend/generate_iban.php)
- **VAT validation**: [VatCheck.js](VatCheck.js) (multi-country), [VatGen.js](VatGen.js)
- **CAE codes**: [customcontrols/cae.js](customcontrols/cae.js) (Portuguese business activity codes)
- **Names/Addresses**: [CompanyNames.js](CompanyNames.js), [CountryAddresses.js](CountryAddresses.js)

## Build & Development

### Building the Application
```bash
# Configure with CMake (Qt 6.10+ required, MinGW 64-bit on Windows)
cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Debug
cmake --build build

# Or use Qt Creator with CMakeLists.txt
```

### Backend Setup
```bash
cd backend
composer install  # Installs MongoDB driver, Dompdf, Endroid QR, PhpSpreadsheet

# Start MongoDB (ensure running on localhost:27017)
# PHP dev server: php -S localhost:80 -t .
```

### Database Collections
MongoDB `faturas` database uses these collections:
- `users` - Authentication (hashed passwords)
- `company_info` - Singleton company configuration
- `invoices` - Invoice documents with ATCUD codes
- `customers`, `suppliers`, `workers` - Entity data

## Common Patterns

### Adding a New Page
1. Create QML file in appropriate directory (e.g., `MyPage.qml`)
2. Add to [CMakeLists.txt](CMakeLists.txt) `QML_FILES` section
3. Add menu entry in [MainMenu.qml](menu/MainMenu.qml) model with `baseIndex`
4. Add to [MainStack.qml](menu/MainStack.qml) StackLayout at matching index

### Adding a Backend Endpoint
```php
<?php
require_once "session_start.php";  // For authenticated endpoints
define('SmoothFact', true);
require __DIR__ . '/db.php';       // $db is MongoDB\Database

// Read JSON body
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Or form data
$param = $_POST['param'] ?? '';

header('Content-Type: application/json');
echo json_encode(["success" => true, "data" => $result]);
```

### Creating Custom Controls
Follow the floating label pattern in [customcontrols/CustomTextField.qml](customcontrols/CustomTextField.qml):
- Wrap a base Qt control (TextField, ComboBox, etc.)
- Animate label position on focus/content change
- Use `#FF04AA6D` brand color for focus states
- Export data via `property alias`

## Key Dependencies

- **Frontend**: Qt 6.8+ (Quick, QuickControls2, Pdf modules)
- **Backend**: PHP 8+ with Composer packages:
  - `mongodb/mongodb` - Database driver
  - `dompdf/dompdf` - PDF generation fallback
  - `endroid/qr-code` - QR code generation
  - `phpoffice/phpspreadsheet` - Excel exports
- **Build**: CMake 3.16+, Ninja (optional but faster)

## Testing Notes

- No automated test suite currently exists
- Manual testing via Qt application launch
- Backend endpoints can be tested with curl:
  ```bash
  curl -X POST http://localhost/faturas/backend/login.php \
       -d "username=test&password=test"
  ```

## Important Caveats

- [session_start.php](backend/session_start.php) auth guard is currently **commented out** (permissive mode)
- MongoDB URI switches between Atlas/local/SDI clusters (see [db.php](backend/db.php#L11-L19))
- PDF generation is **client-side** (C++ QPainter), not server-side
- ATCUD/hash invoice codes follow Portuguese AT (Tax Authority) requirements
- [README.txt](README.txt) mentions Spanish NIF validator as pending work
