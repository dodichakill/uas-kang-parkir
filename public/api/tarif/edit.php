<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PATCH, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Max-Age: 3600");

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        header("HTTP/1.1 200 OK");
        exit();
    }

    $input_data = json_decode(file_get_contents("php://input"), true);
    if ($_SERVER["REQUEST_METHOD"] != "PATCH" || empty($_GET["id"]) || empty($input_data["jenis"]) || empty($input_data["waktu"]) || empty($input_data["biaya_normal"]) || empty($input_data["biaya_perjam"])) {
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
    $jenis  = $conn->real_escape_string($input_data["jenis"]);
    $waktu  = $conn->real_escape_string($input_data["waktu"]);
    $normal = $conn->real_escape_string($input_data["biaya_normal"]);
    $perjam = $conn->real_escape_string($input_data["biaya_perjam"]);
    $sql    = "UPDATE tarif SET jenis = '$jenis', waktu_normal = $waktu, biaya_normal = $normal, biaya_perjam = $perjam WHERE id = $id";
    $result = $conn->query($sql);

    if ($result) {
        http_response_code(200);
    } else {
        http_response_code(500);
    }
?>