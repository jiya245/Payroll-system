<?php

class EmployeeController {
    private $service;

    public function __construct($service) {
        $this->service = $service;
    }

    public function create($data) {
        return $this->service->createEmployee($data);
    }

    public function getAll() {
        return $this->service->getAllEmployees();
    }

    public function update($data) {
        return $this->service->updateEmployee($data);
    }

    public function delete($id) {
        return $this->service->deleteEmployee($id);
    }
}


?>