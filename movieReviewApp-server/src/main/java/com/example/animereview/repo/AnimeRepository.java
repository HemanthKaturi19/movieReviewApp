package com.example.animereview.repo;

import com.example.animereview.model.Anime;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

@Repository
public interface AnimeRepository extends MongoRepository<Anime,String> {
    @Query("{'name': {$regex: ?0, $options: 'i'}}")
    List<Anime> findByNameContainingIgnoreCase(String name);
}
