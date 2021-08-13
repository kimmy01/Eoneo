package com.kyp.eoneo.config.advice.exception;

import com.kyp.eoneo.config.advice.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException {
    private ErrorCode errorCode;
}
