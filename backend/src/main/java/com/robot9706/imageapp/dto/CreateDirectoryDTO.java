package com.robot9706.imageapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateDirectoryDTO {
    private String parentId;

    private String name;
}
