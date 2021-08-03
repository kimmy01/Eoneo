package com.kyp.eoneo.service;

import com.kyp.eoneo.dto.UserDetailDto;
import com.kyp.eoneo.entity.*;
import com.kyp.eoneo.repository.UserDetailRepository;
import com.kyp.eoneo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class UserDetailService {

    @Autowired
    UserDetailRepository userDetailRepository;

    @Autowired
    UserRepository userRepository;

    public UserDetailDto createUserDetail(UserDetailDto userDetailDto){

        User user = userRepository.findUserById(userDetailDto.getUserid());

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

        this.userDetailRepository.createUserDetail(userDetail);
        this.userDetailRepository.createUserLanguage(userLanguage);
        return userDetailDto;
    }

    public UserDetailDto updateUserDetail(UserDetailDto userDetailDto){

        User user = userRepository.findUserById(userDetailDto.getUserid());

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

        this.userDetailRepository.updateUserDetail(userDetail);
        this.userDetailRepository.updateUserLanguage(userLanguage);
        return userDetailDto;

//        this.userDetailRepository.updateUserDetail(userDetailDto.getUserid(), country, userDetailDto.getGender()
//        , userDetailDto.getNickname(), userDetailDto.getDescription(), userDetailDto.getProfile_image());
//
//        return userDetailDto;
    }
}
