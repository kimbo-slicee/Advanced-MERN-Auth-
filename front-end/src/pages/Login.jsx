import React, {useState} from 'react';
import {motion} from "framer-motion";
import Input from "../components/input.jsx";
import {Loader, LockIcon, MailIcon} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/AuthStore.js";
import {LoadingSpinner} from "../components/LoadingSpinner.jsx";
const Login = (props) => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {isCheckingAuth,login,isLoading,error} = useAuthStore();
    const navigate = useNavigate();
    const handleLogin = (e) =>{
        e.preventDefault();
        login(email,password).then(()=>navigate('/')).catch((error)=>console.log(error))

    }
    if(isCheckingAuth) return <LoadingSpinner/>
    return(
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 20}}
            transition={{duration: 2, ease: "easeOut"}}
            className="max-w-md w-full bg-gray-800 bg-opacity-50
                backdrop-filter backdrop-blur-xl rounded-2xl shadow-x1 overflow-hidden">
            <div className="p-8">
                <h2 className="text-3xl  mb-6 text-center
                bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text font-semibold uppercase">
                    Welcome Back
                </h2>
                <form onSubmit={handleLogin}>
                    <Input icon={MailIcon} type="text" placeholder="Full Name" value={email}
                           onChange={(e) => setEmail(e.target.value)} autoFocus/>
                    <Input icon={LockIcon} type="password" placeholder="password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <div className="flex items-center mb-6">
                        <Link to={'/forgot-password'}
                              className="text-sm text-green-400 hover:underline">
                            Forgot Password?</Link>
                    </div>
                    {error && <p className="text-red-500 font-semibold text-sm mb-4">{error}</p>}
                    <motion.button
                        className="mt-5 w-full
                        py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600
                        hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                        focus:ring-offset-gray-900 transition-all duration-500"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className="animate-spin w-6 h-6 m-auto" size="1.5rem"/> : 'Login'}
                    </motion.button>
                </form>
            </div>
            <div className="px-7 py-4 bg-gray-900 bg-opacity-50 flex justify-center ">
                <p className="text-sm text-gray-400">
                    Sign Up?{""} <Link to="/signup" className="text-green-400 hover:underline">Sin Up</Link>
                </p>
            </div>
        </motion.div>
    )
}

export default Login;