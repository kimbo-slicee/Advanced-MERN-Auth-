import {motion} from "framer-motion";

const FloatingShape = ({color, size, top, left}) => {
    return (
     <motion.div className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
     animate={{
     y:["0%","100%","0%"],
     x:["0%","100%","0%"],
     rotate:[0,360],
     }}
     transition={{
         duration:20,
         ease:"linear",
         repeat:Infinity,
         delay:0
     }}
     aria-hidden='true'
    style={{top,left}}
     >
     </motion.div>
    )
}
export default FloatingShape