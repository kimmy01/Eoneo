package com.kyp.eoneo.repository;

import com.kyp.eoneo.entity.Topic;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class TopicRepository {
    @PersistenceContext
    private EntityManager em;

    public List<Topic> getTopics(){
        return em.createQuery("select t from Topic t").getResultList();
    }
}
