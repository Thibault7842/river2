package fr.inti.river.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Plan.
 */
@Entity
@Table(name = "plan")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Plan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    
    @Lob
    @Column(name = "planimg", nullable = false)
    private byte[] planimg;

    @Column(name = "planimg_content_type", nullable = false)
    private String planimgContentType;

    @ManyToOne
    @JsonIgnoreProperties("plans")
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

    public Plan name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Plan description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getPlanimg() {
        return planimg;
    }

    public Plan planimg(byte[] planimg) {
        this.planimg = planimg;
        return this;
    }

    public void setPlanimg(byte[] planimg) {
        this.planimg = planimg;
    }

    public String getPlanimgContentType() {
        return planimgContentType;
    }

    public Plan planimgContentType(String planimgContentType) {
        this.planimgContentType = planimgContentType;
        return this;
    }

    public void setPlanimgContentType(String planimgContentType) {
        this.planimgContentType = planimgContentType;
    }

    public Projet getProjet() {
        return projet;
    }

    public Plan projet(Projet projet) {
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
        if (!(o instanceof Plan)) {
            return false;
        }
        return id != null && id.equals(((Plan) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Plan{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", planimg='" + getPlanimg() + "'" +
            ", planimgContentType='" + getPlanimgContentType() + "'" +
            "}";
    }
}
