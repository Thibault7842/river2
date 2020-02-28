package fr.inti.river.web.rest;

import fr.inti.river.RiverApp;
import fr.inti.river.domain.Carte;
import fr.inti.river.repository.CarteRepository;
import fr.inti.river.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static fr.inti.river.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CarteResource} REST controller.
 */
@SpringBootTest(classes = RiverApp.class)
public class CarteResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_LANDINGIMG = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LANDINGIMG = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_LANDINGIMG_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LANDINGIMG_CONTENT_TYPE = "image/png";

    @Autowired
    private CarteRepository carteRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCarteMockMvc;

    private Carte carte;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CarteResource carteResource = new CarteResource(carteRepository);
        this.restCarteMockMvc = MockMvcBuilders.standaloneSetup(carteResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Carte createEntity(EntityManager em) {
        Carte carte = new Carte()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .landingimg(DEFAULT_LANDINGIMG)
            .landingimgContentType(DEFAULT_LANDINGIMG_CONTENT_TYPE);
        return carte;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Carte createUpdatedEntity(EntityManager em) {
        Carte carte = new Carte()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .landingimg(UPDATED_LANDINGIMG)
            .landingimgContentType(UPDATED_LANDINGIMG_CONTENT_TYPE);
        return carte;
    }

    @BeforeEach
    public void initTest() {
        carte = createEntity(em);
    }

    @Test
    @Transactional
    public void createCarte() throws Exception {
        int databaseSizeBeforeCreate = carteRepository.findAll().size();

        // Create the Carte
        restCarteMockMvc.perform(post("/api/cartes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carte)))
            .andExpect(status().isCreated());

        // Validate the Carte in the database
        List<Carte> carteList = carteRepository.findAll();
        assertThat(carteList).hasSize(databaseSizeBeforeCreate + 1);
        Carte testCarte = carteList.get(carteList.size() - 1);
        assertThat(testCarte.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCarte.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testCarte.getLandingimg()).isEqualTo(DEFAULT_LANDINGIMG);
        assertThat(testCarte.getLandingimgContentType()).isEqualTo(DEFAULT_LANDINGIMG_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createCarteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = carteRepository.findAll().size();

        // Create the Carte with an existing ID
        carte.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarteMockMvc.perform(post("/api/cartes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carte)))
            .andExpect(status().isBadRequest());

        // Validate the Carte in the database
        List<Carte> carteList = carteRepository.findAll();
        assertThat(carteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = carteRepository.findAll().size();
        // set the field null
        carte.setName(null);

        // Create the Carte, which fails.

        restCarteMockMvc.perform(post("/api/cartes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carte)))
            .andExpect(status().isBadRequest());

        List<Carte> carteList = carteRepository.findAll();
        assertThat(carteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCartes() throws Exception {
        // Initialize the database
        carteRepository.saveAndFlush(carte);

        // Get all the carteList
        restCarteMockMvc.perform(get("/api/cartes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carte.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].landingimgContentType").value(hasItem(DEFAULT_LANDINGIMG_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].landingimg").value(hasItem(Base64Utils.encodeToString(DEFAULT_LANDINGIMG))));
    }
    
    @Test
    @Transactional
    public void getCarte() throws Exception {
        // Initialize the database
        carteRepository.saveAndFlush(carte);

        // Get the carte
        restCarteMockMvc.perform(get("/api/cartes/{id}", carte.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(carte.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.landingimgContentType").value(DEFAULT_LANDINGIMG_CONTENT_TYPE))
            .andExpect(jsonPath("$.landingimg").value(Base64Utils.encodeToString(DEFAULT_LANDINGIMG)));
    }

    @Test
    @Transactional
    public void getNonExistingCarte() throws Exception {
        // Get the carte
        restCarteMockMvc.perform(get("/api/cartes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCarte() throws Exception {
        // Initialize the database
        carteRepository.saveAndFlush(carte);

        int databaseSizeBeforeUpdate = carteRepository.findAll().size();

        // Update the carte
        Carte updatedCarte = carteRepository.findById(carte.getId()).get();
        // Disconnect from session so that the updates on updatedCarte are not directly saved in db
        em.detach(updatedCarte);
        updatedCarte
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .landingimg(UPDATED_LANDINGIMG)
            .landingimgContentType(UPDATED_LANDINGIMG_CONTENT_TYPE);

        restCarteMockMvc.perform(put("/api/cartes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCarte)))
            .andExpect(status().isOk());

        // Validate the Carte in the database
        List<Carte> carteList = carteRepository.findAll();
        assertThat(carteList).hasSize(databaseSizeBeforeUpdate);
        Carte testCarte = carteList.get(carteList.size() - 1);
        assertThat(testCarte.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCarte.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testCarte.getLandingimg()).isEqualTo(UPDATED_LANDINGIMG);
        assertThat(testCarte.getLandingimgContentType()).isEqualTo(UPDATED_LANDINGIMG_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingCarte() throws Exception {
        int databaseSizeBeforeUpdate = carteRepository.findAll().size();

        // Create the Carte

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCarteMockMvc.perform(put("/api/cartes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carte)))
            .andExpect(status().isBadRequest());

        // Validate the Carte in the database
        List<Carte> carteList = carteRepository.findAll();
        assertThat(carteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCarte() throws Exception {
        // Initialize the database
        carteRepository.saveAndFlush(carte);

        int databaseSizeBeforeDelete = carteRepository.findAll().size();

        // Delete the carte
        restCarteMockMvc.perform(delete("/api/cartes/{id}", carte.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Carte> carteList = carteRepository.findAll();
        assertThat(carteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
