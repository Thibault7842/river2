package fr.inti.river.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.inti.river.web.rest.TestUtil;

public class CarteTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Carte.class);
        Carte carte1 = new Carte();
        carte1.setId(1L);
        Carte carte2 = new Carte();
        carte2.setId(carte1.getId());
        assertThat(carte1).isEqualTo(carte2);
        carte2.setId(2L);
        assertThat(carte1).isNotEqualTo(carte2);
        carte1.setId(null);
        assertThat(carte1).isNotEqualTo(carte2);
    }
}
