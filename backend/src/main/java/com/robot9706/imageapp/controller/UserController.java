package com.robot9706.imageapp.controller;

import com.robot9706.imageapp.dto.AppUser;
import com.robot9706.imageapp.dto.UserDTO;
import com.robot9706.imageapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity signUpNewUser(@RequestBody UserDTO userDTO) {
        if (userService.findUserByUserName(userDTO.getUsername()) != null) {
            return new ResponseEntity("User already exists!", HttpStatus.FORBIDDEN);
        }

        userService.saveNewUser(new AppUser(userDTO));

        return new ResponseEntity(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_LOL')")
    @GetMapping("/test")
    public String test() {
        return "A";
    }
}

