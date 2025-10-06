<?php
session_start();

// Unset all session variables
$_SESSION = array();

// // If using cookies to store session ID, also clear that
// if (ini_get("session.use_cookies")) {
//     $params = session_get_cookie_params();
//     setcookie(session_name(), '', time() - 42000,
//         $params["path"], $params["domain"],
//         $params["secure"], $params["httponly"]
//     );
// }

// Destroy the session
session_destroy();

// Optionally return a JSON response
echo json_encode(["status" => "ok", "message" => "Logged out"]);
