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

$full_name = trim($_POST["full_name"]);
$username = trim(strtolower($_POST["username"]));
$identifier = trim(strtolower($_POST["identifier"]));
$password = $_POST["password"];

$email = null;
$phone = null;

if (filter_var($identifier, FILTER_VALIDATE_EMAIL)) {
    $email = $identifier;
} else {
    $phone = $identifier;
}

$check = $conn->prepare(
    "SELECT id FROM users
     WHERE username=? OR email=? OR phone=?"
);

$check->bind_param(
    "sss",
    $username,
    $email,
    $phone
);

$check->execute();

$result = $check->get_result();

if ($result->num_rows > 0) {

    echo json_encode([
        "status" => "error",
        "message" => "User already exists"
    ]);

    exit;
}

$hashedPassword =
    password_hash(
        $password,
        PASSWORD_DEFAULT
    );

$insert = $conn->prepare(
    "INSERT INTO users
    (full_name,username,email,phone,password)
    VALUES (?,?,?,?,?)"
);

$insert->bind_param(
    "sssss",
    $full_name,
    $username,
    $email,
    $phone,
    $hashedPassword
);

if ($insert->execute()) {

    echo json_encode([
        "status" => "success",
        "message" => "Registration Successful"
    ]);

} else {

    echo json_encode([
        "status" => "error",
        "message" => "Registration Failed"
    ]);

}

$conn->close();

?>