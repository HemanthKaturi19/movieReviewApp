package com.example.animereview.controller;
import com.example.animereview.model.Anime;
import com.example.animereview.model.WishList;
import com.example.animereview.service.AnimeService;
import org.apache.tomcat.util.http.parser.HttpParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RequestMapping("/api")
@RestController
@CrossOrigin(origins="http://localhost:5173")
public class AnimeController {
    @Autowired
    AnimeService service;

    @GetMapping("/anime")
    public ResponseEntity<List<Anime>> getAnime() {
        boolean check = service.getAnime().isEmpty();
        if (!check) {
            return new ResponseEntity<>(service.getAnime(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/anime/{id}")
    public ResponseEntity<Anime> getAnimeById(@PathVariable String id) {
        Anime anime = service.getAnimeById(id);
        if (anime != null) {
            return new ResponseEntity<>(anime, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @GetMapping("/anime/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable String id) {
        Anime anime = getAnimeById(id).getBody();
        byte[] imageFile = anime.getImgData();
        return ResponseEntity.ok().contentType(MediaType.valueOf(anime.getImgType())).body(imageFile);
    }

    @PostMapping("/anime")
    public ResponseEntity<String> createAnime(@RequestBody Anime anime) {
        Anime check = getAnimeById(anime.getId()).getBody();
        if (check == null) {
            service.createAnime(anime);
            return new ResponseEntity<>("record created", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("anime already exists", HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @PutMapping("/anime/{id}")
    public ResponseEntity<String> updateAnime(@RequestBody Anime anime, @PathVariable String id) {
        Anime existedAnime = getAnimeById(id).getBody();
        if (existedAnime != null) {
            existedAnime.setCast(anime.getCast() != null && !anime.getCast().isEmpty() ? anime.getCast() : existedAnime.getCast());
            existedAnime.setDescription(anime.getDescription() != null ? anime.getDescription() : existedAnime.getDescription());
            existedAnime.setEpisodes(anime.getEpisodes() != 0 ? anime.getEpisodes() : existedAnime.getEpisodes());
            existedAnime.setGenre(anime.getGenre() != null && !anime.getGenre().isEmpty() ? anime.getGenre() : existedAnime.getGenre());
            existedAnime.setName(anime.getName() != null && !anime.getName().isEmpty() ? anime.getName() : existedAnime.getName());
            existedAnime.setReview(anime.getReview() != 0.00f ? anime.getReview() : existedAnime.getReview());
            existedAnime.setReviews(anime.getReviews() != null ? anime.getReviews() : existedAnime.getReviews());
            existedAnime.setImgType(anime.getImgType() != null && !anime.getName().isEmpty() ? anime.getImgType() : existedAnime.getImgType());
            existedAnime.setImgName(anime.getImgName() != null && !anime.getName().isEmpty() ? anime.getImgName() : existedAnime.getImgName());
            existedAnime.setImgData(anime.getImgData() != null ? anime.getImgData() : existedAnime.getImgData());
            service.updateAnime(existedAnime);
            return new ResponseEntity<>("anime updated", HttpStatus.OK);
        }
        return new ResponseEntity<>("anime didn't exists", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/anime/{id}")
    public ResponseEntity<?> deleteAnime(@PathVariable String id) {
        Anime anime = getAnimeById(id).getBody();
        service.deleteAnime(id);
        if (anime == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/watchlist")
    public ResponseEntity<List<WishList>> getWIshList() {
        boolean check = service.getWishList().isEmpty();
        if (!check) {
            return new ResponseEntity<>(service.getWishList(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/watchlist/{id}")
    public ResponseEntity<Optional<WishList>> getWishListById(@PathVariable String id){
        Optional<WishList> wishlist=service.getWishListById(id);
        if(wishlist!=null){
            return new ResponseEntity<>(wishlist,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/watchlist/{id}")
    public ResponseEntity<String> addToWishList(@PathVariable String id) {
        Anime anime = getAnimeById(id).getBody();
        if (anime == null || anime.isWatchList()) {
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
        }
        anime.setWatchList(true);
        service.updateAnime(anime);
        service.addToWishList(new WishList(anime.getId(),anime));
        return new ResponseEntity<>("added to wishlist successfully", HttpStatus.OK);

    }

   @DeleteMapping("watchlist/{id}")
   public ResponseEntity<String> deleteFromWatchList(@PathVariable String id){
        Optional<WishList> watchList=getWishListById(id).getBody();
        Anime anime=getAnimeById(id).getBody();
        anime.setWatchList(false);
        service.updateAnime(anime);
        if(watchList!=null){
            service.deleteFromWatchList(id);
            return new ResponseEntity<>("deleted successfully",HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @PostMapping("anime/{id}/reviews")
    public ResponseEntity<String> addReview(@PathVariable String id,@RequestBody String review){
        Anime anime=getAnimeById(id).getBody();
        if(anime!=null){
            String newReview=review.substring(11,review.length()-2);
            List<String> reviews=anime.getReviews();
            reviews.add(newReview  );
            anime.setReviews(reviews);
            service.updateAnime(anime);
            return new ResponseEntity<>("review added",HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }
    @GetMapping("anime/allNames")
    public ResponseEntity<List<String>> getAllNames(){
        List<String> names=service.getAllNames();
        if(names!=null){
            return new ResponseEntity<>(names,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
   @GetMapping("/search")
   public ResponseEntity<List<Anime>> getSearchAnime(@RequestParam(required = false) String searchQuery){
        List<Anime> anime=service.getSearchAnime(searchQuery);
        if(anime!=null){
            System.out.print(anime.get(0).getReview());
            return new ResponseEntity<>(anime, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
