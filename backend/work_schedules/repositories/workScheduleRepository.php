<?php

class WorkScheduleRepository {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function getAllSchedules() {
        $sql = "SELECT id, schedule_name FROM work_schedules";
    
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
    
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}



?>