<?php
    $input_data = json_decode(file_get_contents("php://input"), true);
    
    if ($_SERVER["REQUEST_METHOD"] != "POST" || empty($input_data["no_karcis"]) || empty($input_data["total_biaya"])) {
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

    $nopol   = $conn->real_escape_string($input_data["no_karcis"]);
    $pegawai = $conn->real_escape_string($_SESSION["uuid"]);

    $query = $conn->prepare("");
    $query->bind_param("1", $nopol, $jenis, $pegawai);

    if ($query->execute()) {
        http_response_code(200);
    } else {
        http_response_code(500);
    }
?>