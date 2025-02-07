package com.example.animereview.repo;

import com.example.animereview.model.WishList;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface WishListRepository extends MongoRepository<WishList,String>{
}
