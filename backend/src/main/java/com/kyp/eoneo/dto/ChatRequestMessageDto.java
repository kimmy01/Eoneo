package com.kyp.eoneo.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ChatRequestMessageDto {
    private String chatRoomId;
    private Long sendUserId;
    private String message;
    private String sendUserUId;
    private String receiveUserUId;


}
