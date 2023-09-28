<?php

$dbConnection = new mysqli("mariadb", "root", "7YKyE8R2AhKzswfN", "forcecast")
    or die('Could not connect to the database server' . mysqli_connect_error());

if ($dbConnection->connect_error) {
    die("Connection failed: " . $dbConnection->connect_error);
}

$sql = 'SELECT * FROM weather';

$result = $dbConnection->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    echo ("0 results");
}

$dbConnection->close();

echo json_encode($data);