package mamaev.development.eachwithaskill.controller.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserProfileDto {
    private String login;
    private String firstName;
    private String lastName;

    private String avatar;
    private String role;
    private String bio;

    private String email;
    private String vk;
    private String telegram;
    private String github;

    private String education;
    private String company;
    private String location;

    private List<TechItemDto> techStack;
    private List<ProjectDto> projects;
    private List<EventDto> eventItems;
    private List<EducationDto> educationItems;
    private List<WorkExperienceDto> experienceItems;
}
