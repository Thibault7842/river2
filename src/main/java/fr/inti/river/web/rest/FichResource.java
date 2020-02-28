package fr.inti.river.web.rest;

import fr.inti.river.domain.Fich;
import fr.inti.river.repository.FichRepository;
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
 * REST controller for managing {@link fr.inti.river.domain.Fich}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FichResource {

    private final Logger log = LoggerFactory.getLogger(FichResource.class);

    private static final String ENTITY_NAME = "fich";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FichRepository fichRepository;

    public FichResource(FichRepository fichRepository) {
        this.fichRepository = fichRepository;
    }

    /**
     * {@code POST  /fiches} : Create a new fich.
     *
     * @param fich the fich to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fich, or with status {@code 400 (Bad Request)} if the fich has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fiches")
    public ResponseEntity<Fich> createFich(@Valid @RequestBody Fich fich) throws URISyntaxException {
        log.debug("REST request to save Fich : {}", fich);
        if (fich.getId() != null) {
            throw new BadRequestAlertException("A new fich cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fich result = fichRepository.save(fich);
        return ResponseEntity.created(new URI("/api/fiches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fiches} : Updates an existing fich.
     *
     * @param fich the fich to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fich,
     * or with status {@code 400 (Bad Request)} if the fich is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fich couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fiches")
    public ResponseEntity<Fich> updateFich(@Valid @RequestBody Fich fich) throws URISyntaxException {
        log.debug("REST request to update Fich : {}", fich);
        if (fich.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Fich result = fichRepository.save(fich);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fich.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /fiches} : get all the fiches.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fiches in body.
     */
    @GetMapping("/fiches")
    public List<Fich> getAllFiches() {
        log.debug("REST request to get all Fiches");
        return fichRepository.findAll();
    }

    /**
     * {@code GET  /fiches/:id} : get the "id" fich.
     *
     * @param id the id of the fich to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fich, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fiches/{id}")
    public ResponseEntity<Fich> getFich(@PathVariable Long id) {
        log.debug("REST request to get Fich : {}", id);
        Optional<Fich> fich = fichRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fich);
    }

    /**
     * {@code DELETE  /fiches/:id} : delete the "id" fich.
     *
     * @param id the id of the fich to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fiches/{id}")
    public ResponseEntity<Void> deleteFich(@PathVariable Long id) {
        log.debug("REST request to delete Fich : {}", id);
        fichRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
