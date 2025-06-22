import React, { useState } from 'react'
import { toast } from 'react-toastify'
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { url } from '../../../url'

const Signup = () => {
    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[checkPass,setCheckPass]= useState("")
    const Navigate = useNavigate()
   
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        
        if(!name){
            return toast.error("UserName is required",{theme:"dark"})
        }
        if(!email){
           return toast.error("Email is required",{theme:"dark"})
        }
        if(!password){
          return  toast.error("Password is required",{theme:"dark"})
        }
        if(!checkPass){
           return  toast.error("Re-Pass is required",{theme:"dark"})
        }
        if(checkPass!==password){
          return toast.error("Both Password are not matching.",{theme:"dark"})
        }
        console.log(name,email,password)
        axios.post(`${url}/user/signup`,{name,email,password})
        .then(()=>toast.success("User reqisterd"))
        Navigate("/login")
    }


  return (
    <div className='signup'>
        <form action="" onSubmit={handleSubmit}>
          
            <h1>Signup</h1>
            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Your Name'/>
            <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Your Email'/>
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Your Password'/>
            <input type="password" value={checkPass}  placeholder='Re-enter password' onChange={(e)=>setCheckPass(e.target.value)}/>
            <button type='submit'>Signup</button>
            <p style={{color:"#444"}}>Already have account? <span><Link to={"/login"} style={{textDecoration:"none"}}>Login here..</Link> </span> </p>

        </form>
      
    </div>
  )
}

export default Signup
