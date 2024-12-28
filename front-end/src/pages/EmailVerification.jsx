import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {toast} from "react-toastify/unstyled";
const EmailVerification = () => {
    const [code, setCode] = useState(["", "", "", "","",""]);
    const inputRef = useRef([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    // this function is used to focus the input field when the user press backspace
    function handelKeyDown(index, e) {
        if(e.key === "Backspace" &&  !code[index] && index > 0){
            // if the user press backspace and the input field is empty
            inputRef.current[index - 1].focus();
        }
    }
    // this function is used to handle the paste event
    const handelPaste=(index,value)=>{
        // if the user paste the code
        const newCode = [...code];
        if (value.length>1){
            const pasteData = value.slice(0,6).split("");
         for (let i = 0; i < pasteData.length; i++){
                 newCode[index + i] = pasteData[i] || "";
         }
            setCode(newCode);
         const lastFilledIndex = newCode.findIndex((code) => code !== "");
         const focusIndex = lastFilledIndex < 5 ?   lastFilledIndex + 1 : 5;
            inputRef.current[focusIndex].focus();
        }else {
            // if the user paste one character
            newCode[index] = value;
            setCode(newCode);
            if (index < 5 && value){
                inputRef.current[index + 1].focus();
            }

        }

    }

    const handelSubmit=(e)=> {
        e.preventDefault();
        const verificationCode = code.join("");
        toast(`Email Verified Successfully ${verificationCode}`, {
            type: "success",
            theme: "dark",
            position: "top-right",
        })
        setIsLoading(true);

    }

    useEffect(() => {
      if (code.every((code) => code!== "")){
        // handelSubmit(new Event("submit"));
      }
    }, []);

    return (
        <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl
            shadow-xl overflow-hidden p-8">
            <motion.div
            initial={{opacity:0, y:-80}}
            animate={{opacity:1, y:0}}
            exit={{opacity:0, y:20}}
            transition={{
                duration:0.5,
                ease:"easeOut",
            }}
            >
            <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500
            text-transparent border-gray-500 bg-clip-text"> Verify Your Email</h2>
                <p className="text-center text-gray-200 mb-6 text-l">Enter The 6-digit Code sent to your email address</p>
                <form className="space-y-6">
                    <div className="flex justify-between">
                        {code.map((code, index) => (
                            <input
                                key={index}
                                value={code}
                                onKeyDown={(e) => handelKeyDown(e, index)}
                                onChange={(e) => {setCode(e.target.value)}}
                                onPaste={(e) => handelPaste(index, e.clipboardData.getData("Text"))}
                                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-500
                                 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                            />
                        ))}
                    </div>
                    <motion.button
                        className="mt-5 w-full
                        py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600
                        hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                        focus:ring-offset-gray-900 transition-all duration-500"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        type="submit"
                    >
                        Verify Your Email
                    </motion.button>
                </form>
            </motion.div>
        </div>
    )
}
export default EmailVerification