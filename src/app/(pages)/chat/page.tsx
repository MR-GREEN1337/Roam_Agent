"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Send,
    Download,
    Rocket,
    Sparkles,
    Network,
    Bot,
    Cpu,
    Brain,
    Workflow,
    Code,
    Settings2,
    Moon,
    Sun
} from 'lucide-react';
import { useTheme } from "next-themes";
import { AgentConfig, AgentNode, FloatingButtonProps, Message, MessageBubbleProps } from '@/lib/types';
import AgentGraphDialog from './_components/AgentGraphDialog';
import ConfigureAgentDialog from './_components/ConfigureAgentDialog';
import CodeGenerationDialog from './_components/CodeGenerationDialog';
import DeploymentDialog from './_components/DeploymentDialog';
import { ChatNavigation } from './_components/ChatNavigation';
import MessageBubble from './_components/MessageBubble';
import FloatingButton from './_components/FloatingButton';

// Background Component
const ParticleBackground: React.FC = () => (
    <div className="absolute bottom-0 left-0 right-0 top-0">
        {/* Light theme background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb18_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb18_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:hidden" />
        
        {/* Dark theme background */}
        <div className="absolute inset-0 hidden dark:block bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
);

// Main Chat Page Component
export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: "Welcome to the AI Agent Builder! Let's create something amazing together. What kind of agent would you like to build?",
            type: 'assistant',
            timestamp: new Date()
        }
    ]);

    const [inputMessage, setInputMessage] = useState('');
    const [showGraph, setShowGraph] = useState(false);
    const [showConfigure, setShowConfigure] = useState(false);
    const [showCodeGen, setShowCodeGen] = useState(false);
    const [showDeploy, setShowDeploy] = useState(false);

    const [agentConfig, setAgentConfig] = useState<AgentConfig>({
        goal: '',
        framework: '',
        adapter: '',
        nodes: [],
        edges: []
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

// Update the handleSend function in your ChatPage component

const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
        id: Date.now().toString(),
        content: inputMessage,
        type: 'user',
        timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    try {
        // Call the API with the current message and agent config
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                agent_config: agentConfig,
                user_request: inputMessage,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to process agent configuration');
        }

        const data = await response.json();

        // Update agent configuration
        setAgentConfig(data.agent_config);

        // Add AI response to messages
        const aiMessage: Message = {
            id: Date.now().toString(),
            content: data.user_request,
            type: 'assistant',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);

        // Handle UI actions if any
        if (data.ui_action) {
            switch (data.ui_action.type) {
                case 'show_graph':
                    setShowGraph(true);
                    break;
                case 'show_configure':
                    setShowConfigure(true);
                    break;
                case 'show_code_gen':
                    setShowCodeGen(true);
                    break;
                case 'show_deploy':
                    setShowDeploy(true);
                    break;
            }
        }
    } catch (error) {
        console.error('Error processing message:', error);
        
        // Add error message
        const errorMessage: Message = {
            id: Date.now().toString(),
            content: 'Sorry, there was an error processing your request. Please try again.',
            type: 'assistant',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, errorMessage]);
    }
};

    return (
        <div className="relative h-screen bg-white dark:bg-slate-950 overflow-hidden">
            <ChatNavigation />
            <ParticleBackground />

            {/* Main Content Area */}
            <div className="absolute inset-0 flex mt-16">
                {/* Chat Section */}
                <div className="flex-1 flex flex-col p-6">
                    {/* Status Bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-4 flex items-center justify-between px-4 py-2 bg-white/80 dark:bg-gray-800/20 backdrop-blur-md rounded-lg border border-gray-200/50 dark:border-gray-700/50"
                    >
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                                <Cpu className="w-4 h-4" /> Framework: {agentConfig.framework || 'Not Set'}
                            </span>
                            <span className="flex items-center gap-1">
                                <Bot className="w-4 h-4" /> Adapter: {agentConfig.adapter || 'Not Set'}
                            </span>
                        </div>
                    </motion.div>

                    {/* Chat Messages */}
                    <div ref={chatContainerRef}
                        className="flex-1 overflow-y-auto custom-scrollbar mb-20">
                        {messages.map((message) => (
                            <MessageBubble key={message.id} message={message} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="fixed bottom-6 left-6 right-24 z-10">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
                            <Input
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Tell me about your agent..."
                                className="w-full bg-white/80 dark:bg-gray-800/20 backdrop-blur-md border-gray-200/50 dark:border-gray-700/50 rounded-full py-6 pl-6 pr-16 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                            />
                            <Button
                                onClick={handleSend}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full 
                                         bg-purple-600 hover:bg-purple-700 p-3 text-white
                                         hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]
                                         transition-all duration-300"
                            >
                                <Send className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Floating Action Menu */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-6"
                >
                    <FloatingButton
                        icon={
                            <div className="relative">
                                <Network className="w-6 h-6 text-purple-500 dark:text-purple-400 relative z-10" />
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-purple-400/20 rounded-full blur-sm"
                                />
                            </div>
                        }
                        label="View Agent Graph"
                        onClick={() => setShowGraph(true)}
                        className="hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    />
                    <FloatingButton
                        icon={
                            <div className="relative">
                                <Settings2 className="w-6 h-6 text-blue-500 dark:text-blue-400 relative z-10 group-hover:rotate-90 transition-transform duration-500" />
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm"
                                />
                            </div>
                        }
                        label="Configure Agent"
                        onClick={() => setShowConfigure(true)}
                        className="hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    />
                    <FloatingButton
                        icon={
                            <div className="relative">
                                <Code className="w-6 h-6 text-emerald-500 dark:text-emerald-400 relative z-10" />
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-emerald-400/20 rounded-full blur-sm"
                                />
                            </div>
                        }
                        label="Generate Code"
                        onClick={() => setShowCodeGen(true)}
                        className="hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    />
                    <FloatingButton
                        icon={
                            <div className="relative">
                                <Rocket className="w-6 h-6 text-amber-500 dark:text-amber-400 relative z-10 group-hover:-translate-y-0.5 transition-transform" />
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-amber-400/20 rounded-full blur-sm"
                                />
                            </div>
                        }
                        label="Deploy Agent"
                        onClick={() => setShowDeploy(true)}
                        className="hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                    />
                </motion.div>
            </div>

            {/* Dialogs */}
            <AgentGraphDialog 
                open={showGraph} 
                onOpenChange={setShowGraph} 
                agentConfig={agentConfig} 
            />
            <ConfigureAgentDialog
                open={showConfigure}
                onOpenChange={setShowConfigure}
            />
            <CodeGenerationDialog
                open={showCodeGen}
                onOpenChange={setShowCodeGen}
            />
            <DeploymentDialog
                open={showDeploy}
                onOpenChange={setShowDeploy}
            />

            {/* Custom Scrollbar Styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 3px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(124, 58, 237, 0.5);
                    border-radius: 3px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(124, 58, 237, 0.7);
                }

                /* Hide scrollbar for Chrome, Safari and Opera */
                .custom-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                
                /* Hide scrollbar for IE, Edge and Firefox */
                .custom-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </div>
    );
}