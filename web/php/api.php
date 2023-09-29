<?php
// Make a connection to your database
$conn = new mysqli("mariadb", "root", "7YKyE8R2AhKzswfN", "forcecast");

if ($conn->connect_error) {
  echo json_encode(array("success" => false, "error" => $conn->connect_error));
  exit();
}

$temperature = $_GET['temperature'];

$temp = json_decode($temperature, true);

echo ("json decode:" + $temp);

echo ("get temperature data:" + $temperature);


echo $json['temperature'];

// Insert data into database
$insertQuery = $conn->query("INSERT INTO `weather` (`temperature`) VALUES ('" . $temp . "')");

// Return if the insert was successful or return error message
if ($insertQuery === TRUE) {
  echo json_encode(array("success" => true));
} else {
  echo json_encode(array("success" => false, "error" => $conn->error));
}

$conn->close();
?>