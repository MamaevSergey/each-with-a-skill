package mamaev.development.eachwithaskill.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "work_experiences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "company_name", length = 100, nullable = false)
    private String companyName;

    @Column(name = "job_title", length = 100, nullable = false)
    private String jobTitle;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "work_description", length = 2000, nullable = false)
    private String workDescription;

    @Column(name = "work_stack", nullable = false)
    private List<String> workStack = new ArrayList<>();
}
