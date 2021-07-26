package com.kyp.eoneo.controller;

import com.kyp.eoneo.dto.ChatRoomDto;
import com.kyp.eoneo.entity.ChatRoom;
import com.kyp.eoneo.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatroom")
public class ChatRoomController {
    @Autowired
    ChatRoomService chatRoomService;

    @PostMapping("/create")
    public ChatRoomDto createChatRoom(@RequestBody ChatRoomDto chatRoomDto){
        System.out.println(chatRoomDto.getUser1Id() + " " + chatRoomDto.getUser2Id());
       ChatRoomDto chatRoom = ChatRoomDto.create(chatRoomDto.getUser1Id(), chatRoomDto.getUser2Id());
       return chatRoomService.createChatRoom(chatRoom);
    }

    @GetMapping("/room/{roomId}")
    public ChatRoomDto getChatRoomInfo(@PathVariable String roomId){
        return chatRoomService.getChatRoomInfo(roomId);
    }
}
