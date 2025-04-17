import { create } from "zustand";
import { axiosInstant } from "../utils/axios";
import { toast } from "react-toastify";


export const useCapsuleStore = create((set, get) => ({
    capsules: [],
    isgettingcapsule: false,
    isAddingCapsule: false,

    // Create capsule
    createCapsule: async (data) => {
        try {
            set({ isAddingCapsule: true });
            const res = await axiosInstant.post("/capsule/createCapsule", data);
            toast.success(res.data.message);
            
            // Optimistically update the capsules list without needing to refetch
            set(state => ({
                capsules: [...state.capsules, res.data.newCapsule] // Assuming `newCapsule` is returned
            }));
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to create capsule");
        } finally {
            set({ isAddingCapsule: false });
        }
    },

    // Get capsules
    getCapsules: async () => {
        try {
            set({ isgettingcapsule: true });
            const res = await axiosInstant.get("/capsule/getUserCapsule");
            set({ capsules: res.data.userCapsules });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch capsules");
        } finally {
            set({ isgettingcapsule: false });
        }
    }
}));

