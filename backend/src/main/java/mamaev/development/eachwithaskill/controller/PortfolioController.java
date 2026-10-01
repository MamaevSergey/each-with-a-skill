package mamaev.development.eachwithaskill.controller;

import lombok.RequiredArgsConstructor;
import mamaev.development.eachwithaskill.controller.dto.UserProfileDto;
import mamaev.development.eachwithaskill.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/portfolio")
@RequiredArgsConstructor
public class PortfolioController {

    private final UserService userService;

    @GetMapping("/{login}")
    public ResponseEntity<UserProfileDto> getProfile(@PathVariable String login) {
        UserProfileDto profile = userService.getUserProfile(login);
        return ResponseEntity.ok(profile);
    }
}
