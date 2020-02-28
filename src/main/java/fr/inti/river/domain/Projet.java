package fr.inti.river.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Projet.
 */
@Entity
@Table(name = "projet")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Projet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Size(min = 25)
    @Column(name = "description", nullable = false)
    private String description;

    
    @Lob
    @Column(name = "landingimg", nullable = false)
    private byte[] landingimg;

    @Column(name = "landingimg_content_type", nullable = false)
    private String landingimgContentType;

    @ManyToOne
    @JsonIgnoreProperties("projets")
    private User user;

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

    public Projet name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Projet description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getLandingimg() {
        return landingimg;
    }

    public Projet landingimg(byte[] landingimg) {
        this.landingimg = landingimg;
        return this;
    }

    public void setLandingimg(byte[] landingimg) {
        this.landingimg = landingimg;
    }

    public String getLandingimgContentType() {
        return landingimgContentType;
    }

    public Projet landingimgContentType(String landingimgContentType) {
        this.landingimgContentType = landingimgContentType;
        return this;
    }

    public void setLandingimgContentType(String landingimgContentType) {
        this.landingimgContentType = landingimgContentType;
    }

    public User getUser() {
        return user;
    }

    public Projet user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Projet)) {
            return false;
        }
        return id != null && id.equals(((Projet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Projet{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", landingimg='" + getLandingimg() + "'" +
            ", landingimgContentType='" + getLandingimgContentType() + "'" +
            "}";
    }
}
