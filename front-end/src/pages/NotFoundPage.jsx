// NotFoundPage.jsx
import React from 'react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
    return (
        <div className="relative h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 overflow-hidden">

            <motion.div
                className="relative z-10 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1 className="bg-clip-text text-transparent bg-gradient-to-br from-gray-800 to-gray-900 text-7xl font-bold drop-shadow-lg">Oops!</h1>
                <p className="bg-clip-text text-transparent bg-gradient-to-br from-gray-800 to-gray-900 text-xl mt-4 drop-shadow-md">
                    We can’t find the page you’re looking for.
                </p>

                <motion.div
                    className="mt-8"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <a
                        href="/"
                        className="mt-5 w-full
                        py-3 px-4 bg-gradient-to-r from-green-700 to-emerald-800 text-white font-bold rounded-lg shadow-lg hover:from-green-600
                        hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                        focus:ring-offset-gray-900 transition-all duration-500 "
                    >
                        Go Home
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
