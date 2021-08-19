package com.kyp.eoneo.service;

import com.fasterxml.jackson.databind.annotation.JsonAppend;
import com.kyp.eoneo.config.advice.exception.CustomException;
import com.kyp.eoneo.dto.ChatRequestMessageDto;
import com.kyp.eoneo.dto.ChatResponseMessageDto;
import com.kyp.eoneo.dto.ChatRoomDto;
import com.kyp.eoneo.dto.wrapper.ChatMessageDtoWrapper;
import com.kyp.eoneo.entity.ChatRoom;
import com.kyp.eoneo.entity.PrefTopic;
import com.kyp.eoneo.entity.Topic;
import com.kyp.eoneo.entity.User;
import com.kyp.eoneo.repository.ChatRoomRepository;
import com.kyp.eoneo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.kyp.eoneo.config.advice.ErrorCode.*;


@Service
@Transactional
public class ChatRoomService {

    @Autowired
    ChatRoomRepository chatRoomRepository;

    @Autowired
    UserRepository userRepository;

//    방생성
    public ChatRoomDto createChatRoom(ChatRoomDto chatRoomDto) {
        User user1 = chatRoomRepository.getUser(chatRoomDto.getUser1Id());
        User user2 = chatRoomRepository.getUser(chatRoomDto.getUser2Id());

//        boolean flag = chatRoomRepository.isRightUser(user1);
        if(user1 == null) throw new CustomException(MEMBER_NOT_FOUND);
//        flag = chatRoomRepository.isRightUser(user2);
        if(user2 == null) throw new CustomException(MEMBER_NOT_FOUND);

        ChatRoom chatRoom = ChatRoom.builder().id(chatRoomDto.getChatRoomId())
                 .user1(user1).user2(user2).startedTime(LocalDateTime.now()).user1UId(chatRoomDto.getUser1UId())
                .user2UId(chatRoomDto.getUser2UId())
                .build();


        ChatRoomDto chatroom = chatRoomRepository.isAlreadyHasaRoom(user1.getId(), user2.getId());
        if(chatroom != null)  return chatroom;

        chatRoomRepository.createChatRoom(chatRoom);
        chatRoomDto.setUser1Name(user1.getUsername());
        chatRoomDto.setUser2Name(user2.getUsername());
       return chatRoomDto;
    }
//이미 방이 존재하는지 체크하기
    public ChatRoomDto isAlreadyChatRoom(Long id1, Long id2){
        ChatRoomDto chatroom = chatRoomRepository.isAlreadyHasaRoom(id1, id2);
        return chatroom;
    }

//채팅메세지
    public ChatMessageDtoWrapper getChats(String roomId) {
        ChatRoom chatRoom = chatRoomRepository.getChatRoom(roomId);
        if(chatRoom == null) throw new CustomException(DATA_NOT_FOUND);
        List<ChatResponseMessageDto> chats= chatRoomRepository.findChats(roomId);
        return new ChatMessageDtoWrapper(chatRoom.getUser1().getId(), chatRoom.getUser2().getId(), roomId, (long) chats.size(), chats);

    }

//    chatRoomList
    public List<ChatRoomDto> getChatRoomList(Long userId) {
        List<ChatRoomDto> lists = chatRoomRepository.findChatRoomList(userId);
        if(lists == null) throw new CustomException(MEMBER_NOT_FOUND);

        for(int i=0; i< lists.size(); i++){
            Long opponentId;
            System.out.println(userId);
            System.out.println(lists.get(i).getUser1Id());
            System.out.println(lists.get(i).getUser2Id());

            if(userId == lists.get(i).getUser1Id()){
                opponentId = lists.get(i).getUser2Id();
            }else {
                opponentId = lists.get(i).getUser1Id();
            }

            lists.get(i).setUnReadCount(chatRoomRepository.getUnReadMessage(lists.get(i).getChatRoomId(), userId));
            System.out.println("opponentId " + opponentId);
            User user = userRepository.findUserById(opponentId);
            lists.get(i).setUserDetail(user.getUserDetail());
            List<Topic> topic = new ArrayList<>();
            for(PrefTopic preftopic : user.getPrefTopics_User()){
                topic.add(preftopic.getTopic());
            }
            lists.get(i).setTopicList(topic);
            lists.get(i).setUserLanguage(user.getUserLanguage());

        }
        return lists;
    }

    public int deleteUserChatRoom(String roomId, Long userId) {
        int num = chatRoomRepository.deleteUserChatRoom(roomId, userId);
        //roomId가 없을 경우
        if(num == 0) throw new CustomException(DATA_NOT_FOUND);
        return num;
    }
}
