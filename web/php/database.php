<?php
$servername = "3306:3306";
$username = "root";
$password = "Homerus4a!";
$dbname = "testdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT weatherId, temperature, time FROM weather";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    echo "weatherId: " . $row["weatherId"]. " - temperature: " . $row["temperature"]. " " . $row["time"]. "<br>";
  }
} else {
  echo "0 results";
}
$conn->close();
?>