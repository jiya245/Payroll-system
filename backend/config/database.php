<?php


$host = "localhost";
$user = "root";
$password = "";
$database = "payroll_system";

try {
    $conn = new PDO(
        "mysql:host=$host;dbname=$database",
        $user,
        $password
    );

    $conn->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
    );
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
}
?>