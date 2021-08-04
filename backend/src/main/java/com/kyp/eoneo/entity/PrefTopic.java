package com.kyp.eoneo.entity;

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
    @ManyToOne
    @JoinColumn(name = "topic_id", referencedColumnName = "id")
    private Topic topic_id;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user_id;

//    @Id
//    @Column(name = "topic_id")
//    private Long topic_id;
//
//    @Id
//    @JoinColumn(name = "user_id")
//    private Long user_id;

}
