package mamaev.development.eachwithaskill.controller.dto;

import lombok.Data;
import org.hibernate.validator.constraints.URL;

@Data
public class UserUpdateRequestDto {
    private String firstName;
    private String lastName;
    private String role;
    private String company;
    private String education;
    private String location;
    private String email;

    @URL(message = "Некорректная ссылка на GitHub")
    private String github;

    @URL(message = "Некорректная ссылка на Telegram")
    private String telegram;

    @URL(message = "Некорректная ссылка на VK")
    private String vk;

    private String bio;
    private String avatar;
}
