package mamaev.development.eachwithaskill.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "event_name", length = 100, nullable = false)
    private String eventName;

    @Column(name = "event_description", length = 500, nullable = false)
    private String eventDescription;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date") // Может быть null (по настоящее время)
    private LocalDate endDate;

    @Column(name = "certificate_link")
    private String certificateLink;
}
