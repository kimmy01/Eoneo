package com.kyp.eoneo.controller;

import com.kyp.eoneo.common.CommonResponse;
import com.kyp.eoneo.dto.ChatMessageDto;
import com.kyp.eoneo.dto.ChatRoomDto;
import com.kyp.eoneo.dto.wrapper.ChatMessageDtoWrapper;
import com.kyp.eoneo.dto.wrapper.ChatRoomDtoWrapper;
import com.kyp.eoneo.entity.ChatMessage;
import com.kyp.eoneo.entity.ChatRoom;
import com.kyp.eoneo.service.ChatRoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Api(value = "채팅방 생성 관련 API", tags = {"ChatRoom."})
@Slf4j
@RestController
@RequestMapping("/api/chatroom")
public class ChatRoomController {
    @Autowired
    ChatRoomService chatRoomService;

//채팅방 생성
    @ApiOperation(value = "채팅방생성", notes = "각 사용자의 pk를 통해 새로운 방 생성")
    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public CommonResponse<ChatRoomDto> createChatRoom(@RequestBody ChatRoomDto chatRoomDto){
        System.out.println(chatRoomDto.getUser1Id() + " " + chatRoomDto.getUser2Id());
        ChatRoomDto chatRoom = ChatRoomDto.create(chatRoomDto.getUser1Id(), chatRoomDto.getUser2Id());
        CommonResponse commonResponse = new CommonResponse();
        commonResponse.setData(chatRoomService.createChatRoom(chatRoom));
        commonResponse.setSuccess(true);
       return commonResponse;
    }
//특정 유저가 가지고 있는 모든 채팅방 리스트
    @ApiOperation(value = "채팅방 리스트", notes = "특정 사용자의 모든 채팅 리스트를 보여준다.")
    @GetMapping("/rooms/{userId}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public CommonResponse<List<ChatRoomDto>> getChatRoomWithUser(@PathVariable Long userId){
      log.info("한 유저가 가지고 있는 모든 room 다 가져오기" + userId);
      List<ChatRoomDto> list = chatRoomService.getChatRoomList(userId);
      CommonResponse commonResponse = new CommonResponse();
      commonResponse.setData(new ChatRoomDtoWrapper<List<ChatRoomDto>>(list.size(), list));
      commonResponse.setSuccess(true);
      return commonResponse;
    }

//채팅방 id에 해당하는 chatMessage 가져오기
    @GetMapping("/room/{roomId}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @ApiOperation(value = "채팅메시지", notes = "특정 채팅방의 모든 채팅메시지를 보여준다")
    public CommonResponse getChatRoomInfo(@PathVariable String roomId){
        log.info(roomId);
        ChatMessageDtoWrapper chatMessageDtoWrapper = chatRoomService.getChats(roomId);
        CommonResponse commonResponse = new CommonResponse();
        commonResponse.setData(chatMessageDtoWrapper);
        commonResponse.setSuccess(true);
        return  commonResponse;
    }

    @PatchMapping("/room/{userId}/{roomId}")
    public CommonResponse deleteChatRoom(@PathVariable Long userId, @PathVariable String roomId){
        chatRoomService.deleteUserChatRoom(roomId, userId);
        return null;
    }
}
