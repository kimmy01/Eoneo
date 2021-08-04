package com.kyp.eoneo.service;

import com.kyp.eoneo.entity.Topic;
import com.kyp.eoneo.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TopicService {
    @Autowired
    TopicRepository topicRepository;

    public List<Topic> getTopics(){
        List<Topic> topic = this.topicRepository.getTopics();
        return topic;
    }
}
