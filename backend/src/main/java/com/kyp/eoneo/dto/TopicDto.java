package com.kyp.eoneo.dto;

import com.kyp.eoneo.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TopicDto {
    private Long id;
    private String topic;
    private User user;
    private String image;
}
