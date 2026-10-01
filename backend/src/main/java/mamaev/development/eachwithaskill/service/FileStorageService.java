package mamaev.development.eachwithaskill.service;

import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    private final S3Client s3Client;

    private static final List<String> ALLOWED_CONTENT_TYPES = List.of(
            "image/jpeg",
            "image/png",
            "image/webp"
    );

    @Value("${yandex.s3.bucket-name}")
    private String bucketName;

    @Value("${yandex.s3.endpoint}")
    private String endpoint;

    public void deleteImage(String fileUrl) {
        if (fileUrl == null || fileUrl.isBlank() || fileUrl.equals("/images/default-avatar.png")) {
            return;
        }
        try {
            String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);

            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .build();
            s3Client.deleteObject(deleteObjectRequest);
        } catch (Exception e) {
            System.err.println("Ошибка при удалении старой аватарки из S3: " + e.getMessage());
        }
    }

    public String uploadImage(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Файл пустой.");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase())) {
            throw new IllegalArgumentException("Недопустимый формат файла. Разрешены только изображения (JPEG, PNG, WEBP).");
        }

        String originalFilename = file.getOriginalFilename();
        String extension = StringUtils.getFilenameExtension(originalFilename);

        String fileName = UUID.randomUUID().toString() + (extension != null ? "." + extension : "");

        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(putObjectRequest,
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            return endpoint + "/" + bucketName + "/" + fileName;

        } catch (IOException e) {
            throw new RuntimeException("Ошибка при чтении файла", e);
        } catch (Exception e) {
            throw new RuntimeException("Ошибка загрузки файла в хранилище", e);
        }
    }
}
