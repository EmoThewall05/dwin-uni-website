export type ButterflyState = 'hover' | 'rest' | 'active';

export interface Project {
  id: string;
  name: string;
  url: string;
  edgeWorkerUrl?: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: "AI" | "Web3" | "Creative" | "Security" | "Media";
  tags: string[];
  image: string;
  features: string[];
  stats: { label: string; value: string }[];
  accentColor: string;
  badge: string;
  techStack: string[];
  connectedProjects: string[]; // IDs of other projects this communicates with in the hub
  releaseVersion: string;
  architecture: {
    layer: string;
    details: string;
  }[];
  completionPercentage: number;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "emobies",
    name: "Emobies Mobile Fix",
    url: "https://play.google.com/store/apps/details?id=com.nxtbit.emobies_24",
    tagline: "Your Trusted Mobile Repair Partner & Dynamic Support Hub",
    description: "Full-stack mobile repair platform connecting customers with trusted technicians, delivery networks, and certified service centers.",
    longDescription: "Emobies is a comprehensive service platform designed for seamless repair complaints management, live technician chat, real-time delivery tracking, and loyalty rewards. Built entirely on a phone using Termux + Acode, with robust backend nodes and intelligent Gemini-powered troubleshooting.",
    category: "Creative",
    tags: ["Mobile Repair", "Live Support", "Delivery Tracking", "EmoCoins"],
    image: "/src/assets/emobies_logo.jpg",
    features: [
      "Repair Complaints: Submit, track, and manage complex repair lifecycles",
      "Live Support Chat: Direct real-time chat with assigned service technicians",
      "Delivery Boy Tracker: Instant updates on pickup and drop-off dispatches",
      "EmoCoins Rewards: Multi-generational loyalty credit minting engine",
      "Gemini AI Assistant: Auto-analyze device issues and suggest hardware fixes",
      "Superadmin Controls: Full technician allocation and service center assignments"
    ],
    stats: [
      { label: "Active Repairs", value: "12.4k+" },
      { label: "EmoCoins Minted", value: "5.8M" },
      { label: "Verified Centers", value: "140+" }
    ],
    accentColor: "from-cyan-500 to-blue-500",
    badge: "Repair Platform",
    techStack: ["Flutter 3.27.0", "Dart 3.6.0", "Node.js Express", "MongoDB Atlas"],
    connectedProjects: ["dwinstudio", "thewall-web3"],
    releaseVersion: "v1.0.4",
    architecture: [
      { layer: "Presentation Hub", details: "Flutter mobile application styled with Cupertino and Material adaptive widgets" },
      { layer: "Backend Nodes", details: "Node.js Express server hosted on Railway with MongoDB persistent state engines" },
      { layer: "AI Guardian Nodes", details: "Serverless Google Gemini API integration for real-time automated diagnostic feedback" }
    ],
    completionPercentage: 95
  },
  {
    id: "emowall-ai",
    name: "Emowall Ai 2.0",
    url: "https://play.google.com/store/apps/details?id=com.emobies.emowall",
    edgeWorkerUrl: "https://dwin-emothewall-ai.meradivin.workers.dev",
    tagline: "Your Family's Silent Guardian (Built from Dubai 🇦🇪 · Made for Kerala 🌿 · Free for Every Child 💚)",
    description: "Emowall AI 2.0 is the world's first multi-generational silent AI safety platform — built entirely on a phone 📱 using Termux + Acode, from Dubai, for Kerala's children.",
    longDescription: "Emowall AI 2.0 is the world's first multi-generational silent AI safety platform — built entirely on a phone 📱 using Termux + Acode, from Dubai, for Kerala's children. While other safety apps wait for a button press, Emowall acts before the child even realizes danger. Features include Silent Threat Detection, Multi-Layered Verification Chain, Butterfly Guardian for emotional wellness, and Animal Alert for wildlife danger identification. Powered by seven combined AI brains for maximum safety and efficiency.",
    category: "AI",
    tags: ["Child Safety", "Silent SOS", "AI Guardian", "Kerala"],
    image: "/src/assets/emowall_ai_logo.jpg",
    features: [
      "Silent Threat Detection: Sound, Smart Watch, and Phone Sensor Monitoring",
      "Multi-Layered Verification Chain: Parent, Relative, School, and Auto SOS",
      "Ten Protection Modes: Guardian, Shield, Care, Digital Amma, Child Doctor AI, etc.",
      "Butterfly Guardian: Emotional Wellness & Safe Space AI",
      "Animal Alert: Real-time AI Wildlife & Danger Identification",
      "Universal Watch Support: Integration with WearOS, Fitbit, Garmin, and more"
    ],
    stats: [
      { label: "Active Protection", value: "24/7" },
      { label: "AI Brains", value: "7" },
      { label: "Kerala Govt Schools", value: "Planned" }
    ],
    accentColor: "from-fuchsia-500 to-pink-500",
    badge: "AI Powered",
    techStack: ["Flutter 3.27.0", "Gemini API", "Claude API", "OpenAI API", "Android Foreground Service"],
    connectedProjects: ["emo-ai-pro", "thewall-web3"],
    releaseVersion: "v2.0.2+3",
    architecture: [
      { layer: "Detection Layer", details: "Always active Sound, Smart Watch, and Phone Sensor monitoring" },
      { layer: "Verification Chain", details: "Multi-step automated alert pipeline for parents, relatives, and school" },
      { layer: "Alert System", details: "Simultaneous WhatsApp, Telegram, Discord, and Police alerts with live location" }
    ],
    completionPercentage: 90
  },
  {
    id: "emo-ai-pro",
    name: "Emo Ai pro",
    url: "https://ai.e-mobies.com",
    tagline: "Professional Sentiment Analysis & Empathetic UI Engine",
    description: "Deep text-and-speech cognitive sentiment processing engine designed for real-time natural language emotional intelligence modeling.",
    longDescription: "Emo Ai pro is an enterprise-grade API suite and dashboard designed to interpret the underlying nuances of natural language inputs. Perfect for customer support enhancement, voice-responsive applications, and mental wellness tracking tools.",
    category: "AI",
    tags: ["Cognitive AI", "NLP", "Sentiment Analytics", "Enterprise API"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    features: [
      "Micro-expression sentiment analysis with multi-dimensional valence graphing",
      "SDK libraries supporting easy JavaScript, Python, and Rust imports",
      "GDPR-compliant anonymous cognitive profiling with ultra-low latency",
      "Context-aware empathetic dialog generation recommendations"
    ],
    stats: [
      { label: "API Requests / Min", value: "48k" },
      { label: "Analysis Accuracy", value: "98.4%" },
      { label: "Inference Latency", value: "45ms" }
    ],
    accentColor: "from-purple-500 to-indigo-500",
    badge: "Pro Enterprise",
    techStack: ["TensorFlow", "FastAPI", "TypeScript", "Node.js"],
    connectedProjects: ["emowall-ai", "emobies"],
    releaseVersion: "v3.1.0",
    architecture: [
      { layer: "Inference Model", details: "Quantized BERT Transformer deployed on edge-optimized GPU endpoints" },
      { layer: "API Gateway", details: "Rate-limiting Express proxy utilizing Redis cached sentiment vectors" },
      { layer: "Frontend Dashboard", details: "Recharts vector canvas rendering real-time sentiment stream fluctuations" }
    ],
    completionPercentage: 85
  },
  {
    id: "thewall-web3",
    name: "Thewall web3",
    url: "https://thewall-web3-iie7.vercel.app/",
    edgeWorkerUrl: "https://dwin-emothewall-05.meradivin.workers.dev",
    tagline: "Decentralized Billboard & Interactive Pixel Grid Canvas",
    description: "A collaborative decentralized billboard and NFT pixel canvas backed by immutable distributed ledgers and multi-chain tokens.",
    longDescription: "Thewall web3 empowers communities to secure, trade, and paint on a shared global canvas. Every block is an immutable asset that can be leased, updated, or tokenized, creating an ever-evolving digital monument of internet culture. Website: https://emobies05.github.io/public-/thewallweb3.html",
    category: "Web3",
    tags: ["Blockchain", "dApp", "NFT Canvas", "Decentralized Grid"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    features: [
      "Smart contract-governed grid coordinates with near-zero gas parameters",
      "Multi-chain compatibility including Ethereum, Polygon, and Solana",
      "Pixel leasing system with yield-generating smart lockups",
      "Interactive historical playback showing the complete evolution of the wall"
    ],
    stats: [
      { label: "Pixels Secured", value: "1.0M" },
      { label: "Wallet Connects", value: "35k+" },
      { label: "Total Transactions", value: "140k+" }
    ],
    accentColor: "from-amber-500 to-orange-500",
    badge: "Web3 Enabled",
    techStack: ["Ethers.js", "Solidity", "IPFS Node", "Tailwind CSS"],
    connectedProjects: ["emowall-ai", "emokey"],
    releaseVersion: "v1.1.2",
    architecture: [
      { layer: "Web3 Providers", details: "Direct JSON-RPC interface connecting browser wallets to deployed EVM contracts" },
      { layer: "Off-Chain Cache", details: "Subspace subgraph indexing pixel color updates for instant, real-time load times" },
      { layer: "Storage Nodes", details: "Metadata and historic canvas states backed up securely on Filecoin and IPFS" }
    ],
    completionPercentage: 70
  },
  {
    id: "ddott-tv",
    name: "Ddott.tv",
    url: "https://ddott.live/",
    tagline: "Interactive Creator Hub & Low-Latency Video Stream",
    description: "A futuristic ultra-high bandwidth live broadcasting hub designed for virtual creators and interactive visual shows.",
    longDescription: "Ddott.tv merges state-of-the-art interactive live video pipelines with modern creator customization tools. Designed to support real-time user-engagement plugins, chat-governed overlays, and smooth avatar capture integrations.",
    category: "Media",
    tags: ["Live Streaming", "Creator Economy", "Interactive Video", "WebRTC"],
    image: "/src/assets/ddott_tv_logo.jpg",
    features: [
      "Real-time sub-second WebRTC streaming protocols with auto-adjusting bitrates",
      "Interactive browser-rendered overlay systems triggered via viewer triggers",
      "Built-in support for OBS Studio, Streamlabs, and custom browser streams",
      "Integrated virtual camera filters utilizing customizable 3D models"
    ],
    stats: [
      { label: "Concurrent Viewers", value: "18k" },
      { label: "Daily Active Streams", value: "450+" },
      { label: "Stream Latency", value: "120ms" }
    ],
    accentColor: "from-rose-500 to-red-500",
    badge: "Live Media",
    techStack: ["WebRTC", "HLS Engine", "Socket.io", "React"],
    connectedProjects: ["emobies", "dwinstudio"],
    releaseVersion: "v2.2.0",
    architecture: [
      { layer: "Ingest Nodes", details: "RTMP and WebRTC media servers utilizing dynamic transcoding layers" },
      { layer: "Signaling Server", details: "Socket clusters managing sub-second feedback state machines" },
      { layer: "Player Canvas", details: "React player wrapper featuring custom custom-video render filters" }
    ],
    completionPercentage: 75
  },
  {
    id: "emo-key",
    name: "Emo key",
    url: "https://emokey.com",
    tagline: "Cryptographic Authentication & Biometric Identity Key",
    description: "Multi-layered physical & digital authentication system utilizing secure emotion-based custom passwords and WebAuthn standard.",
    longDescription: "Emo key is an industry-grade personal security tool, combining browser extension capabilities, physical authentication token guidelines, and cryptographic passwordless multi-factor security frameworks. It features an Active Simulator Sandbox, providing Cryptographic Authentication & Biometric Identity Key management.",
    category: "Security",
    tags: ["Cryptography", "MFA", "Privacy", "WebAuthn"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    features: [
      "WebAuthn passkey registration supporting hardware biometric scanners",
      "Advanced private key segmentation protecting against client-side memory scraping",
      "Zero-knowledge proof (ZKP) identity synchronization across devices",
      "Encrypted cloud backups utilizing distributed IPFS encrypted nodes"
    ],
    stats: [
      { label: "Keys Provisioned", value: "95k" },
      { label: "Breaches Prevented", value: "100%" },
      { label: "Setup Time", value: "30s" }
    ],
    accentColor: "from-emerald-500 to-teal-500",
    badge: "High Security",
    techStack: ["WebAuthn API", "Rust Core", "WebAssembly", "IndexedDB"],
    connectedProjects: ["thewall-web3", "emobies"],
    releaseVersion: "v1.4.1",
    architecture: [
      { layer: "Cryptography", details: "Elliptic curve cryptography (Ed25519) compiled into highly secure WebAssembly binaries" },
      { layer: "Extension Link", details: "Isolated client-runtime background scripts utilizing state-of-the-art WebAuthn" },
      { layer: "Vault Store", details: "Local double-encrypted hardware-backed Sandbox container storage" }
    ],
    completionPercentage: 88
  },
  {
    id: "dwinstudio",
    name: "Dwinstudio v4",
    url: "https://dwinstudiov4.e-mobies.com/",
    edgeWorkerUrl: "https://dwin-emothewall-05.meradivin.workers.dev",
    tagline: "Visual Integrated Production Suite & Builder Workspace",
    description: "The complete visual IDE and development workspace optimized for deploying rich, responsive components and expressive layouts.",
    longDescription: "Dwinstudio v4 is an advanced drag-and-drop code compiler and editor workspace. Built to streamline full-stack web development pipelines, visual design prototyping, and high-fidelity modular layout compiling.",
    category: "Creative",
    tags: ["Visual IDE", "Prototyping", "Builder Workspace", "TypeScript"],
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=800&q=80",
    features: [
      "Real-time reactive canvas rendering changes live inside an isolated sandbox",
      "Instant modular component generation and automated TypeScript compiler",
      "Integrated Git workspace controls and automatic serverless deployments",
      "Full design system sync supporting custom Tailwind code generation"
    ],
    stats: [
      { label: "Projects Compiled", value: "480k+" },
      { label: "Active Builders", value: "12,500" },
      { label: "Deploy Time", value: "< 4.0s" }
    ],
    accentColor: "from-violet-500 to-purple-500",
    badge: "Developer Tool",
    techStack: ["React 19", "Vite", "ESBuild", "Tailwind CSS"],
    connectedProjects: ["emobies", "ddott-tv"],
    releaseVersion: "v4.0.0",
    architecture: [
      { layer: "Sandboxed Editor", details: "Monaco Editor canvas wrapped in highly secure, isolated sandboxed iframe structures" },
      { layer: "Compiler", details: "Browser-side ESBuild bundle transpilation resolving dependency tree dynamically" },
      { layer: "Deployment Hub", details: "Secure REST pipeline uploading compiled builds straight into production edge servers" }
    ],
    completionPercentage: 92
  }
];

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  projectInterest: string;
  message: string;
  recipientEmail: string;
  timestamp: string;
}
