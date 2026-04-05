import { create } from "zustand";
import { axiosInstant } from "../utils/axios";
import { toast } from "react-toastify";

export const authStore = create((set) => ({
  islogginin: false,
  authUser: null,

  login: async (data) => {
    try {
      set({ islogginin: true });
      const res = await axiosInstant.post("/user/login", data);
      const { token, user } = res.data;

      if (token) {
        localStorage.setItem("token", token);
      }

      set({
        authUser: {
          ...user,
          token,
        },
      });
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
      const { token, user } = res.data;

      if (token) {
        localStorage.setItem("token", token);
      }

      set({
        authUser: {
          ...user,
          token,
        },
      });
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
      localStorage.removeItem("token");
      set({ authUser: null });
      toast.success(res.data.message);
    } catch (error) {
      localStorage.removeItem("token");
      set({ authUser: null });
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },

  getUser: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        set({ authUser: null });
        return;
      }

      const res = await axiosInstant.get("/user/getUser");
      set({ authUser: { ...res.data.user, token } });
    } catch (error) {
      localStorage.removeItem("token");
      set({ authUser: null });
    }
  },
}));
