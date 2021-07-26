package com.kyp.eoneo.controller;

import com.kyp.eoneo.dto.ChatMessageDto;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    @MessageMapping("/chat/join")
//    /publish/chat/join
    public void join(ChatMessageDto chatMessage){

    }
}
