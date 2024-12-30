import { create } from 'zustand'
import axios from 'axios'

const API_URL="http://localhost:5000/api/v1"
axios.defaults.withCredentials = true;
export const useAuthStore = create((set,getState) => ({
user: null,
isAuthenticated: false,
isLoading:false,
isCheckingAuth: false,
error: null,
    signup: async (email, password,name) => {
    set({ isLoading: true ,error:null})
    try{
        const {data} = await axios.post(`${API_URL}/auth/signup`, {name,email,password});
        set({user:data,isLoading:false,isAuthenticated:true,error:null})
    }catch (error){
        set({error:error.response.data.message,isLoading:false})
        throw error;
    }
},
    verifyEmail: async (code) => {
    set({ isLoading: true ,error:null})
    try{
        const {data} = await axios.post(`${API_URL}/auth/verification`, {verificationToken:code});
        set({user:data,isLoading:false,isAuthenticated:true,error:null})
        return data;
    }catch (error){
        set({error:error.response.data.message,isLoading:false})
        throw error;
    }
},
    // login function will be implemented in the next step
    login: async (email, password) => {
        set({isLoading: true, error: null})
        try {
            const {data} = await axios.post(`${API_URL}/auth/login`, {email, password});
            set({user: data, isAuthenticated: true, isLoading: false, error: null});
        } catch (error) {
            set({error: error.response.data.message, isLoading: false})
            throw error;
        }
    },


    checkAuth: async () => {
        set({isCheckingAuth: true, error: null});
        try {
            const {data} = await axios.get(`${API_URL}/user/profile`);
            set({user: data, isAuthenticated: true, isCheckingAuth: false});
        } catch (error) {
            console.log(error);
            set({error: error.response.data.message, isCheckingAuth: false});
            throw error;
        }
    }
}))

