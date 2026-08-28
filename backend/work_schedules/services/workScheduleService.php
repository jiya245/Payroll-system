<?php

class WorkScheduleService {
    private $repository;

    public function __construct($repository) {
        $this->repository = $repository;
    }

    public function getAllSchedules() {
        return $this->repository->getAllSchedules();
    }
}


?>