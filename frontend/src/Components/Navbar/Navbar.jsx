import React, { useEffect, useState } from 'react'
import rf from "../../assets/rf.png"
import { GoSearch } from "react-icons/go";
import { IoMdLogIn } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css"
import { Link } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import Search from '../Search/Search';
import { toast } from 'react-toastify';
const Navbar = () => {
  const [search, setSearch] = useState("");
  const [checkToken, setCheckToken] = useState(false);
  const[userId,setUserId] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const id = userInfo?._id;

    setUserId(id)

    if (token) {
      setCheckToken(!checkToken);
    }
  }, []);

  const serchHandler = () => {
    console.log(search);
  };

  const removeToken = () => {
    localStorage.removeItem("jwtToken");
    setCheckToken(!checkToken);
    toast.success("Logout Successfully!",{theme:"dark"})
  };



  return (
    <>

      <div className='navbar'>
        <Link to={"/"} style={{ textDecoration: "none" }}> <div className="navbar-left">
          <img src={rf} alt="logo" className="logo" />
          <h2 className='brand'>KTM Room Finder</h2>
        </div>
        </Link>

        <div className="navbar-right">
          <div className="search-box">

            <Link to={"/search"}><GoSearch className="searchicon" style={{fontSize:"35px", color:"#444",marginTop:"4px"}} /></Link>
          </div>
          {checkToken ? <button onClick={removeToken} className='signup-btn'>Logout <AiOutlineLogout className='signup-icon' /></button> : <Link to={"/signup"} style={{ textDecoration: "none" }}><button className="signup-btn" onClick={serchHandler}>Sign Up <IoMdLogIn className='signup-icon' /></button></Link>}
          {!checkToken ? "" : <Link to={`/profile/${userId}`}><CgProfile className="profile-icon" /></Link>}
        </div>
      </div>


    </>
  )
}

export default Navbar
