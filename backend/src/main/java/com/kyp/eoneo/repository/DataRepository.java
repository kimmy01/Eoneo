package com.kyp.eoneo.repository;

import com.kyp.eoneo.entity.Country;
import com.kyp.eoneo.entity.Language;
import com.kyp.eoneo.entity.Topic;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class DataRepository {
    @PersistenceContext
    private EntityManager em;

    public List<Topic> getTopics(){
        return em.createQuery("select t from Topic t").getResultList();
    }

    public List<Language> getLanguages(){
        return em.createQuery("select l from Language l").getResultList();
    }

    public List<Country> getCountries(){
        return em.createQuery("select c from Country c order by c.name").getResultList();
    }
}
