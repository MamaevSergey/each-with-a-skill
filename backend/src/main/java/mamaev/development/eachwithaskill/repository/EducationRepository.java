package mamaev.development.eachwithaskill.repository;

import mamaev.development.eachwithaskill.model.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {
    Optional<Education> findByIdAndUser_Login(Long id, String login);
}
