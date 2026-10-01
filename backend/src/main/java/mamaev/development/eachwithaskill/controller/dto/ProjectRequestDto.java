package mamaev.development.eachwithaskill.controller.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

import java.util.List;

@Data
public class ProjectRequestDto {

    @NotBlank(message = "Название проекта не может быть пустым")
    private String projectName;

    @NotBlank(message = "Назначение проекта не может быть пустым")
    private String projectDestination;

    @NotBlank(message = "Описание не может быть пустым")
    private String projectDescription;

    private List<String> projectPossibilities;
    private List<String> projectPictures;
    private String projectMainPicture;

    @NotBlank(message = "Вклад в проект не может быть пустым")
    private String projectContribution;

    private List<String> projectStack;

    @URL(message = "Некорректная ссылка")
    private String projectLink;

    @URL(message = "Некорректная ссылка на репозиторий")
    private String projectRepository;
}
