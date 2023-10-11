<?php
// Make a connection to your database
$conn = new mysqli("mariadb", "root", "7YKyE8R2AhKzswfN", "forcecast");

if ($conn->connect_error) {
    echo json_encode(array("success" => false, "error" => $conn->connect_error));
    exit();
}

$jsonData = json_decode(file_get_contents('php://input'));

$location = $jsonData->location;
$temperature = $jsonData->temperature;
$humidity = $jsonData->humidity;
$time = $jsonData->observation_time;
$description = $jsonData->weatherDesc;
$precipitation = $jsonData->precipMM;

// Check if the location already exists
$checkQuery = $conn->prepare("SELECT COUNT(*) FROM `location` WHERE LOWER(`name`) = LOWER(?)");
$checkQuery->bind_param("s", $location);
$checkQuery->execute();
$checkQuery->bind_result($count);
$checkQuery->fetch();
$checkQuery->close();

if ($count == 0) {
    // Location does not exist, so we can insert the data
    $insertQuery = $conn->prepare("INSERT INTO `location` (`name`, `temperature`, `humidity`, `observation_time`, `conditions`, `precipitation`) VALUES (?, ?, ?, ?, ?, ?)");
    $insertQuery->bind_param("siissd", $location, $temperature, $humidity, $time, $description, $precipitation);
    $insertQuery->execute();
    $insertQuery->close();
} else {
    echo "Location '$location' already exists.";
}


?>