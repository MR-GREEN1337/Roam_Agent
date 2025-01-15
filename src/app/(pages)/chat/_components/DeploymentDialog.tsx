import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Rocket } from 'lucide-react';

const DeploymentDialog: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void }> = ({ 
    open, 
    onOpenChange 
}) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-900 border-gray-200/50 dark:border-gray-700">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                    <Rocket className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                    Deploy Agent
                </DialogTitle>
            </DialogHeader>
            <div className="grid gap-6">
                <div className="space-y-4">
                    <Label className="text-gray-900 dark:text-white">Deployment Target</Label>
                    <RadioGroup defaultValue="cloud" className="grid gap-4">
                        {[
                            { value: 'cloud', label: 'Cloud Deployment', description: 'Deploy to our managed cloud infrastructure' },
                            { value: 'local', label: 'Local Deployment', description: 'Run on your local machine or server' },
                            { value: 'docker', label: 'Docker Container', description: 'Deploy as a containerized application' }
                        ].map(({ value, label, description }) => (
                            <Label
                                key={value}
                                className="flex items-start space-x-3 space-y-0 rounded-lg 
                                         border border-gray-200 dark:border-gray-700 p-4 
                                         cursor-pointer 
                                         bg-white dark:bg-gray-900
                                         hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                htmlFor={value}
                            >
                                <RadioGroupItem value={value} id={value} className="mt-1" />
                                <div className="space-y-1">
                                    <span className="text-gray-900 dark:text-white font-medium">{label}</span>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                                </div>
                            </Label>
                        ))}
                    </RadioGroup>
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-white">Environment Variables</Label>
                    <div className="p-4 bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-md rounded-lg 
                                 border border-gray-200/50 dark:border-gray-700/50">
                        <pre className="text-sm text-gray-700 dark:text-gray-300">
                            {`OPENAI_API_KEY=sk-...
DEPLOYMENT_ENV=production
DEBUG_MODE=false`}
                        </pre>
                    </div>
                </div>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white">
                    <Rocket className="w-4 h-4 mr-2" /> Start Deployment
                </Button>
            </div>
        </DialogContent>
    </Dialog>
);

export default DeploymentDialog;