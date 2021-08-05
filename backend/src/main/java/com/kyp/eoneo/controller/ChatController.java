package com.kyp.eoneo.controller;

import com.kyp.eoneo.common.CommonResult;
import com.kyp.eoneo.dto.ChatRequestMessageDto;

import com.kyp.eoneo.service.ChatService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Api(value = "ChatMessage", tags = {"ChatMessage"})
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@Slf4j
public class ChatController {

    //서비스로 가야함
    @Autowired
    private final SimpMessagingTemplate template;
    @Autowired
    ChatService chatService;
    @ApiOperation(value = "메시지 전달", notes = "특정 사용자가 보낸 메시지를 도착지 url를 가지고 있는 모든 사용자에게 전달한다.")
    @MessageMapping("/chat/message")
//    /publish/chat/message
    public void message(@Payload ChatRequestMessageDto chatMessage){
        log.info("메세지 내용 " + chatMessage.getChatRoomId());
        chatService.save(chatMessage);
        template.convertAndSendToUser(chatMessage.getReceiveUserUId(), "/queue/message", chatMessage);
    }

    @PostMapping("/api/readmessage/{roomId}")
    @ApiOperation(value = "채팅메시지", notes = "특정 채팅방의 특정 채팅메세지를 읽음 처리한다, 메시지를 보낼 때 'messages' : [messageId, messageId2] 형식으로 보내주세요")
    public ResponseEntity<CommonResult> updateUnreadMessage(@RequestBody Map<String, List<Long>> messages, @PathVariable String roomId){
        chatService.putUnreadMessage(messages.get("messages"), roomId);
        return ResponseEntity.status(200).body(CommonResult.of(true, "읽은 메세지 처리 성공", 201));
    }

    @GetMapping("/api/readmessage/{userId}/{roomId}")
    @ApiOperation(value = "채팅메시지", notes = "특정 채팅방의 특정 채팅메세지를 읽음 처리한다, 자기자신의 userId를 넣어야, 다른 사용자가 보낸 메시지를 읽음 처리할 수 있음")
    public ResponseEntity<CommonResult> updateUnreadAllMessage(@PathVariable Long userId, @PathVariable String roomId){

        chatService.putAllUnreadMessage(userId, roomId);
        return ResponseEntity.status(200).body(CommonResult.of(true, "모든 메세지 읽음 처리 성공", 201));
    }
}
