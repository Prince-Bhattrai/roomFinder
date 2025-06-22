
import React, { useEffect, useState } from 'react';
import "./Profile.css";
import axios from 'axios';
import { IoMdAddCircle } from "react-icons/io";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { url } from '../../../url';
import { TiDeleteOutline } from "react-icons/ti";
import { GrUpdate } from "react-icons/gr";
import { toast } from 'react-toastify';

const Profile = () => {
  const [data, setData] = useState({});
  const [play, setPlay] = useState(null)
  const { id } = useParams();


  const post = data.post || [];

  useEffect(() => {
    axios.get(`${url}/user/one/${id}`)
      .then((res) => setData(res.data.data))
      .catch(err => console.log(err));
  }, [id]);

  const deleteHandler = (postId) => {
    axios.delete(`${url}/user/post/delete/${postId}`)
      .then(() => {
        setData((prevData) => ({
          ...prevData,
          post: prevData.post.filter((p) => p._id !== postId)
        }));
      })
    toast.success("Post Deleted Successfully!")
      .catch((err) => console.log("Delete error:", err));
  };


  return (
    <div className='profile'>
      <div className="user">
        <div className="user-info">
          <h1>Your Information</h1>
          <p><span style={{ color: "white", fontWeight: 600 }}>User Name</span>: {data.name}</p>
          <p><span style={{ color: "white", fontWeight: 600 }}>User Email</span>: {data.email}</p>
        </div>
        <div className="add-post">
          <Link to={"/addpost"} style={{ textDecoration: "none", color: "#444" }}>
            <button className='buttons'>Add Post <IoMdAddCircle style={{ fontSize: "25px" }} /></button>

          </Link>

        </div>
      </div>

      <h1>Your Posts</h1>

      {post.length > 0 ? (
        <div className="buttom">
          {post.map((v, i) => (
            <div className="postcart" key={i}>
              <Link to={`/details/${v._id}`} style={{ textDecoration: "none", color: "#444" }}>
                <video src={`${url}/uploads/${v.video}`} controls onMouseEnter={() => setPlay(true)} autoPlay={play} width="250" />
                <p>{v.title}</p>
                <p>{v.rent}</p>
              </Link>
              <div className="update_and_delete_icon">
                <TiDeleteOutline className='icon_style' onClick={() => deleteHandler(v._id)} />
                <Link to={`/update-post/${v._id}`}> <GrUpdate className='icon_style' style={{ fontSize: "20px" }} /></Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Post not found</p>
      )}
    </div>
  );
};

export default Profile;
