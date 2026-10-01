package mamaev.development.eachwithaskill.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mamaev.development.eachwithaskill.controller.dto.TechItemDto;
import mamaev.development.eachwithaskill.controller.dto.UserProfileDto;
import mamaev.development.eachwithaskill.controller.dto.UserStackRequestDto;
import mamaev.development.eachwithaskill.controller.dto.UserUpdateRequestDto;
import mamaev.development.eachwithaskill.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // Для фронта, чтобы заполнить форму редактирования
    @GetMapping("/me")
    public ResponseEntity<UserProfileDto> getMyProfile(Principal principal) {
        return ResponseEntity.ok(userService.getUserProfile(principal.getName()));
    }

    @PutMapping("/me")
    public ResponseEntity<UserProfileDto> updateMyProfile(
            @Valid @RequestBody UserUpdateRequestDto requestDto,
            Principal principal) {
        UserProfileDto updatedProfile = userService.updateMyProfile(principal.getName(), requestDto);
        return ResponseEntity.ok(updatedProfile);
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteMyProfile(Principal principal) {
        userService.deleteMyProfile(principal.getName());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/me/stack")
    public ResponseEntity<Void> updateMyStack(
            @RequestBody UserStackRequestDto requestDto,
            Principal principal) {
        List<String> stringStack = requestDto.getTechStack().stream()
                        .map(TechItemDto::getId)
                        .toList();
        userService.updateUserStack(principal.getName(), stringStack);
        return ResponseEntity.ok().build();
    }
}
