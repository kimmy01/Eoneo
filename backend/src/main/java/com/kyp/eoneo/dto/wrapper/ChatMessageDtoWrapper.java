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
    private Long userMe;
    private Long userNotMe;
    private String chatRoomId;
    private List<ChatMessageDto> chats;
}
