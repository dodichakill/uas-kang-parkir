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

    $input_data = json_decode(file_get_contents("php://input"), true);
    
    if ($_SERVER["REQUEST_METHOD"] != "POST" || empty($input_data["nopol"]) || empty($input_data["jenis"])) {
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

    $nopol   = $conn->real_escape_string($input_data["nopol"]);
    $jenis   = $conn->real_escape_string($input_data["jenis"]);
    $pegawai = $conn->real_escape_string($_SESSION["uuid"]);

    $query = $conn->prepare("INSERT INTO pemarkiran (nopol, jenis, masuk, pegawai) VALUES (?, ?, NOW(), (SELECT nama FROM pegawai WHERE uuid = ?))");
    $query->bind_param("sss", $nopol, $jenis, $pegawai);

    if ($query->execute()) {
        $sql = "SELECT no FROM pemarkiran WHERE nopol = '$nopol' ORDER BY no DESC LIMIT 1";
        $result = $conn->query($sql);

        if ($result) {
            if ($result->num_rows > 0) {
                $row  = $result->fetch_assoc();
                $data = array(
                    "no_karcis" => $row["no"]
                );
    
                header("Content-Type: application/json");
                echo json_encode($data, JSON_PRETTY_PRINT);
            } else {
                http_response_code(404);
            }
        } else {
            http_response_code(500);
        }
    } else {
        http_response_code(500);
    }
?>