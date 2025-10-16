<?php

require_once "session_start.php";

header('Content-Type: application/json');
define('SmoothFact', true);
require_once __DIR__ . '/db.php';

$user = $_SESSION['username'];

try {
    $collection = $client->selectDatabase('faturas')->selectCollection('company');

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Find company info for the logged-in user
        $company = $collection->findOne(['user' => $user]);

        if ($company) {
            echo json_encode([
                'success' => true,
                'name'    => $company['name'] ?? '',
                'address' => $company['address'] ?? '',
                'nif'     => $company['nif'] ?? '',
                'niss'    => $company['niss'] ?? '',
                'iban'    => $company['iban'] ?? '',
                'banco'   => $company['banco'] ?? '',
                'cae'     => $company['cae'] ?? ''
            ]);
        } else {
            echo json_encode([
                'success' => true,
                'name'    => '',
                'address' => '',
                'nif'     => '',
                'niss'    => '',
                'iban'    => '',
                'banco'   => '',
                'cae'     => ''
            ]);
        }
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $companyName    = $_POST['name'] ?? '';
        $companyAddress = $_POST['address'] ?? '';
        $companyNif     = $_POST['nif'] ?? '';
        $companyNiss    = $_POST['niss'] ?? '';
        $companyIban    = $_POST['iban'] ?? '';
        $companyBanco   = $_POST['banco'] ?? '';
        $companyCae     = $_POST['cae'] ?? '';

        if ($companyName === '' || $companyAddress === '') {
            echo json_encode([
                'success' => false,
                'message' => 'Missing required fields'
            ]);
            exit;
        }

        // Upsert: ensure one document per user
        $result = $collection->updateOne(
            ['user' => $user], // match by logged-in user
            ['$set' => [
                'user'       => $user,
                'name'       => $companyName,
                'address'    => $companyAddress,
                'nif'        => $companyNif,
                'niss'       => $companyNiss,
                'iban'       => $companyIban,
                'banco'      => $companyBanco,
                'cae'        => $companyCae,
                'updated_at' => new MongoDB\BSON\UTCDateTime()
            ]],
            ['upsert' => true]
        );

        echo json_encode([
            'success'   => true,
            'message'   => 'Company data saved successfully',
            'matched'   => $result->getMatchedCount(),
            'modified'  => $result->getModifiedCount(),
            'upserted'  => $result->getUpsertedCount()
        ]);
        exit;
    }

    // Invalid method
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
