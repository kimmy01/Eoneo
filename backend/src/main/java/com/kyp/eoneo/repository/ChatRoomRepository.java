package com.kyp.eoneo.repository;

import com.kyp.eoneo.dto.ChatMessageDto;
import com.kyp.eoneo.dto.ChatRoomDto;
import com.kyp.eoneo.entity.ChatMessage;
import com.kyp.eoneo.entity.ChatRoom;
//import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.jar.JarEntry;

@Repository
public class ChatRoomRepository {
    @PersistenceContext
    private EntityManager em;


    public void createChatRoom(ChatRoom chatRoom) {
        em.persist(chatRoom);
    }

    public List<ChatMessageDto> findChats(Long id){
        List<ChatMessageDto> chatRoomDtos = em.createQuery("select new com.kyp.eoneo.dto.ChatMessageDto(cm.messageSender, cm.messageContent, cm.attachment) from ChatMessage cm where cm.chatroomId = :id order by cm.messageSendtime", ChatMessageDto.class)
                .setParameter("id", id)
                .getResultList();
        return chatRoomDtos;
    }

    public List<ChatRoomDto> findChatRoomList(Long userId) {
        return em.createQuery("select new com.kyp.eoneo.dto.ChatRoomDto(cr.user1.id, cr.user2.id, cr.chatRoomId) from ChatRoom  cr where cr.user1.id = :userId1 or cr.user2.id = :userId2", ChatRoomDto.class)
                .setParameter("userId1", userId)
                .setParameter("userId2", userId)
                .getResultList();
    }

    public ChatRoom getChatRoomPK(String chatRoomId){
        return em.createQuery("select cr from ChatRoom cr where cr.chatRoomId = :chatRoomId", ChatRoom.class)
                .setParameter("chatRoomId", chatRoomId)
                .getSingleResult();
    }
}

