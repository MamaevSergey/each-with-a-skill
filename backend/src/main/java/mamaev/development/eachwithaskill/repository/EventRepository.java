package mamaev.development.eachwithaskill.repository;

import mamaev.development.eachwithaskill.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findByIdAndUser_Login(Long id, String login);
}
