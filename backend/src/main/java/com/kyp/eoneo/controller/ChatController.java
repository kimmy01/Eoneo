package com.kyp.eoneo.controller;

import com.kyp.eoneo.dto.ChatMessageDto;

import com.kyp.eoneo.service.ChatService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "ChatMessage", tags = {"ChatMessage"})
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@Slf4j
public class ChatController {

    //서비스로 가야함
    private final SimpMessagingTemplate template;
    @Autowired
    ChatService chatService;
    @ApiOperation(value = "메시지 전달", notes = "특정 사용자가 보낸 메시지를 도착지 url를 가지고 있는 모든 사용자에게 전달한다.")
    @MessageMapping("/chat/message")
//    /publish/chat/message
    public void message(@Payload ChatMessageDto chatMessage){
        log.info("메세지 내용 " + chatMessage);
        chatService.save(chatMessage);
        template.convertAndSend("/subscribe" + chatMessage.getChatRoomId(), chatMessage);
    }
}
