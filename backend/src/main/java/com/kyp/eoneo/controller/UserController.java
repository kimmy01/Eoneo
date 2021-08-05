package com.kyp.eoneo.controller;

import com.kyp.eoneo.dto.UserDetailDto;
import com.kyp.eoneo.dto.UserDto;
import com.kyp.eoneo.entity.*;
import com.kyp.eoneo.service.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@Api(value = "User", tags = {"User"})
@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;
    private final UserDetailService userDetailService;

    public UserController(UserService userService, UserDetailService userDetailService) {
        this.userService = userService;
        this.userDetailService = userDetailService;
    }

    //1. 서버 연결 확인
    @ApiOperation(value="연결 확인", notes = "서버와의 연결 확인하는 api")
    @GetMapping("/hello") //Test
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("hello");
    }

    //2. 회원가입
    @ApiOperation(value = "회원 가입", notes = "회원 가입 api")
    @PostMapping("/signup") //UserDto를 파라미터로 받아서 UserService의 signup메소드 호출, 회원가입
    public ResponseEntity<User> signup(
            @Valid @RequestBody UserDto userDto
    ) {
        return ResponseEntity.ok(userService.signup(userDto));
    }

//    @GetMapping("/user")
//    @PreAuthorize("hasAnyRole('USER','ADMIN')") //User role, Admin role 모두 허용 토큰 받아와서 회원 확인, 로그인
//    public ResponseEntity<User> getMyUserInfo() {
//        return ResponseEntity.ok(userService.getMyUserWithAuthorities().get());
//    }
//
//    @GetMapping("/user/{username}")
//    @PreAuthorize("hasAnyRole('ADMIN')") //Admin role 허용
//    public ResponseEntity<User> getUserInfo(@PathVariable String username) {
//        return ResponseEntity.ok(userService.getUserWithAuthorities(username).get());
//    } //UserService에서 만들었던 username 파라미터를 기준으로 유저 정보와 권한 정보를 리턴하는 api


    //3. 사용자 전체 정보 가져오기
    @ApiOperation(value = "사용자 정보 가져오기", notes = "사용자 아이디를 이용하여 사용자 정보 가져오기")
    @GetMapping("/userinfo/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUserInfo(id));
    }

    //4. 사용자 세부 정보 등록하기
    @ApiOperation(value = "사용자 세부 정보 등록하기", notes = "최초 로그인 후 사용자 세부 정보 등록하기")
    @PostMapping("/userdetail")
    public ResponseEntity<UserDetailDto> createUserDetail(@RequestBody UserDetailDto userDetailDto) throws Exception {
        return ResponseEntity.ok(userDetailService.createUserDetail(userDetailDto));
    }

    //5. 사용자 세부 정보 수정하기
    @ApiOperation(value = "사용자 세부 정보 수정하기", notes = "사용자 세부 정보 수정하기(등록X)")
    @PutMapping("/userdetail")
    public ResponseEntity<UserDetailDto> updateUserDetail(@RequestBody UserDetailDto userDetailDto){
        return ResponseEntity.ok(userDetailService.updateUserDetail(userDetailDto));
    }

    //6. 특정 토픽 관심 추가한 사용자 가져오기
    @ApiOperation(value = "특정 토픽 관심 추가한 사용자 가져오기", notes = "특정 토픽을 관심사로 등록한 사용자의 정보 가져오기")
    @GetMapping("/topicusers/{id}")
    public ResponseEntity<List<UserDto>> getTopicUserList(@PathVariable Long id){
        return ResponseEntity.ok(userDetailService.getTopicUsers(id));
    }

    //7. 프로필 이미지 업로드
    @ApiOperation(value = "프로필 이미지 업로드", notes = "프로필 이미지 업로드하기 (png, jpg, gif만 가능)")
    @PostMapping("/profileimage")
    public ResponseEntity<String> uploadProfileImage(
            @Valid @RequestParam("id") Long id,
            MultipartFile multipartFile
    ) throws Exception {
        return ResponseEntity.ok(userDetailService.uploadProfileImage(id, multipartFile));
    }
}