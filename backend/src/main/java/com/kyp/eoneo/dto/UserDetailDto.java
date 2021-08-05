package com.kyp.eoneo.dto;

import com.kyp.eoneo.entity.Country;
import com.kyp.eoneo.entity.PrefTopic;
import com.kyp.eoneo.entity.User;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailDto {
    private Long userid;
    private String nationality;
    private int gender;
    private String nickname;
    private String description;

    private String profile_image_url;

    private String fluentLanguage;
    private String nativeLanguage;
    private String wantLanguage;

    private List<Long> topicList;

    private List<PrefTopic> prefTopicList;

    public static UserDetailDto create(@NonNull Long userid,
                                       @NonNull String nationality,
                                       @NonNull int gender,
                                       @NonNull String nickname,
                                       @NonNull String description,
                                       @NonNull String fluentLanguage,
                                       @NonNull String nativeLanguage,
                                       @NonNull String wantLanguage,
                                       @NonNull List<Long> topicList){
        UserDetailDto created = new UserDetailDto();
        created.userid = userid;
        created.nationality = nationality;
        created.gender = gender;
        created.nickname = nickname;
        created.description = description;
        created.fluentLanguage = fluentLanguage;
        created.nativeLanguage = nativeLanguage;
        created.wantLanguage = wantLanguage;
        created.topicList = topicList;
        return created;
    }
}
