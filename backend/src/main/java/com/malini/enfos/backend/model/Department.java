package com.malini.enfos.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Department {
    private String departmentId;
    private String departmentName;
    private String managerId;
    private int employeeCount;
    private String location;
}