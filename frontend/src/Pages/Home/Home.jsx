import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../../../url';
import './Home.css'; // ✅ Make sure to import the CSS
import { Link } from 'react-router-dom';
import Hero from '../../Components/Hero/Hero';
import { IoIosCloseCircleOutline } from "react-icons/io";

const Home = () => {
  const [data, setData] = useState([]);
  const [play, setPLay] = useState(null)
  const [page, setPage] = useState(false)



  useEffect(() => {

    axios.get(`${url}/user/post/all`)
      .then((res) => setData(res.data.data))
      .catch(err => console.log(err));
  }, []);
  const response = (r) => {
    if (r == "hello") {
      setPage(!page)

    }

  }

  return (
    <>
      <Hero response={response} />
      <div className="home-container">

        {data.map((v, i) => (
          <div className="home-card" key={i}>
            <Link to={`/details/${v._id}`} style={{ textDecoration: "none", color: "#444" }}>

              <video
                className="home-video"
                src={`${url}/uploads/${v.video}`}
                muted
                loop

                ref={(el) => data[i].videoRef = el}
                onMouseOver={() => data[i].videoRef && data[i].videoRef.play()}
                onMouseOut={() => data[i].videoRef && data[i].videoRef.pause()}
              />

              <div className="home-content">

                <h2>{v.title}</h2>
                <p>{v.city} - {v.area}</p>
                <p>Type: {v.roomtype}</p>
                <p>Contact: {v.contact}</p>

              </div>
            </Link>
          </div>
        ))}

      </div>
      {page ? <div className="second">
        <div className="box">
        <div className="top">
          <Link to={"/login"}> <button>Login</button></Link>
          <IoIosCloseCircleOutline onClick={() => setPage(!page)} className='icon-close' />
        </div>
        <div className="buttom">
          <h1>Find or Post Rental Rooms with Ease!</h1>
          <p>Welcome to KTM Room Finder — the smart way to find or post rental rooms in Kathmandu! Whether you're searching for a cozy single room, a shared flat, or a family apartment, our platform helps you discover verified listings in your preferred area with clear details, rent info, and videos. But that's not all — if you have a room available for rent, you can easily post your own listing for thousands of seekers to see. No middlemen, no confusion — just a direct, simple, and reliable solution for all your rental needs. Join our growing community of renters and owners, and make your housing journey smooth, fast, and secure. Your next room or tenant is just a click away — let’s get started today!</p>
        </div>
        </div>

      </div> : ""}

    </>

  );
};

export default Home;
