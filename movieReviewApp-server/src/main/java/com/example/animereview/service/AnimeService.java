package com.example.animereview.service;
import com.example.animereview.model.Anime;
import com.example.animereview.model.WishList;
import com.example.animereview.repo.AnimeRepository;
import com.example.animereview.repo.WishListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Component
@Service
public class AnimeService {
    @Autowired
    AnimeRepository repo;
   @Autowired
   WishListRepository wishRepo;
    public List<Anime> getAnime() {
        return repo.findAll();
    }

    public Anime createAnime(Anime anime) {

        return repo.save(anime);
    }

    public boolean updateAnime(Anime anime) {
        repo.save(anime);
        return true;
    }

    public boolean deleteAnime(String id) {
         repo.deleteById(id);
         return true;
    }

    public Anime getAnimeById(String id) {
        return repo.findById(id).orElse(null);
    }

    public List<WishList> getWishList() {
        return wishRepo.findAll();
    }

public void addToWishList(WishList anime) {
        wishRepo.save(anime);
    }

    public void deleteFromWatchList(String id) {
        wishRepo.deleteById(id);
    }

    public Optional<WishList> getWishListById(String id) {
        return wishRepo.findById(id);
    }

    public List<String> getAllNames() {
       return repo.findAll().stream().map(Anime::getName).toList();
    }

    public List<Anime> getSearchAnime(String searchQuery) {

        return repo.findByNameContainingIgnoreCase(searchQuery);
    }
}
