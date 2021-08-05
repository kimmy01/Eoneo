package com.kyp.eoneo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "pref_topic")
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PrefTopic implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "topic_id", insertable = false, updatable = false)
    private Topic topic;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @Column(name = "topic_id")
    private Long topic_id;

    @JoinColumn(name = "user_id")
    private Long user_id;

}
