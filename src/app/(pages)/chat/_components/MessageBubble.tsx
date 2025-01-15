import { MessageBubbleProps } from "@/lib/types";
import { motion } from "framer-motion";

// Message Bubble Component
const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`mb-4 ${message.type === 'user' ? 'ml-auto' : 'mr-auto'}`}
    >
        <div
            className={`relative max-w-[80%] px-6 py-4 rounded-2xl 
               ${message.type === 'user'
                    ? 'bg-gradient-to-br from-purple-600/90 to-purple-800/90 dark:from-purple-500/90 dark:to-purple-700/90'
                    : 'bg-white/80 dark:bg-gray-800/20'} 
               backdrop-blur-sm shadow-lg`}
        >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent 
                          via-white/5 to-transparent opacity-20" />
            <p className={`relative z-10 ${
                message.type === 'user' 
                    ? 'text-white' 
                    : 'text-gray-800 dark:text-white'
            }`}>
                {message.content}
            </p>
        </div>
    </motion.div>
);

export default MessageBubble;