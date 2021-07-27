package com.kyp.eoneo.repository;

import com.kyp.eoneo.entity.ChatMessage;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class ChatRepository {
    @PersistenceContext
    EntityManager em;

    public void save(ChatMessage chatMessage){
        em.persist(chatMessage);
    }
}
