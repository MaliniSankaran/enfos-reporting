package com.malini.enfos.backend.repository;

import com.malini.enfos.backend.enums.UserRole;
import com.malini.enfos.backend.enums.UserStatus;
import com.malini.enfos.backend.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class InMemoryUserRepository implements UserRepository {

    private final List<User> users = List.of(
            new User("U001", "John Smith", "john.smith@example.com", UserRole.ADMIN, UserStatus.ACTIVE, "2026-01-15T09:00:00Z"),
            new User("U002", "Jane Doe", "jane.doe@example.com", UserRole.MANAGER, UserStatus.ACTIVE, "2026-02-10T09:00:00Z"),
            new User("U003", "Alex Johnson", "alex.johnson@example.com", UserRole.USER, UserStatus.ACTIVE, "2026-03-05T09:00:00Z"),
            new User("U004", "Priya Patel", "priya.patel@example.com", UserRole.USER, UserStatus.INACTIVE, "2026-01-20T09:00:00Z"),
            new User("U005", "Chris Lee", "chris.lee@example.com", UserRole.MANAGER, UserStatus.PENDING, "2026-04-01T09:00:00Z")
    );

    @Override
    public List<User> findAll() {
        return users;
    }

    @Override
    public Optional<User> findById(String userId) {
        return users.stream()
                .filter(u -> u.getUserId().equals(userId))
                .findFirst();
    }
}