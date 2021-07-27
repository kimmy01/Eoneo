package com.kyp.eoneo.repository;

import com.kyp.eoneo.dto.ChatRoomDto;
import com.kyp.eoneo.entity.ChatMessage;
import com.kyp.eoneo.entity.ChatRoom;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class ChatRoomRepository {
    @PersistenceContext
    EntityManager em;

    public void createChatRoom(ChatRoom chatRoom) {
        em.persist(chatRoom);
    }

    public ChatRoom findAll(String chatRoomId){
        return em.createQuery("select cr from ChatRoom cr where cr.chatRoomId = :chatRoomId", ChatRoom.class)
                .setParameter("chatRoomId", chatRoomId)
                .getSingleResult();
    }

    public List<ChatRoom> findChatRoomList(Long userId) {
        return em.createQuery("select cr from ChatRoom  cr where cr.user1.id = :userId1 or cr.user2.id = :userId2", ChatRoom.class)
                .setParameter("userId1", userId)
                .setParameter("userId2", userId)
                .getResultList();
    }
}

