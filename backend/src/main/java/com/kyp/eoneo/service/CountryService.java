package com.kyp.eoneo.service;

import com.kyp.eoneo.entity.Country;
import com.kyp.eoneo.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CountryService {
    @Autowired
    CountryRepository countryRepository;

    public List<Country> getCountries(){
        List<Country> countries = this.countryRepository.getCountries();
        return countries;
    }
}
