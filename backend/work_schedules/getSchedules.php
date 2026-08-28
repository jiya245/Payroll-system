<?php

require_once "../config/database.php";
require_once "./repositories/WorkScheduleRepository.php";
require_once "./services/WorkScheduleService.php";
require_once "./controllers/WorkScheduleController.php";

header("Content-Type: application/json");

$repository = new WorkScheduleRepository($conn);
$service = new WorkScheduleService($repository);
$controller = new WorkScheduleController($service);

$schedules = $controller->getAllSchedules();

echo json_encode([
    "success" => true,
    "data" => $schedules
]);

?>