<?php

class EmployeeService{
    private $repository;

    public function __construct($repository) {
        $this->repository = $repository;
    }

    public function createEmployee($data) {
        if (empty($data["fullname"])) {
            return [
                "success" => false,
                "message" => "Full name is required"
            ];
        }

        $data["fullname"] = trim($data["fullname"]);

        if (empty($data["email"])) {
            return [
                "success" => false,
                "message" => "Email is required"
            ];
        }

        if (!filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
            return [
                "success" => false,
                "message" => "Invalid email address"
            ];
        }

        if ($this->repository->emailExists($data["email"])) {
            return [
                "success" => false,
                "message" => "Email already exists"
            ];
        }

        if (empty($data["phone"])) {
            return [
                "success" => false,
                "message" => "Phone number is required"
            ];
        }

        if (!preg_match("/^09[0-9]{9}$/", $data["phone"])) {
            return [
                "success" => false,
                "message" => "Invalid phone number"
            ];
        }

        if (!isset($data["basic_salary"]) || $data["basic_salary"] === "") {
            return [
                "success" => false,
                "message" => "Basic salary is required"
            ];
        }

        if (!is_numeric($data["basic_salary"])) {
            return [
                "success" => false,
                "message" => "Basic salary must be a number"
            ];
        }

        if ($data["basic_salary"] < 0) {
            return [
                "success" => false,
                "message" => "Salary cannot be negative"
            ];
        }

        if (empty($data["position"])) {
            return [
                "success" => false,
                "message" => "Position is required"
            ];
        }

        if (empty($data["department"])) {
            return [
                "success" => false,
                "message" => "Department is required"
            ];
        }

        if (empty($data["status"])) {
            return [
                "success" => false,
                "message" => "Status is required"
            ];
        }

        if (!in_array($data["status"], ["Active", "Inactive"])) {
            return [
                "success" => false,
                "message" => "Invalid status"
            ];
        }

        $id = $this->repository->create($data);

        if ($id) {
            $employee_Id = "EMP-" . str_pad($id, 4, "0", STR_PAD_LEFT);

            $this->repository->updateEmployeeId($id, $employee_Id);

            return [
                "success" => true,
                "message" => "Employee created Successfully",
                "employee_Id" => $employee_Id
            ];
        }

        return [
            "success" => false,
            "message" => "Failed to create employee"
        ];
    }

    public function getAllEmployees() {

        $employees = $this->repository->getAll();

        return [
            "success" => true,
            "data" => $employees
        ];
        
    }

    public function updateEmployee($data) {
        if (empty($data["id"])) {
            return [
                "success" => false,
                "message" => "Employee ID is required"
            ];
        }

        if (empty($data["fullname"])) {
            return [
                "success" => false,
                "message" => "Full name is required"
            ];
        }

        if (empty($data["email"])) {
            return [
                "success" => false,
                "message" => "Email is required"
            ];
        }

        if ($data["basic_salary"] < 0) {
            return [
                "success" => true,
                "message" => "Salary cannot be negative"
            ];
        }

        $result = $this->repository->update($data);

        if ($result) {
            return [
                "success" => true,
                "message" => "Employee updated successfully"
            ];
        }

        return [
            "success" => false,
            "message" => "Failed to update employee"
        ];
    }

    public function deleteEmployee($id) {
        if (empty($id)) {
            return [
                "success" => false,
                "message" => "Employee ID is required"
            ];
        }

        $result = $this->repository->delete($id);

        if ($result) {
            return [
                "success" => true,
                "message" => "Employee deleted successfully"
            ];
        }

        return [
            "success" => false,
            "message" => "Employee not found"
        ];
    }
}


?>