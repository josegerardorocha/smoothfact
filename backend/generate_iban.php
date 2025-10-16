<?php

require_once "session_start.php";

require "iban.php";
$generator = new IBAN;

$prefix = $_POST['prefix'] ?? "0018";
$new_iban = $generator->generateIBAN($prefix);

header('Content-Type: application/json');
echo json_encode(['value' => $generator->generateIBAN($prefix)]);
