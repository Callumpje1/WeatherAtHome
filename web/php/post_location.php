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
$conditions = $jsonData->weatherDesc;
$precipitation = $jsonData->precipMM;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the location already exists
    $checkQuery = $conn->prepare("SELECT `locationId` FROM `location` WHERE LOWER(`name`) = LOWER(?)");
    $checkQuery->bind_param("s", $location);
    $checkQuery->execute();
    $checkQuery->bind_result($locationId);
    $checkQuery->fetch();
    $checkQuery->close();

    if ($locationId) {
        echo json_encode(array("success" => false, "error" => "$location already exists!", "locationId" => $locationId));
    } else {
        $insertQuery = $conn->prepare("INSERT INTO `location` (`name`, `temperature`, `humidity`, `observation_time`, `conditions`, `precipitation`) VALUES (?, ?, ?, ?, ?, ?)");
        $insertQuery->bind_param("siissd", $location, $temperature, $humidity, $time, $conditions, $precipitation);
        $insertQuery->execute();
        $insertQuery->close();

        // Retrieve the assigned location ID
        $lastInsertedId = $conn->insert_id;

        echo json_encode(array("success" => true, "locationId" => $lastInsertedId));
    }
}


// Handle data deletion
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $jsonData->locationId;

    $stmt = $conn->prepare("DELETE FROM `location` WHERE `locationId` = ?");

    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        json_encode("$stmt was executed successfully");
    } else {
        json_encode("$stmt did not execute successfully");
    }

    $stmt->close();
}


?>