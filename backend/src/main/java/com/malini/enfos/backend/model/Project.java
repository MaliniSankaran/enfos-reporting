package com.malini.enfos.backend.model;

import com.malini.enfos.backend.enums.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Project {
    private String projectId;
    private String projectName;
    private String departmentId;
    private String ownerId;
    private ProjectStatus status;
    private String startDate;
    private String endDate;
}
