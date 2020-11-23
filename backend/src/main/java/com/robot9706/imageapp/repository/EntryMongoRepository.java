package com.robot9706.imageapp.repository;

import com.robot9706.imageapp.dto.EntryDTO;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface EntryMongoRepository extends MongoRepository<EntryDTO, Long> {
    @Query("{ $or: [ {isDirectory: false, extension: { $in: ?0 } }, { isDirectory: true } ], parentId: ?1 }")
    List<EntryDTO> filter(List<String> allowedFileExtensions, ObjectId parentId);

    EntryDTO findByName(String name);

    EntryDTO findByNameAndParentId(String name, ObjectId parentId);

    List<EntryDTO> findByParentId(ObjectId parentId);

    EntryDTO findById(String id);

    EntryDTO findById(ObjectId id);
}
