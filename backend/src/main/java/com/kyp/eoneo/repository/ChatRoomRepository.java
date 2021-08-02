package com.kyp.eoneo.repository;

import com.kyp.eoneo.dto.ChatMessageDto;
import com.kyp.eoneo.dto.ChatRoomDto;
import com.kyp.eoneo.entity.ChatMessage;
import com.kyp.eoneo.entity.ChatRoom;
//import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.jar.JarEntry;
import java.util.stream.Collectors;

@Slf4j
@Repository
public class ChatRoomRepository {
    @PersistenceContext
    private EntityManager em;


    public void createChatRoom(ChatRoom chatRoom) {
        em.persist(chatRoom);
    }

    public List<ChatMessageDto> findChats(String id) {
        List<ChatMessageDto> chatRoomDtos = em.createQuery("select new com.kyp.eoneo.dto.ChatMessageDto(cm.messageSender, cm.messageContent) from ChatMessage cm where cm.chatroomId = :id order by cm.messageSendtime", ChatMessageDto.class)
                .setParameter("id", id)
                .getResultList();
        return chatRoomDtos;
    }

    public List<ChatRoomDto> findChatRoomList(Long userId) {
        return em.createQuery("select new com.kyp.eoneo.dto.ChatRoomDto(cr.user1.id, cr.user2.id, cr.id) from ChatRoom  cr where cr.user1.id = :userId1 or cr.user2.id = :userId2", ChatRoomDto.class)
                .setParameter("userId1", userId)
                .setParameter("userId2", userId)
                .getResultList();
    }

    public ChatRoom getChatRoomInfo(String chatRoomId) {
        return em.createQuery("select cr from ChatRoom cr where cr.id = :chatRoomId", ChatRoom.class)
                .setParameter("chatRoomId", chatRoomId)
                .getSingleResult();
    }

    @Modifying
    public int deleteUserChatRoom(String roomId, Long userId) {
        int returnValue = 0;
        int result1 = em.createQuery("update ChatRoom cr set cr.user1 = null where cr.id = :chatRoomID and cr.user1.id = :userId")
                .setParameter("chatRoomID", roomId)
                .setParameter("userId", userId)
                .executeUpdate();

       int result2 =  em.createQuery("update ChatRoom cr set cr.user2 = null where cr.id = :chatRoomID and cr.user2.id = :userId")
                .setParameter("chatRoomID", roomId)
                .setParameter("userId", userId)
                .executeUpdate();


       if(result1 <= 0 && result2 <= 0) {
           returnValue = deleteChatRoom(roomId);
           return returnValue;
       }
        returnValue = result1 > 0 ? result1 : result2;
       return  returnValue;
    }


    private int deleteChatRoom(String roomId) {
        int returnValue = em.createQuery("delete from ChatRoom cr where cr.id = :chatRoomId")
                .setParameter("chatRoomId", roomId)
                .executeUpdate();
        return returnValue;
    }

}

