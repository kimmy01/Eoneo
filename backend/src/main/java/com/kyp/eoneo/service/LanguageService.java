package com.kyp.eoneo.service;

import com.kyp.eoneo.entity.Language;
import com.kyp.eoneo.repository.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LanguageService {
    @Autowired
    LanguageRepository languageRepository;

    public List<Language> getLanguages(){
        List<Language> language = this.languageRepository.getLanguages();
        return language;
    }
}
