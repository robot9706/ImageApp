package com.robot9706.imageapp.controller;

import com.robot9706.imageapp.ImageappApplication;
import com.robot9706.imageapp.SecurityHelper;
import com.robot9706.imageapp.dto.AppUser;
import com.robot9706.imageapp.dto.UserManageDTO;
import com.robot9706.imageapp.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController()
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/allUsers")
    public List<UserManageDTO> getUsers() {
        return userService.getAllUsers().stream().map(UserManageDTO::new).collect(Collectors.toList());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/userModifyExt")
    public ResponseEntity modifyExtensions(@RequestBody UserManageDTO data) {
        AppUser user = userService.findUserById(data.getId());
        if (user == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        List<String> ok = Arrays.asList(ImageappApplication.ALLOWED_EXTENSIONS);
        for (String ext : data.getAllowedExtensions()) {
            if (!ok.contains(ext)) {
                return new ResponseEntity(HttpStatus.NO_CONTENT);
            }
        }

        user.setRoles(SecurityHelper.modifyExtensionRoles(user.getRoles(), data.getAllowedExtensions()));

        userService.updateUser(user);

        return new ResponseEntity(HttpStatus.OK);
    }
}
