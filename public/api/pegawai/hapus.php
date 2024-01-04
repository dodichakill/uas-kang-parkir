<?php
    if ($_SERVER["REQUEST_METHOD"] != "DELETE" || empty($_GET["uuid"])) {
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

    $uuid = $conn->real_escape_string($_GET["uuid"]);
    $sql = "DELETE FROM pegawai WHERE uuid = '$uuid'";
    $result = $conn->query($sql);

    if ($result) {
        http_response_code(204);
    } else {
        http_response_code(500);
    }
?>