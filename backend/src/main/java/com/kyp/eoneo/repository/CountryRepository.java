package com.kyp.eoneo.repository;

import com.kyp.eoneo.entity.Country;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class CountryRepository {
    @PersistenceContext
    private EntityManager em;

    public List<Country> getCountries(){
        return em.createQuery("select c from Country c").getResultList();
    }
}
