package com.kyp.eoneo.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "user_detail")
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDetail {
    @Id
    @Column(name = "id")
    private Long id;

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
