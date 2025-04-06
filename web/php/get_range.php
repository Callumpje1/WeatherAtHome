<?php

$jsonData = json_decode(file_get_contents('php://input'));

$minTemp = $jsonData->minTemp;
$maxTemp = $jsonData->maxTemp;

$data = [
    'minTemp' => $minTemp,
    'maxTemp' => $maxTemp,
];

$jsonData = json_encode($data);

$wemosEndpoint = 'http://192.168.178.186/range';

$options = [
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/json',
        'content' => $jsonData,
    ],
];

echo ($jsonData);

$context = stream_context_create($options);
$response = file_get_contents($wemosEndpoint, false, $context);

if ($response === false) {
    echo 'Error: Unable to send data to Wemos D1 Mini.';
} else {
    echo htmlspecialchars($response, ENT_QUOTES, 'UTF-8');
}