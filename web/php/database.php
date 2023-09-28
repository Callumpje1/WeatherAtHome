<?php
$host = "127.0.0.1";
$port = 3307;
$socket = "";
$user = "root";
$password = "Homerus4a!";
$dbname = "forcecast";

$conn = new mysqli($host, $user, $password, $dbname, $port, $socket)
  or die('Could not connect to the database server' . mysqli_connect_error());
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM Weather";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    echo json_encode($row);
  }
} else {
  echo "0 results";
}
$conn->close();