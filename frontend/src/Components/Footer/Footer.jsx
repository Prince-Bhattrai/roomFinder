import React from 'react'
import logo from "../../assets/rf.png"
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import "./Footer.css"




const Footer = () => {
    return (
        <div className='footer'>
            <div className="left">
                <img onClick={()=>{
                    window.scrollTo({top:0,left:0,behavior:"smooth"} )
                }} src={logo} alt="Logo" />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis voluptate quasi quae perspiciatis corporis ipsum ducimus vel, id corrupti minus!</p>

            </div>
            <div className="middle">

                <a href="https://facebook.com" target='_blank'><FaFacebookSquare style={{ fontSize: "40px", color: "#444" }} /></a>
                <a href="https://github.com" target='_blank'><FaSquareGithub style={{ fontSize: "40px", color: "#444" }} /></a>
                <a href="https://twitter.com" target='_blank'><FaSquareXTwitter style={{ fontSize: "40px", color: "#444" }} /></a>
                <a href="https://linkedin.com" target='_blank'><FaLinkedin style={{ fontSize: "40px", color: "#444" }} /></a>
            </div>
            <div className="right">
                <h3>Contact</h3>
                <p>
                    <a href="mailto:princebhattrai39@gmail.com" >
                        princebhattrai39@gmail.com
                    </a>
                </p>
                <p>
                    <a href="tel:97679495393" >
                        +97797679495393
                    </a>
                </p>
            </div>

        </div >
    )
}

export default Footer
