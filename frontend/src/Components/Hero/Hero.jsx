import React, { useEffect, useState } from 'react';
import hero from "../../assets/hero.png";
import "./Hero.css";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Hero = ({response}) => {
  const [token, setToken] = useState(false);
 

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setToken(true);
    }
  }, []);

 

  return (
    
    <>
      <div className='hero'>
        {/* <Link
          to={token ? "/" : "/signup"}
          onClick={token ? tokenHandler : undefined}
        > */}
          <img src={hero} alt="Hero Image" onClick={()=>{
            {response("hello")}
          }}/>
        {/* </Link> */}
      </div>

      <h1 className='header'>Explore Rooms</h1>
      
    </>
   
    
  );
};

export default Hero;
