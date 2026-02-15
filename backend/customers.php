<?php
define('SmoothFact', true);
require_once __DIR__ . '/db.php';
session_start();

// (optional) assuming you store username in session
$user = $_SESSION['username'];
header('Content-Type: application/json');

// Choose the target collection
$collection = $db->selectCollection('customers');

// Determine request method (POST = insert, GET = fetch)
$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'POST') {
        // ---------- INSERT ----------
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        if (!is_array($data)) {
            echo json_encode([
                "status" => "error",
                "message" => "Invalid JSON payload"
            ]);
            exit;
        }

        $timestamp = new MongoDB\BSON\UTCDateTime();
        foreach ($data as &$customer) {
            $customer['user'] = $user;
            $customer['created_at'] = $timestamp;
        }

        // For each customer, check if one with same company name exists
        // If yes, replace it; if no, insert new
        $insertedCount = 0;
        $replacedCount = 0;
        
        foreach ($data as $customer) {
            $filter = ['user' => $user, 'company' => $customer['company']];
            
            // Check if exists
            $existing = $collection->findOne($filter);
            
            if ($existing) {
                // Replace the existing document
                $collection->replaceOne($filter, $customer);
                $replacedCount++;
            } else {
                // Insert new
                $collection->insertOne($customer);
                $insertedCount++;
            }
        }

        echo json_encode([
            "status" => "ok",
            "insertedCount" => $insertedCount,
            "replacedCount" => $replacedCount
        ]);
    }

    elseif ($method === 'GET') {
        // ---------- RETRIEVE ----------
        // Optional: filter by user
        $filter = ['user' => $user];
        $cursor = $collection->find($filter, [
            'sort' => ['created_at' => -1]  // newest first
        ]);

        $customers = [];
        foreach ($cursor as $doc) {
            // Convert MongoDB\BSON\Document to associative array
            $customers[] = json_decode(json_encode($doc), true);
        }

        echo json_encode([
            "status" => "ok",
            "count" => count($customers),
            "customers" => $customers
        ]);
    }

    else {
        // ---------- Unsupported ----------
        echo json_encode([
            "status" => "error",
            "message" => "Unsupported method"
        ]);
    }

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
