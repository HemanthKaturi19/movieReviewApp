import React, { useState } from 'react'
import { FaSearch,FaBars } from "react-icons/fa";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
const Navbar = () => {
  const [watchListCount, setWatchListCount] = useState(1);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchRes,setSearchRes]=useState([]);
  const [searchparams,setSearchParams]=useSearchParams();
  const handleNavigate = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/search?searchQuery=${searchTerm}`);
      if (res.data && res.data.length > 0) {
        if(res.data.length===1){
          setSearchParams({search:searchTerm});
          navigate("/SingleAnime", { state: { id: res.data[0].id } });
        }
      } else {
        console.log("No anime exists");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleInputChange = async(e) => {
    const query=e.target.value;
    if(query!=""){
      const res = await axios.get(`http://localhost:8080/api/search?searchQuery=${query}`);
      if(res.data.length>0){
        setSearchRes(res.data);
      }
    }
    else{
      setSearchRes([]);
    }
    setSearchTerm(e.target.value);
  };

  return (
    <>
    <div className="px-4 py-4 lg:grid grid-cols-4 items-center border-b-2 border-[#ac380c]">
      {/* Logo Section */}
      <div className="h-fit ml-4 text-center lg:text-left">
        <h1 className="text-3xl font-bold text-white">AA</h1>
        <p className="text-white font-medium text-sm">Anime Adda</p>
      </div>
         {/* Menu and Search Section */}
      <div className="col-span-2  mt-6 lg:mt-0">
      <div className=" relative col-span-2 flex items-center mt-6 lg:mt-0">
        {/* Menu Button */}
        <button className="flex items-center gap-2 px-4 py-2 bg-[#ac380c] text-white rounded-md hover:bg-[#922f0b] transition w-24 overflow-hidden">
          <FaBars className="w-5 h-5" />
          <span className='hidden lg:block'>Menu</span>
        </button>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-lg ml-4 bg-white rounded-md shadow-sm">
          <input
            type="text"
            className=" flex-grow outline-none px-3 py-2 text-gray-800 rounded-l-md h-10"
            placeholder="Search..."
            onChange={handleInputChange}
          />
          <button onClick={handleNavigate} className="text-white bg-[#ac380c] h-10 w-14 rounded-r-md flex items-center justify-center hover:bg-[#922f0b]">
            <FaSearch className="w-5 h-5" />
          </button>
        </div>
      </div>
      </div>
  
      {/* Watchlist & Sign In Section */}
      <div className='text-right mt-4 lg:mt-0 mr-0 lg:mr-12 flex items-center justify-between'>
        <Link to="/watchlist" className='text-white text-lg font-bold bg-red-950 hover:bg-red-800 rounded-lg flex place-items-center justify-between px-2 py-1'>
          <BsFillBookmarkPlusFill />
          <p className='ml-1'>WatchList</p>
          {watchListCount !== 0 && (
            <p className='text-[15px] rounded-xl text-white bg-orange-600 ml-2 flex items-center justify-center mt-0.5 font-semibold h-4 w-6'>
              {watchListCount}
            </p>
          )}
        </Link>
        <button className='w-16 '>
          <p className='text-white border-b-2 text-lg hover:text-gray-400 font-bold'>Sign in</p>
        </button>
      </div>
    </div>
    <div className='fixed top-20 right-[633px] z-50'>
      <ul>
        {searchRes.length>0 && searchRes.map((anime)=>(
          <li key={anime.id}>
            <button onClick={()=>setSearchTerm(anime.name)} className='w-96 h-8 p-2 bg-[#ac380c] flex items-center my-2 text-white font-normal text-lg rounded-lg'>
             <p>{anime.name}</p>
             <p className='text-sm mt-2 ml-6 py-2 text-yellow-600'>{anime.genre}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
    
  );
};

export default Navbar;