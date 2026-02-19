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

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public AuthResponseDTO register(@RequestBody RegisterDTO registerDTO) {
        return userService.register(registerDTO);
    }

    @PostMapping("/login")
    public AuthResponseDTO login(@RequestBody LoginDTO loginDTO) {
        return userService.login(loginDTO);
    }
}
