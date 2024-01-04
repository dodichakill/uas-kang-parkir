<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Max-Age: 3600");

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        header("HTTP/1.1 200 OK");
        exit();
    }
    
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        http_response_code(400);
        die();
    }
    
    session_start();
    session_unset();
    session_destroy();
?>