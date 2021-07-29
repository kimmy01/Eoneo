package com.kyp.eoneo.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "authority")
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Authority {
    @Id
    @Column(name = "authority_name")
    private String authorityName;
}
