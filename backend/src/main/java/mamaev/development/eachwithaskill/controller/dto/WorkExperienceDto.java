package mamaev.development.eachwithaskill.controller.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class WorkExperienceDto {
    private Long id;
    private String company;
    private String role;
    private String desc;
    private LocalDate start;
    private LocalDate end;
    private List<String> techs;
}