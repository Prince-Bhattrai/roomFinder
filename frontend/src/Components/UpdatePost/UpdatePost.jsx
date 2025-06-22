import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { url } from '../../../url'
import { toast } from 'react-toastify'
import "./UpdatePost.css"

const UpdatePost = () => {
    const { id } = useParams()
    const [title, setTitle] = useState("")
    const [city, setCity] = useState("")
    const [area, setArea] = useState("")
    const [contact, setContact] = useState("")
    const [roomtype, setRoomtype] = useState("")
    const [rent, setRent] = useState("")
    const [description, setDescription] = useState("")
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const data = {
                title: title,
                city: city,
                area: area,
                contact: contact,
                roomtype: roomtype,
                rent: rent,
                description: description
            }
            console.log(title, city, area, contact, roomtype, rent, description)
            if (!title || !city || !area || !contact || !roomtype || !rent || !description) {
                return toast.error("Please fill all fields!", { theme: "dark" })
            }
            const res = await axios.put(`${url}/user/post/update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                }

            })
            if (res.data.success) {
                toast.success(res.data.message, { theme: "dark" })
                setTitle("")
                setCity("")
                setArea("")
                setContact("")
                setRoomtype("")
                setDescription("")
                setRent("")

            }
            if (!res.data.success) {
                toast.error("Post update unsuceess!", { theme: "dark" })
            }




        } catch (error) {
            console.error(error)

        }


    }
    return (
        <div className='update_post'>
            
            <form action="" onSubmit={submitHandler}>
                <h1>Update Post</h1>
                <input type="text" placeholder='Title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                <input type="text" placeholder='City' value={city} onChange={(e) => { setCity(e.target.value) }} />
                <input type="text" placeholder='Area' value={area} onChange={(e) => { setArea(e.target.value) }} />
                <input type="text" placeholder='Contact' value={contact} onChange={(e) => { setContact(e.target.value) }} />

                <input type="text" placeholder='Rent' value={rent} onChange={(e) => { setRent(e.target.value) }} />
                <textarea rows="5" name="" id="" placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                <div className="buttom">
                    <button type='submit'>Update</button>
                    <div className="buttom-small">
                        <p>Room Type</p>
                    <select name="" id="" value={roomtype} onChange={(e) => { setRoomtype(e.target.value) }}> Select
                        <option value="Single" >Single</option>
                        <option value="Shared">Shared</option>
                        <option value="Flat">Flat</option>
                    </select>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default UpdatePost
