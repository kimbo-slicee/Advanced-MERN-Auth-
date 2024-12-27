import React, {useState} from 'react';
import {motion} from "framer-motion";
import Input from "../components/Input";
import {LockIcon, MailIcon, UserIcon} from "lucide-react";


const Signup = (props) => {
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
        duration:5,
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
              {/*Password strength meter */}
             <motion.button className="">

             </motion.button>
         </form>
        </div>
    </motion.div>
)
}
export default Signup;