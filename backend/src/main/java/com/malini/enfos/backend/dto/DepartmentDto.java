package com.malini.enfos.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DepartmentDto {
    private String departmentId;
    private String departmentName;
    private String managerId;
    private String managerName;
    private int employeeCount;
    private String location;
}