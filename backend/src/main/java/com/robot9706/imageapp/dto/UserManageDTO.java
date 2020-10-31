package com.robot9706.imageapp.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.robot9706.imageapp.SecurityHelper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserManageDTO {
    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId id;

    private String name;
    private List<String> allowedExtensions;

    public UserManageDTO(AppUser appUser) {
        id = appUser.getId();
        name = appUser.getUsername();
        allowedExtensions = appUser.getRoles().stream().map(SecurityHelper::roleToExtension).filter(value -> value != null).collect(Collectors.toList());
    }
}
