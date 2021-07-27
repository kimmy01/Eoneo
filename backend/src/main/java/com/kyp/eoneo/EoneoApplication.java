package com.kyp.eoneo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

//@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@SpringBootApplication
public class EoneoApplication {

    public static void main(String[] args) {
        SpringApplication.run(EoneoApplication.class, args);
    }

}
