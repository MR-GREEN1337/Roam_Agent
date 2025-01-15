import { Edge } from "@xyflow/react";

export interface Message {
    id: string;
    content: string;
    type: 'user' | 'assistant';
    timestamp: Date;
}

export interface AgentNode extends Node {
    config: any;
    type: any;
    id: any;
    position: { x: number; y: number; };
    data: {
        label: string;
        type: 'goal' | 'task' | 'tool' | 'output';
        config?: Record<string, any>;
    };
}

export interface AgentConfig {
    goal: string;
    framework: 'crewai' | 'langchain' | 'langgraph' | 'pydanticai' | '';
    adapter: string;
    nodes: AgentNode[];
    edges: Edge[];
}

export interface FloatingButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    className?: string;
}

export interface MessageBubbleProps {
    message: Message;
    // Optional props for additional functionality
    isLastMessage?: boolean;
    onRetry?: () => void;
    onDelete?: () => void;
}

export interface AgentGraphDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    agentConfig: AgentConfig;
}