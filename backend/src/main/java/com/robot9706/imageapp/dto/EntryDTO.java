package com.robot9706.imageapp.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.util.List;

@Entity
@Document(collection = "Content")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EntryDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId id;

    private String name;
    private String extension;
    private boolean isDirectory;

    @JsonIgnore
    private ObjectId contentId;

    @JsonIgnore
    private ObjectId parentId;
}
