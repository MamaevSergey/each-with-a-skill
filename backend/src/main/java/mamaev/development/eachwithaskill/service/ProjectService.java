package mamaev.development.eachwithaskill.service;

import lombok.RequiredArgsConstructor;
import mamaev.development.eachwithaskill.controller.dto.ProjectDto;
import mamaev.development.eachwithaskill.controller.dto.ProjectRequestDto;
import mamaev.development.eachwithaskill.controller.mapper.UserMapper;
import mamaev.development.eachwithaskill.exception.ResourceNotFoundException;
import mamaev.development.eachwithaskill.model.Project;
import mamaev.development.eachwithaskill.model.User;
import mamaev.development.eachwithaskill.repository.ProjectRepository;
import mamaev.development.eachwithaskill.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Transactional
    public ProjectDto createProject(String login, ProjectRequestDto dto) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new ResourceNotFoundException("Пользователь не найден"));

        Project project = userMapper.toProject(dto);
        project.setUser(user);

        return userMapper.toProjectDto(projectRepository.save(project));
    }

    @Transactional
    public ProjectDto updateProject(Long projectId, String login, ProjectRequestDto dto) {
        Project project = projectRepository.findByIdAndUser_Login(projectId, login)
                .orElseThrow(() -> new ResourceNotFoundException("Проект не найден или у вас нет прав для его редактирования."));

        userMapper.updateProjectFromDto(dto, project);
        return userMapper.toProjectDto(projectRepository.save(project));
    }

    @Transactional
    public void deleteProject(Long projectId, String login) {
        Project project = projectRepository.findByIdAndUser_Login(projectId, login)
                .orElseThrow(() -> new ResourceNotFoundException("Проект не найден или у вас нет прав на его удаление."));

        projectRepository.delete(project);
    }
}
