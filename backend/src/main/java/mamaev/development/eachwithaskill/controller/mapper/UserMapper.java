package mamaev.development.eachwithaskill.controller.mapper;

import mamaev.development.eachwithaskill.controller.dto.*;
import mamaev.development.eachwithaskill.model.*;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    // Основной маппинг пользователя. Вложенные списки смаппятся автоматически,
    // так как ниже объявлены методы для конвертации каждого типа.
    @Mapping(target = "role", source = "specialization")
    @Mapping(target = "company", source = "workplace")
    @Mapping(target = "bio", source = "bioDescription")
    @Mapping(target = "avatar", source = "imageUrl")
    @Mapping(target = "github", source = "githubLink")
    @Mapping(target = "telegram", source = "telegramLink")
    @Mapping(target = "vk", source = "vkLink")
    @Mapping(target = "techStack", source = "userStack")
    @Mapping(target = "experienceItems", source = "workExperiences")
    @Mapping(target = "eventItems", source = "events")
    @Mapping(target = "educationItems", source = "educations")
    UserProfileDto toProfileDto(User user);

    ProjectDto toProjectDto(Project project);

    @Mapping(target = "title", source = "eventName")
    @Mapping(target = "description", source = "eventDescription")
    @Mapping(target = "certificate", source = "certificateLink")
    EventDto toEventDto(Event event);

    @Mapping(target = "title", source = "educationName")
    @Mapping(target = "description", source = "educationDescription")
    @Mapping(target = "certificate", source = "certificateLink")
    EducationDto toEducationDto(Education education);

    @Mapping(target = "company", source = "companyName")
    @Mapping(target = "role", source = "jobTitle")
    @Mapping(target = "desc", source = "workDescription")
    @Mapping(target = "start", source = "startDate")
    @Mapping(target = "end", source = "endDate")
    @Mapping(target = "techs", source = "workStack")
    WorkExperienceDto toWorkExperienceDto(WorkExperience workExperience);

    Project toProject(ProjectRequestDto dto);

    @Mapping(target = "eventName", source = "title")
    @Mapping(target = "eventDescription", source = "description")
    @Mapping(target = "certificateLink", source = "certificate")
    Event toEvent(EventRequestDto dto);

    @Mapping(target = "educationName", source = "title")
    @Mapping(target = "educationDescription", source = "description")
    @Mapping(target = "certificateLink", source = "certificate")
    Education toEducation(EducationRequestDto dto);

    @Mapping(target = "companyName", source = "company")
    @Mapping(target = "jobTitle", source = "role")
    @Mapping(target = "workDescription", source = "desc")
    @Mapping(target = "startDate", source = "start")
    @Mapping(target = "endDate", source = "end")
    @Mapping(target = "workStack", source = "techs")
    WorkExperience toWorkExperience(WorkExperienceRequestDto dto);

    @Mapping(target = "specialization", source = "role")
    @Mapping(target = "workplace", source = "company")
    @Mapping(target = "bioDescription", source = "bio")
    @Mapping(target = "imageUrl", source = "avatar")
    @Mapping(target = "githubLink", source = "github")
    @Mapping(target = "telegramLink", source = "telegram")
    @Mapping(target = "vkLink", source = "vk")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromDto(UserUpdateRequestDto dto, @MappingTarget User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProjectFromDto(ProjectRequestDto dto, @MappingTarget Project project);

    @Mapping(target = "eventName", source = "title")
    @Mapping(target = "eventDescription", source = "description")
    @Mapping(target = "certificateLink", source = "certificate")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEventFromDto(EventRequestDto dto, @MappingTarget Event event);

    @Mapping(target = "educationName", source = "title")
    @Mapping(target = "educationDescription", source = "description")
    @Mapping(target = "certificateLink", source = "certificate")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEducationFromDto(EducationRequestDto dto, @MappingTarget Education education);

    @Mapping(target = "companyName", source = "company")
    @Mapping(target = "jobTitle", source = "role")
    @Mapping(target = "workDescription", source = "desc")
    @Mapping(target = "startDate", source = "start")
    @Mapping(target = "endDate", source = "end")
    @Mapping(target = "workStack", source = "techs")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateWorkExperienceFromDto(WorkExperienceRequestDto dto, @MappingTarget WorkExperience workExperience);

    default TechItemDto stringToTechItemDto(String tech) {
        if (tech == null) return null;
        TechItemDto dto = new TechItemDto();
        dto.setId(tech);
        dto.setAlt(tech);
        dto.setSrc("https://storage.yandexcloud.net/myfirstbucket/" + tech + ".svg");
        return dto;
    }

    default String techItemDtoToString(TechItemDto dto) {
        if (dto == null) return null;
        return dto.getId();
    }
}