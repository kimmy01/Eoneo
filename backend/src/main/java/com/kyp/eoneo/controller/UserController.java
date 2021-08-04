package com.kyp.eoneo.controller;

import com.kyp.eoneo.dto.UserDetailDto;
import com.kyp.eoneo.dto.UserDto;
import com.kyp.eoneo.entity.*;
import com.kyp.eoneo.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    private final UserDetailService userDetailService;

    private final TopicService topicService;

    private final LanguageService languageService;

    private final CountryService countryService;

    public UserController(UserService userService, UserDetailService userDetailService, TopicService topicService, LanguageService languageService, CountryService countryService) {
        this.userService = userService;
        this.userDetailService = userDetailService;
        this.topicService = topicService;
        this.languageService = languageService;
        this.countryService = countryService;
    }

    @GetMapping("/hello") //Test
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("hello");
    }

    @PostMapping("/signup") //UserDto를 파라미터로 받아서 UserService의 signup메소드 호출, 회원가입
    public ResponseEntity<User> signup(
            @Valid @RequestBody UserDto userDto
    ) {
        return ResponseEntity.ok(userService.signup(userDto));
    }

    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER','ADMIN')") //User role, Admin role 모두 허용 토큰 받아와서 회원 확인, 로그인
    public ResponseEntity<User> getMyUserInfo() {
        return ResponseEntity.ok(userService.getMyUserWithAuthorities().get());
    }

    @GetMapping("/user/{username}")
    @PreAuthorize("hasAnyRole('ADMIN')") //Admin role 허용
    public ResponseEntity<User> getUserInfo(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserWithAuthorities(username).get());
    } //UserService에서 만들었던 username 파라미터를 기준으로 유저 정보와 권한 정보를 리턴하는 api

    @GetMapping("/user2/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUserInfo(id));
    }

    @PostMapping("/userdetail")
    public ResponseEntity<UserDetailDto> createUserDetail(@RequestBody UserDetailDto userDetailDto){
        return ResponseEntity.ok(userDetailService.createUserDetail(userDetailDto));
    }

    @PutMapping("/userdetail")
    public ResponseEntity<UserDetailDto> updateUserDetail(@RequestBody UserDetailDto userDetailDto){
        return ResponseEntity.ok(userDetailService.updateUserDetail(userDetailDto));
    }

    @GetMapping("/topic")
    public ResponseEntity<List<Topic>> getTopicList(){
        return ResponseEntity.ok(topicService.getTopics());
    }

    @GetMapping("/language")
    public ResponseEntity<List<Language>> getLanguageList(){
        return ResponseEntity.ok(languageService.getLanguages());
    }

    @GetMapping("/country")
    public ResponseEntity<List<Country>> getCountryList(){
        return ResponseEntity.ok(countryService.getCountries());
    }

}