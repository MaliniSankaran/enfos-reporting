package com.malini.enfos.backend.repository;

import com.malini.enfos.backend.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    List<User> findAll();
    Optional<User> findById(String userId);
}