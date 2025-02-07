import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegBookmark,FaCheck,FaStar} from "react-icons/fa";
import { useLocation } from "react-router-dom";

const SingleAnime = () => {
  const location=useLocation();
  let id="";
  if(typeof location.state==="object"){
     id+=location.state.id;
  }
  else{
    id=location.state ||"";
  }
  const [anime, setAnime] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const handleWatchList = async (id) => {
    try {
      const check = await axios.get(`http://localhost:8080/api/watchlist/${id}`);
      if (check.status === 200 && check.data !== null) {
        // Anime exists in the watchlist, delete it
        await axios.delete(`http://localhost:8080/api/watchlist/${id}`);
  
      } else {
        // Anime not in the watchlist, add it
        await axios.post(`http://localhost:8080/api/watchlist/${id}`);
      }
    } catch (error) {
      console.error("Error while toggling watchlist:", error);
    } finally {
    }
  };
  const handleAddReview = async () => {
    if (newReview.trim() === "") return;

    try {
      const res = await axios.post(`http://localhost:8080/api/anime/${id}/reviews`, {
        review: newReview,
      });
       setNewReview(""); // Clear the input field
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  useEffect(() => {
    const getAnime = async () => {
      try {
        // Fetch anime details
        const res = await axios.get(`http://localhost:8080/api/anime/${id}`);
        setAnime(res.data);

        // Fetch anime image
        const img = await axios.get(`http://localhost:8080/api/anime/image/${id}`, {
          responseType: "blob",
        });
        const url = URL.createObjectURL(img.data);
        setImgUrl(url);
        // Fetch reviews for the anime
        setReviews(res.data.reviews);
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };

    getAnime();

    // Cleanup blob URL on unmount
    return () => {
      if (imgUrl) {
        URL.revokeObjectURL(imgUrl);
      }
    };
  }, [handleWatchList,handleAddReview]);
  if (!anime) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
       <p className="mt-5 text-2xl font-semibold text-white animate-pulse">
         <span className="animate-bounce">🍜</span>  Loading your anime world...
        </p>      </div>
    );
  };
  return (
    <div className="inset-0  flex justify-center items-center">
      <div
        className=" text-white rounded-lg shadow-lg w-full h-full p-6 relative animate-slide-down pt-16"
      >
        {/* Anime Details */}
        <div className="flex flex-col md:flex-row">
          {/* Anime Image */}
          <div className="p-4 flex-shrink-0">
            <img
              src={imgUrl}
              alt={anime.name}
              className="rounded-lg w-full object-cover h-96"
            />
          </div>

          {/* Anime Info */}
          <div className="mt-6 md:mt-0 md:ml-6 flex-1">
            <h2 className="text-3xl font-bold text-pink-500 mb-4">{anime.name}</h2>
            <p className="text-white mb-4">{anime.description}</p>
             <div>
              <div className="flex items-center justify-start">
              <FaStar className="text-yellow-400" />
              <p className="ml-1">{anime.review}</p>
              </div>
              <p className="font-bold text-lg my-4">Genre :- <span className="font-normal text-[15px]">{anime.genre}</span></p>
             </div>
            {/* Cast */}
            <h3 className="text-xl font-semibold text-white mb-2">Cast</h3>
            <ul className="list-disc list-inside space-y-2">
              {anime.cast.map((member, index) => (
                <li key={index} className="text-white">
                  {member}
                </li>
              ))}
            </ul>
          </div>
        </div>
          {/* watchList button */}
          <div className="flex justify-end lg:mr-16">
            { anime.watchList.toString()==="false" ? ( <button onClick={()=>handleWatchList(anime.id)} className=" w-36 flex items-center justify-center mt-2 bg-red-950 px-4 py-1 text-white rounded-lg hover:bg-red-900 font-bold">
                   <FaRegBookmark className="text-white"/>
                   <p className="ml-2">WatchList</p>
                 </button>):( <button onClick={()=>handleWatchList(anime.id)} className=" w-36 flex items-center justify-center mt-2 bg-red-800 px-4 py-1 text-white rounded-lg hover:bg-red-900 font-bold">
                   <FaCheck className="text-white"/>
                   <p className="ml-2">Added</p>
               </button>)
               }
          </div>
        {/* Reviews Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-2">Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="p-4 bg-red-900 rounded-lg w-fit">
                <p className="text-white">{review}</p>
              </div>
            ))}
          </div>

          {/* Add Review */}
          <div className="mt-4">
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write a review..."
              className="w-full p-4 bg-red-900 text-white rounded-md"
              rows="3"
            />
            <button
              onClick={handleAddReview}
              className="mt-2 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md"
            >
              Submit Review
            </button>
            {/* Go Back Button */}
          </div>
        </div>
        <div className="absolute top-2 right-4">
          <button
            onClick={() => window.history.back()}
            className="bg-red-950 hover:bg-red-800 text-white py-2 px-4 rounded-md font-bold"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleAnime;
