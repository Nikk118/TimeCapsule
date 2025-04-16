import { useEffect, useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandinPage'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/signup'
import Home from './pages/Home'
import {ToastContainer} from "react-toastify"
import { authStore } from './store/authStore'


function App() {
 

  const {authUser,getUser}=authStore()

  useEffect(()=>{
    getUser()
  },[getUser])

    return (
      <div className="m-0 p-0 w-screen h-screen">
       <Navbar/>
      <Routes>
        <Route path='/' element={authUser?<Home/>:<LandingPage/>}/>
        <Route path='login' element={authUser?<Home/>:<Login/>}/>
        <Route path='signup' element={authUser?<Home/>:<Signup/>}/>
        <Route path='home' element={authUser?<Home/>:<Login/>}/>
      </Routes>
       <Footer/>
       <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
  }
  

  


export default App
