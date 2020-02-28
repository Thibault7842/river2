package fr.inti.river.repository;

import fr.inti.river.domain.Fich;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Fich entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FichRepository extends JpaRepository<Fich, Long> {

}
