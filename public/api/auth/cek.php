<?php
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