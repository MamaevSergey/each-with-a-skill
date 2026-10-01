package mamaev.development.eachwithaskill.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mamaev.development.eachwithaskill.controller.dto.EducationDto;
import mamaev.development.eachwithaskill.controller.dto.EducationRequestDto;
import mamaev.development.eachwithaskill.service.EducationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/educations")
@RequiredArgsConstructor
public class EducationController {
    private final EducationService educationService;

    @PostMapping
    public ResponseEntity<EducationDto> createEducation(
            @Valid @RequestBody EducationRequestDto requestDto,
            Principal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(educationService.createEducation(principal.getName(), requestDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EducationDto> updateEducation(
            @PathVariable Long id,
            @Valid @RequestBody EducationRequestDto requestDto,
            Principal principal) {
        return ResponseEntity.ok(educationService.updateEducation(id, principal.getName(), requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducation(
            @PathVariable Long id,
            Principal principal) {
        educationService.deleteEducation(id, principal.getName());
        return ResponseEntity.noContent().build();
    }
}
