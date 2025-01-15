import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AgentConfig } from '@/lib/types';
import { Background, Controls, MiniMap, ReactFlow, Handle, Position, NodeProps } from '@xyflow/react';
import { Network } from 'lucide-react';

// Custom Node Component
const CustomNode = ({ data, type }: NodeProps) => {
    const getNodeColor = (nodeType: string) => {
        switch (nodeType) {
            case 'data_source':
                return 'bg-blue-500';
            case 'processor':
            case 'data_processor':
                return 'bg-green-500';
            case 'model':
            case 'language_model':
                return 'bg-purple-500';
            case 'message_node':
                return 'bg-yellow-500';
            case 'planning_node':
                return 'bg-pink-500';
            case 'execution_node':
                return 'bg-indigo-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="group">
            <Handle 
                type="target" 
                position={Position.Left} 
                className="w-3 h-3 bg-gray-400" 
            />
            <div className={`p-4 rounded-lg shadow-lg ${getNodeColor(type)} w-48 text-white transition hover:scale-105`}>
                <div className="font-semibold">{data?.config?.name || 'Unnamed Node'}</div>
                <div className="text-sm opacity-80">{data?.config?.description || 'No description'}</div>
                <div className="text-xs mt-1 bg-black bg-opacity-20 px-2 py-1 rounded-full inline-block">
                    {type || 'unknown'}
                </div>
            </div>
            <Handle 
                type="source" 
                position={Position.Right} 
                className="w-3 h-3 bg-gray-400" 
            />
        </div>
    );
};

interface AgentGraphDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    agentConfig: AgentConfig;
}

const AgentGraphDialog: React.FC<AgentGraphDialogProps> = ({ open, onOpenChange, agentConfig }) => {
    // Transform nodes to include position if not present
    const nodes = agentConfig.nodes.map((node, index) => ({
        id: node.id,
        type: node.type,
        data: {
            config: node.config
        },
        position: node.position || {
            x: index * 250 + 100,
            y: 100 + (index % 2) * 100
        }
    }));

    const edges = agentConfig.edges.map(edge => ({
        ...edge,
        animated: true,
        style: { stroke: '#94a3b8' },
        type: 'smoothstep'
    }));

    const nodeTypes = {
        custom: CustomNode,
        data_source: CustomNode,
        processor: CustomNode,
        model: CustomNode,
        message_node: CustomNode,
        planning_node: CustomNode,
        execution_node: CustomNode,
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[90vw] max-h-[90vh] bg-white dark:bg-gray-900">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                        <Network className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        Agent Workflow Graph
                    </DialogTitle>
                </DialogHeader>
                <div className="h-[70vh] bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        fitView
                        className="bg-white/50 dark:bg-gray-900/50"
                        defaultEdgeOptions={{
                            type: 'smoothstep',
                            animated: true
                        }}
                    >
                        <Background 
                            className="opacity-5"
                            color="#94a3b8"
                        />
                        <Controls className="bg-white/90 dark:bg-gray-800/90" />
                        <MiniMap 
                            className="bg-white/90 dark:bg-gray-800/90"
                            nodeColor={node => {
                                switch (node.type) {
                                    case 'data_source': return '#3b82f6';
                                    case 'processor': return '#22c55e';
                                    case 'model': return '#a855f7';
                                    default: return '#94a3b8';
                                }
                            }}
                        />
                    </ReactFlow>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AgentGraphDialog;