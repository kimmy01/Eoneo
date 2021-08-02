package com.kyp.eoneo.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "CHATMESSAGE")
public class ChatMessage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @ManyToOne
//    @JoinColumn(name = "chatroom_id", referencedColumnName = "id")
    private String chatroomId;
    private Long messageSender;
    private String messageContent;
    private LocalDateTime messageSendtime;
    private boolean isRead;

    @PrePersist
    public void joinedAt(){
        this.messageSendtime = LocalDateTime.now();
    }

}
