<?php
    if ($_SERVER["REQUEST_METHOD"] != "GET") {
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

    $sql    = "SELECT DATE_FORMAT(keluar, '%d-%m-%Y') AS 'tanggal', TIME_FORMAT(keluar, '%H:%i') AS 'waktu', no, nopol, jenis, status, total_biaya, pegawai FROM pemarkiran WHERE status IS NOT NULL ORDER BY no DESC LIMIT 20";
    $result = $conn->query($sql);
    $data   = array();

    if ($result) {
        while($row = $result->fetch_assoc()) {
            $data[] = array(
                "tanggal"     => $row["tanggal"],
                "waktu"       => $row["waktu"],
                "no"          => $row["no"],
                "nopol"       => $row["nopol"],
                "jenis"       => $row["jenis"],
                "status"      => $row["status"],
                "total_biaya" => $row["total_biaya"],
                "pegawai"     => $row["pegawai"]
            );
        }

        header("Content-Type: application/json");
        echo json_encode($data, JSON_PRETTY_PRINT);
    } else {
        http_response_code(500);
    }
?>