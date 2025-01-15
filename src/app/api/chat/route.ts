import { NextRequest, NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions.mjs';
import { z } from 'zod';

// Zod schemas for validation
const AgentModelSchema = z.object({
  provider: z.string(),
  name: z.string(),
  temperature: z.number(),
  maxTokens: z.number(),
}).nullable().optional();

const AgentToolSchema = z.object({
    name: z.string(),
    description: z.string(),
    type: z.string().optional(),
    id: z.string().optional(),
    config: z.record(z.any()).optional(),
});

const AgentDatabaseSchema = z.object({
  type: z.string(),
  url: z.string(),
  collections: z.array(z.string()).optional(),
}).nullable().optional();

const AgentNodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  config: z.record(z.any()),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }).optional(),
});

const AgentEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  type: z.string().optional(),
});

const AgentConfigSchema = z.object({
  goal: z.string().nullable().optional(),
  framework: z.string().nullable().optional(),
  adapter: z.string().nullable().optional(),
  model: AgentModelSchema,
  tools: z.array(AgentToolSchema).nullable().transform(val => val === null ? [] : val),
  database: AgentDatabaseSchema,
  nodes: z.array(AgentNodeSchema).default([]),
  edges: z.array(AgentEdgeSchema).default([]),
});

const UIActionSchema = z.object({
  type: z.enum(['show_graph', 'show_configure', 'show_code_gen', 'show_deploy']),
  data: z.any().optional(),
}).nullable().optional();

const AIResponseSchema = z.object({
  agent_config: AgentConfigSchema,
  response_message: z.string(),
  ui_action: UIActionSchema,
}).strict();

// Types derived from Zod schemas
type AgentConfig = z.infer<typeof AgentConfigSchema>;
type ResponseBody = z.infer<typeof AIResponseSchema>;

const SYSTEM_PROMPT = `You are an AI assistant helping to configure AI agents.
Your role is to analyze user requests and update agent configurations accordingly.
Consider:
- Framework selection (e.g., LangChain, AutoGPT)
- LLM provider and model settings
- Required tools and their configurations
- Database connections
- Agent architecture (nodes and edges)

IMPORTANT: Your response must be a valid JSON object with this exact structure:
{
  "agent_config": {
    "goal": string | null,
    "framework": string | null,
    "adapter": string | null,
    "model": {
      "provider": string,
      "name": string,
      "temperature": number,
      "maxTokens": number
    } | null,
    "tools": [], // Always use empty array instead of null
    "database": {
      "type": string,
      "url": string,
      "collections": string[]
    } | null,
    "nodes": [
      {
        "id": string,           // Required unique identifier
        "type": string,         // Type of node (e.g., "data_source", "processor", "model")
        "config": {             // Required configuration object
          "name": string,       // Node display name
          "description": string // Node description
        },
        "position": {           // Optional position
          "x": number,
          "y": number
        }
      }
    ],
    "edges": [
      {
        "id": string,           // Required unique identifier
        "source": string,       // ID of source node
        "target": string,       // ID of target node
        "type": string         // Optional edge type
      }
    ]
  },
  "response_message": string,
  "ui_action": null  // Only set for specific UI actions
}

Example node and edge structure:
{
  "nodes": [
    {
      "id": "node1",
      "type": "data_source",
      "config": {
        "name": "Data Input",
        "description": "Handles user data input"
      }
    }
  ],
  "edges": [
    {
      "id": "edge1",
      "source": "node1",
      "target": "node2",
      "type": "data_flow"
    }
  ]
}

Only set ui_action in these specific cases:
1. Set "show_graph" when user explicitly asks to see or visualize the agent graph
2. Set "show_configure" when user explicitly asks to configure or modify specific settings
3. Set "show_code_gen" when user asks to generate or see the code
4. Set "show_deploy" when user mentions deployment or publishing

For normal conversation about the agent, leave ui_action as null.
Your response_message should be your actual response to the user, while agent_config should reflect any updates to the configuration based on the user's request.`;

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { agent_config, user_request } = body;

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
      {
        role: 'user',
        content: JSON.stringify({
          current_config: agent_config,
          user_request,
        }, null, 2),
      },
    ];

    const completion = await groq.chat.completions.create({
      messages,
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 2000,
    });

    // Try to parse the AI's response
    let aiResponse: unknown;
    try {
      aiResponse = JSON.parse(completion.choices[0].message.content || '{}');
      console.log('Parsed AI Response:', JSON.stringify(aiResponse, null, 2));
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON response from AI' },
        { status: 500 }
      );
    }

    // Validate the response against our schema
    const validationResult = AIResponseSchema.safeParse(aiResponse);

    if (!validationResult.success) {
      console.error('Validation error:', JSON.stringify(validationResult.error.format(), null, 2));
      return NextResponse.json(
        { 
          error: 'Invalid response structure from AI', 
          details: validationResult.error.format(),
          response: aiResponse
        },
        { status: 500 }
      );
    }

    const response: ResponseBody = {
      agent_config: {
        ...agent_config,
        ...validationResult.data.agent_config,
      },
      response_message: validationResult.data.response_message,
      ui_action: validationResult.data.ui_action,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing agent configuration:', error);
    return NextResponse.json(
      { error: 'Failed to process agent configuration' },
      { status: 500 }
    );
  }
}