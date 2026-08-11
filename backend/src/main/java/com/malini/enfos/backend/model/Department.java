package com.malini.enfos.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Department {
    private String departmentId;
    private String departmentName;
    private String managerId; // must match a valid User.userId (see InMemoryUserRepository)
    private int employeeCount;
    private String location;
}