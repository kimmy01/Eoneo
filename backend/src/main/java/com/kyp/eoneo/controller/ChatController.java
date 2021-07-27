package com.kyp.eoneo.controller;

import com.kyp.eoneo.dto.ChatMessageDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@Slf4j
public class ChatController {

    //서비스로 가야함
    private final SimpMessagingTemplate template;

    @MessageMapping("/chat/message")
//    /publish/chat/join
    public void message(@Payload ChatMessageDto chatMessage){
        log.info("메세지 내용 " + chatMessage);
        template.convertAndSend("/subscribe" + chatMessage.getChatRoomId(), chatMessage);
    }
}
