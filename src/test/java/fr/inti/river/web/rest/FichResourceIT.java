package fr.inti.river.web.rest;

import fr.inti.river.RiverApp;
import fr.inti.river.domain.Fich;
import fr.inti.river.repository.FichRepository;
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
 * Integration tests for the {@link FichResource} REST controller.
 */
@SpringBootTest(classes = RiverApp.class)
public class FichResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PLANIMG = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PLANIMG = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PLANIMG_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PLANIMG_CONTENT_TYPE = "image/png";

    @Autowired
    private FichRepository fichRepository;

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

    private MockMvc restFichMockMvc;

    private Fich fich;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FichResource fichResource = new FichResource(fichRepository);
        this.restFichMockMvc = MockMvcBuilders.standaloneSetup(fichResource)
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
    public static Fich createEntity(EntityManager em) {
        Fich fich = new Fich()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .planimg(DEFAULT_PLANIMG)
            .planimgContentType(DEFAULT_PLANIMG_CONTENT_TYPE);
        return fich;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fich createUpdatedEntity(EntityManager em) {
        Fich fich = new Fich()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .planimg(UPDATED_PLANIMG)
            .planimgContentType(UPDATED_PLANIMG_CONTENT_TYPE);
        return fich;
    }

    @BeforeEach
    public void initTest() {
        fich = createEntity(em);
    }

    @Test
    @Transactional
    public void createFich() throws Exception {
        int databaseSizeBeforeCreate = fichRepository.findAll().size();

        // Create the Fich
        restFichMockMvc.perform(post("/api/fiches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fich)))
            .andExpect(status().isCreated());

        // Validate the Fich in the database
        List<Fich> fichList = fichRepository.findAll();
        assertThat(fichList).hasSize(databaseSizeBeforeCreate + 1);
        Fich testFich = fichList.get(fichList.size() - 1);
        assertThat(testFich.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testFich.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testFich.getPlanimg()).isEqualTo(DEFAULT_PLANIMG);
        assertThat(testFich.getPlanimgContentType()).isEqualTo(DEFAULT_PLANIMG_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createFichWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fichRepository.findAll().size();

        // Create the Fich with an existing ID
        fich.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFichMockMvc.perform(post("/api/fiches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fich)))
            .andExpect(status().isBadRequest());

        // Validate the Fich in the database
        List<Fich> fichList = fichRepository.findAll();
        assertThat(fichList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFiches() throws Exception {
        // Initialize the database
        fichRepository.saveAndFlush(fich);

        // Get all the fichList
        restFichMockMvc.perform(get("/api/fiches?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fich.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].planimgContentType").value(hasItem(DEFAULT_PLANIMG_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].planimg").value(hasItem(Base64Utils.encodeToString(DEFAULT_PLANIMG))));
    }
    
    @Test
    @Transactional
    public void getFich() throws Exception {
        // Initialize the database
        fichRepository.saveAndFlush(fich);

        // Get the fich
        restFichMockMvc.perform(get("/api/fiches/{id}", fich.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fich.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.planimgContentType").value(DEFAULT_PLANIMG_CONTENT_TYPE))
            .andExpect(jsonPath("$.planimg").value(Base64Utils.encodeToString(DEFAULT_PLANIMG)));
    }

    @Test
    @Transactional
    public void getNonExistingFich() throws Exception {
        // Get the fich
        restFichMockMvc.perform(get("/api/fiches/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFich() throws Exception {
        // Initialize the database
        fichRepository.saveAndFlush(fich);

        int databaseSizeBeforeUpdate = fichRepository.findAll().size();

        // Update the fich
        Fich updatedFich = fichRepository.findById(fich.getId()).get();
        // Disconnect from session so that the updates on updatedFich are not directly saved in db
        em.detach(updatedFich);
        updatedFich
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .planimg(UPDATED_PLANIMG)
            .planimgContentType(UPDATED_PLANIMG_CONTENT_TYPE);

        restFichMockMvc.perform(put("/api/fiches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFich)))
            .andExpect(status().isOk());

        // Validate the Fich in the database
        List<Fich> fichList = fichRepository.findAll();
        assertThat(fichList).hasSize(databaseSizeBeforeUpdate);
        Fich testFich = fichList.get(fichList.size() - 1);
        assertThat(testFich.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testFich.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testFich.getPlanimg()).isEqualTo(UPDATED_PLANIMG);
        assertThat(testFich.getPlanimgContentType()).isEqualTo(UPDATED_PLANIMG_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingFich() throws Exception {
        int databaseSizeBeforeUpdate = fichRepository.findAll().size();

        // Create the Fich

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFichMockMvc.perform(put("/api/fiches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fich)))
            .andExpect(status().isBadRequest());

        // Validate the Fich in the database
        List<Fich> fichList = fichRepository.findAll();
        assertThat(fichList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFich() throws Exception {
        // Initialize the database
        fichRepository.saveAndFlush(fich);

        int databaseSizeBeforeDelete = fichRepository.findAll().size();

        // Delete the fich
        restFichMockMvc.perform(delete("/api/fiches/{id}", fich.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Fich> fichList = fichRepository.findAll();
        assertThat(fichList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
