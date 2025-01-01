import React, {useState} from 'react';
import {motion} from "framer-motion";
import {useAuthStore} from "../store/AuthStore.js";
import Input from "../components/input.jsx";
import {ArrowLeft, Loader,Mail  } from "lucide-react";
import {Link} from "react-router-dom";

export const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [issubmitted, isSetSubmitted] = useState(false);
    const {isLoading,forgetPassword}=useAuthStore();
    const handelSubmit = (e) => {
        e.preventDefault();
        isSetSubmitted(true);
        forgetPassword()
    }
    return (
       <motion.div
       initial={{opacity:0,y:50}}
       animate={{opacity:1,y:0}}
       exit={{opacity:0,y:50}}
       transition={{duration:0.5}}
       className="max-w-md w-full mx-auto bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl
       rounded-2xl shadow-2xl overflow-hidden">
           <div className="p-8">
               <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                   Forgot Password
               </h2>
               {isSetSubmitted ? (
                   <form onSubmit={handelSubmit}>
                       <p className="text-gray-300 mb-6 text-center">
                           Enter your email address and we will send you a link to reset your password
                       </p>
                       <Input icon={Mail}
                              type="email"
                              placeholder="Email Address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              autoFocus
                       />
                       <motion.button
                           whileHover={{scale: 1.05}}
                           whileTap={{scale: 0.95}}
                           type="submit"
                           className="mt-5 w-full
                        py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600
                        hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                        focus:ring-offset-gray-900 transition-all duration-500"
                       >
                           {isLoading ? <Loader className="size-6 animate-ping mx-auto"/> : "Send Reset Link"}
                       </motion.button>

                   </form>
               ) : (
                   <div className="text-center">
                       <motion.div initial={{scale: 0}}
                                   animate={{scale: 1}}
                                   transition={{type: "spring", stiffness: 500, damping: 30}}
                                   className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 ">
                           <Mail className="text-white" size="2rem"/>
                       </motion.div>
                       <p className="text-gray-300 mb-6">
                           if an account with that {email} exists, we will send you a link to reset your password
                       </p>

                   </div>
               )}
           </div>
               <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                   <Link to={"/Login"} className="text-sm text-green-400 hover:underline flex items-center">
                       <ArrowLeft className="h-4 w-4 mr-2"/> Back to Login
                   </Link>
               </div>
       </motion.div>
    )
}