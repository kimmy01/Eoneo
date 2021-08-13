package com.kyp.eoneo.controller;

import com.kyp.eoneo.common.CommonResponse;
import com.kyp.eoneo.common.CommonResult;
import com.kyp.eoneo.dto.ChatRoomDto;
import com.kyp.eoneo.dto.wrapper.ChatMessageDtoWrapper;
import com.kyp.eoneo.dto.wrapper.ChatRoomDtoWrapper;
import com.kyp.eoneo.service.ChatRoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<CommonResponse> createChatRoom(
            @ApiParam(
                    name =  "채팅방 생성할 때 넣어야하는 값",
                    example = "  \"user1Id\": 51,\n" +
                            "  \"user1UId\": \"5151\",\n" +
                            "  \"user2Id\": 16,\n" +
                            "  \"user2UId\": \"1616\"",
                    required = true)
            @RequestBody ChatRoomDto chatRoomDto){
        //예외처리
        //다른 사용자가 탈퇴했거나 존재하지 않을 때
        ChatRoomDto existChatRoom = chatRoomService.isAlreadyChatRoom(chatRoomDto.getUser1Id(), chatRoomDto.getUser2Id());
        if(existChatRoom != null) return ResponseEntity.status(200).body(CommonResponse.of(existChatRoom, true, "이미 존재하는 방 데이터 전송", 200));
        ChatRoomDto chatRoom = ChatRoomDto.create(chatRoomDto.getUser1Id(), chatRoomDto.getUser2Id(), chatRoomDto.getUser1UId(), chatRoomDto.getUser2UId());
       return ResponseEntity.status(201).body(CommonResponse.of(chatRoomService.createChatRoom(chatRoom), true, "방생성 성공", 201));
    }
//특정 유저가 가지고 있는 모든 채팅방 리스트
    @ApiOperation(value = "채팅방 리스트", notes = "특정 사용자의 모든 채팅 리스트와 각 채팅방에서 안읽은 메시지의 갯수를 리턴")
    @GetMapping("/rooms/{userId}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<CommonResponse> getChatRoomWithUser(
            @PathVariable Long userId){
        //예외처리
        //특정 사용자가 탈퇴했거나 존재하지 않을 때
        //채팅 방이 없을 경우
      List<ChatRoomDto> list = chatRoomService.getChatRoomList(userId);

      return ResponseEntity.status(200).body(CommonResponse.of(new ChatRoomDtoWrapper<List<ChatRoomDto>>(list.size(), list), true, "채팅방 리스트 가져오기 성공", 200));
    }

//채팅방 id에 해당하는 chatMessage 가져오기
    @GetMapping("/room/{roomId}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @ApiOperation(value = "채팅메시지", notes = "특정 채팅방의 모든 채팅메시지를 보여준다")
    public ResponseEntity<CommonResponse> getChatRoomInfo(@PathVariable String roomId){
        //예외처리
        //해당 채팅방 id가 없을 경우
        ChatMessageDtoWrapper chatMessageDtoWrapper = chatRoomService.getChats(roomId);
        return ResponseEntity.status(200).body(CommonResponse.of(chatMessageDtoWrapper, true, "채팅방 리스트 가져오기 성공", 200));
    }

    @PutMapping({"/room"})
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @ApiOperation(value = "채팅방 삭제", notes = "특정 사용자의 채팅방을 삭제한다")
    public ResponseEntity<CommonResult> deleteChatRoom(@RequestBody Map<String, String> info){
        //예외처리
        //해당 채팅방 id가 없을 경우
        //해당 user가 없을 경우
        System.out.println(info.get("roomId"));
        String roomId = info.get("roomId");
        Long userId = Long.parseLong(info.get("userId"));
        if(chatRoomService.deleteUserChatRoom(roomId, userId) > 0){
            return ResponseEntity.status(200).body(CommonResult.of(true, "방 삭제 성공", 201));
        }
        return null;
    }
}
