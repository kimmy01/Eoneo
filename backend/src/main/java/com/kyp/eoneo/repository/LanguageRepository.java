package com.kyp.eoneo.repository;

import com.kyp.eoneo.entity.Language;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class LanguageRepository {
    @PersistenceContext
    private EntityManager em;

    public List<Language> getLanguages(){
        return em.createQuery("select l from Language l").getResultList();
    }
}
