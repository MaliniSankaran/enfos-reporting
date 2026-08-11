package com.malini.enfos.backend.dto;

import com.malini.enfos.backend.enums.UserRole;
import com.malini.enfos.backend.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {
    private String userId;
    private String name;
    private String email;
    private UserRole role;
    private UserStatus status;
    private String createdDate;
}