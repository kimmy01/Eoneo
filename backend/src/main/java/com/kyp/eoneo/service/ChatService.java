package com.kyp.eoneo.service;

import com.kyp.eoneo.config.advice.ErrorCode;
import com.kyp.eoneo.config.advice.exception.CustomException;
import com.kyp.eoneo.dto.ChatRequestMessageDto;
import com.kyp.eoneo.entity.ChatMessage;
import com.kyp.eoneo.entity.ChatRoom;
import com.kyp.eoneo.repository.ChatRepository;
import com.kyp.eoneo.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.kyp.eoneo.config.advice.ErrorCode.DATA_NOT_FOUND;
import static com.kyp.eoneo.config.advice.ErrorCode.MEMBER_NOT_FOUND;

@Service
@Transactional
public class ChatService {

    @Autowired
    ChatRepository chatRepository;
    @Autowired
    ChatRoomRepository chatRoomRepository;

    public void save(ChatRequestMessageDto chatMessageDto){
        ChatMessage chatMessage = ChatMessage.builder()
                .chatroomId(chatMessageDto.getChatRoomId())
                .messageSender(chatMessageDto.getSendUserId())
                .messageContent(chatMessageDto.getMessage())
                .isRead(false)
                .build();

        chatRepository.save(chatMessage);
    }

    public void putUnreadMessage(List<Long> messages, String roomId) {
        chatRepository.putUnreadMessage(messages, roomId);
    }

    public void putAllUnreadMessage(Long userId, String roomId) {
        boolean rightUser = chatRoomRepository.isRightUser(userId);
        if(!rightUser) throw new CustomException(MEMBER_NOT_FOUND);
        ChatRoom chatRoom = chatRoomRepository.getChatRoom(roomId);
        if(chatRoom == null) throw new CustomException(DATA_NOT_FOUND);

        chatRepository.putAllUnreadMessage(userId, roomId);
    }
}
