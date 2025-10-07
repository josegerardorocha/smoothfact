<?php
require "nif_niss.php";

$validator = new NIF_NISS();

$validNum = "513014438"; 
echo "Is '$validNum' valid? " . ($validator->validateNIF($validNum) ? "Yes" : "No") . "\n"; // Outputs: Yes

// Test Number 2: 123456788 (Invalid)
$invalidNum = "185590470"; 
echo "Is '$invalidNum' valid? " . ($validator->validateNIF($invalidNum) ? "Yes" : "No") . "\n"; // Outputs: Yes

$validNum = "513014439"; 
echo "Is '$validNum' valid? " . ($validator->validateNIF($validNum) ? "Yes" : "No") . "\n"; // Outputs: No

// Test Number 2: 123456788 (Invalid)
$invalidNum = "185590471"; 
echo "Is '$invalidNum' valid? " . ($validator->validateNIF($invalidNum) ? "Yes" : "No") . "\n"; // Outputs: No

$invalidNum = "11234567892"; 
echo "Is '$invalidNum' valid? " . ($validator->validateNISS($invalidNum) ? "Yes" : "No") . "\n"; // Outputs: No

$invalidNum = "11234567893"; 
echo "Is '$invalidNum' valid? " . ($validator->validateNISS($invalidNum) ? "Yes" : "No") . "\n"; // Outputs: No

$invalidNum = "11239567897"; 
echo "Is '$invalidNum' valid? " . ($validator->validateNISS($invalidNum) ? "Yes" : "No") . "\n"; // Outputs: No

$invalidNum = "11239567898"; 
echo "Is '$invalidNum' valid? " . ($validator->validateNISS($invalidNum) ? "Yes" : "No") . "\n"; // Outputs: No

$invalidNum = $validator->makeNIF("513");
echo "Is '$invalidNum' valid? " . ($validator->validateNIF($invalidNum) ? "Yes" : "No") . "\n"; // Outputs: No
$invalidNum = $validator->makeNIF("513");
echo "Is '$invalidNum' valid? " . ($validator->validateNIF($invalidNum) ? "Yes" : "No") . "\n"; // Outputs: No
$invalidNum = $validator->makeNIF("513");
echo "Is '$invalidNum' valid? " . ($validator->validateNIF($invalidNum) ? "Yes" : "No") . "\n"; // Outputs: No

$invalidNum = $validator->makeNISS("12");
echo "Is '$invalidNum' valid? " . ($validator->validateNISS($invalidNum) ? "Yes" : "No") . "\n"; // Outputs: No
$invalidNum = $validator->makeNISS("12");
echo "Is '$invalidNum' valid? " . ($validator->validateNISS($invalidNum) ? "Yes" : "No") . "\n"; // Outputs: No