package mamaev.development.eachwithaskill.repository;

import mamaev.development.eachwithaskill.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByLogin(String login);

    @Query("SELECT u FROM User u " +
            "LEFT JOIN FETCH u.projects " +
            "LEFT JOIN FETCH u.events " +
            "LEFT JOIN FETCH u.educations " +
            "LEFT JOIN FETCH u.workExperiences " +
            "WHERE u.login = :login")
    Optional<User> findFullProfileByLogin(@Param("login") String login);

    boolean existsByLogin(String login);
    boolean existsByEmail(String email);
}