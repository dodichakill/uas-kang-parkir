<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Max-Age: 3600");

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        header("HTTP/1.1 200 OK");
        exit();
    }

    if ($_SERVER["REQUEST_METHOD"] != "GET") {
        http_response_code(400);
        die();
    }
    
    session_start();

    if (empty($_SESSION["uuid"]) && empty($_SESSION["level"])) {
        http_response_code(401);
    } else {
        $data = array(
            "status" => "valid",
            "uuid"   => $_SESSION["uuid"],
            "level"  => $_SESSION["level"]
        );

        header("Content-Type: application/json");
        echo json_encode($data, JSON_PRETTY_PRINT);
    }
?>