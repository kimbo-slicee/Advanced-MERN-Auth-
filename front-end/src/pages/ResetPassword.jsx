import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAuthStore} from "../store/AuthStore.js";
import {motion} from "framer-motion";
import {Mail} from "lucide-react";
import Input from "../components/input.jsx";
import toast from "react-hot-toast";
export const ResetPassword = () => {
    const[password,setPassword]=useState("");
    const [confirm,setConfirmPassword]=useState("");
    const {token}=useParams();
    const {resetPassword,error,isLoading,message }=useAuthStore();
    const navigate=useNavigate();
    const handelResetPassword=async (e)=> {
        e.preventDefault();
        if (password !== confirm) {
            toast("Password do not match", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
                type: "error",
            });
            return;
        }
        await resetPassword(token, password).then(() => navigate("/login")).catch()
        toast("Password reset successfully", {
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
            },
            type: "success",
        })
    }
    return (
       <motion.div
       initial={{opacity:0,y:50}}
       animate={{opacity:1,y:0}}
       transition={{duration:0.5}}
       className={"max-w-md w-full mx-auto bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"}>
           <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text uppercase">
                     Reset Password
                </h2>
                <form onSubmit={handelResetPassword}>
                     <p className="text-gray-300 mb-6 text-center">
                          Enter your new password
                     </p>
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                    {message && <p className="text-green-500 text-center mt-4">{message}</p>}
                     <Input
                         icon={Mail}
                          type="password"
                          placeholder="New Password"
                          value={password}
                          onChange={(e)=>setPassword(e.target.value)}
                          required
                          autoFocus
                          className="w-full bg-gray-700 bg-opacity-50 text-gray-300 py-2 px-4 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                     />
                     <Input
                          icon={Mail}
                          type="password"
                          placeholder="Confirm Password"
                          value={confirm}
                          onChange={(e)=>setConfirmPassword(e.target.value)}
                          required
                          className="w-full bg-gray-700 bg-opacity-50 text-gray-300 py-2 px-4 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                     />
                     <motion.button
                          whileHover={{scale: 1.05}}
                          whileTap={{scale: 0.95}}
                          type="submit"
                          className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-500"
                     >
                          {isLoading ? "Loading..." : "Reset Password"}
                     </motion.button>
                     {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                     {message && <p className="text-green-500 text-center mt-4">{message}</p>}
                </form>
           </div>
       </motion.div>
    )
}