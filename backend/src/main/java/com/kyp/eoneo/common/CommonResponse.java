package com.kyp.eoneo.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommonResponse<T> extends CommonResult {
    private T data;
}
