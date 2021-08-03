package com.kyp.eoneo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kyp.eoneo.entity.UserDetail;
import lombok.*;

import javax.validation.constraints.NotNull;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    @NotNull
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    private String password;

    @NotNull
    private String username;

    @NotNull
    private int firstLogin;

    private UserDetail userDetail;
}
