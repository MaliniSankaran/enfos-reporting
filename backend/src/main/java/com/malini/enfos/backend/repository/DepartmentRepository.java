package com.malini.enfos.backend.repository;

import com.malini.enfos.backend.model.Department;

import java.util.List;
import java.util.Optional;

public interface DepartmentRepository {
    List<Department> findAll();
    Optional<Department> findById(String departmentId);
}