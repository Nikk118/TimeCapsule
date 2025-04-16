import  { create } from "zustand"
import { axiosInstant } from "../utils/axios"
import { toast } from "react-toastify";

export const authStore=create((set,get)=>({
    islogginin:false,
    authUser:null,
    
    login: async (data) => {
        set({islogginin:true})
        try {
            
          const res=await axiosInstant.post("/user/login",data);
          console.log(res.data)
          set({authUser:res.data.user})
          toast.success(res.data.message)
        } catch (error) {
            set({islogginin:false})
            console.log("somthing went rong",error)
            toast.error(error.data.message||"failed")
        }
    },

    signUp:async(data)=>{

        try {
            set({islogginin:true})

            const res=await axiosInstant.post("/user/signup",data)
            set({authUser:res.data.user})
            toast.success(res.data.message)
        } catch (error) {
            set({islogginin:false})

            console.log("error",error)
            toast.error(error.data.message)
        }
    },

    logout:async()=>{
        try {
            await axiosInstant.get("/user/logout");
            set({authUser:null})
            toast.success(res.data.message)
        } catch (error) {
            set({authUser:null})
            toast.error(error.message.data)
        }
    },

    getUser:async()=>{
        try {
            const res=await axiosInstant.get("/user/getuser")
            set({authUser:res.data.user})
        } catch (error) {
            // toast.error()
            console.log("error",error)
        }
    }
      
}))