package com.robot9706.imageapp;

import com.robot9706.imageapp.dto.AppUser;
import com.robot9706.imageapp.dto.EntryDTO;
import com.robot9706.imageapp.repository.EntryMongoRepository;
import com.robot9706.imageapp.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Component
public class StartupListener implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private UserService userService;

    @Autowired
    private EntryMongoRepository entryRepository;

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
            List<String> extRoles = new ArrayList<>();
            for (String ext : ImageappApplication.ALLOWED_EXTENSIONS) {
                extRoles.add(SecurityHelper.extensionToRole(ext));
            }

            extRoles.add("USER");

            AppUser userUser = new AppUser();
            userUser.setUsername("user");
            userUser.setPassword("user");
            userUser.setRoles(extRoles);
            userService.saveNewUser(userUser);
        }

        // Content
        if (entryRepository.findByName(".") == null) {
            ObjectId root = createContentEntry(".", null,true, null);

            {
                ObjectId folder = createContentEntry("test_folder", null, true, root);
                createContentEntry("img.png", "png", false, folder);
                createContentEntry("img.jpg", "jpg", false, folder);
                createContentEntry("img.bmp", "bmp", false, folder);
                createContentEntry("img.webp", "webp", false, folder);
            }

            {
                ObjectId folder = createContentEntry("memes", null, true, root);
                createContentEntry("meme.png", "png", false, folder);
                createContentEntry("meme.jpg", "jpg", false, folder);
                createContentEntry("meme.bmp", "bmp", false, folder);
                createContentEntry("meme.webp", "webp", false, folder);
            }
        }
    }

    private ObjectId createContentEntry(String name, String ext, boolean isDirectory, ObjectId parent) {
        EntryDTO entry = new EntryDTO();
        entry.setName(name);
        entry.setDirectory(isDirectory);
        entry.setParentId(parent);
        entry.setContentId(null);
        entry.setExtension(ext);

        entryRepository.save(entry);

        return entry.getId();
    }
}
