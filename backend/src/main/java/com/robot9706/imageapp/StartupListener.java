package com.robot9706.imageapp;

import com.robot9706.imageapp.dto.AppUser;
import com.robot9706.imageapp.dto.EntryDTO;
import com.robot9706.imageapp.repository.EntryMongoRepository;
import com.robot9706.imageapp.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.InputStream;
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

    @Autowired
    private GridFsTemplate gridFs;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        // Admin user
        if (userService.findUserByUserName("root") == null) {
            AppUser rootUser = new AppUser();
            rootUser.setUsername("root");
            rootUser.setPassword("root");
            rootUser.setRoles(Arrays.asList(new String[]{ "ADMIN" }));
            userService.saveNewUser(rootUser);
        }

        // User user
        if (userService.findUserByUserName("user") == null) {
            AppUser userUser = new AppUser();
            userUser.setUsername("user");
            userUser.setPassword("user");
            userUser.setRoles(UserService.getDefaultUserRoles());
            userService.saveNewUser(userUser);
        }

        // Content
        if (entryRepository.findByName("test_folder") == null) {
            ObjectId contentId = null;
            try (InputStream placeholderImage = new ClassPathResource("images/placeholder.png").getInputStream()) {
                contentId = gridFs.store(placeholderImage, "placeholder.png", "image/png");
            } catch (Exception ex) {
                ex.printStackTrace();
            }

            // test_folder
            {
                ObjectId folder = createContentEntry("test_folder", null, true, null, null);
                createContentEntry("img.png", "png", false, folder, contentId);
                createContentEntry("img.jpg", "jpg", false, folder, contentId);
                createContentEntry("img.bmp", "bmp", false, folder, contentId);
                createContentEntry("img.webp", "webp", false, folder, contentId);

                // only_png
                {
                    ObjectId onlyFolder = createContentEntry("only_png", null, true, folder, null);
                    createContentEntry("img1.png", "png", false, onlyFolder, contentId);
                    createContentEntry("img2.png", "png", false, onlyFolder, contentId);
                    createContentEntry("img3.png", "png", false, onlyFolder, contentId);
                    createContentEntry("img4.png", "png", false, onlyFolder, contentId);
                }

                // only_jpg
                {
                    ObjectId onlyFolder = createContentEntry("only_jpg", null, true, folder, null);
                    createContentEntry("img1.jpg", "jpg", false, onlyFolder, contentId);
                    createContentEntry("img2.jpg", "jpg", false, onlyFolder, contentId);
                    createContentEntry("img3.jpg", "jpg", false, onlyFolder, contentId);
                    createContentEntry("img4.jpg", "jpg", false, onlyFolder, contentId);
                }

                // only_bmp
                {
                    ObjectId onlyFolder = createContentEntry("only_bmp", null, true, folder, null);
                    createContentEntry("img1.bmp", "bmp", false, onlyFolder, contentId);
                    createContentEntry("img2.bmp", "bmp", false, onlyFolder, contentId);
                    createContentEntry("img3.bmp", "bmp", false, onlyFolder, contentId);
                    createContentEntry("img4.bmp", "bmp", false, onlyFolder, contentId);
                }

                // only_webp
                {
                    ObjectId onlyFolder = createContentEntry("only_webp", null, true, folder, null);
                    createContentEntry("img1.webp", "webp", false, onlyFolder, contentId);
                    createContentEntry("img2.webp", "webp", false, onlyFolder, contentId);
                    createContentEntry("img3.webp", "webp", false, onlyFolder, contentId);
                    createContentEntry("img4.webp", "webp", false, onlyFolder, contentId);
                }
            }

            // memes
            {
                ObjectId folder = createContentEntry("memes", null, true, null, null);
                createContentEntry("meme.png", "png", false, folder, contentId);
                createContentEntry("meme.jpg", "jpg", false, folder, contentId);
                createContentEntry("meme.bmp", "bmp", false, folder, contentId);
                createContentEntry("meme.webp", "webp", false, folder, contentId);
            }
        }
    }

    private ObjectId createContentEntry(String name, String ext, boolean isDirectory, ObjectId parent, ObjectId contentId) {
        EntryDTO entry = new EntryDTO();
        entry.setName(name);
        entry.setDirectory(isDirectory);
        entry.setParentId(parent);
        entry.setContentId(contentId);
        entry.setExtension(ext);

        entryRepository.save(entry);

        return entry.getId();
    }
}
