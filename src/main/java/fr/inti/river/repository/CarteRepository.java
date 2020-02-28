package fr.inti.river.repository;

import fr.inti.river.domain.Carte;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Carte entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarteRepository extends JpaRepository<Carte, Long> {

}
