package com.kyp.eoneo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CountryDto {
    private String code;
    private String name;
    private String flag_path;
}
