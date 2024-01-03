<?php
    if ($_SERVER["REQUEST_METHOD"] != "GET") {
        http_response_code(400);
        die();
    }
    
    session_start();

    $input_data = json_decode(file_get_contents("php://input"), true);
    $conn = new mysqli("dbparkir.my.id", "hanif", "123", "parkirin");

    if ($conn->connect_error) {
        http_response_code(500);
        die();
    }

    if (empty($_SESSION["uuid"]) && empty($_SESSION["level"])) {
        http_response_code(401);
        die();
    }

    if ($_SESSION["level"] != "Admin") {
        http_response_code(403);
        die();
    }

    $sql    = "SELECT uuid, nama from pegawai";
    $result = $conn->query($sql);
    $data   = array();

    if ($result) {
        while($row = $result->fetch_assoc()) {
            $data[] = array(
                "uuid" => $row["uuid"],
                "nama" => $row["nama"]
            );
        }

        header("Content-Type: application/json");
        echo json_encode($data, JSON_PRETTY_PRINT);
    } else {
        http_response_code(500);
    }
?>