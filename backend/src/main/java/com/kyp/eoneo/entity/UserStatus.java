package com.kyp.eoneo.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "user_status")
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne

    private User user;
    private Boolean userStatus;
    private Boolean deleteStatus;
}
