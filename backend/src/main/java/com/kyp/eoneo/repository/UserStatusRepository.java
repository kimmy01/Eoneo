package com.kyp.eoneo.repository;

import com.kyp.eoneo.entity.UserStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
@Slf4j
public class UserStatusRepository {
    @PersistenceContext
    private EntityManager em;

    public void save(UserStatus userStatus){
        em.persist(userStatus);
    }
}
