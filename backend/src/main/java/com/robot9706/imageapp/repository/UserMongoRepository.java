package com.robot9706.imageapp.repository;

import com.robot9706.imageapp.dto.AppUser;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMongoRepository extends MongoRepository<AppUser, Long> {
    AppUser findApplicationUserByUsername(String userName);

    AppUser findApplicationUserById(ObjectId id);

    @Query("{ roles: 'USER' }")
    List<AppUser> findUsers();
}