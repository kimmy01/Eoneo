package com.kyp.eoneo.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "country")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Country {

    @Id
    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "flag_path")
    private String flag;
}
