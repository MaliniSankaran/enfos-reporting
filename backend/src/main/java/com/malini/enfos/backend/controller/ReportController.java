package com.malini.enfos.backend.controller;

import com.malini.enfos.backend.dto.DepartmentDto;
import com.malini.enfos.backend.dto.ProjectDto;
import com.malini.enfos.backend.dto.ReportDto;
import com.malini.enfos.backend.dto.UserDto;
import com.malini.enfos.backend.service.DepartmentService;
import com.malini.enfos.backend.service.ProjectService;
import com.malini.enfos.backend.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final UserService userService;
    private final DepartmentService departmentService;
    private final ProjectService projectService;

    public ReportController(UserService userService,
                            DepartmentService departmentService,
                            ProjectService projectService) {
        this.userService = userService;
        this.departmentService = departmentService;
        this.projectService = projectService;
    }

    @GetMapping
    public List<ReportDto> getAllReports() {
        return List.of(
                new ReportDto("users", "Users", "People in the system", "2026-08-01T10:00:00Z"),
                new ReportDto("departments", "Departments", "Org structure", "2026-08-01T10:00:00Z"),
                new ReportDto("projects", "Projects", "Active & past work", "2026-08-01T10:00:00Z")
        );
    }

    @GetMapping("/users")
    public List<UserDto> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/departments")
    public List<DepartmentDto> getDepartments() {
        return departmentService.getAllDepartments();
    }

    @GetMapping("/projects")
    public List<ProjectDto> getProjects() {
        return projectService.getAllProjects();
    }
}