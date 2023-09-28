<?php

$dbConnection = new mysqli("mariadb", "root", "7YKyE8R2AhKzswfN", "forcecast")
  or die('Could not connect to the database server' . mysqli_connect_error());

if ($dbConnection->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = 'INSERT INTO weather (temperature, humidity, windspeed) VALUES (21, 40, 20)';

$result = $dbConnection->query($sql);

if ($result) {
  $response = array("status" => "Success", "message" => "Data inserted successfully.");
} else {
  $response = array("status" => "Error", "message" => "Error inserting data: " . $dbConnection->error);
}

echo json_encode($response);

$dbConnection->close();