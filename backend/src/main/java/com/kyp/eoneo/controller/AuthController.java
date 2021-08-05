package com.kyp.eoneo.controller;

import com.kyp.eoneo.dto.login.LoginDto;
import com.kyp.eoneo.dto.login.TokenDto;
import com.kyp.eoneo.service.UserService;
import com.kyp.eoneo.util.jwt.JwtFilter;
import com.kyp.eoneo.util.jwt.TokenProvider;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Api(value = "Login", tags = {"Login"})
@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class AuthController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private final UserService userService;

    public AuthController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder, UserService userService) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userService = userService;
    } //TokenProvider, AuthenticationManagerBuilder 주입

    //1. 로그인
    @ApiOperation(value = "로그인", notes = "로그인 시 토큰 발급")
    @PostMapping("/authenticate") //로그인 api 경로 : /api/authenticate 토큰 생성해서 보내주기
    public ResponseEntity<TokenDto> authorize(@Valid @RequestBody LoginDto loginDto) { //username, password로 파라미터 받음

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication); //Authentication 객체를 SecurityContext에 저장

        String jwt = tokenProvider.createToken(authentication); //JWT토큰 생성

        //로그인 횟수부분
        int returnCount = userService.getLoginCount(loginDto.getEmail());

        if(returnCount == 0){
            userService.setLoginCount(loginDto.getEmail());
        }

        //유저 정보 부분
        String username = userService.getUsername(loginDto.getEmail());
        Long userid = userService.getUserId(loginDto.getEmail());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new TokenDto(jwt, returnCount, username, userid), httpHeaders, HttpStatus.OK);
    }
}
