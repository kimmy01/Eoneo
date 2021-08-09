package com.kyp.eoneo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "topic")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Topic {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "topic")
    private String topic;

    @JsonIgnore
    @OneToMany(mappedBy = "topic")
    private List<PrefTopic> prefTopics_Topic = new ArrayList<>();

    public void addPrefTopics(PrefTopic prefTopic){
        prefTopics_Topic.add(prefTopic);
        prefTopic.setTopic(this);
    }

    @Column(name = "image")
    private String image;
}
