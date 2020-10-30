package com.robot9706.imageapp;

import com.robot9706.imageapp.dto.AppUser;
import com.robot9706.imageapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class StartupListener implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private UserService userService;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        // Admin user
        if (userService.findUserByUserName("root") == null) {
            AppUser rootUser = new AppUser();
            rootUser.setUsername("root");
            rootUser.setPassword("root");
            rootUser.setRoles(Arrays.asList(new String[]{ "ADMIN", "USER" }));
            userService.saveNewUser(rootUser);
        }

        // User user
        if (userService.findUserByUserName("user") == null) {
            AppUser userUser = new AppUser();
            userUser.setUsername("user");
            userUser.setPassword("user");
            userUser.setRoles(Arrays.asList(new String[]{ "USER" }));
            userService.saveNewUser(userUser);
        }
    }
}
