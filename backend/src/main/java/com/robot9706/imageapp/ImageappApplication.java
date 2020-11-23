package com.robot9706.imageapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.unit.DataSize;

import javax.servlet.MultipartConfigElement;

@SpringBootApplication
public class ImageappApplication {

    public static String[] ALLOWED_EXTENSIONS = new String[] { "png", "jpg", "bmp", "webp" };

    public static void main(String[] args) {
        SpringApplication.run(ImageappApplication.class, args);
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setMaxFileSize(DataSize.ofMegabytes(20));
        factory.setMaxRequestSize(DataSize.ofMegabytes(20));
        return factory.createMultipartConfig();
    }
}
