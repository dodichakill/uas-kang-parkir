<?php
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
    }
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, OPTIONS");
    
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
        exit(0);
    }
    
    if ($_SERVER["REQUEST_METHOD"] != "GET" || empty($_GET["uuid"])) {
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

    $uuid   = $conn->real_escape_string($_GET["uuid"]);
    $sql    = "SELECT nama, level, gender, telp, alamat FROM pegawai WHERE uuid = '$uuid'";
    $result = $conn->query($sql);
    $data   = array();

    if ($result) {
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $data = array(
                "nama"   => $row["nama"],
                "level"  => $row["level"],
                "gender" => $row["gender"],
                "telp"   => $row["telp"],
                "alamat" => $row["alamat"],
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