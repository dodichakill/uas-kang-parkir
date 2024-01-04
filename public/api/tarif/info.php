<?php
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
    }
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
        exit(0);
    }
    
    if ($_SERVER["REQUEST_METHOD"] != "GET" || empty($_GET["id"])) {
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

    $id     = $conn->real_escape_string($_GET["id"]);
    $sql    = "SELECT jenis, waktu_normal, biaya_normal, biaya_perjam FROM tarif WHERE id = $id";
    $result = $conn->query($sql);
    $data   = array();

    if ($result) {
        if ($result->num_rows > 0) {
            $row  = $result->fetch_assoc();
            $data = array(
                "jenis"        => $row["jenis"],
                "waktu_normal" => intval($row["waktu_normal"]),
                "biaya_normal" => intval($row["biaya_normal"]),
                "biaya_perjam" => intval($row["biaya_perjam"])
            );

            header("Content-Type: application/json");
            echo json_encode($data, JSON_PRETTY_PRINT);
        } else {
            http_response_code(404);
        }
    } else {
        http_response_code(500);
    }
?>