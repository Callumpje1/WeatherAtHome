<?php

// Make a connection to your database
$conn = new mysqli("mariadb", "root", "7YKyE8R2AhKzswfN", "forcecast");

if ($conn->connect_error) {
  echo json_encode(array("success" => false, "error" => $conn->connect_error));
  exit();
}

$data = json_decode(file_get_contents('php://input'));

$temperature = $data->temperature;
$humidity = $data->humidity;

// Insert data into database using prepared statement
$insertQuery = $conn->prepare("INSERT INTO `weather` (`temperature`, `humidity`) VALUES (?, ?)");

$insertQuery->bind_param("dd", $temperature, $humidity);

$insertQuery->execute();

$insertQuery->close();

$conn->close();
?>