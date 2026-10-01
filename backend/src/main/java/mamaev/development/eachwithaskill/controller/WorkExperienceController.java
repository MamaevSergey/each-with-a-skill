package mamaev.development.eachwithaskill.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mamaev.development.eachwithaskill.controller.dto.WorkExperienceDto;
import mamaev.development.eachwithaskill.controller.dto.WorkExperienceRequestDto;
import mamaev.development.eachwithaskill.service.WorkExperienceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/work-experiences")
@RequiredArgsConstructor
public class WorkExperienceController {
    private final WorkExperienceService workExperienceService;

    @PostMapping
    public ResponseEntity<WorkExperienceDto> createWorkExperience(
            @Valid @RequestBody WorkExperienceRequestDto requestDto,
            Principal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(workExperienceService.createWorkExperience(principal.getName(), requestDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkExperienceDto> updateWorkExperience(
            @PathVariable Long id,
            @Valid @RequestBody WorkExperienceRequestDto requestDto,
            Principal principal) {
        return ResponseEntity.ok(workExperienceService.updateWorkExperience(id, principal.getName(), requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkExperience(
            @PathVariable Long id,
            Principal principal) {
        workExperienceService.deleteWorkExperience(id, principal.getName());
        return ResponseEntity.noContent().build();
    }
}
