package mamaev.development.eachwithaskill.service;

import lombok.RequiredArgsConstructor;
import mamaev.development.eachwithaskill.controller.dto.UserProfileDto;
import mamaev.development.eachwithaskill.controller.dto.UserUpdateRequestDto;
import mamaev.development.eachwithaskill.controller.mapper.UserMapper;
import mamaev.development.eachwithaskill.exception.ResourceNotFoundException;
import mamaev.development.eachwithaskill.model.User;
import mamaev.development.eachwithaskill.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final FileStorageService fileStorageService;

    @Transactional(readOnly = true)
    public UserProfileDto getUserProfile(String login) {
        User user = userRepository.findFullProfileByLogin(login)
                .orElseThrow(() -> new ResourceNotFoundException("Пользователь с логином '" + login + "' не найден."));

        return userMapper.toProfileDto(user);
    }

    @Transactional
    public UserProfileDto updateMyProfile(String login, UserUpdateRequestDto requestDto) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new ResourceNotFoundException("Пользователь не найден."));
        String oldImageUrl = user.getImageUrl();
        userMapper.updateUserFromDto(requestDto, user);
        user = userRepository.save(user);
        String newImageUrl = user.getImageUrl();
        if (newImageUrl != null && !newImageUrl.equals(oldImageUrl)) {
            fileStorageService.deleteImage(oldImageUrl);
        }
        return userMapper.toProfileDto(user);
    }

    @Transactional
    public void deleteMyProfile(String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new ResourceNotFoundException("Пользователь не найден."));
        userRepository.delete(user);
    }

    @Transactional
    public void updateUserStack(String login, List newStack) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new ResourceNotFoundException("Пользователь не найден."));
        user.setUserStack(newStack);
        userRepository.save(user);
    }
}
