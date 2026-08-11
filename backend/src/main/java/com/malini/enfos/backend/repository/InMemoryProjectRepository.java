package com.malini.enfos.backend.repository;

import com.malini.enfos.backend.enums.ProjectStatus;
import com.malini.enfos.backend.model.Project;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class InMemoryProjectRepository implements ProjectRepository {

    // departmentId values must match real departmentId entries in InMemoryDepartmentRepository
    // ownerId values must match real userId entries in InMemoryUserRepository
    private final List<Project> projects = List.of(
            new Project("P001", "Website Redesign", "D001", "U001", ProjectStatus.ACTIVE, "2026-01-01T00:00:00Z", null),
            new Project("P002", "Q2 Marketing Campaign", "D002", "U002", ProjectStatus.COMPLETED, "2026-02-01T00:00:00Z", "2026-04-30T00:00:00Z"),
            new Project("P003", "Sales Pipeline Overhaul", "D003", "U005", ProjectStatus.ON_HOLD, "2026-03-15T00:00:00Z", null),
            new Project("P004", "Internal Tools Migration", "D001", "U003", ProjectStatus.ACTIVE, "2026-05-01T00:00:00Z", null)
    );

    @Override
    public List<Project> findAll() {
        return projects;
    }

    @Override
    public Optional<Project> findById(String projectId) {
        return projects.stream()
                .filter(p -> p.getProjectId().equals(projectId))
                .findFirst();
    }
}