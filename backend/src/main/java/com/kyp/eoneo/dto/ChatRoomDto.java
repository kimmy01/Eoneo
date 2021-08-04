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
    private String user1UId;
    private String user2UId;
    private String chatRoomId;
    private int unReadCount;

    public static ChatRoomDto create(@NonNull Long user1Id, @NonNull Long user2Id, @NonNull String user1UId, @NonNull String user2UId){
        ChatRoomDto created = new ChatRoomDto();
        created.chatRoomId = UUID.randomUUID().toString();
        created.user1Id = user1Id;
        created.user2Id = user2Id;
        created.user1UId = user1UId;
        created.user2UId = user2UId;
        return created;
    }

    public ChatRoomDto(Long user1Id, Long user2Id, String user1UId, String user2UId, String chatRoomId) {
        this.user1Id = user1Id;
        this.user2Id = user2Id;
        this.user1UId = user1UId;
        this.user2UId = user2UId;
        this.chatRoomId = chatRoomId;
    }
}
