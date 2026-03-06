package cz.itnetwork.entity;

import cz.itnetwork.constant.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * JPA entity representing an application user stored in the "user" table.
 * Stores authentication credentials and the assigned role.
 */
@Entity(name = "user")
@Getter
@Setter
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    /** BCrypt-hashed password. Never stored in plain text. */
    @Column(nullable = false)
    private String password;

    /** Role assigned to the user, defaults to USER on registration. */
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;
}
