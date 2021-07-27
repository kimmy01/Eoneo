package com.kyp.eoneo.controller;

import com.kyp.eoneo.dto.ChatMessageDto;
import com.kyp.eoneo.dto.ChatRoomDto;
import com.kyp.eoneo.dto.wrapper.ChatMessageDtoWrapper;
import com.kyp.eoneo.dto.wrapper.ChatRoomDtoWrapper;
import com.kyp.eoneo.entity.ChatMessage;
import com.kyp.eoneo.entity.ChatRoom;
import com.kyp.eoneo.service.ChatRoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/chatroom")
public class ChatRoomController {
    @Autowired
    ChatRoomService chatRoomService;

//채팅방 생성
    @PostMapping("/create")
    public ChatRoomDto createChatRoom(@RequestBody ChatRoomDto chatRoomDto){
        System.out.println(chatRoomDto.getUser1Id() + " " + chatRoomDto.getUser2Id());
       ChatRoomDto chatRoom = ChatRoomDto.create(chatRoomDto.getUser1Id(), chatRoomDto.getUser2Id());
       return chatRoomService.createChatRoom(chatRoom);
    }
//특정 유저가 가지고 있는 모든 채팅방 리스트
    @GetMapping("/rooms/{userId}")
    public ChatRoomDtoWrapper<List<ChatRoomDto>> getChatRoomWithUser(@PathVariable Long userId){
      log.info("한 유저가 가지고 있는 모든 room 다 가져오기" + userId);
      List<ChatRoom> list = chatRoomService.getChatRoomList(userId);
      List<ChatRoomDto> rooms = list.stream()
                                .map(m -> new ChatRoomDto(m.getUser1().getId(), m.getUser2().getId(), m.getChatRoomId()))
                                .collect(Collectors.toList());
      return new ChatRoomDtoWrapper<List<ChatRoomDto>>(rooms);
    }

//채팅방 id에 해당하는 chatMessage 가져오기
    @GetMapping("/room/{roomId}")
    public ChatMessageDtoWrapper getChatRoomInfo(@PathVariable String roomId){
        log.info(roomId);
        ChatRoom chatRoom = chatRoomService.getChats(roomId);
        Collections.sort(chatRoom.getChats(), new Comparator<ChatMessage>() {
            @Override
            public int compare(ChatMessage o1, ChatMessage o2) {
                return o1.getMessageSendtime().compareTo(o2.getMessageSendtime());
            }
        });
//        데이터가 많을 때, N+1문제가 발생할 수도 있으나 일단은 고려하지 않음
        List<ChatMessageDto> chats = chatRoom.getChats().stream()
                .map(m ->  new ChatMessageDto(m.getMessageSender(), m.getMessageContent(), m.getAttachment())
                )
                .collect(Collectors.toList());

        return new ChatMessageDtoWrapper(chatRoom.getUser1().getId(), chatRoom.getUser2().getId(), chatRoom.getChatRoomId(), chats);
    }
}
