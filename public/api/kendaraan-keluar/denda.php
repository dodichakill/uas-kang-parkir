<?php
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
    }
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: PATCH, OPTIONS");
    
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
        exit(0);
    }

    $input_data = json_decode(file_get_contents("php://input"), true);
    if ($_SERVER["REQUEST_METHOD"] != "PATCH" || empty($input_data["nopol"]) || empty($input_data["total_biaya"])) {
        http_response_code(400);
        die();
    }

    session_start();
    date_default_timezone_set('Asia/Jakarta');

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

    $nopol  = $conn->real_escape_string($input_data["nopol"]);
    $biaya   = $conn->real_escape_string($input_data["total_biaya"]);
    $pegawai = $conn->real_escape_string($_SESSION["uuid"]);
    $waktu   = date('Y-m-d H:i:s');

    $sql     = "UPDATE pemarkiran SET keluar = '$waktu', status = 'Bayar Denda', total_biaya = $biaya, pegawai = (SELECT nama FROM pegawai WHERE uuid = '$pegawai') WHERE nopol = '$nopol' AND status IS NULL";
    $result  = $conn->query($sql);

    if ($result) {
        http_response_code(200);
    } else {
        http_response_code(500);
    }
?>