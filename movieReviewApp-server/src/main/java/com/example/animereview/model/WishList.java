package com.example.animereview.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "WishList")
public class WishList {
    @Id
    private String id;
    private Anime anime;

    public Anime getAnime() {
        return anime;
    }

    public void setAnime(Anime anime) {
        this.anime = anime;
    }
    public WishList(String id,Anime anime){
        this.id=id;
        this.anime=anime;
    }
}
