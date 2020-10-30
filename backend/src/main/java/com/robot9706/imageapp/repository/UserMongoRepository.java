package com.robot9706.imageapp.repository;

import com.robot9706.imageapp.dto.AppUser;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMongoRepository extends MongoRepository<AppUser, Long> {
    AppUser findApplicationUserByUsername(String userName);

    AppUser findApplicationUserById(ObjectId id);
}