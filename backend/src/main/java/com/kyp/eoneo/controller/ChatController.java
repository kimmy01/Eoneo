package com.kyp.eoneo.controller;

import com.kyp.eoneo.dto.ChatMessageDto;

import com.kyp.eoneo.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@Slf4j
public class ChatController {

    //서비스로 가야함
    private final SimpMessagingTemplate template;
    @Autowired
    ChatService chatService;

    @MessageMapping("/chat/message")
//    /publish/chat/message
    public void message(@Payload ChatMessageDto chatMessage){
        log.info("메세지 내용 " + chatMessage);
        chatService.save(chatMessage);
        template.convertAndSend("/subscribe" + chatMessage.getChatRoomId(), chatMessage);
    }
}
