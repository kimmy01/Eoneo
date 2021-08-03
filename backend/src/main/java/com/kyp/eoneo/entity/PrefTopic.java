package com.kyp.eoneo.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "pref_topic")
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PrefTopic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "topic_id", referencedColumnName = "id")
    private Topic topic_id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user_id;

}
