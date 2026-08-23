<?php

class EmployeeRepository {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function create($data) {

        $sql = "INSERT into employees
        (fullname, email, phone, position, department, basic_salary, status)
        VALUES
        (:fullname, :email, :phone, :position, :department, :basic_salary, :status)";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindparam(":fullname", $data["fullname"]);
        $stmt->bindparam(":email", $data["email"]);
        $stmt->bindparam(":phone", $data["phone"]);
        $stmt->bindparam(":position", $data["position"]);
        $stmt->bindparam(":department", $data["department"]);
        $stmt->bindparam(":basic_salary", $data["basic_salary"]);
        $stmt->bindparam(":status", $data["status"]);

        $stmt->execute();

        $id = $this->conn->lastInsertId();

        return $id;

    }

    public function updateEmployeeId($id, $employeeId) {
        $sql = "UPDATE employees
                SET employee_id = :employee_id
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindparam(":employee_id", $employeeId);
        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }

    public function getAll() {
        $sql = "SELECT * FROM employees ORDER BY id DESC";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchALL(PDO::FETCH_ASSOC);
    }

    public function update($data) {
        $sql = "UPDATE employees
                SET fullname = :fullname,
                email = :email,
                phone = :phone,
                position = :position,
                department = :department,
                basic_salary = :basic_salary,
                status = :status
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":fullname", $data["fullname"]);
        $stmt->bindParam(":email", $data["email"]);
        $stmt->bindParam(":phone", $data["phone"]);
        $stmt->bindParam(":position", $data["position"]);
        $stmt->bindParam(":department", $data["department"]);
        $stmt->bindParam(":basic_salary", $data["basic_salary"]);
        $stmt->bindParam(":status", $data["status"]);
        $stmt->bindParam(":id", $data["id"]);

        $stmt->execute();

        return $stmt->rowCount() > 0;
    }

    public function delete($id) {
        $sql = "DELETE from employees WHERE id = :id";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindparam("id", $id);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }

    public function emailExists($email) {
        $sql = "SELECT id FROM employees WHERE email = :email";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindparam(":email", $email);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    }
}





?>