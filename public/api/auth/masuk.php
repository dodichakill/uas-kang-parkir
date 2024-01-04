<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    $input_data = json_decode(file_get_contents("php://input"), true);
    
    if ($_SERVER["REQUEST_METHOD"] != "POST" || empty($input_data["username"]) || empty($input_data["password"])) {
        http_response_code(400);
        die();
    }
    
    session_start();

    $conn = new mysqli("dbparkir.my.id", "hanif", "123", "parkirin");

    if ($conn->connect_error) {
        http_response_code(500);
        die();
    }

    $input_username = $conn->real_escape_string($input_data["username"]);
    $input_password = $conn->real_escape_string($input_data["password"]);

    $sql = "SELECT uuid, level FROM pegawai WHERE id = '$input_username' AND sandi = MD5('$input_password')";
    $result = $conn->query($sql);

    if ($result) {
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $_SESSION["uuid"]  = $row["uuid"];
            $_SESSION["level"] = $row["level"];
        } else {
            http_response_code(404);
        }
    } else {
        http_response_code(500);
    }
?>