package com.kyp.eoneo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kyp.eoneo.entity.*;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String username;

    private int firstLogin;

    private UserDetail userDetail;

    private LocalDateTime joindate;

//    private Set<Authority> authoritySet;

//    private List<PrefTopic> prefTopic_User;

    private List<Topic> topicList;

    private UserLanguage userLanguage;
}
