package mamaev.development.eachwithaskill.controller.dto;

import lombok.Data;
import java.util.List;

@Data
public class UserStackRequestDto {
    private List<TechItemDto> techStack;
}
