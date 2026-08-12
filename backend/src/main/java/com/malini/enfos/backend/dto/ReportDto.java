package com.malini.enfos.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReportDto {
    private String id;
    private String name;
    private String description;
    private String lastUpdated;
    private int recordCount;
}