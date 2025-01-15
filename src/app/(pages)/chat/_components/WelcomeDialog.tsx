import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Bot, Key, Lock, Rocket } from 'lucide-react';
import LLMAPIDialog from './LLMAPIDialog';

const WelcomeDialog = ({ open, onOpenChange }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                        <Bot className="w-6 h-6 text-purple-500" />
                        Welcome to Amal
                    </DialogTitle>
                    <DialogDescription className="text-base">
                        Let's get you set up with your preferred AI provider
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Why Configure Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                            Why Configure an AI Provider?
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    <Rocket className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="font-medium">Freedom to Choose</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Use your preferred AI model from providers like OpenAI, Anthropic, Google AI, or Mistral
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    <Lock className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <p className="font-medium">Privacy & Control</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Your API key stays in your browser, ensuring your data and interactions remain private
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    <Key className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <p className="font-medium">Cost Control</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Use your own API key to manage and monitor your usage directly
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LLM Settings Component */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium mb-2">Configure Your AI Provider</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Select your preferred AI provider and enter your API key to get started
                        </p>
                        <LLMAPIDialog isEmbedded={true} />
                    </div>
                </div>

                <DialogFooter className="sm:justify-start">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Don't have an API key? Visit your preferred provider's website to get one.
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WelcomeDialog;