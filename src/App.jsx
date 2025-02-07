import React, { useState, useEffect } from "react";
import CreatingAnime from "./components/CreatingAnime";
import UpdateAnime from "./components/UpdateAnime";
import SingleAnime from "./components/SingleAnime";
import Watchlist from "./components/Watchlist";
import Home from "./components/Home";
import Footer from "./components/Footer"
import { BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div>
      <div className="p-2"
      style={{
        background: "linear-gradient(90deg, rgba(31,5,4,1) 0%, rgba(25,4,2,0.9977240896358543) 46%, rgba(40,3,2,0.9977240896358543) 100%)",
      }}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/singleanime" element={<SingleAnime />} />
        </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
