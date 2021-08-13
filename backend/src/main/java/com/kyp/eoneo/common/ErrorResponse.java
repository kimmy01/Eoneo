package com.kyp.eoneo.common;

import com.kyp.eoneo.config.advice.ErrorCode;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

@Getter
@Setter

@ApiModel("ErrorResponseBody")
public class ErrorResponse extends CommonResult{
    private String error;
    private String code;

    public static ResponseEntity<ErrorResponse> of(ErrorCode errorCode){
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setStatusCode(errorCode.getHttpStatus().value());
        errorResponse.setError(errorCode.getHttpStatus().name());
        errorResponse.setCode(errorCode.name());
        errorResponse.setMsg(errorCode.getDetail());

        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(errorResponse);
    }
}
