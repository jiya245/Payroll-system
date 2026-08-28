<?php

class WorkScheduleController {
    private $service;

    public function __construct($service) {
        $this->service = $service;
    }

    public function getAllSchedules() {
        return $this->service->getAllSchedules();
    }
}

?>