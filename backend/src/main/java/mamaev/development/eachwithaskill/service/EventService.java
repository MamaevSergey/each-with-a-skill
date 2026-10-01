package mamaev.development.eachwithaskill.service;

import lombok.RequiredArgsConstructor;
import mamaev.development.eachwithaskill.controller.dto.EventDto;
import mamaev.development.eachwithaskill.controller.dto.EventRequestDto;
import mamaev.development.eachwithaskill.controller.mapper.UserMapper;
import mamaev.development.eachwithaskill.exception.ResourceNotFoundException;
import mamaev.development.eachwithaskill.model.Event;
import mamaev.development.eachwithaskill.model.User;
import mamaev.development.eachwithaskill.repository.EventRepository;
import mamaev.development.eachwithaskill.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Transactional
    public EventDto createEvent(String login, EventRequestDto dto) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new ResourceNotFoundException("Пользователь не найден."));

        Event event = userMapper.toEvent(dto);
        event.setUser(user);

        return userMapper.toEventDto(eventRepository.save(event));
    }

    @Transactional
    public EventDto updateEvent(Long eventId, String login, EventRequestDto dto) {
        Event event = eventRepository.findByIdAndUser_Login(eventId, login)
                .orElseThrow(() -> new ResourceNotFoundException("Событие не найдено или у вас нет прав на его редактирование."));

        userMapper.updateEventFromDto(dto, event);
        return userMapper.toEventDto(eventRepository.save(event));
    }

    @Transactional
    public void deleteEvent(Long eventId, String login) {
        Event event = eventRepository.findByIdAndUser_Login(eventId, login)
                .orElseThrow(() -> new ResourceNotFoundException("Событие не найдено или у вас нет прав на его удаление."));

        eventRepository.delete(event);
    }
}
