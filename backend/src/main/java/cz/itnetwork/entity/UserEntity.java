package cz.itnetwork.entity;

import cz.itnetwork.constant.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "user")
@Getter
@Setter
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;
}
