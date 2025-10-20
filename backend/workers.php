<?php
define('SmoothFact', true);
require_once __DIR__ . '/db.php';
session_start();

// (optional) assuming you store username in session
$user = $_SESSION['username'];
header('Content-Type: application/json');

// Choose the target collection
$collection = $db->selectCollection('workers');

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
        foreach ($data as &$worker) {
            $worker['user'] = $user;
            $worker['created_at'] = $timestamp;
        }

        // Delete all existing documents
        $deleteResult = $collection->deleteMany([]);

        // Insert new data
        $result = $collection->insertMany($data);

        echo json_encode([
            "status" => "ok",
            "insertedCount" => $result->getInsertedCount(),
            "insertedIds" => $result->getInsertedIds()
        ]);
    }

    elseif ($method === 'GET') {
        // ---------- RETRIEVE ----------
        // Optional: filter by user
        $filter = ['user' => $user];
        $cursor = $collection->find($filter, [
            'sort' => ['created_at' => -1]  // newest first
        ]);

        $workers = [];
        foreach ($cursor as $doc) {
            // Convert MongoDB\BSON\Document to associative array
            $workers[] = json_decode(json_encode($doc), true);
        }

        echo json_encode([
            "status" => "ok",
            "count" => count($workers),
            "workers" => $workers
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
