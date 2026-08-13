<?php

if ($_SERVER['HTTP_HOST'] === 'localhost' || strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false) {

    $host = "localhost";
    $username = "root";
    $password = "";
    $database = "shopsphere";

} else {

    $host = "sql212.infinityfree.com";
    $username = "if0_42638834";
    $password = "ACKLT48Ur2Iuq0";
    $database = "if0_42638834_shopsphere";

}

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}

$conn->set_charset("utf8");

?>