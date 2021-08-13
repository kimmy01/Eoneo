package com.kyp.eoneo.repository;

import com.kyp.eoneo.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByEmail(String email);

    User findUserById(Long id);
    User findUserByEmail(String email);
}
