import { create } from 'zustand'
import axios from 'axios'

const API_URL=process.env.NODE_ENV==="development"?"http://localhost:5000/api/v1":"/api/v1"
axios.defaults.withCredentials = true;
export const useAuthStore = create((set,getState) => ({
user: null,
isAuthenticated: false,
isLoading:false,
isCheckingAuth: false,
error: null,
message:null,
    signup: async (email, password,name) => {
    set({ isLoading: true ,error:null})
    try{
        const {data} = await axios.post(`${API_URL}/auth/signup`, {name,email,password});
        set({user:data,isLoading:false,isAuthenticated:true,error:null})
    }catch (error){
        set({error:error.response.data.message ||"user Not found" ,isLoading:false})
        throw error;
    }
},
    verifyEmail: async (code) => {
    set({ isLoading: true ,error:null})
    try{
        const {data} = await axios.post(`${API_URL}/auth/verification`, {verificationToken:code});
        set({user:data.data,isLoading:false,isAuthenticated:true,error:null})
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
            set({user: data["data"], isAuthenticated: true, isLoading: false, error: null});
        } catch (error) {
            set({error: error.response.data.message, isLoading: false})
            throw error;
        }
    },

    // checkAuth User Function
    checkAuth: async () => {
        set({isCheckingAuth: true, error: null});
        try {
            const {data} = await axios.get(`${API_URL}/user/profile`);
            set({user: data, isAuthenticated: true, isCheckingAuth: false});
        } catch (error) {
            set({error: null, isCheckingAuth: false});
            throw error;
        }
    },
    // logout function will be implemented in the next step
    logout:async ()=>{
        set({isLoading:true,error:null})
        try{
            await axios.post(`${API_URL}/auth/logout`)
            set({user:null,isAuthenticated:false,isLoading:false,error:null})
        }catch (error){
            set({error:error.response.data.message,isLoading:false})
            throw error;
        }
    },
    // forgotPassword function will be implemented in the next step
    forgetPassword:async (email)=>{
        set({isLoading:true,error:null,message:null})
        try{
             const {data}=await axios.post(`${API_URL}/auth/forgot-password`,{email})
            set({isLoading:false,error:null,message:data.message})
        }catch (error){
            set({error:error.response.data.message,isLoading:false})
            throw error;
        }
    },
    // resetPassword function will be implemented in the next step
    resetPassword:async (token,password)=>{
        set({isLoading:true,error:null})
        try{
            const {data}=await axios.post(`${API_URL}/auth/forgot-password/${token}`,{password})
            set({isLoading:false,error:null,message:data.message})
        }catch (error){
            set({error:error.response.data.message || "Error Resting Password",isLoading:false})
            throw error;
        }
    }

}))

