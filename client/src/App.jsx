import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandinPage'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/signup'
import Home from './pages/Home'


function App() {
  const [count, setCount] = useState(0)

 

    return (
      <div className="m-0 p-0 w-screen h-screen">
       <Navbar/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='home' element={<Home/>}/>
      </Routes>
       <Footer/>
      </div>
    );
  }
  

  


export default App
