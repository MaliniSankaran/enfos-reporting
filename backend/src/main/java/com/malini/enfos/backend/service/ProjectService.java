package com.malini.enfos.backend.service;

import com.malini.enfos.backend.dto.ProjectDto;
import com.malini.enfos.backend.model.Department;
import com.malini.enfos.backend.model.Project;
import com.malini.enfos.backend.model.User;
import com.malini.enfos.backend.repository.DepartmentRepository;
import com.malini.enfos.backend.repository.ProjectRepository;
import com.malini.enfos.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository,
                          DepartmentRepository departmentRepository,
                          UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
    }

    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    private ProjectDto toDto(Project project) {
        String departmentName = departmentRepository.findById(project.getDepartmentId())
                .map(Department::getDepartmentName)
                .orElse("Unknown Department");

        String ownerName = userRepository.findById(project.getOwnerId())
                .map(User::getName)
                .orElse("Unknown Owner");

        return new ProjectDto(
                project.getProjectId(),
                project.getProjectName(),
                project.getDepartmentId(),
                departmentName,
                project.getOwnerId(),
                ownerName,
                project.getStatus(),
                project.getStartDate(),
                project.getEndDate()
        );
    }
}