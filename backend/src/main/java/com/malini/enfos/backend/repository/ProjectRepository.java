package com.malini.enfos.backend.repository;

import com.malini.enfos.backend.model.Project;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository {
    List<Project> findAll();
    Optional<Project> findById(String projectId);
}