package cz.itnetwork.controller;

import cz.itnetwork.dto.auth.AuthResponseDTO;
import cz.itnetwork.dto.auth.LoginDTO;
import cz.itnetwork.dto.auth.RegisterDTO;
import cz.itnetwork.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller handling user authentication.
 * Exposes public endpoints for registration and login under /api/auth.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    /**
     * Registers a new user account and returns a JWT token on success.
     *
     * @param registerDTO registration data (email + password)
     * @return JWT token wrapped in {@link AuthResponseDTO}
     */
    @PostMapping("/register")
    public AuthResponseDTO register(@RequestBody RegisterDTO registerDTO) {
        return userService.register(registerDTO);
    }

    /**
     * Authenticates an existing user and returns a JWT token on success.
     *
     * @param loginDTO login credentials (email + password)
     * @return JWT token wrapped in {@link AuthResponseDTO}
     */
    @PostMapping("/login")
    public AuthResponseDTO login(@RequestBody LoginDTO loginDTO) {
        return userService.login(loginDTO);
    }
}
