import { create } from 'zustand'
import axios from 'axios'

const API_URL="BACKEND_URL=http://localhost:5000/api/v1/auth"
const useAuthStore = create((set) => ({
user: null,
isAuthenticated: false,
isLoading:false,
isCheckingAuth: false,

singup: async (email, password,name) => {
    set({ isLoading: true ,error:null})
    try{
        const response = await axios.post(`${API_URL}/signup`, {email, password,name});
        set({user: response.data.data, isAuthenticated: true, isLoading: false})
    }catch (error){
    set({error: error.response.data.error || "SignUp Error", isLoading: false})
    console.log(error)
    }
    }
}))
