package cz.itnetwork.service;

import cz.itnetwork.dto.auth.AuthResponseDTO;
import cz.itnetwork.dto.auth.LoginDTO;
import cz.itnetwork.dto.auth.RegisterDTO;

public interface UserService {
    AuthResponseDTO register(RegisterDTO registerDTO);
    AuthResponseDTO login(LoginDTO loginDTO);
}
