package mamaev.development.eachwithaskill.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mamaev.development.eachwithaskill.controller.dto.ProjectDto;
import mamaev.development.eachwithaskill.controller.dto.ProjectRequestDto;
import mamaev.development.eachwithaskill.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectDto> createProject(
            @Valid @RequestBody ProjectRequestDto requestDto,
            Principal principal) {
        ProjectDto created = projectService.createProject(principal.getName(), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDto> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectRequestDto requestDto,
            Principal principal) {
        ProjectDto updated = projectService.updateProject(id, principal.getName(), requestDto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(
            @PathVariable Long id,
            Principal principal) {
        projectService.deleteProject(id, principal.getName());
        return ResponseEntity.noContent().build();
    }
}
