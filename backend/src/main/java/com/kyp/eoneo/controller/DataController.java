package com.kyp.eoneo.controller;

import com.kyp.eoneo.entity.Country;
import com.kyp.eoneo.entity.Language;
import com.kyp.eoneo.entity.Topic;
import com.kyp.eoneo.service.DataService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "Data", tags = {"Data"})
@CrossOrigin("*")
@RestController
@RequestMapping("/api/data")
public class DataController {
    private final DataService dataService;

    public DataController(DataService dataService){
        this.dataService = dataService;
    }

    //1. 토픽 가져오기
    @ApiOperation(value = "토픽 리스트", notes = "토픽 리스트 가져오기")
    @GetMapping("/topic")
    public ResponseEntity<List<Topic>> getTopicList(){
        System.out.println("토픽");
        return ResponseEntity.ok(dataService.getTopics());
    }

    //2. 언어 가져오기
    @ApiOperation(value = "언어 리스트", notes = "언어 리스트 가져오기")
    @GetMapping("/language")
    public ResponseEntity<List<Language>> getLanguageList(){
        return ResponseEntity.ok(dataService.getLanguages());
    }

    //3. 국가 가져오기
    @ApiOperation(value = "국가 리스트", notes = "국가 리스트 가져오기")
    @GetMapping("/country")
    public ResponseEntity<List<Country>> getCountryList(){
        return ResponseEntity.ok(dataService.getCountries());
    }

}
