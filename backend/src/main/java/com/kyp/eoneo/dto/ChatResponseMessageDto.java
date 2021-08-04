package com.kyp.eoneo.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ChatResponseMessageDto {
    private Long chatMessageId;
    private Long sendUserId;
    private String message;

}

