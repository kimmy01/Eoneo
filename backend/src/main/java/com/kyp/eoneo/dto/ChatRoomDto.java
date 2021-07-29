package com.kyp.eoneo.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomDto {
    private Long user1Id;
    private Long user2Id;
    private String chatRoomId;

    public static ChatRoomDto create(@NonNull Long user1Id, @NonNull Long user2Id){
        ChatRoomDto created = new ChatRoomDto();
        created.chatRoomId = UUID.randomUUID().toString();
        created.user1Id = user1Id;
        created.user2Id = user2Id;
        return created;
    }
}
