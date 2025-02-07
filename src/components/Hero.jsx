import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar,FaRegBookmark,FaCheck } from "react-icons/fa";
import img from '../assets/homepageImg.webp'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

function Hero() {
  const [animeData, setAnimeData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  // Fetch anime data
  useEffect(() => {
    const getAnime = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/anime");
        const data = res.data;
        setAnimeData(data.slice(1));
      // Fetch images for each anime
        data.forEach((anime) => fetchImage(anime.id));
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };
    getAnime();
  }, []);

  // Fetch image for a given anime ID
  const fetchImage = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/anime/image/${id}`, {
        responseType: "blob",
      });
      const imgUrl = URL.createObjectURL(res.data); // Create a URL for the blob
      setImageUrls((prev) => ({ ...prev, [id]: imgUrl }));// Store the URL mapped to the anime ID
    } catch (error) {
      console.error(`Error fetching image for anime ID ${id}:`, error);
    }
  };

  // Clean up created object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      Object.values(imageUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  const handleWatchList = async (id) => {
    try {
      const check = await axios.get(`http://localhost:8080/api/watchlist/${id}`);
      if (check.status === 200 && check.data !== null) {
        // Anime exists in the watchlist, delete it
        await axios.delete(`http://localhost:8080/api/watchlist/${id}`);
        setAnimeData((prevData) =>
          prevData.map((anime) =>
            anime.id === id ? { ...anime, watchList: false } : anime
          )
        );
      } else {
        // Anime not in the watchlist, add it
        await axios.post(`http://localhost:8080/api/watchlist/${id}`);
        setAnimeData((prevData) =>
          prevData.map((anime) =>
            anime.id === id ? { ...anime, watchList: true } : anime
          )
        );
      }
    } catch (error) {
      console.error("Error while toggling watchlist:", error);
    } finally {
    }
  };
   return (
    <div className="h-full w-full py-4 px-0 lg:px-4">
       <div
      className="relative w-full h-96 bg-cover bg-center overflow-hidden rounded-sm"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      {/* Optional overlay for better text contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Centered text with border */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-8xl font-bold p-4 border-4 border-white">
          Anime
        </h1>
      </div>
    </div>
     <div className="grid grid-cols-2 lg:grid-cols-7 gap-4 overflow-hidden mt-4">
    {animeData.length>0 ? animeData.map((anime) => (
      <div
       key={anime.id}
      className="h-72 w-44 p-2 bg-[#ac380c] rounded-md opacity-80 flex flex-col items-center justify-between"
    >
      <div className="h-36 w-36 bg-gray-300 rounded-md flex items-center justify-center overflow-hidden">
        {imageUrls[anime.id] ? (
          <img
            src={imageUrls[anime.id]}
            alt={`${anime.name} Poster`}
            className="h-full w-full object-cover"
          />
        ) : (
          <p className="text-sm text-white">No Image</p>
        )}
      </div>
      <Link to="/singleanime" state={anime.id}>
      <div className="w-full px-2">
        <h1  className="text-white mt-2 text-center font-medium truncate hover:text-yellow-400">
          {anime.name}
        </h1>
        <div className="text-white flex items-center justify-center mt-2">
          <FaStar className="text-yellow-400" />
          <p className="ml-1">{anime.review}</p>
        </div>
        <p className="text-white mt-1 text-center">Episodes: {anime.episodes}</p>
      </div>
      </Link>
      {
      anime.watchList.toString()==="false" ? ( <button onClick={()=>handleWatchList(anime.id)} className=" w-36 flex items-center justify-center mt-2 bg-red-950 px-4 py-1 text-white rounded-lg hover:bg-red-900">
        <FaRegBookmark className="text-white"/>
        <p className="ml-2">WatchList</p>
      </button>):( <button onClick={()=>handleWatchList(anime.id)} className=" w-36 flex items-center justify-center mt-2 bg-red-800 px-4 py-1 text-white rounded-lg hover:bg-red-900">
        <FaCheck className="text-white"/>
        <p className="ml-2">Added</p>
    </button>)
    }
    </div>
    
  )):
      
      <div className="h-96 w-screen flex items-center justify-center">
        <p className="mt-5 text-2xl font-semibold text-white animate-pulse">
         <span className="animate-bounce">🍜</span>  Loading your anime world...
        </p>
      </div>
}
</div>

    </div>
  );
}

export default Hero;
