package com.kyp.eoneo.dto.wrapper;

import com.kyp.eoneo.dto.ChatRoomDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class ChatRoomDtoWrapper<T> {
    private int chatRoomSize;
    private List<ChatRoomDto> chatRoomList;
}
