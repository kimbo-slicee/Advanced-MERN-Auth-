import React from 'react';
import {motion} from "framer-motion";

const Home = (props) => (
  <motion.div
  className="max-w-md w-full
  mx-auto mt-10 p-8 bg-gray-800 bg-opacity-80 backdrop-blur-xl rounded-2xl shadow-2xl border-gray-800"
  animate={{opacity: 1, y: 0}}
  initial={{opacity: 0, y: 20}}
  exit={{opacity: 0, scale:0.5}}
  transition={{duration: 0.5}}
  >
    <h2 className="text-3xl  mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text font-semibold uppercase">
      Welcome to the Home Page
    </h2>
    <p className="text-gray-400 text-center">This is the home page of the application</p
  >

  </motion.div>
);

export default Home;