import { Link } from "react-router-dom";
import { authStore } from "../store/authStore";

export default function Navbar() {
  const {authUser,logout}=authStore()
  return (
      <nav className="bg-blue-600 text-white px-6 py-4 shadow-md w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/home" className="text-2xl font-bold tracking-wide">
            Time Capsule 📦
          </Link>
          <div className="flex space-x-6 text-sm font-medium">
             {!authUser && (<div className="flex space-x-6 text-sm font-medium">
            <Link to="/login" className="hover:text-gray-200 transition">
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition"
            >
              Sign Up
            </Link>

            </div>)}
            {authUser && (
               <button 
               onClick={()=>logout()}
               className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition"
             >
              logout
             </button>
            )}
          </div>
        </div>
      </nav>
   
  );
}