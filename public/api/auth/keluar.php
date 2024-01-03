<?php
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        http_response_code(400);
        die();
    }
    
    session_start();
    session_unset();
    session_destroy();
?>