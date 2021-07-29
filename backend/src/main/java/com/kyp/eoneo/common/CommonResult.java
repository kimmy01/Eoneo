package com.kyp.eoneo.common;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
public class CommonResult {
    @ApiModelProperty(value = "응답 성공여부 : success, false")
    private boolean success;
    @ApiModelProperty(value = "응답 메시지")
    private String msg;

}
