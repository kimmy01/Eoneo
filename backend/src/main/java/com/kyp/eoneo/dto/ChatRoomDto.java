package com.kyp.eoneo.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomDto {
    private long user1Id;
    private long user2Id;
    private String chatRoomId;

    public static ChatRoomDto create(@NonNull long user1Id, @NonNull long user2Id){
        ChatRoomDto created = new ChatRoomDto();
        created.chatRoomId = UUID.randomUUID().toString();
        created.user1Id = user1Id;
        created.user2Id = user2Id;
        return created;
    }
}
