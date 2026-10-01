package mamaev.development.eachwithaskill.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mamaev.development.eachwithaskill.controller.dto.AuthRequestDto;
import mamaev.development.eachwithaskill.controller.dto.AuthResponseDto;
import mamaev.development.eachwithaskill.controller.dto.RegisterRequestDto;
import mamaev.development.eachwithaskill.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequestDto request) {
        authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Пользователь успешно зарегистрирован");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody AuthRequestDto request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
