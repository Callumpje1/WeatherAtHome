<?php

$conn = new mysqli("mariadb", "root", "7YKyE8R2AhKzswfN", "forcecast")
    or die('Could not connect to the database server' . mysqli_connect_error());

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//get average temperature for a week
$sql = 'SELECT * FROM location';

$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    echo ("0 results");
}

$conn->close();

echo json_encode($data);