package mamaev.development.eachwithaskill.service;

import lombok.RequiredArgsConstructor;
import mamaev.development.eachwithaskill.controller.dto.WorkExperienceDto;
import mamaev.development.eachwithaskill.controller.dto.WorkExperienceRequestDto;
import mamaev.development.eachwithaskill.controller.mapper.UserMapper;
import mamaev.development.eachwithaskill.exception.ResourceNotFoundException;
import mamaev.development.eachwithaskill.model.User;
import mamaev.development.eachwithaskill.model.WorkExperience;
import mamaev.development.eachwithaskill.repository.UserRepository;
import mamaev.development.eachwithaskill.repository.WorkExperienceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class WorkExperienceService {
    private final WorkExperienceRepository workExperienceRepository;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Transactional
    public WorkExperienceDto createWorkExperience(String login, WorkExperienceRequestDto dto) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new ResourceNotFoundException("Пользователь не найден."));
        WorkExperience workExperience = userMapper.toWorkExperience(dto);
        workExperience.setUser(user);

        return userMapper.toWorkExperienceDto(workExperienceRepository.save(workExperience));
    }

    @Transactional
    public WorkExperienceDto updateWorkExperience(Long experienceId, String login, WorkExperienceRequestDto dto) {
        WorkExperience workExperience = workExperienceRepository.findByIdAndUser_Login(experienceId, login)
                .orElseThrow(() -> new ResourceNotFoundException("Опыт работы не найден или у вас нет прав на его редактирование."));

        userMapper.updateWorkExperienceFromDto(dto, workExperience);
        return userMapper.toWorkExperienceDto(workExperienceRepository.save(workExperience));
    }

    @Transactional
    public void deleteWorkExperience(Long experienceId, String login) {
        WorkExperience workExperience = workExperienceRepository.findByIdAndUser_Login(experienceId, login)
                .orElseThrow(() -> new ResourceNotFoundException("Опыт работы не найден или у вас нет прав на его удаление."));
        workExperienceRepository.delete(workExperience);
    }
}