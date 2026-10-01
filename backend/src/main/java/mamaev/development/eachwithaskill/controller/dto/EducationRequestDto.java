package mamaev.development.eachwithaskill.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDate;

@Data
public class EducationRequestDto {
    @NotBlank(message = "Название учебного заведения не может быть пустым")
    private String title;

    @NotBlank(message = "Описание обучения не может быть пустым")
    private String description;

    @NotNull(message = "Дата начала обучения обязательна")
    private LocalDate startDate;

    private LocalDate endDate;

    @URL(message = "Некорректная ссылка на сертификат/диплом")
    private String certificate;
}
