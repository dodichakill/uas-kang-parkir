<?php
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
    }
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: POST, OPTIONS");
    
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
        exit(0);
    }

    $input_data = json_decode(file_get_contents("php://input"), true);
    
    if ($_SERVER["REQUEST_METHOD"] != "POST" || empty($input_data["jenis"]) || empty($input_data["waktu"]) || empty($input_data["biaya_normal"]) || empty($input_data["biaya_perjam"])) {
        http_response_code(400);
        die();
    }
    
    session_start();

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

    $jenis  = $conn->real_escape_string($input_data["jenis"]);
    $waktu  = $conn->real_escape_string($input_data["waktu"]);
    $normal = $conn->real_escape_string($input_data["biaya_normal"]);
    $perjam = $conn->real_escape_string($input_data["biaya_perjam"]);

    $query = $conn->prepare("INSERT INTO tarif (jenis, waktu_normal, biaya_normal, biaya_perjam) VALUES (?, ?, ? , ?)");
    $query->bind_param("siii", $jenis, $waktu, $normal, $perjam);

    if ($query->execute()) {
        http_response_code(201);
    } else {
        http_response_code(500);
    }
?>