package com.kyp.eoneo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageDto {
    private Long chatroom_id;
    private Long send_user_id;
    private String message;
    private int message_type;
}
