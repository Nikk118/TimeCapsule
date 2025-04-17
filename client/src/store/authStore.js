import  { create } from "zustand"
import { axiosInstant } from "../utils/axios"
import { toast } from "react-toastify";

export const authStore = create((set, get) => ({
    islogginin: false,
    authUser: null,

    login: async (data) => {
        try {
            set({ islogginin: true });
            const res = await axiosInstant.post("/user/login", data);
            console.log(res.data);
            set({ authUser: res.data.user });
            toast.success(res.data.message);
        } catch (error) {
            const errMsg = error?.response?.data?.message || "Something went wrong";
            toast.error(errMsg);
        } finally {
            set({ islogginin: false });
        }
    },

    signUp: async (data) => {
        try {
            set({ islogginin: true });
            const res = await axiosInstant.post("/user/signup", data);
            set({ authUser: res.data.user });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            set({ islogginin: false });
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstant.get("/user/logout");
            set({ authUser: null });
            toast.success(res.data.message);
        } catch (error) {
            set({ authUser: null });
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    },

    getUser: async () => {
        try {
            const res = await axiosInstant.get("/user/getuser");
            set({ authUser: res.data.user });
        } catch (error) {
            console.log("error", error);
        }
    }
}));
