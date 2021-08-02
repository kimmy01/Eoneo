package com.kyp.eoneo.service;

import com.kyp.eoneo.config.advice.exception.CustomException;
import com.kyp.eoneo.dto.ChatMessageDto;
import com.kyp.eoneo.dto.ChatRoomDto;
import com.kyp.eoneo.dto.wrapper.ChatMessageDtoWrapper;
import com.kyp.eoneo.entity.ChatMessage;
import com.kyp.eoneo.entity.ChatRoom;
import com.kyp.eoneo.entity.User;
import com.kyp.eoneo.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static com.kyp.eoneo.config.advice.ErrorCode.MEMBER_NOT_FOUND;


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

        boolean flag = chatRoomRepository.isRightUser(user1);
        if(!flag) throw new CustomException(MEMBER_NOT_FOUND);
        flag = chatRoomRepository.isRightUser(user2);
        if(!flag) throw new CustomException(MEMBER_NOT_FOUND);

        ChatRoom chatRoom = ChatRoom.builder().id(chatRoomDto.getChatRoomId())
                 .user1(user1).user2(user2).startedTime(LocalDateTime.now())
                .build();
        chatRoomRepository.createChatRoom(chatRoom);
       return chatRoomDto;
    }



    public ChatMessageDtoWrapper getChats(String roomId) {
        ChatRoom chatRoom = chatRoomRepository.getChatRoomInfo(roomId);
        List<ChatMessageDto> chats= chatRoomRepository.findChats(chatRoom.getId());
        return new ChatMessageDtoWrapper(chatRoom.getUser1().getId(), chatRoom.getUser2().getId(), roomId, (long) chats.size(), chats);

    }

    public List<ChatRoomDto> getChatRoomList(Long userId) {
        List<ChatRoomDto> lists = chatRoomRepository.findChatRoomList(userId);
//        for(ChatRoom cr : lists){
//            System.out.println(cr.getChatRoomId());
//        }

        return lists;
    }

    public int deleteUserChatRoom(String roomId, Long userId) {
        return chatRoomRepository.deleteUserChatRoom(roomId, userId);
    }
}
