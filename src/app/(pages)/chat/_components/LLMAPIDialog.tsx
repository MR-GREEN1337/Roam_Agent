import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Settings, KeyRound } from 'lucide-react';
import Cookies from 'js-cookie';

const LLMAPIDialog = ({ isEmbedded = false }) => {
    const [open, setOpen] = useState(false);
    const [provider, setProvider] = useState(Cookies.get('llmProvider') || '');
    const [model, setModel] = useState(Cookies.get('llmModel') || '');
    const [apiKey, setApiKey] = useState(Cookies.get('llmApiKey') || '');

    // TODO: add more providers and make them up-to-date
    const providers = {
        'openai': {
            name: 'OpenAI',
            models: ['gpt-4', 'gpt-3.5-turbo'],
        },
        'anthropic': {
            name: 'Anthropic',
            models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
        },
        'google': {
            name: 'Google AI',
            models: ['gemini-pro', 'gemini-pro-vision'],
        },
        'mistral': {
            name: 'Mistral AI',
            models: ['mistral-medium', 'mistral-small', 'mistral-tiny'],
        }
    };

    const handleSave = () => {
        // Save to cookies with 30 day expiry
        Cookies.set('llmProvider', provider, { expires: 30 });
        Cookies.set('llmModel', model, { expires: 30 });
        Cookies.set('llmApiKey', apiKey, { expires: 30 });
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(true)}
                className="w-9 h-9 bg-white/80 dark:bg-gray-800/20 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
            >
                <Settings className="h-4 w-4" />
                <span className="sr-only">LLM Settings</span>
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>LLM Configuration</DialogTitle>
                        <DialogDescription>
                            Configure your preferred LLM provider and model
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        <div className="space-y-2">
                            <SelectGroup>
                                <SelectLabel>Provider</SelectLabel>
                                <Select value={provider} onValueChange={setProvider}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Provider" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(providers).map(([key, value]) => (
                                            <SelectItem key={key} value={key}>
                                                {value.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </SelectGroup>
                        </div>

                        <div className="space-y-2">
                            <SelectGroup>
                                <SelectLabel>Model</SelectLabel>
                                <Select value={model} onValueChange={setModel}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {provider && providers[provider].models.map((model) => (
                                            <SelectItem key={model} value={model}>
                                                {model}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </SelectGroup>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">API Key</label>
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                    type="password"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    className="pl-10"
                                    placeholder="Enter your API key"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                            Save Configuration
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default LLMAPIDialog;