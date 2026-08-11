package com.malini.enfos.backend.repository;

import com.malini.enfos.backend.model.Department;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class InMemoryDepartmentRepository implements DepartmentRepository {

    // managerId values below must correspond to real userId entries in InMemoryUserRepository
    private final List<Department> departments = List.of(
            new Department("D001", "Engineering", "U001", 42, "Boston"),
            new Department("D002", "Marketing", "U002", 15, "New York"),
            new Department("D003", "Sales", "U005", 28, "Los Angeles")
    );

    @Override
    public List<Department> findAll() {
        return departments;
    }

    @Override
    public Optional<Department> findById(String departmentId) {
        return departments.stream()
                .filter(d -> d.getDepartmentId().equals(departmentId))
                .findFirst();
    }
}