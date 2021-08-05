package com.kyp.eoneo.service;

import com.kyp.eoneo.dto.TopicDto;
import com.kyp.eoneo.dto.UserDetailDto;
import com.kyp.eoneo.dto.UserDto;
import com.kyp.eoneo.entity.*;
import com.kyp.eoneo.repository.UserDetailRepository;
import com.kyp.eoneo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserDetailService {

    @Autowired
    UserDetailRepository userDetailRepository;

    @Autowired
    UserRepository userRepository;

    public UserDetailDto createUserDetail(UserDetailDto userDetailDto){

        User user = userRepository.findUserById(userDetailDto.getUserid());

        System.out.println(user.getAuthorities());

        Country country = new Country();
        country.setCode(userDetailDto.getNationality());

        UserDetail userDetail = UserDetail.builder().user(user)
                        .nationality(country).gender(userDetailDto.getGender())
                        .nickname(userDetailDto.getNickname())
                        .description(userDetailDto.getDescription())
                        .profile_image(userDetailDto.getProfile_image())
                        .build();

        Language fluentL = new Language();
        fluentL.setCode(userDetailDto.getFluentLanguage());

        Language nativeL = new Language();
        nativeL.setCode(userDetailDto.getNativeLanguage());

        Language wantL = new Language();
        wantL.setCode(userDetailDto.getWantLanguage());


        UserLanguage userLanguage = UserLanguage.builder().user(user)
                        .fluentLanguage(fluentL).nativeLanguage(nativeL).wantLanguage(wantL).build();

        List<PrefTopic> prefTopicList = new ArrayList<>();

        for(long i=0; i<userDetailDto.getTopicList().size(); i++){
            Topic topic = userDetailRepository.getTopic(userDetailDto.getTopicList().get((int)i));
            topic.setId(userDetailDto.getTopicList().get((int)i));
            PrefTopic prefTopic = PrefTopic.builder().user_id(user.getId()).topic_id(topic.getId()).build();
            user.addPrefTopics(prefTopic);
            topic.addPrefTopics(prefTopic);
            prefTopicList.add(prefTopic);
            this.userDetailRepository.createPrefTopic(prefTopic);
        }

        this.userDetailRepository.createUserDetail(userDetail);
        this.userDetailRepository.createUserLanguage(userLanguage);
        userDetailDto.setPrefTopicList(prefTopicList);
        return userDetailDto;
    }

    public UserDetailDto updateUserDetail(UserDetailDto userDetailDto){

        User user = userRepository.findUserById(userDetailDto.getUserid());

        System.out.println(user.getAuthorities());

        Country country = new Country();
        country.setCode(userDetailDto.getNationality());

        UserDetail userDetail = UserDetail.builder().user(user)
                .nationality(country).gender(userDetailDto.getGender())
                .nickname(userDetailDto.getNickname())
                .description(userDetailDto.getDescription())
                .profile_image(userDetailDto.getProfile_image())
                .build();

        Language fluentL = new Language();
        fluentL.setCode(userDetailDto.getFluentLanguage());

        Language nativeL = new Language();
        nativeL.setCode(userDetailDto.getNativeLanguage());

        Language wantL = new Language();
        wantL.setCode(userDetailDto.getWantLanguage());

        UserLanguage userLanguage = UserLanguage.builder().user(user)
                .fluentLanguage(fluentL).nativeLanguage(nativeL).wantLanguage(wantL).build();

        this.userDetailRepository.deleteUserPrefTopics(userDetail); //회원정보 수정 시, 기존 선호 주제 모두 삭제

        List<PrefTopic> prefTopicList = new ArrayList<>();

        for(long i=0; i<userDetailDto.getTopicList().size(); i++){
            Topic topic = userDetailRepository.getTopic(userDetailDto.getTopicList().get((int)i));
            PrefTopic prefTopic = PrefTopic.builder().user_id(user.getId()).topic_id(topic.getId()).build();
            user.addPrefTopics(prefTopic);
            topic.addPrefTopics(prefTopic);
            prefTopicList.add(prefTopic);
            this.userDetailRepository.createPrefTopic(prefTopic);
        }

        this.userDetailRepository.updateUserDetail(userDetail);
        this.userDetailRepository.updateUserLanguage(userLanguage);
        userDetailDto.setPrefTopicList(prefTopicList);
        return userDetailDto;
    }

    public List<UserDto> getTopicUsers(Long id){
        List<PrefTopic> list = userDetailRepository.getTopic(id).getPrefTopics_Topic();
        List<UserDto> userList = new ArrayList<>();

        for(int i=0; i<list.size(); i++){
            User user = list.get(i).getUser();

            List<Topic> topicList = new ArrayList<>();

            for(int j=0; j<user.getPrefTopics_User().size(); j++){
                System.out.println(user.getPrefTopics_User().get(j).getUser().getAuthorities());
                topicList.add(user.getPrefTopics_User().get(j).getTopic());
            }

            UserDto userDto = UserDto.builder().email(user.getEmail()).id(user.getId())
                    .username(user.getUsername()).userLanguage(user.getUserLanguage()).joindate(user.getJoindate())
                    .userDetail(user.getUserDetail()).topicList(topicList).build();

            userList.add(userDto);
        }

        return userList;
    }

}
