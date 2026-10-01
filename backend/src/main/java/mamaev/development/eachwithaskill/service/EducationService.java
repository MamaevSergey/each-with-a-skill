package mamaev.development.eachwithaskill.service;

import lombok.RequiredArgsConstructor;
import mamaev.development.eachwithaskill.controller.dto.EducationDto;
import mamaev.development.eachwithaskill.controller.dto.EducationRequestDto;
import mamaev.development.eachwithaskill.controller.mapper.UserMapper;
import mamaev.development.eachwithaskill.exception.ResourceNotFoundException;
import mamaev.development.eachwithaskill.model.Education;
import mamaev.development.eachwithaskill.model.User;
import mamaev.development.eachwithaskill.repository.EducationRepository;
import mamaev.development.eachwithaskill.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class EducationService {
    private final EducationRepository educationRepository;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Transactional
    public EducationDto createEducation(String login, EducationRequestDto dto) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new ResourceNotFoundException("Пользователь не найден."));
        Education education = userMapper.toEducation(dto);
        education.setUser(user);

        return userMapper.toEducationDto(educationRepository.save(education));
    }

    @Transactional
    public EducationDto updateEducation(Long educationId, String login, EducationRequestDto dto) {
        Education education = educationRepository.findByIdAndUser_Login(educationId, login)
                .orElseThrow(() -> new ResourceNotFoundException("Образование не найдено или у вас нет прав на его редактирование."));
        userMapper.updateEducationFromDto(dto, education);
        return userMapper.toEducationDto(educationRepository.save(education));
    }

    @Transactional
    public void deleteEducation(Long educationId, String login) {
        Education education = educationRepository.findByIdAndUser_Login(educationId, login)
                .orElseThrow(() -> new ResourceNotFoundException("Образование не найдено или у вас нет прав на его удаление."));
        educationRepository.delete(education);
    }
}
