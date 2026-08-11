package com.malini.enfos.backend.service;

import com.malini.enfos.backend.dto.DepartmentDto;
import com.malini.enfos.backend.model.Department;
import com.malini.enfos.backend.model.User;
import com.malini.enfos.backend.repository.DepartmentRepository;
import com.malini.enfos.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;

    public DepartmentService(DepartmentRepository departmentRepository, UserRepository userRepository) {
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
    }

    public List<DepartmentDto> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    private DepartmentDto toDto(Department department) {
        String managerName = userRepository.findById(department.getManagerId())
                .map(User::getName)
                .orElse("Unknown Manager");

        return new DepartmentDto(
                department.getDepartmentId(),
                department.getDepartmentName(),
                department.getManagerId(),
                managerName,
                department.getEmployeeCount(),
                department.getLocation()
        );
    }
}