package mamaev.development.eachwithaskill.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDate;

@Data
public class EventRequestDto {
    @NotBlank(message = "Название события не может быть пустым")
    private String title;

    @NotBlank(message = "Описание не может быть пустым")
    private String description;

    @NotNull(message = "Дата начала обязательна")
    private LocalDate startDate;

    private LocalDate endDate;

    @URL(message = "Некорректная ссылка на сертификат")
    private String certificate;
}
