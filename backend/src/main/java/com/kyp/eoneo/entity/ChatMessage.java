package com.kyp.eoneo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class ChatMessage {
    @Id @GeneratedValue
    private Long id;
    private Long chatroom_id;
    private Long message_sender;
    private String message_content;
    private LocalDateTime message_sendtime;
    private int attachment;
}
