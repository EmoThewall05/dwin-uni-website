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
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
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
    ]
  },
  {
    id: "ddott-live",
    name: "Ddott.live",
    url: "https://ddott.live",
    tagline: "Live Interactive Media Streaming",
    description: "A premium, ultra-high bandwidth live broadcasting hub designed for virtual creators and interactive visual shows.",
    longDescription: "Ddott.live is a premium media streaming platform designed for interactive live content, creator engagement, and low-latency broadcasting, seamlessly integrated with the Dwin Universe.",
    category: "Media",
    tags: ["Live Streaming", "Media", "Interactive"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    features: ["Ultra-low latency live streaming", "Interactive creator tools", "Real-time viewer engagement"],
    stats: [{ label: "Concurrent Viewers", value: "1k+" }],
    accentColor: "from-rose-500 to-red-500",
    badge: "Media",
    techStack: ["React", "WebRTC", "Socket.io"],
    connectedProjects: ["ddott-tv"],
    releaseVersion: "v1.0.0",
    architecture: [{ layer: "Streaming Hub", details: "Low-latency WebRTC broadcast pipeline" }]
  },
  {
    id: "emowall-ai",
    name: "Emowall Ai 2.0",
    url: "https://web.emothewall.online",
    edgeWorkerUrl: "https://dwin-emothewall-ai.meradivin.workers.dev",
    tagline: "Next-Gen Intelligent Artwork & Infinite Nebula Canvas",
    description: "Generates high-fidelity emotional wallpapers and custom fluid neon art powered by sophisticated style-transfer neural networks.",
    longDescription: "Emowall Ai 2.0 transforms text, emotion vectors, and sound frequencies into bespoke, eye-safe high-resolution wallpaper sets. Featuring real-time high-fidelity rendering, 4K resolution exports, and an interactive voting system that feeds into collaborative community trends.",
    category: "AI",
    tags: ["Generative AI", "Wallpapers", "Style Transfer", "4K Art"],
    image: "/src/assets/images/emowall_ai_1782305659946.jpg",
    features: [
      "State-of-the-art neural style transfer matching targeted mood profiles",
      "Super-resolution 4K and 8K upscale engines running on server clusters",
      "Adaptive aspect ratio cropping for mobile, tablet, and widescreen setups",
      "Dynamic live-wallpaper particles and interactive fluid effects"
    ],
    stats: [
      { label: "Wallpapers Created", value: "1.6M+" },
      { label: "Daily Generations", value: "15,000+" },
      { label: "Render Time", value: "< 2.8s" }
    ],
    accentColor: "from-fuchsia-500 to-pink-500",
    badge: "AI Powered",
    techStack: ["Google GenAI", "PyTorch Core", "WebGPU", "Vite"],
    connectedProjects: ["emo-ai-pro", "thewall-web3"],
    releaseVersion: "v2.0.4",
    architecture: [
      { layer: "AI Diffusion Layer", details: "Custom serverless stable-style weights pipeline triggered via secure API gateways" },
      { layer: "Upscaler Engine", details: "Real-time bilinear refinement running on WebGL custom shaders for preview" },
      { layer: "Gallery Sync", details: "Fast global CDN caching for instant image distribution and upvote synchronization" }
    ]
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
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
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
    ]
  },
  {
    id: "thewall-web3",
    name: "Thewall web3",
    url: "https://web3.emothewall.online",
    edgeWorkerUrl: "https://dwin-emothewall-05.meradivin.workers.dev",
    tagline: "Decentralized Billboard & Interactive Pixel Grid Canvas",
    description: "A collaborative decentralized billboard and NFT pixel canvas backed by immutable distributed ledgers and multi-chain tokens.",
    longDescription: "Thewall web3 empowers communities to secure, trade, and paint on a shared global canvas. Every block is an immutable asset that can be leased, updated, or tokenized, creating an ever-evolving digital monument of internet culture.",
    category: "Web3",
    tags: ["Blockchain", "dApp", "NFT Canvas", "Decentralized Grid"],
    image: "/src/assets/images/thewall_web3_1782305674493.jpg",
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
    ]
  },
  {
    id: "ddott-tv",
    name: "Ddott.tv",
    url: "https://ddott.tv",
    tagline: "Interactive Creator Hub & Low-Latency Video Stream",
    description: "A futuristic ultra-high bandwidth live broadcasting hub designed for virtual creators and interactive visual shows.",
    longDescription: "Ddott.tv merges state-of-the-art interactive live video pipelines with modern creator customization tools. Designed to support real-time user-engagement plugins, chat-governed overlays, and smooth avatar capture integrations.",
    category: "Media",
    tags: ["Live Streaming", "Creator Economy", "Interactive Video", "WebRTC"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
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
    ]
  },
  {
    id: "emo-key",
    name: "Emo key",
    url: "https://emokey.com",
    tagline: "Cryptographic Authentication & Biometric Identity Key",
    description: "Multi-layered physical & digital authentication system utilizing secure emotion-based custom passwords and WebAuthn standard.",
    longDescription: "Emo key is an industry-grade personal security tool, combining browser extension capabilities, physical authentication token guidelines, and cryptographic passwordless multi-factor security frameworks.",
    category: "Security",
    tags: ["Cryptography", "MFA", "Privacy", "WebAuthn"],
    image: "/src/assets/images/emo_key_1782305692032.jpg",
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
    ]
  },
  {
    id: "dwinstudio",
    name: "Dwinstudio v4",
    url: "https://dwinstudio.com",
    edgeWorkerUrl: "https://dwin-emothewall-05.meradivin.workers.dev",
    tagline: "Visual Integrated Production Suite & Builder Workspace",
    description: "The complete visual IDE and development workspace optimized for deploying rich, responsive components and expressive layouts.",
    longDescription: "Dwinstudio v4 is an advanced drag-and-drop code compiler and editor workspace. Built to streamline full-stack web development pipelines, visual design prototyping, and high-fidelity modular layout compiling.",
    category: "Creative",
    tags: ["Visual IDE", "Prototyping", "Builder Workspace", "TypeScript"],
    image: "https://images.unsplash.com/photo-1618005198143-d3663bfe92a1?auto=format&fit=crop&w=800&q=80",
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
    ]
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
