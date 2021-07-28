package com.kyp.eoneo.dto.wrapper;

import com.kyp.eoneo.dto.ChatMessageDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class ChatMessageDtoWrapper {
    private Long user1;
    private Long user2;
    private String chatRoomId;
    private Long chatsSize;
    private List<ChatMessageDto> chats;
}
