import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Code, Network, Settings2, Workflow, Check } from 'lucide-react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define available models for each provider
const providerModels = {
    openai: [
        { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
        { id: 'gpt-4', name: 'GPT-4' },
        { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' }
    ],
    anthropic: [
        { id: 'claude-3-opus', name: 'Claude 3 Opus' },
        { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet' },
        { id: 'claude-2.1', name: 'Claude 2.1' }
    ],
    google: [
        { id: 'gemini-pro', name: 'Gemini Pro' },
        { id: 'gemini-ultra', name: 'Gemini Ultra' },
        { id: 'palm-2', name: 'PaLM 2' }
    ],
    mistral: [
        { id: 'mistral-large', name: 'Mistral Large' },
        { id: 'mistral-medium', name: 'Mistral Medium' },
        { id: 'mistral-small', name: 'Mistral Small' }
    ]
};

// Framework compatibility with providers
const frameworkProviders = {
    crewai: ['openai', 'anthropic', 'google', 'mistral'],
    langchain: ['openai', 'anthropic', 'google', 'mistral'],
    langgraph: ['openai', 'anthropic'],
    pydanticai: ['openai', 'anthropic', 'mistral']
};

const ConfigureAgentDialog: React.FC<{ 
    open: boolean; 
    onOpenChange: (open: boolean) => void;
    onConfigUpdate?: (config: any) => void;
}> = ({ 
    open, 
    onOpenChange,
    onConfigUpdate 
}) => {
    const [selectedFramework, setSelectedFramework] = useState<string>('crewai');
    const [selectedProvider, setSelectedProvider] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [temperature, setTemperature] = useState<number>(0.7);
    const [maxTokens, setMaxTokens] = useState<number>(2048);

    // Get available providers based on selected framework
    const availableProviders = frameworkProviders[selectedFramework as keyof typeof frameworkProviders] || [];

    // Handle framework change
    const handleFrameworkChange = (value: string) => {
        setSelectedFramework(value);
        if (!frameworkProviders[value as keyof typeof frameworkProviders]?.includes(selectedProvider)) {
            setSelectedProvider('');
            setSelectedModel('');
        }
    };

    // Handle model selection
    const handleModelSelect = (provider: string, modelId: string) => {
        setSelectedProvider(provider);
        setSelectedModel(modelId);
    };

    // Handle save configuration
    const handleSave = () => {
        const config = {
            framework: selectedFramework,
            provider: selectedProvider,
            model: selectedModel,
            temperature,
            maxTokens
        };
        onConfigUpdate?.(config);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-900 border-gray-200/50 dark:border-gray-700">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                        <Settings2 className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                        Configure Agent
                    </DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="framework" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
                        <TabsTrigger 
                            value="framework" 
                            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                        >
                            Framework
                        </TabsTrigger>
                        <TabsTrigger 
                            value="adapter"
                            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                        >
                            Model
                        </TabsTrigger>
                        <TabsTrigger 
                            value="settings"
                            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                        >
                            Settings
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="framework" className="mt-4">
                        <div className="grid gap-4">
                            <Label className="text-gray-900 dark:text-white">Select Framework</Label>
                            <RadioGroup 
                                value={selectedFramework}
                                onValueChange={handleFrameworkChange}
                                className="grid grid-cols-2 gap-4"
                            >
                                {[
                                    { value: 'crewai', label: 'CrewAI', icon: Bot },
                                    { value: 'langchain', label: 'LangChain', icon: Workflow },
                                    { value: 'langgraph', label: 'LangGraph', icon: Network },
                                    { value: 'pydanticai', label: 'Pydantic AI', icon: Code }
                                ].map(({ value, label, icon: Icon }) => (
                                    <Label
                                        key={value}
                                        className={`flex items-center space-x-3 space-y-0 rounded-lg 
                                                 border border-gray-200 dark:border-gray-700 p-4 
                                                 cursor-pointer transition-colors
                                                 ${selectedFramework === value 
                                                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                                                    : 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                                        htmlFor={value}
                                    >
                                        <RadioGroupItem value={value} id={value} className="sr-only" />
                                        <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                                        <span className="text-gray-900 dark:text-white">{label}</span>
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>
                    </TabsContent>
                    <TabsContent value="adapter" className="mt-4">
                        <div className="grid gap-4">
                            <Label className="text-gray-900 dark:text-white mb-2">Select Model</Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        {selectedModel ? (
                                            <>
                                                <span className="capitalize">
                                                    {selectedProvider} - {
                                                        providerModels[selectedProvider as keyof typeof providerModels]
                                                            .find(m => m.id === selectedModel)?.name
                                                    }
                                                </span>
                                            </>
                                        ) : (
                                            "Select a model..."
                                        )}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-72">
                                    {availableProviders.map(provider => (
                                        <DropdownMenuSub key={provider}>
                                            <DropdownMenuSubTrigger className="capitalize">
                                                {provider}
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuSubContent>
                                                {providerModels[provider as keyof typeof providerModels].map(model => (
                                                    <DropdownMenuItem 
                                                        key={model.id}
                                                        onClick={() => handleModelSelect(provider, model.id)}
                                                    >
                                                        <span className="flex items-center justify-between w-full">
                                                            {model.name}
                                                            {selectedModel === model.id && (
                                                                <Check className="w-4 h-4 ml-2" />
                                                            )}
                                                        </span>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuSubContent>
                                        </DropdownMenuSub>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </TabsContent>
                    <TabsContent value="settings" className="mt-4">
                        <div className="grid gap-4">
                            <Label className="text-gray-900 dark:text-white">Model Parameters</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-gray-700 dark:text-gray-300">Temperature</Label>
                                    <Input 
                                        type="number" 
                                        min="0" 
                                        max="1" 
                                        step="0.1" 
                                        value={temperature}
                                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-700 dark:text-gray-300">Max Tokens</Label>
                                    <Input 
                                        type="number"
                                        value={maxTokens}
                                        onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" 
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default ConfigureAgentDialog;