import React, {useState} from 'react';
import {motion} from "framer-motion";
import Input from "../components/Input";
import {LockIcon, MailIcon, UserIcon} from "lucide-react";
import {Link} from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";


const Signup = ({props}) => {
    const [name,setName]=useState('');
    const [email , setEmail]=useState('');
    const [password, setPassword]=useState('');
    function handleSinUp() {

    }

return (
    <motion.div
    initial={{opacity:0, y:20}}
    animate={{opacity:1, y:0}}
    exit={{opacity:0, y:20}}
    transition={{
        duration:2,
        ease:"easeOut",
    }}
    className="max-w-md w-full bg-gray-800 bg-opacity-50
     backdrop-filter backdrop-blur-xl rounded-2xl shadow-x1 overflow-hidden"
    >
        <div className="p-8">
         <h2 className="text-3xl  mb-6 text-center
         bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text font-semibold uppercase">
             create Account
         </h2>
         <form onSubmit={handleSinUp}>
            <Input
            icon={UserIcon}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
             <Input
                 icon={MailIcon}
                 type="email"
                 placeholder="Email"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
             />
             <Input
                 icon={LockIcon}
                 type="text"
                 placeholder="Full Name"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
             />
             <PasswordStrengthMeter password={password}/>
             <motion.button
                 className="mt-5 w-full
                 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600
                 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                 focus:ring-offset-gray-900 transition-all duration-500"
                 whileHover={{scale:1.05}}
                 whileTap={{scale:0.95}}
                 type="submit"
             >
                 Sign Up
             </motion.button>
         </form>
        </div>
        <div className="px-7 py-4 bg-gray-900 bg-opacity-50 flex justify-center ">
            <p className="text-sm text-gray-400">
                Already Have Account?{""} <Link to="/login" className="text-green-400 hover:underline">Login</Link>
            </p>
        </div>
    </motion.div>
)
}
export default Signup;