<?php

include = "../config/database.php";

$sql = "SELECT * FROM employees";

$result = mysqli_query($conn, $sql);

$employees = [];

while ($row = mysqli_fetch_assoc($result)) {
    $employees[] = $row;
}

echo json_encode([
    "success" => true,
    "data" => $employees
])

?>