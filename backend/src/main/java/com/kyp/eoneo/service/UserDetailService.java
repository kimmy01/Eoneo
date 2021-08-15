package com.kyp.eoneo.service;

import com.kyp.eoneo.dto.PhotoDto;
import com.kyp.eoneo.dto.TopicDto;
import com.kyp.eoneo.dto.UserDetailDto;
import com.kyp.eoneo.dto.UserDto;
import com.kyp.eoneo.entity.*;
import com.kyp.eoneo.repository.UserDetailRepository;
import com.kyp.eoneo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.swing.filechooser.FileSystemView;
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class UserDetailService {

    @Autowired
    UserDetailRepository userDetailRepository;

    @Autowired
    UserRepository userRepository;

    //사용자 정보 등록
    public UserDetailDto createUserDetail(UserDetailDto userDetailDto) throws Exception {

        User user = userRepository.findUserById(userDetailDto.getUserid());

        System.out.println(user.getAuthorities());

        Country country = new Country();
        country.setCode(userDetailDto.getNationality());

//        //이미지 이름 변경, 저장
//        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
//        String currentDate = simpleDateFormat.format(new Date());
//
//        MultipartFile originFile = userDetailDto.getProfile_image();
//
//        String absolutePath = new File("").getAbsolutePath()+"\\";
//        String path = "profileimages/" + currentDate + userDetailDto.getUserid();
//        File profileImage = new File(path + currentDate);
//
//        profileImage.getParentFile().mkdirs();
//
//        userDetailDto.setProfile_image_url(profileImage.getAbsolutePath()+".png");
//
//        profileImage.setReadable(true);
//        profileImage.setWritable(true);
//
//        originFile.transferTo(profileImage);

        UserDetail userDetail = UserDetail.builder().user(user)
                        .nationality(country).gender(userDetailDto.getGender())
                        .nickname(userDetailDto.getNickname())
                        .description(userDetailDto.getDescription())
//                        .profile_image(userDetailDto.getProfile_image_url())
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

    //사용자 정보 업데이트
    public UserDetailDto updateUserDetail(UserDetailDto userDetailDto){

        User user = userRepository.findUserById(userDetailDto.getUserid());

        System.out.println(user.getAuthorities());

        Country country = new Country();
        country.setCode(userDetailDto.getNationality());

//        //이미지 이름 변경, 저장
//        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
//        String currentDate = simpleDateFormat.format(new Date());
//
//        String absolutePath = new File("").getAbsolutePath()+"\\";
//        String path = absolutePath + "profileimages/" + currentDate + userDetailDto.getUserid();
//        File profileImage = new File(path + currentDate);
//
//        profileImage.getParentFile().mkdirs();
//
//        userDetailDto.setProfile_image_url(profileImage.getAbsolutePath()+".png");
//
//        profileImage.setReadable(true);
//        profileImage.setWritable(true);

        UserDetail userDetail = UserDetail.builder().user(user)
                .nationality(country).gender(userDetailDto.getGender())
                .nickname(userDetailDto.getNickname())
                .description(userDetailDto.getDescription())
//                .profile_image(userDetailDto.getProfile_image_url())
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

    //특정 토픽을 관심사로 등록한 사용자 정보 가져오기
    public List<UserDto> getTopicUsers(Long id, Long userid){
        User my = userRepository.findUserById(userid);
        List<PrefTopic> list = userDetailRepository.getTopic(id).getPrefTopics_Topic();
        List<UserDto> userList = new ArrayList<>();

        String myWantLanguage = my.getUserLanguage().getWantLanguage().getCode();

        for(int i=0; i<list.size(); i++){
            User user = list.get(i).getUser();

            if(user.getUserLanguage().getNativeLanguage().getCode().equals(myWantLanguage) && user.getId() != userid){

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
        }

        for(int i=0; i<list.size(); i++){
            User user = list.get(i).getUser();

            if(user.getUserLanguage().getFluentLanguage().getCode().equals(myWantLanguage) && user.getId() != userid){
                List<Topic> topicList = new ArrayList<>();

                for(int j=0; j<user.getPrefTopics_User().size(); j++){
                    System.out.println(user.getPrefTopics_User().get(j).getUser().getAuthorities());
                    topicList.add(user.getPrefTopics_User().get(j).getTopic());
                }

                UserDto userDto = UserDto.builder().email(user.getEmail()).id(user.getId())
                        .username(user.getUsername()).userLanguage(user.getUserLanguage()).joindate(user.getJoindate())
                        .userDetail(user.getUserDetail()).topicList(topicList).build();

                if(!userList.contains(userDto)){
                    userList.add(userDto);
                }
            }
        }

        return userList;
    }

//    @Value("${custom.path.upload-images}")
    String rootPath;
    public String uploadProfileImage(Long id, MultipartFile multipartFile) throws IOException {
        User user = userRepository.findUserById(id);

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        String currentDate = simpleDateFormat.format(new Date());

//        String absolutePath = new File("").getAbsolutePath()+"\\"; //ubuntu에서는 "/"
//        String rootPath = "C:\\SSAFY\\mydir\\image";
//        System.out.println(rootPath);
//        String path = "profileImages/";
        File file = new File(rootPath);

        if(!file.exists()){
            file.mkdirs();
        }

        String contentType = multipartFile.getContentType();
        String originFileExtension = "";

        if(contentType.contains("image/jpeg")){
            originFileExtension = ".jpg";
        }else if(contentType.contains("image/png")){
            originFileExtension = ".png";
        }else if(contentType.contains("image/gif")){
            originFileExtension = ".gif";
        }

        String newFileName = Long.toString(System.nanoTime()) + originFileExtension;

        file = new File(rootPath + "/" + newFileName);

        multipartFile.transferTo(file);
        this.userDetailRepository.uploadUserImage(id, newFileName);

        return "업로드 완!";
    }
}
