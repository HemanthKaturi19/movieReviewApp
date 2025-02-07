package com.example.animereview.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "anime")
public class Anime {

    @Id
    private String id;
    private String name;
    private float review;
    private String description;
    private int episodes;
    private String genre;
    private List<String> cast;
    private List<String> reviews;
    private String imgName;
    private String imgType;
    private byte[] imgData;
    private boolean watchList;
    // Default constructor



    // Parameterized constructor
    public Anime(String id, String name, float review, String description, int episodes, String genre, List<String> cast, List<String> reviews) {
        this.id = id;
        this.name = name;
        this.review = review;
        this.description = description;
        this.episodes = episodes;
        this.genre = genre;
        this.cast = cast;
        this.reviews = reviews;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getReview() {
        return review;
    }

    public void setReview(float review) {
        this.review = review;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getEpisodes() {
        return episodes;
    }

    public void setEpisodes(int episodes) {
        this.episodes = episodes;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public List<String> getCast() {
        return cast;
    }

    public void setCast(List<String> cast) {
        this.cast = cast;
    }

    public List<String> getReviews() {
        return reviews;
    }

    public void setReviews(List<String> reviews) {
        this.reviews = reviews;
    }

    public String getImgType() {
        return imgType;
    }

    public void setImgType(String imgType) {
        this.imgType = imgType;
    }

    public byte[] getImgData() {
        return imgData;
    }

    public void setImgData(byte[] imgData) {
        this.imgData = imgData;
    }

    public String getImgName() {
        return imgName;
    }

    public void setImgName(String imgName) {
        this.imgName = imgName;
    }

    public boolean isWatchList() {
        return watchList;
    }

    public void setWatchList(boolean watchList) {
        this.watchList= watchList;
    }
}