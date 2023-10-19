<?php

$jsonData = json_decode(file_get_contents('php://input'));

$minTemp = ($jsonData->minTemp);
$maxTemp = ($jsonData->maxTemp);

$data = [
    'minTemp' => $minTemp,
    'maxTemp' => $maxTemp,
];

echo ($jsonData);

$wemosEndpoint = 'http://your-wemos-ip/data-receiver.php'; // Replace with the correct endpoint URL
$options = [
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/json',
        'content' => $jsonData,
    ],
];

$context = stream_context_create($options);
$response = file_get_contents($wemosEndpoint, false, $context);

if ($response === false) {
    echo 'Error: Unable to send data to Wemos D1 Mini.';
} else {
    echo 'Data sent successfully.';
}


?>