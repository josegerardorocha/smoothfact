<?php

define('SmoothFact', true);
require __DIR__ . '/../db.php'; // Reuse the shared connection

// Determine if running from CLI or HTTP
$isCliMode = php_sapi_name() === 'cli';

if (!$isCliMode) {
    header('Content-Type: application/json');
}

// Read username and password from CLI args or POST data
if ($isCliMode) {
    // CLI mode: php user_registration.php username password
    if ($argc < 3) {
        echo json_encode(["success" => false, "message" => "Usage: php user_registration.php <username> <password>"]) . "\n";
        exit(1);
    }
    $username = $argv[1];
    $password = $argv[2];
} else {
    // HTTP mode: POST data
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
}

if (empty($username) || empty($password)) {
    $result = ["success" => false, "message" => "Username and password required"];
    echo json_encode($result);
    if ($isCliMode) echo "\n";
    exit(1);
}

try {
    $collection = $db->selectCollection('users');

    // Check if username already exists
    $existingUser = $collection->findOne(['username' => $username]);
    if ($existingUser) {
        $result = ["success" => false, "message" => "Username already taken"];
        echo json_encode($result);
        if ($isCliMode) echo "\n";
        exit(1);
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user
    $insertResult = $collection->insertOne([
        'username' => $username,
        'password' => $hashedPassword,
        'created_at' => new MongoDB\BSON\UTCDateTime()
    ]);

    if ($insertResult->getInsertedCount() > 0) {
        $result = ["success" => true, "message" => "User '$username' registered successfully"];
        echo json_encode($result);
        if ($isCliMode) echo "\n";
        exit(0);
    } else {
        $result = ["success" => false, "message" => "Failed to register user"];
        echo json_encode($result);
        if ($isCliMode) echo "\n";
        exit(1);
    }

} catch (Exception $e) {
    $result = ["success" => false, "message" => "Database error: " . $e->getMessage()];
    echo json_encode($result);
    if ($isCliMode) echo "\n";
    exit(1);
}
