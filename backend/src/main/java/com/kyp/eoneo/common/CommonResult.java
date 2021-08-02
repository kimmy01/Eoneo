package com.kyp.eoneo.common;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
@ApiModel("BaseResponseBody")
public class CommonResult {
    @ApiModelProperty(value = "응답 성공여부 : success, false")
    private boolean success;
    @ApiModelProperty(value = "응답 메시지")
    private String msg;
    @ApiModelProperty(name="응답 코드", example = "200")
    Integer statusCode = null;

    public static CommonResult of(boolean success, String msg, Integer statusCode){
        CommonResult result = new CommonResult();
        result.setMsg(msg);
        result.setSuccess(success);
        result.setStatusCode(statusCode);
        return result;
    }

}
