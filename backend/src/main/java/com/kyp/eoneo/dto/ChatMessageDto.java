package com.kyp.eoneo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ChatMessageDto {
    private String chatRoomId;
    private Long sendUserId;
    private String message;
    private String sendUserUId;
    private String receiveUserUId;

//데이터 보낼 때
    public ChatMessageDto(Long sendUserId, String message) {
//        this.chatRoomId = -1;
        this.sendUserId = sendUserId;
        this.message = message;

    }
}
