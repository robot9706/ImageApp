package com.robot9706.imageapp.controller;

import com.mongodb.client.gridfs.model.GridFSFile;
import com.robot9706.imageapp.ImageappApplication;
import com.robot9706.imageapp.SecurityHelper;
import com.robot9706.imageapp.dto.AppUser;
import com.robot9706.imageapp.dto.EntryDTO;
import com.robot9706.imageapp.dto.UserDTO;
import com.robot9706.imageapp.repository.EntryMongoRepository;
import com.robot9706.imageapp.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController()
@RequestMapping("/content")
public class ContentController extends BaseController {

    @Autowired
    private EntryMongoRepository entryRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EntryMongoRepository entryMongoRepository;

    @Autowired
    private GridFsTemplate gridFs;

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @GetMapping("byParentId")
    public List<EntryDTO> getByParentId(@RequestParam(required = false) String pid) {
        ObjectId parentMongoId = null;
        if (pid != null && pid.length() != 0) {
            parentMongoId = new ObjectId(pid);
        }

        List<String> allowedExtensions = null;
        if (SecurityHelper.hasRole("ADMIN")) {
            allowedExtensions = Arrays.asList(ImageappApplication.ALLOWED_EXTENSIONS);
        } else {
            SecurityContext context = SecurityContextHolder.getContext();
            AppUser user = userService.findUserById((String)context.getAuthentication().getPrincipal());
            List<String> roles = user.getRoles();

            allowedExtensions = new ArrayList<>();
            for (String ext : ImageappApplication.ALLOWED_EXTENSIONS) {
                if (roles.contains(SecurityHelper.extensionToRole(ext))) {
                    allowedExtensions.add(ext);
                }
            }
        }

        return entryRepository.filter(allowedExtensions, parentMongoId);
    }

    @GetMapping("data")
    public ResponseEntity<InputStreamResource> getData(@RequestParam() String id, @RequestParam(name = "t") String token) {
        try {
            if (token == null) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }

            String tokenSubject = SecurityHelper.verifyToken(token);
            AppUser user = userService.findUserById(tokenSubject);
            if (user == null) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }

            EntryDTO entry = entryMongoRepository.findById(id);
            if (entry == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            if (!SecurityHelper.canAccess(user, entry)) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }

            GridFSFile file = gridFs.findOne(new Query(Criteria.where("_id").is(entry.getContentId())));
            GridFsResource resource = gridFs.getResource(file);

            return ResponseEntity
                    .ok()
                    .contentType(MediaType.parseMediaType(resource.getContentType()))
                    .contentLength(file.getLength())
                    .body(resource);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
