package com.kyp.eoneo.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "lang")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Language {

    @Id
    @Column(name = "code")
    private String code;

    @Column(name = "language")
    private String language;
}
