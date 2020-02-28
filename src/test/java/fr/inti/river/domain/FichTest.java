package fr.inti.river.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.inti.river.web.rest.TestUtil;

public class FichTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fich.class);
        Fich fich1 = new Fich();
        fich1.setId(1L);
        Fich fich2 = new Fich();
        fich2.setId(fich1.getId());
        assertThat(fich1).isEqualTo(fich2);
        fich2.setId(2L);
        assertThat(fich1).isNotEqualTo(fich2);
        fich1.setId(null);
        assertThat(fich1).isNotEqualTo(fich2);
    }
}
