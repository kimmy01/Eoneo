package com.kyp.eoneo.dto.login;

import lombok.*;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenDto {
    private String token;

    private int loginCount;
}
