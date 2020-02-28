package fr.inti.river.repository;

import fr.inti.river.domain.Projet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Projet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjetRepository extends JpaRepository<Projet, Long> {

    @Query("select projet from Projet projet where projet.user.login = ?#{principal.username}")
    List<Projet> findByUserIsCurrentUser();

}
