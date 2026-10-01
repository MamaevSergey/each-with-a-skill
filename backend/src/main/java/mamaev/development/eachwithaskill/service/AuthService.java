package mamaev.development.eachwithaskill.service;

import lombok.RequiredArgsConstructor;
import mamaev.development.eachwithaskill.controller.dto.AuthRequestDto;
import mamaev.development.eachwithaskill.controller.dto.AuthResponseDto;
import mamaev.development.eachwithaskill.controller.dto.RegisterRequestDto;
import mamaev.development.eachwithaskill.exception.ResourceNotFoundException;
import mamaev.development.eachwithaskill.exception.UserAlreadyExistsException;
import mamaev.development.eachwithaskill.model.User;
import mamaev.development.eachwithaskill.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Transactional
    public void register(RegisterRequestDto request) {
        if (userRepository.existsByLogin(request.getLogin())) {
            throw new UserAlreadyExistsException("Пользователь с логином '" + request.getLogin() + "' уже существует!");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("Пользователь с email '" + request.getEmail() + "' уже существует!");
        }

        User user = User.builder()
                .login(request.getLogin())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .role("ROLE_USER")
                .imageUrl("/images/default-avatar.png")
                .specialization("Информация о специализации отсутствует")
                .bioDescription(null)
                .build();

        userRepository.save(user);
    }

    public AuthResponseDto login(AuthRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getLogin(), request.getPassword())
        );

        User user = userRepository.findByLogin(request.getLogin())
                .orElseThrow(() -> new ResourceNotFoundException("Пользователь не найден"));

        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return new AuthResponseDto(jwtToken, refreshToken);
    }
}
