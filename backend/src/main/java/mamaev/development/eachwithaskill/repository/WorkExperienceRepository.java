package mamaev.development.eachwithaskill.repository;

import mamaev.development.eachwithaskill.model.WorkExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkExperienceRepository extends JpaRepository<WorkExperience, Long> {
    Optional<WorkExperience> findByIdAndUser_Login(Long id, String login);
}
