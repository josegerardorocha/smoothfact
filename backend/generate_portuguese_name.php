<?php
require_once "session_start.php";
require_once "portuguese_names.php";
require_once "portuguese_addresses.php";
require "nif_niss.php";
require "iban.php";

$gender = $_POST['gender'] ?? 'female';
$nif_prefix = $_POST['nif_prefix'] ?? '284';
$niss_prefix = $_POST['niss_prefix'] ?? '12';
$iban_prefix = $_POST['iban_prefix'] ?? '0018.0000';

$generator = new NIF_NISS();
$ibanGen = new IBAN();

// Set proper JSON response headers
header('Content-Type: application/json; charset=utf-8');

// Instantiate the two generators
$nameGen = new PortugueseNames();
$addrGen = new PortugueseAddresses();

// Generate data
$nameJson = json_decode($nameGen->generateRandomName($gender), true);
$addrJson = json_decode($addrGen->generateRandomAddress(), true);

// Combine results
$result = [
    "name"    => $nameJson["name"],
    "gender"  => $nameJson["gender"],
    "address" => $addrJson,
    "nif"     => $generator->makeNIF($nif_prefix),
    "niss"    => $generator->makeNISS($niss_prefix),
    "iban"    => $ibanGen->generateIBAN($iban_prefix)
];

// Output
echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
