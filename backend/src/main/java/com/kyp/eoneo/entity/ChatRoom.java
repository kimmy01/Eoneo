package com.kyp.eoneo.entity;

import com.kyp.eoneo.dto.ChatRoomDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = {"chatRoomId", "id"})
@Table(name = "CHATROOM")
public class ChatRoom {
    @Id
    private  String id;

    @ManyToOne
    @JoinColumn(name = "user1_id", referencedColumnName = "id")
    private User user1;

    @ManyToOne
    @JoinColumn(name = "user2_id", referencedColumnName = "id")
    private User user2;


    private LocalDateTime startedTime;

//    @OneToMany(mappedBy = "chatRoom", fetch = FetchType.LAZY)
//    private List<ChatMessage> chats = new ArrayList<>();


    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public User getUser1() {
        return user1;
    }

    public void setUser1(User user1) {
        this.user1 = user1;
    }

    public User getUser2() {
        return user2;
    }


    public void setUser2(User user2) {
        this.user2 = user2;
    }

}
