package mamaev.development.eachwithaskill.controller.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProjectDto {
    private Long id;
    private String projectName;
    private String projectDestination;
    private String projectDescription;
    private List<String> projectPossibilities;
    private List<String> projectPictures;
    private String projectMainPicture;
    private String projectContribution;
    private List<String> projectStack;
    private String projectLink;
    private String projectRepository;
}
