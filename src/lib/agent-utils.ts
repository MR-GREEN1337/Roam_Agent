export interface AgentNode {
    id: string;
    type: 'llm' | 'tool' | 'database' | 'output';
    config: Record<string, any>;
    position?: { x: number; y: number };
  }
  
  export interface AgentEdge {
    id: string;
    source: string;
    target: string;
    type?: string;
  }
  
  export interface AgentConfig {
    goal?: string;
    framework?: string;
    adapter?: string;
    model?: {
      provider: string;
      name: string;
      temperature: number;
      maxTokens: number;
    };
    tools?: Array<{
      name: string;
      description: string;
      config?: Record<string, any>;
    }>;
    database?: {
      type: string;
      url: string;
      collections?: string[];
    };
    nodes: AgentNode[];
    edges: AgentEdge[];
  }
  
  // Predefined configurations for common agent types
  export const agentTemplates = {
    chatbot: {
      framework: 'langchain',
      adapter: 'openai',
      model: {
        provider: 'openai',
        name: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2000,
      },
      nodes: [
        {
          id: 'llm-1',
          type: 'llm',
          config: {
            model: 'gpt-4',
            temperature: 0.7,
          },
        },
        {
          id: 'output-1',
          type: 'output',
          config: {},
        },
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'llm-1',
          target: 'output-1',
        },
      ],
    },
    // Add more templates as needed
  };
  
  // Utility functions for agent configuration
  export const agentUtils = {
    createNode(type: AgentNode['type'], config: Record<string, any>): AgentNode {
      return {
        id: `${type}-${Date.now()}`,
        type,
        config,
      };
    },
  
    createEdge(source: string, target: string): AgentEdge {
      return {
        id: `edge-${Date.now()}`,
        source,
        target,
      };
    },
  
    validateConfig(config: AgentConfig): boolean {
      // Add validation logic here
      return true;
    },
  
    mergeConfigs(base: AgentConfig, updates: Partial<AgentConfig>): AgentConfig {
      return {
        ...base,
        ...updates,
        nodes: [...(base.nodes || []), ...(updates.nodes || [])],
        edges: [...(base.edges || []), ...(updates.edges || [])],
      };
    },
  };
  
  // Constants for available options
  export const AVAILABLE_FRAMEWORKS = ['langchain', 'autogpt', 'fixie'] as const;
  export const AVAILABLE_ADAPTERS = ['openai', 'anthropic', 'google'] as const;
  export const AVAILABLE_TOOLS = [
    'web-search',
    'calculator',
    'weather',
    'database',
  ] as const;