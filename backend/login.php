<?php

include "config.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] != "POST") {

    echo json_encode([
        "status" => "error",
        "message" => "Invalid Request"
    ]);

    exit;

}

$identifier = trim(strtolower($_POST["identifier"]));
$password = $_POST["password"];

$query = $conn->prepare(
    "SELECT * FROM users
     WHERE username=? OR email=? OR phone=?"
);

$query->bind_param(
    "sss",
    $identifier,
    $identifier,
    $identifier
);

$query->execute();

$result = $query->get_result();

if ($result->num_rows == 0) {

    echo json_encode([
        "status" => "error",
        "message" => "User not found"
    ]);

    exit;

}

$user = $result->fetch_assoc();

if (!password_verify($password, $user["password"])) {

    echo json_encode([
        "status" => "error",
        "message" => "Wrong password"
    ]);

    exit;

}

unset($user["password"]);

echo json_encode([
    "status" => "success",
    "user" => $user
]);

$conn->close();

?>