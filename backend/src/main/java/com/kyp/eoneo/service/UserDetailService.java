package com.kyp.eoneo.service;

import com.kyp.eoneo.dto.UserDetailDto;
import com.kyp.eoneo.entity.Country;
import com.kyp.eoneo.entity.User;
import com.kyp.eoneo.entity.UserDetail;
import com.kyp.eoneo.repository.UserDetailRepository;
import com.kyp.eoneo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

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

        this.userDetailRepository.createUserDetail(userDetail);
        return userDetailDto;
    }

    public void updateUserDetail(UserDetailDto userDetailDto){
        userDetailRepository.updateUserDetail(userDetailDto.getUserid(), userDetailDto.getNationality(), userDetailDto.getGender()
        , userDetailDto.getNickname(), userDetailDto.getDescription(), userDetailDto.getProfile_image());
    }
}
