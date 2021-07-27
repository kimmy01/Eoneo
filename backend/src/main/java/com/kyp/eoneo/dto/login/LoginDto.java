package com.kyp.eoneo.dto.login;

import lombok.*;

import javax.validation.constraints.NotNull;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {
    @NotNull
    private String email;

    @NotNull
    private String password;
}
