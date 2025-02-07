import axios from "axios";
import React, { useEffect, useState } from "react";
import img from "../assets/homepageImg.webp"
import { FaStar } from "react-icons/fa";

const Watchlist = () => {
  const [watchlist,setWatchlist]=useState([]);
  const [imgUrls,setImgUrls]=useState({})
  const removeFromWatchlist=async (id)=>{
    await axios.delete(`http://localhost:8080/api/watchlist/${id}`);
    setWatchlist((prev)=>prev.filter(watch=>watch.anime.id!=id));
   }
   const fetchImage = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/anime/image/${id}`, {
        responseType: "blob",
      });
      return { id, url: URL.createObjectURL(res.data) };
    } catch (error) {
      console.error(`Error fetching image for anime ID ${id}:`, error);
      return { id, url: null };
    }
  };
  useEffect(()=>{
    const getWatchlist=async ()=>{
        const res=await axios.get("http://localhost:8080/api/watchlist");
        if(res!=null){
          const data=res.data.filter(watch=>watch.anime);
          setWatchlist(data);
       const images = await Promise.all(data.map((watch) => fetchImage(watch.anime.id)));
    const imageMap = images.reduce((map, img) => {
      map[img.id] = img.url;
      return map;
    }, {});
    setImgUrls(imageMap);        
  }
    else{
          return;
        }
    }
    getWatchlist();
  },[]);
  return (
    <div className="flex h-screen lg:h-fit"
    style={{
      background: "linear-gradient(90deg, rgba(31,5,4,1) 0%, rgba(25,4,2,0.9977240896358543) 46%, rgba(40,3,2,0.9977240896358543) 100%)",
    }}>
          
          <div className="w-[1900px]">
          <button
            onClick={() => window.history.back()}
            className="bg-red-900 hover:bg-red-800 text-white py-2 px-4 rounded-md font-bold ml-2 mt-2"
          >
            Go Home
          </button>      
      {
        watchlist.length>0 ? (watchlist.map(watch=>(
          <div
          key={watch.anime.id}
          className="bg-[#ac380c] p-4 h-fit mr-4 rounded-md ml-2 my-4">
        <div className="flex">
        <div className="h-32 w-32 bg-gray-300 rounded-md flex items-center justify-center overflow-hidden">
                {imgUrls[watch.anime.id]? (
                  <img
                    src={imgUrls[watch.anime.id]}
                    alt={`${watch.anime.name} Poster`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <p className="text-sm text-white">No Image</p>
                )}
              </div>
              <div className="ml-2 text-white">
                <h1 className="text-lg font-semibold">1.{watch.anime.name}</h1>
                <div className="flex items-center mt-2 ml-2">
                  <div className="text-white flex items-center justify-center">
                      <FaStar className="text-yellow-400" />
                      <p className="ml-1 text-gray-300">{watch.anime.review}</p>
                    </div>
                    <p className="ml-4 text-gray-300">{watch.anime.episodes} ep</p>
                </div>
                <p className="mt-2 text-white font-normal ml-2">{watch.anime.genre}</p>
              </div>
        </div>
        <p className="text-white hidden lg:block font-semibold mt-2">{watch.anime.description}.</p>
        <div className="flex items-center justify-between">
        <p className="text-white font-bold  text-[17pxpx] flex items-center justify-center">Stars <span className="font-semibold text-yellow-400 text-[15px] flex items-center justify-center ml-2 mt-1">{watch.anime.cast.map(actor=>(<p>{actor} </p>))}</span></p>
         <button onClick={()=>removeFromWatchlist(watch.anime.id)} className="p-2 bg-red-950 text-gray-300 hover:bg-red-900 mt-2 rounded-lg font-bold">Remove</button>
        </div>
       </div>
      ))):(<p className="flex items-center justify-center text-2xl text-white h-96">📺No Animes in your Watchlist</p>)
      }
      </div>
       
       <div
             className="relative w-full h-screen bg-cover bg-center overflow-hidden rounded-sm mt-24 hidden lg:block"
             style={{
               backgroundImage: `url(${img})`,
             }}
           >
             {/* Optional overlay for better text contrast */}
             <div className="absolute inset-0 bg-black bg-opacity-40"></div>
       
             {/* Centered text with border */}
             <div className="absolute inset-0 flex items-center justify-center">
               <h1 className="text-white text-8xl font-bold p-4 border-4 border-white">
                 Watchlist
               </h1>
             </div>
           </div>
    </div>
  );
};

export default Watchlist;
