import React, {Fragment, useState} from 'react';
import {motion} from "framer-motion";
import Input from "../components/input.jsx";
import {Loader, LockIcon, MailIcon} from "lucide-react";
import {Link} from "react-router-dom";
const Login = (props) => {
    const handleLogin = (e) =>{
        e.preventDefault();
        console.log('login');
    }
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    return(
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 20}}
            transition={{duration: 2, ease: "easeOut"}}
            className="max-w-md w-full bg-gray-800 bg-opacity-50
                backdrop-filter backdrop-blur-xl rounded-2xl shadow-x1 overflow-hidden">
            <div className="p-8">
                <h2 className="text-3xl font-semibold mb-6 uppercase text-center bg-green-to-r from-green-400 to-emerald-500 text-transparent
                    bg-clip-text">
                    Welcome Back
                </h2>
                <form onSubmit={handleLogin}>
                    <Input icon={MailIcon} type="text" placeholder="Full Name" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <Input icon={LockIcon} type="text" placeholder="Full Name" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <div className="flex items-center mb-6">
                        <Link to={'/verify-email'} className="text-sm text-green-400 hover:underline">
                            Forgot Password?</Link>
                    </div>
                    <motion.button
                        className="mt-5 w-full
                        py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600
                        hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                        focus:ring-offset-gray-900 transition-all duration-500"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        type="submit"
                        disabled={loading}
                    >
                        {loading?<Loader className="animate-spin w-6 h-6 m-auto" size="1.5rem"/>:'Login'}
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