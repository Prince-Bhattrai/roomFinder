import React, { useState } from 'react';
import './AddPost.css';
import axios from 'axios';
import { url } from '../../../url';
import { toast } from 'react-toastify';


const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [roomtype, setRoomtype] = useState("Single");
  const [contact, setContact] = useState("");
  const [video, setVideo] = useState(null);
  const [rent, setRent] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      return toast.error("Video is required", { theme: "dark" });
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("city", city);
    formData.append("area", area);
    formData.append("roomtype", roomtype);
    formData.append("contact", contact);
    formData.append("rent", rent);
    formData.append("video", video);

    try {
      const res = await axios.post(`${url}/user/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      toast.success("Post added successfully", { theme: "dark" });
      // Optionally clear form
      setTitle("");
      setDescription("");
      setCity("");
      setArea("");
      setRoomtype("Single");
      setContact("");
      setRent("");
      setVideo(null);
    } catch (err) {
      console.error(err);
      toast.error("Error posting post", { theme: "dark" });
    }
  };


  return (
    <>
 
    <div className='add-post'>
      
      <form onSubmit={handleSubmit}>
        <h1 style={{textAlign:"center"}}>Add Post</h1>
        <input type="text" placeholder='Post title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
        <input type="text" placeholder='Area' value={area} onChange={(e) => setArea(e.target.value)} />
        <select value={roomtype} onChange={(e) => setRoomtype(e.target.value)}>
          <option value="Single">Single</option>
          <option value="Shared">Shared</option>
          <option value="Flat">Flat</option>
        </select>
        <input type="text" placeholder='Your Contact' value={contact} onChange={(e) => setContact(e.target.value)} />
        <input type="text" placeholder='Rent' value={rent} onChange={(e) => setRent(e.target.value)} />
        <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
         <textarea rows={6} type="text" placeholder='Post description' value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
        
        <button type='submit'>Add Post</button>
      </form>
    </div>
    </>
  );
};

export default AddPost;

