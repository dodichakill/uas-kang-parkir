<?php
    $input_data = json_decode(file_get_contents("php://input"), true);
    
    if ($_SERVER["REQUEST_METHOD"] != "POST" || empty($input_data["username"]) || empty($input_data["password"]) || empty($input_data["nama"]) || empty($input_data["jenis_kelamin"]) || empty($input_data["no_telp"]) || empty($input_data["alamat"]) || empty($input_data["level"])) {
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

    $id      = $conn->real_escape_string($input_data["username"]);
    $sandi   = $conn->real_escape_string($input_data["password"]);
    $nama    = $conn->real_escape_string($input_data["nama"]);
    $kelamin = $conn->real_escape_string($input_data["jenis_kelamin"]);
    $telp    = $conn->real_escape_string($input_data["no_telp"]);
    $alamat  = $conn->real_escape_string($input_data["alamat"]);
    $level   = $conn->real_escape_string($input_data["level"]);

    $query = $conn->prepare("INSERT INTO pegawai (uuid,id,sandi,nama,gender,telp,alamat,level) VALUES (MD5(NOW()), ?, MD5(?), ?, ?, ?, ?, ?)");
    $query->bind_param("sssssss", $id, $sandi, $nama, $kelamin, $telp, $alamat, $level);

    if ($query->execute()) {
        http_response_code(201);
    } else {
        http_response_code(500);
    }
?>