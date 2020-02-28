package fr.inti.river.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Carte.
 */
@Entity
@Table(name = "carte")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Carte implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    
    @Lob
    @Column(name = "landingimg", nullable = false)
    private byte[] landingimg;

    @Column(name = "landingimg_content_type", nullable = false)
    private String landingimgContentType;

    @ManyToOne
    @JsonIgnoreProperties("cartes")
    private Projet projet;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Carte name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Carte description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getLandingimg() {
        return landingimg;
    }

    public Carte landingimg(byte[] landingimg) {
        this.landingimg = landingimg;
        return this;
    }

    public void setLandingimg(byte[] landingimg) {
        this.landingimg = landingimg;
    }

    public String getLandingimgContentType() {
        return landingimgContentType;
    }

    public Carte landingimgContentType(String landingimgContentType) {
        this.landingimgContentType = landingimgContentType;
        return this;
    }

    public void setLandingimgContentType(String landingimgContentType) {
        this.landingimgContentType = landingimgContentType;
    }

    public Projet getProjet() {
        return projet;
    }

    public Carte projet(Projet projet) {
        this.projet = projet;
        return this;
    }

    public void setProjet(Projet projet) {
        this.projet = projet;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Carte)) {
            return false;
        }
        return id != null && id.equals(((Carte) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Carte{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", landingimg='" + getLandingimg() + "'" +
            ", landingimgContentType='" + getLandingimgContentType() + "'" +
            "}";
    }
}
