package com.kyp.eoneo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "user_detail")
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDetail implements Serializable {
    @Id
    @Column(name = "id")
    private Long id;

    @JsonIgnore
    @MapsId
    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "nationality", referencedColumnName = "code")
    private Country nationality;

    @Column(name = "gender")
    private int gender;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "description")
    private String description;

    @Column(name = "profile_image")
    private String profile_image;

}
