package mamaev.development.eachwithaskill.repository;

import mamaev.development.eachwithaskill.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findByIdAndUser_Login(Long id, String login);
}
