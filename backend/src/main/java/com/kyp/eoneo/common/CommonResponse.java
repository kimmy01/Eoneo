package com.kyp.eoneo.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommonResponse<T> extends CommonResult {
    private T data;

    public static CommonResponse of(Object data, boolean success, String msg, Integer statusCode){
        CommonResponse result = new CommonResponse();
        result.setMsg(msg);
        result.setSuccess(success);
        result.setStatusCode(statusCode);
        result.setData(data);
        return result;
    }
}
