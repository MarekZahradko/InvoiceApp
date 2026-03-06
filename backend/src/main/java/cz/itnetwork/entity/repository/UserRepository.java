package cz.itnetwork.entity.repository;

import cz.itnetwork.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Spring Data JPA repository for {@link UserEntity}.
 */
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    /** Finds a user by their unique email address. Returns empty if not found. */
    Optional<UserEntity> findByEmail(String email);
}
