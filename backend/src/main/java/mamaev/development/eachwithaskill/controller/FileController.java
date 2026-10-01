package mamaev.development.eachwithaskill.controller;

import lombok.RequiredArgsConstructor;
import mamaev.development.eachwithaskill.service.FileStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
public class FileController {
    private final FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file")MultipartFile file) {
        String fileUrl = fileStorageService.uploadImage(file);

        return ResponseEntity.ok(Collections.singletonMap("url", fileUrl));
    }
}
