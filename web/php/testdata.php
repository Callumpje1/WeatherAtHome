<?php
$data = array("temperature" => "21 C*", "location" => "Paris", "conditions" => "Chance of rain");

header('Content-Type: application/json');

echo json_encode($data);
?>