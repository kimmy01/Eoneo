package com.kyp.eoneo.dto.login;

import com.kyp.eoneo.dto.UserDto;
import lombok.*;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenDto {
    private String token;

    private int loginCount;

    private String username;
    private Long id;
}
