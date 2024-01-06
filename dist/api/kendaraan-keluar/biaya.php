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
    
    if ($_SERVER["REQUEST_METHOD"] != "GET" || empty($_GET["no_karcis"])) {
        http_response_code(400);
        die();
    }
    
    session_start();
    date_default_timezone_set('Asia/Jakarta');

    $conn = new mysqli("dbparkir.my.id", "hanif", "123", "parkirin");

    if ($conn->connect_error) {
        http_response_code(500);
        die();
    }

    if (empty($_SESSION["uuid"]) && empty($_SESSION["level"])) {
        http_response_code(401);
        die();
    }

    $normal = 0; $awal = 0; $perjam = 0; $biaya = 0;
    $waktu_masuk = null; $waktu_keluar = null; $selisihWaktu = null;
    $karcis = $conn->real_escape_string($_GET["no_karcis"]);

    $tarif  = $conn->query("SELECT waktu_normal, biaya_normal, biaya_perjam FROM tarif WHERE jenis = (select jenis FROM pemarkiran WHERE no = $karcis AND status IS NULL)");
    if ($tarif && $tarif->num_rows > 0) {
        $row = $tarif->fetch_assoc();
        $normal = $row["waktu_normal"];
        $awal   = $row["biaya_normal"];
        $perjam = $row["biaya_perjam"];
    }

    $waktu = $conn->query("SELECT masuk FROM pemarkiran WHERE no = $karcis AND status IS NULL");
    if ($waktu && $waktu->num_rows > 0) {
        $row = $waktu->fetch_assoc();
        $waktu_masuk  = $row["masuk"];
        $waktu_keluar = date('Y-m-d H:i:s');
    }

    $selisihWaktu = round((strtotime($waktu_keluar) - strtotime($waktu_masuk)) / 3600);

    if ($selisihWaktu <= $normal) { $biaya = $awal; }
    else { $biaya = $awal + (($selisihWaktu - $normal) * $perjam); }

    $data = array( "total_biaya" => intval($biaya) );

    header("Content-Type: application/json");
    echo json_encode($data, JSON_PRETTY_PRINT);
?>