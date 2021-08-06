package com.kyp.eoneo.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class PhotoDto {
    private Long id;
    private MultipartFile profileImage;
    private String profileImageUrl;
}
