package com.kyp.eoneo.repository;

import com.kyp.eoneo.dto.ChatRequestMessageDto;
import com.kyp.eoneo.dto.ChatResponseMessageDto;
import com.kyp.eoneo.dto.ChatRoomDto;
import com.kyp.eoneo.entity.ChatRoom;
//import com.querydsl.jpa.impl.JPAQueryFactory;
import com.kyp.eoneo.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.util.List;

@Slf4j
@Repository
public class ChatRoomRepository {
    @PersistenceContext
    private EntityManager em;

//    @Autowired
//    ChatRepository chatRepository;

    //ChatRoom 생성
    public void createChatRoom(ChatRoom chatRoom) {
        em.persist(chatRoom);
    }

    //    특정 채팅방에 채팅 다 가져오기
    public List<ChatResponseMessageDto> findChats(String id) {
        List<ChatResponseMessageDto> chatRoomDtos = em.createQuery("select new com.kyp.eoneo.dto.ChatResponseMessageDto(cm.id, cm.messageSender, cm.messageContent) from ChatMessage cm where cm.chatroomId = :id order by cm.messageSendtime", ChatResponseMessageDto.class)
                .setParameter("id", id)
                .getResultList();
        return chatRoomDtos;
    }

    //채팅방 리스트
    public List<ChatRoomDto> findChatRoomList(Long userId) {
        if (!isRightUser(userId)) return null;
        return em.createQuery("select new com.kyp.eoneo.dto.ChatRoomDto(cr.user1.id, cr.user2.id, cr.user1.username, cr.user2.username, cr.user1UId, cr.user2UId, cr.id) from ChatRoom  cr where cr.user1.id = :userId1 or cr.user2.id = :userId2", ChatRoomDto.class)
                .setParameter("userId1", userId)
                .setParameter("userId2", userId)
                .getResultList();
    }

    //특정 채팅방 정보
    public ChatRoom getChatRoomInfo(String chatRoomId) {
        return em.createQuery("select cr from ChatRoom cr where cr.id = :chatRoomId", ChatRoom.class)
                .setParameter("chatRoomId", chatRoomId)
                .getSingleResult();
    }

    //특정 채팅방 삭제
    @Modifying
    public int deleteUserChatRoom(String roomId, Long userId) {
        int returnValue = 0;
        int result1 = em.createQuery("update ChatRoom cr set cr.user1 = null where cr.id = :chatRoomID and cr.user1.id = :userId")
                .setParameter("chatRoomID", roomId)
                .setParameter("userId", userId)
                .executeUpdate();

        int result2 = em.createQuery("update ChatRoom cr set cr.user2 = null where cr.id = :chatRoomID and cr.user2.id = :userId")
                .setParameter("chatRoomID", roomId)
                .setParameter("userId", userId)
                .executeUpdate();


        if (result1 <= 0 && result2 <= 0) {
            returnValue = deleteChatRoom(roomId);
            return returnValue;
        }
        returnValue = result1 > 0 ? result1 : result2;
        return returnValue;
    }


    private int deleteChatRoom(String roomId) {
        int returnValue = em.createQuery("delete from ChatRoom cr where cr.id = :chatRoomId")
                .setParameter("chatRoomId", roomId)
                .executeUpdate();
        return returnValue;
    }


    public boolean isRightUser(Long id) {
        try {
            User user = em.createQuery("select  u from User u where u.id = :id", User.class)
                    .setParameter("id", id)
                    .getSingleResult();

        } catch (NoResultException nre) {
            return false;
        }
        return true;
    }

    //    다른 사용자가 보낸 안 읽은 메세지의 갯수 확인
    public Long getUnReadMessage(String chatRoomId, Long currentId) {
        Long cnt = (Long) em.createQuery("select count(cm.isRead) from ChatMessage cm where cm.chatroomId = :chatRoomId and cm.isRead = :value and cm.messageSender <> :currentID")
                .setParameter("chatRoomId", chatRoomId)
                .setParameter("value", false)
                .setParameter("currentID", currentId)
                .getSingleResult();

        return cnt;
    }

    public User getUser(Long userId) {
        return em.find(User.class, userId);
    }

    public ChatRoom getChatRoom(String chatRoomId) {
        return em.find(ChatRoom.class, chatRoomId);
    }

    public boolean getRightUserInChatRoom(String chatRoomId, Long sendUserId) {
        try {
            em.createQuery("select cr from ChatRoom cr where cr.id = :chatRoomId and cr.user1.id = :sendUserId or cr.user2.id = :sendUserId", ChatRoom.class)
                    .setParameter("chatRoomId", chatRoomId)
                    .setParameter("sendUserId", sendUserId)
                    .setParameter("sendUserId", sendUserId)
                    .getSingleResult();
            return true;
        } catch (NoResultException nre) {
            return false;
        }
    }

    public String getImagePath(Long userId) {
        try {
            String url = (String) em.createQuery("select ud.profile_image from  UserDetail ud where ud.id = :userId")
                    .setParameter("userId", userId)
                    .getSingleResult();

            log.info("url " + url);
            return url;
        } catch (NoResultException nre) {
            return null;
        }
    }

    public ChatRoomDto isAlreadyHasaRoom(Long id1, Long id2) {
        try {
            ChatRoomDto chatRoom = em.createQuery("select new com.kyp.eoneo.dto.ChatRoomDto(cr.user1.id, cr.user2.id, cr.user1.username, cr.user2.username, cr.user1UId, cr.user2UId, cr.id)  from ChatRoom cr where cr.user1.id = :id1 and cr.user2.id = :id2 or cr.user1.id = :id2 and cr.user2.id = :id1", ChatRoomDto.class)
                    .setParameter("id1", id1)
                    .setParameter("id2", id2)
                    .setParameter("id1", id2)
                    .setParameter("id2", id1)
                    .getSingleResult();

            //여기서 해당 사용자가 메시지를 다 읽게끔 할지 결정 need
//           find
//            chatRepository.putAllUnreadMessage(id1, chatRoom.getChatRoomId());
            return chatRoom;
        }catch (NoResultException nre){
            return null;
        }
    }
}

