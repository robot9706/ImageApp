package com.robot9706.imageapp.controller;

import com.robot9706.imageapp.SecurityHelper;
import com.robot9706.imageapp.dto.AppUser;
import com.robot9706.imageapp.dto.UserDTO;
import com.robot9706.imageapp.dto.UserInfoDTO;
import com.robot9706.imageapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
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

        AppUser newUser = new AppUser(userDTO);
        newUser.setRoles(UserService.getDefaultUserRoles());
        userService.saveNewUser(newUser);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @GetMapping("/userInfo")
    public UserInfoDTO getUserInfo() {
        SecurityContext context = SecurityContextHolder.getContext();
        AppUser user = userService.findUserById((String)context.getAuthentication().getPrincipal());

        UserInfoDTO dto = new UserInfoDTO();
        dto.setName(user.getUsername());

        dto.setAdmin(SecurityHelper.hasRole("ADMIN"));

        return dto;
    }
}

