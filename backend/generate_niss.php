<?php

require_once "session_start.php";

require "nif_niss.php";
$generator = new NIF_NISS();

header('Content-Type: application/json');
$val = $generator->makeNISS("12");
echo json_encode(['value' => $val]);
