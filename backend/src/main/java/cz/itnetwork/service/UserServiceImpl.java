package cz.itnetwork.service;

import cz.itnetwork.constant.Role;
import cz.itnetwork.dto.auth.AuthResponseDTO;
import cz.itnetwork.dto.auth.LoginDTO;
import cz.itnetwork.dto.auth.RegisterDTO;
import cz.itnetwork.entity.UserEntity;
import cz.itnetwork.entity.repository.UserRepository;
import cz.itnetwork.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/** Default implementation of {@link UserService}. */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * Registers a new user.
     * Checks for duplicate email, hashes the password with BCrypt,
     * saves the user with the default USER role, and returns a JWT token.
     */
    @Override
    public AuthResponseDTO register(RegisterDTO registerDTO) {
        if (userRepository.findByEmail(registerDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists: " + registerDTO.getEmail());
        }

        UserEntity user = new UserEntity();
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword())); // Hash password before storing
        user.setRole(Role.USER);

        userRepository.save(user);

        String token = jwtUtil.generateToken(user);
        return new AuthResponseDTO(token);
    }

    /**
     * Authenticates an existing user via Spring Security's AuthenticationManager.
     * On success, generates and returns a JWT token.
     * Throws an exception if credentials are invalid (handled by Spring Security).
     */
    @Override
    public AuthResponseDTO login(LoginDTO loginDTO) {
        // Delegates credential verification to Spring Security (includes BCrypt comparison)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword())
        );

        UserEntity user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user);
        return new AuthResponseDTO(token);
    }
}
