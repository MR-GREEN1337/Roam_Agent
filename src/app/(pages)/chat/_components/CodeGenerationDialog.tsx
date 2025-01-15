import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Code, Download } from 'lucide-react';

const CodeGenerationDialog: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void }> = ({ 
    open, 
    onOpenChange 
}) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[700px] bg-white dark:bg-gray-900 border-gray-200/50 dark:border-gray-700">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                    <Code className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    Generate Agent Code
                </DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800">
                    <TabsTrigger value="preview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                        Code Preview
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                        Export Settings
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-4">
                    <div className="relative">
                        <div className="absolute top-2 right-2 flex gap-2">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
                            >
                                <Download className="w-4 h-4 mr-1" /> Download
                            </Button>
                            <Button 
                                size="sm" 
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                                Copy Code
                            </Button>
                        </div>
                        <pre className="p-4 bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-md rounded-lg 
                                    border border-gray-200/50 dark:border-gray-700/50 
                                    overflow-x-auto font-mono text-sm text-gray-800 dark:text-gray-300">
                            {`from langchain import Agent, Tool
from langchain.memory import ConversationBufferMemory
from langchain.chat_models import ChatOpenAI

# Initialize LLM
llm = ChatOpenAI(
    temperature=0.7,
    model="gpt-4-1106-preview"
)

# Create agent tools
tools = [
    Tool(
        name="Search",
        func=search.run,
        description="useful for searching information"
    )
]

# Initialize agent
agent = Agent(
    llm=llm,
    tools=tools,
    memory=ConversationBufferMemory()
)`}
                        </pre>
                    </div>
                </TabsContent>
                <TabsContent value="settings" className="mt-4">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label className="text-gray-900 dark:text-white">Project Structure</Label>
                            <Select>
                                <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                    <SelectValue placeholder="Select structure" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                    <SelectItem value="basic">Basic Script</SelectItem>
                                    <SelectItem value="module">Python Module</SelectItem>
                                    <SelectItem value="package">Full Package</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-900 dark:text-white">Output Format</Label>
                            <RadioGroup defaultValue="python" className="grid grid-cols-3 gap-4">
                                <Label
                                    className="flex items-center space-x-3 space-y-0 rounded-lg border 
                                             border-gray-200 dark:border-gray-700 p-4 cursor-pointer 
                                             hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                    htmlFor="python"
                                >
                                    <RadioGroupItem value="python" id="python" />
                                    <span className="text-gray-900 dark:text-white">Python</span>
                                </Label>
                                <Label
                                    className="flex items-center space-x-3 space-y-0 rounded-lg border 
                                             border-gray-200 dark:border-gray-700 p-4 cursor-pointer 
                                             hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                    htmlFor="notebook"
                                >
                                    <RadioGroupItem value="notebook" id="notebook" />
                                    <span className="text-gray-900 dark:text-white">Jupyter</span>
                                </Label>
                                <Label
                                    className="flex items-center space-x-3 space-y-0 rounded-lg border 
                                             border-gray-200 dark:border-gray-700 p-4 cursor-pointer 
                                             hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                    htmlFor="docker"
                                >
                                    <RadioGroupItem value="docker" id="docker" />
                                    <span className="text-gray-900 dark:text-white">Docker</span>
                                </Label>
                            </RadioGroup>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </DialogContent>
    </Dialog>
);

export default CodeGenerationDialog;