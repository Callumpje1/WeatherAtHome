<?php
// Make a connection to your database
$conn = new mysqli("mariadb", "root", "7YKyE8R2AhKzswfN", "forcecast");

if ($conn->connect_error) {
  echo json_encode(array("success" => false, "error" => $conn->connect_error));
  exit();
}

$temperature = $_GET['temperature'];

$obj = json_decode($temperature, true);

$temp = $obj['temperature'];

echo 'Temperature: ' . $temp;

// Insert data into your database
$insertQuery = $conn->query("INSERT INTO `weather` (`temperature`) VALUES ('" . $temperature . "')");

// Return if the insert was successful or not
if ($insertQuery === TRUE) {
  echo json_encode(array("success" => true));
} else {
  echo json_encode(array("success" => false, "error" => $conn->error));
}

$conn->close();
?>