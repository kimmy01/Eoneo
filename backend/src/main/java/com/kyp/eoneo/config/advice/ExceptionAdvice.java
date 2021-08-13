package com.kyp.eoneo.config.advice;

import com.kyp.eoneo.common.ErrorResponse;
import com.kyp.eoneo.config.advice.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RequiredArgsConstructor
@RestControllerAdvice
@Slf4j
public class ExceptionAdvice extends ResponseEntityExceptionHandler {
    @ExceptionHandler(value = {CustomException.class})
    protected ResponseEntity<ErrorResponse> handleDataException(CustomException e){
        return ErrorResponse.of(e.getErrorCode());
    }

}
