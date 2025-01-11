import { 
    Brain, 
    Blocks, 
    Workflow, 
    Download,
    Settings,
    Sparkles,
    Binary,
    Zap
  } from 'lucide-react'
  
  export const features = [
    {
      title: "Chat-Driven Creation",
      description: "Build your AI agent through natural conversation. No coding required - just describe what you want your agent to do.",
      icon: Sparkles
    },
    {
      title: "Framework Flexibility",
      description: "Choose from popular AI frameworks like LangChain, AutoGPT, or create custom implementations tailored to your needs.",
      icon: Blocks
    },
    {
      title: "Visual Flow Builder",
      description: "Design your agent's decision flow with an intuitive drag-and-drop interface. Modify and optimize with ease.",
      icon: Workflow
    },
    {
      title: "Instant Deployment",
      description: "Download your agent as a ready-to-run package or deploy directly to your preferred hosting platform.",
      icon: Download
    },
    {
      title: "Smart Defaults",
      description: "Pre-configured settings and optimized parameters ensure your agent works efficiently out of the box.",
      icon: Settings
    },
    {
      title: "Custom Abilities",
      description: "Enhance your agent with specific capabilities like web searching, data processing, or API interactions.",
      icon: Brain
    },
    {
      title: "Environment Setup",
      description: "Automatic generation of environment files, requirements, and documentation for seamless setup.",
      icon: Binary
    },
    {
      title: "Quick Integration",
      description: "Built-in connectors for popular platforms and services. Connect your agent to your existing tools.",
      icon: Zap
    }
  ]