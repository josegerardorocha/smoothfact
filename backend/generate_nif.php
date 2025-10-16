<?php

require_once "session_start.php";
require "nif_niss.php";

$prefix = $_POST['prefix'] ?? '564';

$generator = new NIF_NISS();

header('Content-Type: application/json');
echo json_encode(['value' => $generator->makeNIF($prefix)]);
