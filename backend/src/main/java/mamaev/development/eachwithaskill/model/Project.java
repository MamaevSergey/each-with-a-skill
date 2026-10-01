package mamaev.development.eachwithaskill.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "project_name", nullable = false, length = 100)
    private String projectName;

    @Column(name = "project_destination", nullable = false, length = 50)
    private String projectDestination;

    @Column(name = "project_description", nullable = false, length = 500)
    private String projectDescription;

    @Column(name = "project_possibilities", nullable = false)
    private List<String> projectPossibilities = new ArrayList<>();

    @Column(name = "project_pictures", nullable = false)
    private List<String> projectPictures = new ArrayList<>();

    @Column(name = "project_main_picture")
    private String projectMainPicture;

    @Column(name = "project_contribution", nullable = false, length = 500)
    private String projectContribution;

    @Column(name = "project_stack", nullable = false)
    private List<String> projectStack = new ArrayList<>();

    @Column(name = "project_link")
    private String projectLink;

    @Column(name = "project_repository")
    private String projectRepository;
}
