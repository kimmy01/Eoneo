package com.kyp.eoneo.service;

import com.kyp.eoneo.dto.ChatMessageDto;
import com.kyp.eoneo.entity.ChatMessage;
import com.kyp.eoneo.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ChatService {

    @Autowired
    ChatRepository chatRepository;

    public void save(ChatMessageDto chatMessagDto){
        ChatMessage chatMessage = ChatMessage.builder()
                .chatRoom(chatRepository.findChatRoomId(chatMessagDto.getChatRoomId()))
                .messageSender(chatMessagDto.getSendUserId())
                .messageContent(chatMessagDto.getMessage())
                .attachment(chatMessagDto.getMessageType())
                .build();

        chatRepository.save(chatMessage);
    }
}
