<?php
$jsonData = json_decode(file_get_contents('php://input'));

echo ($jsonData->minTemp);
echo ($jsonData->maxTemp);

?>