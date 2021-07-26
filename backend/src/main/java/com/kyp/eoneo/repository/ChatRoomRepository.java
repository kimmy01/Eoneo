package com.kyp.eoneo.repository;

import com.kyp.eoneo.dto.ChatRoomDto;
import com.kyp.eoneo.entity.ChatRoom;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class ChatRoomRepository {
    @PersistenceContext
    EntityManager em;

    public void createChatRoom(ChatRoom chatRoom) {
        em.persist(chatRoom);
    }

    public ChatRoom findOne(String chatroom_dis_id){
        ChatRoom chatRoom =  em.find(ChatRoom.class, chatroom_dis_id);
        return chatRoom;
    }
}

