package cz.itnetwork.service;

import cz.itnetwork.dto.auth.AuthResponseDTO;
import cz.itnetwork.dto.auth.LoginDTO;
import cz.itnetwork.dto.auth.RegisterDTO;

/** Service interface for user registration and authentication. */
public interface UserService {

    /**
     * Registers a new user and returns a JWT token.
     *
     * @param registerDTO registration credentials
     * @return JWT token
     */
    AuthResponseDTO register(RegisterDTO registerDTO);

    /**
     * Authenticates a user and returns a JWT token.
     *
     * @param loginDTO login credentials
     * @return JWT token
     */
    AuthResponseDTO login(LoginDTO loginDTO);
}
