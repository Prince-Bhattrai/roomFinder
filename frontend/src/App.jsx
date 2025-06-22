import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Contact from './Pages/Contact/Contact'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'
import Search from './Components/Search/Search'
import Profile from './Pages/Profile/Profile'
import Details from './Components/Details/Details'
import AddPost from './Components/AddPost/AddPost'
import UpdatePost from './Components/UpdatePost/UpdatePost'





function App() {


  return (
    <>
     <ToastContainer />
    <Navbar/>
      
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
          <Route path='/details/:id' element={<Details/>}/>
          <Route path="/addpost" element={<AddPost/>}/>
          <Route path='/update-post/:id' element={<UpdatePost/>}/>
        </Routes>
     
      <Footer/>
    </>
  )
}

export default App
