import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Code, Network, Settings2, Workflow } from 'lucide-react';

const ConfigureAgentDialog: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void }> = ({ 
    open, 
    onOpenChange 
}) => (
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
                        Adapter
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
                        <RadioGroup defaultValue="crewai" className="grid grid-cols-2 gap-4">
                            {[
                                { value: 'crewai', label: 'CrewAI', icon: Bot },
                                { value: 'langchain', label: 'LangChain', icon: Workflow },
                                { value: 'langgraph', label: 'LangGraph', icon: Network },
                                { value: 'pydanticai', label: 'Pydantic AI', icon: Code }
                            ].map(({ value, label, icon: Icon }) => (
                                <Label
                                    key={value}
                                    className="flex items-center space-x-3 space-y-0 rounded-lg 
                                             border border-gray-200 dark:border-gray-700 p-4 
                                             cursor-pointer 
                                             bg-white dark:bg-gray-900
                                             hover:bg-gray-50 dark:hover:bg-gray-800/50 
                                             transition-colors"
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
                        <Label className="text-gray-900 dark:text-white">LLM Adapter</Label>
                        <Select>
                            <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                <SelectValue placeholder="Select adapter" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                <SelectItem value="openai">OpenAI</SelectItem>
                                <SelectItem value="anthropic">Anthropic</SelectItem>
                                <SelectItem value="google">Google AI</SelectItem>
                                <SelectItem value="mistral">Mistral AI</SelectItem>
                            </SelectContent>
                        </Select>
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
                                    defaultValue="0.7"
                                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-700 dark:text-gray-300">Max Tokens</Label>
                                <Input 
                                    type="number"
                                    defaultValue="2048"
                                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" 
                                />
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
            <div className="mt-4">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
                    Save Configuration
                </Button>
            </div>
        </DialogContent>
    </Dialog>
);

export default ConfigureAgentDialog;