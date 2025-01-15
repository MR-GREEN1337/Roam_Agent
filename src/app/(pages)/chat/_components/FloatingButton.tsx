import { FloatingButtonProps } from "@/lib/types";
import { motion } from "framer-motion";

// Floating Button Component
const FloatingButton: React.FC<FloatingButtonProps> = ({ icon, label, onClick, className = "" }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`group relative rounded-full p-3 
                   bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm 
                   border border-gray-200/50 dark:border-gray-700/50 
                   hover:border-purple-500/50
                   transition-all duration-300 ${className}`}
        onClick={onClick}
    >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">
            {icon}
        </div>
        <div className="absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-sm" />
        <span className="absolute right-full mr-3 px-3 py-2 
                      bg-white/90 dark:bg-gray-800/20 rounded-xl
                      opacity-0 group-hover:opacity-100 transition-all duration-300
                      border border-gray-200/50 dark:border-gray-700/50 
                      backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.1)]
                      translate-y-1/2 -bottom-1/2 
                      text-gray-900 dark:text-white text-sm
                      whitespace-nowrap flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
            {label}
        </span>
    </motion.button>
);

export default FloatingButton;