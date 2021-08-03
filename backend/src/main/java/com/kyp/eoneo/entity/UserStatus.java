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
    private Long id;

    @MapsId
    @OneToOne
    @JoinColumn(name = "id")
    private User user;
    @Column(nullable = false, columnDefinition = "TINYINT", length = 1)
    private boolean userStatus;
    @Column(nullable = false, columnDefinition = "TINYINT", length = 1)
    private boolean deleteStatus;
}
