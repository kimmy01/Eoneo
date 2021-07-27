package com.kyp.eoneo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "chatmessage")
public class ChatMessage {
    @Id @GeneratedValue
    private Long id;
    @ManyToOne
    @JoinColumn(name = "chatroom_id", referencedColumnName = "id")
    private ChatRoom chatRoom;
    private Long messageSender;
    private String messageContent;
    private LocalDateTime messageSendtime;
    private int attachment;
}
