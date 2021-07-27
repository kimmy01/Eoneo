package com.kyp.eoneo.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatMessageDto {
    private String chatRoomId;
    private Long sendUserId;
    private String message;
    private int messageType;
}
