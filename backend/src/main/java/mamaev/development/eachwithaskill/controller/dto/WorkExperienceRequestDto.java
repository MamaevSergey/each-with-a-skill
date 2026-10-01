package mamaev.development.eachwithaskill.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class WorkExperienceRequestDto {
    @NotBlank(message = "Название компании не может быть пустым")
    private String company;

    @NotBlank(message = "Должность не может быть пустой")
    private String role;

    @NotBlank(message = "Описание работы не может быть пустым")
    private String desc;

    @NotNull(message = "Дата начала работы обязательна")
    private LocalDate start;

    private LocalDate end;
    private List<String> techs;
}
