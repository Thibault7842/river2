package fr.inti.river.web.rest;

import fr.inti.river.domain.Carte;
import fr.inti.river.repository.CarteRepository;
import fr.inti.river.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.inti.river.domain.Carte}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CarteResource {

    private final Logger log = LoggerFactory.getLogger(CarteResource.class);

    private static final String ENTITY_NAME = "carte";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CarteRepository carteRepository;

    public CarteResource(CarteRepository carteRepository) {
        this.carteRepository = carteRepository;
    }

    /**
     * {@code POST  /cartes} : Create a new carte.
     *
     * @param carte the carte to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new carte, or with status {@code 400 (Bad Request)} if the carte has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cartes")
    public ResponseEntity<Carte> createCarte(@Valid @RequestBody Carte carte) throws URISyntaxException {
        log.debug("REST request to save Carte : {}", carte);
        if (carte.getId() != null) {
            throw new BadRequestAlertException("A new carte cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Carte result = carteRepository.save(carte);
        return ResponseEntity.created(new URI("/api/cartes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cartes} : Updates an existing carte.
     *
     * @param carte the carte to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated carte,
     * or with status {@code 400 (Bad Request)} if the carte is not valid,
     * or with status {@code 500 (Internal Server Error)} if the carte couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cartes")
    public ResponseEntity<Carte> updateCarte(@Valid @RequestBody Carte carte) throws URISyntaxException {
        log.debug("REST request to update Carte : {}", carte);
        if (carte.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Carte result = carteRepository.save(carte);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, carte.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cartes} : get all the cartes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cartes in body.
     */
    @GetMapping("/cartes")
    public List<Carte> getAllCartes() {
        log.debug("REST request to get all Cartes");
        return carteRepository.findAll();
    }

    /**
     * {@code GET  /cartes/:id} : get the "id" carte.
     *
     * @param id the id of the carte to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the carte, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cartes/{id}")
    public ResponseEntity<Carte> getCarte(@PathVariable Long id) {
        log.debug("REST request to get Carte : {}", id);
        Optional<Carte> carte = carteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(carte);
    }

    /**
     * {@code DELETE  /cartes/:id} : delete the "id" carte.
     *
     * @param id the id of the carte to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cartes/{id}")
    public ResponseEntity<Void> deleteCarte(@PathVariable Long id) {
        log.debug("REST request to delete Carte : {}", id);
        carteRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
