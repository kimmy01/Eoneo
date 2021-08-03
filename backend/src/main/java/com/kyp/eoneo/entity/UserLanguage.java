package com.kyp.eoneo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "user_lang")
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLanguage implements Serializable {

    @JsonIgnore
    @Id
    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "fluent", referencedColumnName = "code")
    private Language fluentLanguage;

    @ManyToOne
    @JoinColumn(name = "native", referencedColumnName = "code")
    private Language nativeLanguage;

    @ManyToOne
    @JoinColumn(name = "want", referencedColumnName = "code")
    private Language wantLanguage;
}
