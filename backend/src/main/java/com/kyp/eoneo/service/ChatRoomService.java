package com.kyp.eoneo.service;

import com.kyp.eoneo.dto.ChatRoomDto;
import com.kyp.eoneo.entity.ChatMessage;
import com.kyp.eoneo.entity.ChatRoom;
import com.kyp.eoneo.entity.User;
import com.kyp.eoneo.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Service
@Transactional
public class ChatRoomService {

    @Autowired
    ChatRoomRepository chatRoomRepository;




    public ChatRoomDto createChatRoom(ChatRoomDto chatRoomDto) {
        User user1 = new User();
        user1.setId(chatRoomDto.getUser1Id());
        User user2 = new User();
        user2.setId(chatRoomDto.getUser2Id());
        ChatRoom chatRoom = ChatRoom.builder().chatRoomId(chatRoomDto.getChatRoomId())
                 .user1(user1).user2(user2).startedTime(LocalDateTime.now())
                .build();
        this.chatRoomRepository.createChatRoom(chatRoom);
       return chatRoomDto;
    }


    public ChatRoom getChats(String roomId) {
        ChatRoom chatRoom = chatRoomRepository.findAll(roomId);
        List<ChatMessage> chats= chatRoom.getChats();
        for(ChatMessage cm : chats){
            System.out.println(cm.toString());
        }
        return chatRoom;

    }

    public List<ChatRoom> getChatRoomList(Long userId) {
        List<ChatRoom> lists = chatRoomRepository.findChatRoomList(userId);
//        for(ChatRoom cr : lists){
//            System.out.println(cr.getChatRoomId());
//        }

        return lists;
    }
}
