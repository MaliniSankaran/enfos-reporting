package com.malini.enfos.backend.dto;

import com.malini.enfos.backend.enums.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProjectDto {
    private String projectId;
    private String projectName;
    private String departmentId;
    private String departmentName;
    private String ownerId;
    private String ownerName;
    private ProjectStatus status;
    private String startDate;
    private String endDate;
}