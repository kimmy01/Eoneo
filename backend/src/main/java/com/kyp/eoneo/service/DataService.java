package com.kyp.eoneo.service;

import com.kyp.eoneo.entity.Country;
import com.kyp.eoneo.entity.Language;
import com.kyp.eoneo.entity.Topic;
import com.kyp.eoneo.repository.DataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DataService {
    @Autowired
    DataRepository dataRepository;

    public List<Topic> getTopics(){
        List<Topic> topic = this.dataRepository.getTopics();
        return topic;
    }

    public List<Language> getLanguages(){
        List<Language> language = this.dataRepository.getLanguages();
        return language;
    }

    public List<Country> getCountries(){
        List<Country> countries = this.dataRepository.getCountries();
        return countries;
    }
}
