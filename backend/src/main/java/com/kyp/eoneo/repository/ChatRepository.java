package com.kyp.eoneo.repository;

import com.kyp.eoneo.entity.ChatMessage;
import com.kyp.eoneo.entity.ChatRoom;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class ChatRepository {
    @PersistenceContext
    EntityManager em;

    public void save(ChatMessage chatMessage){
        em.persist(chatMessage);
    }

    public void putUnreadMessage(List<Long> messageIds) {
        for(Long id : messageIds) {
            em.createQuery("update ChatMessage cm set cm.isRead = true where cm.id = :id")
                    .setParameter("id", id)
                    .executeUpdate();
        }

    }

    public void putAllUnreadMessage(Long userId, String roomId) {
        em.createQuery("update ChatMessage cm set cm.isRead = true where cm.chatroomId = :roomId and cm.messageSender <> :userId")
                .setParameter("roomId", roomId)
                .setParameter("userId", userId)
                .executeUpdate();
    }

//    public ChatRoom findChatRoomId(String chatRoomId){
//        return em.createQuery("select c from ChatRoom c where c.chatRoomId= :chatRoomId", ChatRoom.class)
//                .setParameter("chatRoomId", chatRoomId).getSingleResult();
//    }
}
