package com.kyp.eoneo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "user")
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @JsonIgnore
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email")
    private String email;

    @JsonIgnore
    @Column(name = "password")
    private String password;

    @Column(name = "username")
    private String username;

    @Column(name = "joindate")
    private LocalDateTime joindate;

    private int firstLogin = 0;

    @PrePersist
    public void joinedAt(){
        this.joindate = LocalDateTime.now();
    }

    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")}
    )
    private Set<Authority> authorities;

//    @JsonIgnore
    @OneToMany(mappedBy = "user_id", fetch = FetchType.EAGER)
    private List<PrefTopic> prefTopics_User = new ArrayList<>();

    public void addPrefTopics(PrefTopic prefTopic){
        prefTopics_User.add(prefTopic);
        prefTopic.setUser_id(this);
    }

//    @JsonIgnore
    @OneToOne(mappedBy = "user")
    private UserDetail userDetail;

//    @JsonIgnore
    @OneToOne(mappedBy = "user")
    private UserLanguage userLanguage;
}