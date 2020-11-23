package com.robot9706.imageapp.controller;

import com.robot9706.imageapp.ImageappApplication;
import com.robot9706.imageapp.SecurityHelper;
import com.robot9706.imageapp.dto.AppUser;
import com.robot9706.imageapp.dto.CreateDirectoryDTO;
import com.robot9706.imageapp.dto.EntryDTO;
import com.robot9706.imageapp.dto.UserManageDTO;
import com.robot9706.imageapp.repository.EntryMongoRepository;
import com.robot9706.imageapp.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Stack;
import java.util.stream.Collectors;

@RestController()
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private EntryMongoRepository entryMongoRepository;

    @Autowired
    private GridFsTemplate gridFs;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/allExtensions")
    public String[] getExtensions() {
        return ImageappApplication.ALLOWED_EXTENSIONS;
    }

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

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/createDirectory")
    public ResponseEntity createDirectory(@RequestBody CreateDirectoryDTO params) {
        EntryDTO newEntry = new EntryDTO();

        if (params.getParentId() != null && params.getParentId().length() > 0) {
            EntryDTO parentEntry = entryMongoRepository.findById(params.getParentId());
            if (parentEntry == null) {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }

            if (entryMongoRepository.findByNameAndParentId(params.getName(), parentEntry.getId()) != null) {
                return new ResponseEntity(HttpStatus.CONFLICT);
            }

            newEntry.setParentId(parentEntry.getId());
        } else {
            newEntry.setParentId(null);
        }

        newEntry.setName(params.getName());
        newEntry.setDirectory(true);
        newEntry.setContentId(null);
        newEntry.setExtension(null);

        entryMongoRepository.save(newEntry);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/createFile")
    public ResponseEntity createFile(@RequestParam() String parentId, @RequestParam() String name, @RequestParam("file") MultipartFile file) {
        EntryDTO newEntry = new EntryDTO();

        if (parentId != null && parentId.length() > 0) {
            EntryDTO parentEntry = entryMongoRepository.findById(parentId);
            if (parentEntry == null) {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }

            if (entryMongoRepository.findByNameAndParentId(name, parentEntry.getId()) != null) {
                return new ResponseEntity(HttpStatus.CONFLICT);
            }

            newEntry.setParentId(parentEntry.getId());
        } else {
            newEntry.setParentId(null);
        }

        String ext = null;
        int dot = file.getOriginalFilename().lastIndexOf(".");
        if (dot < 0) {
            return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
        }

        ext = file.getOriginalFilename().substring(dot + 1, file.getOriginalFilename().length()).toLowerCase();
        if (!Arrays.asList(ImageappApplication.ALLOWED_EXTENSIONS).contains(ext)) {
            return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
        }

        ObjectId contentId = null;
        try (InputStream placeholderImage = file.getInputStream()) {
            contentId = gridFs.store(placeholderImage, file.getOriginalFilename(), "image/" + ext);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        newEntry.setName(name);
        newEntry.setDirectory(false);
        newEntry.setContentId(contentId);
        newEntry.setExtension(ext);

        entryMongoRepository.save(newEntry);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/deleteEntry")
    public ResponseEntity deleteEntry(@RequestParam String entryId) {
        EntryDTO entry = entryMongoRepository.findById(entryId);
        if (entry == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        Stack<EntryDTO> delete = new Stack<EntryDTO>();
        delete.push(entry);

        while (delete.size() > 0) {
            EntryDTO deleteEntry = delete.pop();

            entryMongoRepository.delete(deleteEntry);
            if (deleteEntry.getContentId() != null) {
                gridFs.delete(Query.query(Criteria.where("_id").is(deleteEntry.getContentId())));
            }

            List<EntryDTO> child = entryMongoRepository.findByParentId(deleteEntry.getId());
            if (child != null && child.size() > 0) {
                for (EntryDTO e : child) {
                    delete.push(e);
                }
            }
        }

        return new ResponseEntity(HttpStatus.OK);
    }
}
