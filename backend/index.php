<?php
header("Content-type: application/json");

require_once "config/database.php";
require_once "employees/repositories/EmployeeRepository.php";
require_once "employees/services/EmployeeService.php";
require_once "employees/controllers/EmployeeController.php";


$repository = new EmployeeRepository($conn);
$service = new EmployeeService($repository);
$controller = new EmployeeController($service);

$data = json_decode(file_get_contents("php://input"), true);

$method = $_SERVER["REQUEST_METHOD"];


switch ($method) {
    case "POST":
        $result = $controller->create($data);
        break;
    
    case "GET":
        $result = $controller->getAll();
        break;
    
    case "PUT":
        $result = $controller->update($data);
        break;

    case "DELETE":
        $result = $controller->delete($data["id"]);
        break;

    default:
        $result = [
            "success" => false,
            "message" => "Invalid Operation"
        ];
}

echo json_encode($result);

?>