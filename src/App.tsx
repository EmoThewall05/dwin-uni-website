/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion } from "motion/react";
import { 
  Tv, Wallet, Sparkles, BrainCircuit, Gamepad2, Key, Code2, 
  Terminal, ShieldCheck, Fingerprint, Globe, Mail, ArrowUpRight, 
  Coins, Play, Send, Zap, Eye, EyeOff, Hexagon, ChevronRight, Activity, Grid, 
  ExternalLink, Layers, Monitor, Phone, Info, Clock, AlertTriangle, CheckCircle, Trash2,
  Wrench, Truck, User, MapPin, MessageSquare, Cpu, Lock, Unlock, Settings, Check, AlertCircle,
  Gauge, Sliders, Database, Camera, Facebook, Instagram, Linkedin, Twitter
} from "lucide-react";
import { PROJECTS_DATA, Project, ContactMessage, ButterflyState } from "./types";
import { ProjectAssistant } from "./components/ProjectAssistant";
import { EmoKeyChat } from "./components/EmoKeyChat";
import { EmoKeyGenerator } from "./components/EmoKeyGenerator";
import { LazyImage } from "./components/LazyImage";
import { EmowallDetails } from "./components/EmowallDetails";
import { EmoAiProDetails } from "./components/EmoAiProDetails";
import { QrReader } from "react-qr-reader";

export default function App() {
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(PROJECTS_DATA[0]);
  const [viewMode, setViewMode] = useState<"sandbox" | "showcase">("sandbox");
  const [showTerminal, setShowTerminal] = useState<boolean>(true);
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const [globalCoins, setGlobalCoins] = useState<number>(() => {
    const saved = localStorage.getItem("emo_coins");
    return saved ? parseInt(saved, 10) : 45;
  });

  // Terminal Simulator State
  const [terminalInput, setTerminalInput] = useState<string>("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "DwinOS Kernel v4.2.0 loaded successfully.",
    "Root filesystem mounted: Termux@Android-Sandbox",
    "Type 'help' to explore available ecosystem systems.",
    "Enter 'mine' to claim your daily login +10 Emo Coins!",
    "",
    "Termux@divin-phone:~$ emobies",
    "Initializing Emobies Mobile Fix Core Platform...",
    "Status: [OK] Running live on Sandbox Simulator below."
  ]);

  // Ddott.TV Live Simulator State
  const [ddottComment, setDdottComment] = useState<string>("");
  const [ddottComments, setDdottComments] = useState<any[]>([
    { user: "DwinFan_99", text: "Dubai stream looking clean!", coins: 5, timestamp: "Just now" },
    { user: "AcodeCoder", text: "No laptop, no excuses! Absolute legend.", coins: 0, timestamp: "2 mins ago" },
    { user: "TheWallAlpha", text: "Secure transactions on Solana are instant.", coins: 15, timestamp: "5 mins ago" },
  ]);
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [streamViewers, setStreamViewers] = useState<number>(1420);
  const [streamAlert, setStreamAlert] = useState<string | null>(null);

  // TheWall 6-Chain Web3 Wallet State
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [walletBalances, setWalletBalances] = useState({
    ETH: 1.45,
    SOL: 24.8,
    MON: 320.5,
    ARB: 1250.0,
    BTC: 0.082,
    BASE: 4.82,
    EMO: 45
  });
  const [swapFrom, setSwapFrom] = useState<string>("SOL");
  const [swapTo, setSwapTo] = useState<string>("EMO");
  const [swapAmount, setSwapAmount] = useState<string>("2");
  const [isSwapSuccess, setIsSwapSuccess] = useState<boolean>(false);
  const [pixelColor, setPixelColor] = useState<string>("#06b6d4");
  const [pixelGrid, setPixelGrid] = useState<string[]>(() => {
    return Array(256).fill("#18181b");
  });
  const [walletLogs, setWalletLogs] = useState<string[]>([
    "TheWall 6-Chain Wallet engine initialized. Gasless Alchemy Node: Connected"
  ]);

  const [thewallSubTab, setThewallSubTab] = useState<"wallet" | "billboard" | "freeze" | "news">("wallet");
  const [walletFrozen, setWalletFrozen] = useState<boolean>(false);
  const [freezePinInput, setFreezePinInput] = useState<string>("");
  const [freezeLogs, setFreezeLogs] = useState<string[]>([]);

  // Emo AI Pro Butterfly State
  const [butterflyState, setButterflyState] = useState<ButterflyState>('hover');

  // Emo AI Pro Analyzer State
  const [analyzeText, setAnalyzeText] = useState<string>("");
  const [analyzingSentiment, setAnalyzingSentiment] = useState<boolean>(false);
  const [sentimentResult, setSentimentResult] = useState<any>({
    sentiment: "Curiosity",
    valence: 0.65,
    arousal: 0.55,
    confidence: "95%",
    empatheticResponse: "I see a deep spark of creative exploration in your thoughts. Let's build together!",
    colorAccent: "#8B5CF6"
  });

  // Contact Form State
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");
  const [contactProject, setContactProject] = useState<string>("all");
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error" | null; text: string }>({
    type: null,
    text: ""
  });
  const [formLogs, setFormLogs] = useState<string[]>([]);

  // Emowall AI 2.0 Extended Simulators State
  const [emowallSubTab, setEmowallSubTab] = useState<"wallpaper" | "butterfly" | "animal" | "watch" | "silent">("wallpaper");
  const [butterflyInput, setButterflyInput] = useState<string>("");
  const [butterflyChat, setButterflyChat] = useState<any[]>([
    { role: "ai", text: "Welcome to Butterfly Guardian. You are safe here. Whatever you share stays between us. How are you feeling today?", healing: false }
  ]);
  const [isHealingMode, setIsHealingMode] = useState<boolean>(false);
  const [animalSelection, setAnimalSelection] = useState<string>("cobra");
  const [scanningAnimal, setScanningAnimal] = useState<boolean>(false);
  const [animalScanResult, setAnimalScanResult] = useState<any>(null);
  const [activeSmartWatches, setActiveSmartWatches] = useState<string[]>([
    "Samsung Galaxy Watch", "Xiaomi / Mi Band"
  ]);
  const [smartWatchBattery, setSmartWatchBattery] = useState<number>(100);
  const [phoneSensorsActive, setPhoneSensorsActive] = useState<boolean>(true);
  const [silentSosActive, setSilentSosActive] = useState<boolean>(false);
  const [silentSosStep, setSilentSosStep] = useState<number>(0);
  const [silentSosLogs, setSilentSosLogs] = useState<string[]>([]);

  // Ddott.TV Extended Simulators State
  const [ddottSubTab, setDdottSubTab] = useState<"player" | "education" | "cinema">("player");
  const [mathAnswer, setMathAnswer] = useState<string>("");
  const [mathChecked, setMathChecked] = useState<boolean>(false);
  const [mathResultMsg, setMathResultMsg] = useState<string>("");
  const [activeCinemaNode, setActiveCinemaNode] = useState<string>("Dubai");
  const [cinemaOfflines, setCinemaOfflines] = useState<any[]>([
    { village: "Malappuram, Kerala 🌿", capacity: "120 screens", status: "Active • Spot synced", synced: true },
    { village: "Wayanad, Kerala 🌿", capacity: "85 screens", status: "Active • Spot synced", synced: true },
    { village: "Al Karama, Dubai 🇦🇪", capacity: "50 screens", status: "Active • Spot synced", synced: true }
  ]);

  // Emobies Mobile Fix State
  const [emobiesSubTab, setEmobiesSubTab] = useState<"complaints" | "chat" | "delivery" | "assistant" | "admin">("complaints");
  const [emobiesPhone, setEmobiesPhone] = useState<string>("");
  const [emobiesPassword, setEmobiesPassword] = useState<string>("");
  const [emobiesRole, setEmobiesRole] = useState<"user" | "superadmin" | null>(null);
  const [emobiesCoins, setEmobiesCoins] = useState<number>(350);
  const [emobiesPasswordObscured, setEmobiesPasswordObscured] = useState<boolean>(true);
  const [emobiesLoginFails, setEmobiesLoginFails] = useState<number>(0);
  const [emobiesLockUntil, setEmobiesLockUntil] = useState<number | null>(null);
  const [emobiesSecondsLeft, setEmobiesSecondsLeft] = useState<number>(0);
  const [emobiesShake, setEmobiesShake] = useState<boolean>(false);
  const [emobiesLoginError, setEmobiesLoginError] = useState<string | null>(null);
  
  // Repair Complaints Array
  const [emobiesComplaints, setEmobiesComplaints] = useState<any[]>([
    { 
      id: "EM-9842", 
      device: "iPhone 15 Pro", 
      issue: "Cracked screen & green flickering lines", 
      status: "Under Diagnosis", 
      assignedTech: "Rahul K.", 
      serviceCenter: "Kochi Tech Hub", 
      deliveryStatus: "Picked Up", 
      deliveryBoy: "Arjun S.", 
      emoCoinsReward: 150, 
      chatHistory: [
        { sender: "technician", text: "Hi, I have received your iPhone 15 Pro. The glass is badly shattered but the digitizer is working. Replacing screen shortly." }
      ] 
    },
    { 
      id: "EM-3049", 
      device: "Samsung Galaxy S24 Ultra", 
      issue: "Overheating & camera focus loading crash", 
      status: "Waiting for Parts", 
      assignedTech: "Anjali M.", 
      serviceCenter: "Trivandrum Repair Lab", 
      deliveryStatus: "Awaiting Pickup", 
      deliveryBoy: "Nandu P.", 
      emoCoinsReward: 200, 
      chatHistory: [
        { sender: "technician", text: "Diagnostic test shows standard camera assembly load failure. Waiting for sensor replacement from Dubai." }
      ] 
    }
  ]);
  
  const [selectedComplaintId, setSelectedComplaintId] = useState<string>("EM-9842");
  const [emobiesChatInput, setEmobiesChatInput] = useState<string>("");
  const [newDeviceModel, setNewDeviceModel] = useState<string>("");
  const [newDeviceIssue, setNewDeviceIssue] = useState<string>("");
  
  // Assistant queries
  const [emobiesAiQuery, setEmobiesAiQuery] = useState<string>("");
  const [emobiesAiResponses, setEmobiesAiResponses] = useState<any[]>([
    { role: "assistant", text: "Welcome to Emobies AI. How can I help you diagnose your mobile hardware issue today?" }
  ]);
  const [emobiesAiLoading, setEmobiesAiLoading] = useState<boolean>(false);

  // --- Dwin Studio v4.0 Sovereign Developer Workspace State ---
  const [dwinLoggedIn, setDwinLoggedIn] = useState<boolean>(false);
  const [dwinGitpat, setDwinGitpat] = useState<string>("ghp_sovereignDwinStudio40PremiumTkn");
  const [dwinEmoKey, setDwinEmoKey] = useState<string>("emo_guardian_AI_safety_active_2026");
  const [dwinActiveTab, setDwinActiveTab] = useState<"COMMAND CENTER" | "SYSTEM MONITOR" | "AI ROUTER" | "DATA CORE" | "AUTOMATION" | "SETTINGS">("COMMAND CENTER");
  const [dwinChatLoading, setDwinChatLoading] = useState<boolean>(false);
  const [dwinVoiceActive, setDwinVoiceActive] = useState<boolean>(false);
  const [dwinPrefillPrompt, setDwinPrefillPrompt] = useState<string>("");
  const [dwinLatencyVal, setDwinLatencyVal] = useState<number>(18);
  const [dwinUptimeVal, setDwinUptimeVal] = useState<number>(99.99);
  
  const [dwinGlowTheme, setDwinGlowTheme] = useState<"green" | "orange" | "violet" | "mix">("mix");
  const [dwinShowPlacesDropdown, setDwinShowPlacesDropdown] = useState<boolean>(false);
  const [dwinShowGlowDropdown, setDwinShowGlowDropdown] = useState<boolean>(false);
  const [dwinSidebarCollapsed, setDwinSidebarCollapsed] = useState<boolean>(false);

  const DWIN_PLACES_WEATHER = [
    { city: "Dubai", country: "UAE", temp: "44.0°C", condition: "Sunny ☀️", latencyOffset: 0 },
    { city: "Kerala", country: "India", temp: "29.5°C", condition: "Heavy Rain 🌧️", latencyOffset: -6 },
    { city: "London", country: "UK", temp: "17.2°C", condition: "Cloudy ☁️", latencyOffset: 12 },
    { city: "New York", country: "USA", temp: "22.8°C", condition: "Clear 🌤️", latencyOffset: 24 },
    { city: "Tokyo", country: "Japan", temp: "25.1°C", condition: "Windy 💨", latencyOffset: 18 }
  ];
  const [dwinSelectedPlace, setDwinSelectedPlace] = useState(DWIN_PLACES_WEATHER[0]);

  // AI Engines Configuration
  const [dwinActiveEngine, setDwinActiveEngine] = useState<string>("GEMINI Pro 1.5");
  const [dwinHighThinking, setDwinHighThinking] = useState<boolean>(true);

  // Custom project context lists for Dwin Studio
  const [dwinProjects, setDwinProjects] = useState<any[]>([
    { id: "proj-1", name: "Dwin Studio Mobile Core", desc: "A custom Termux-optimized mobile code compiling core." },
    { id: "proj-2", name: "Emobies Client Portal", desc: "React micro-frontend and repair diagnostics system modules." },
    { id: "proj-3", name: "TheWall Solana NFT", desc: "Solana smart contracts tracking collaborative pixel placement." }
  ]);
  const [newDwinProjName, setNewDwinProjName] = useState<string>("");
  const [newDwinProjDesc, setNewDwinProjDesc] = useState<string>("");

  // Chat message feed for Dwin Studio
  const [dwinChats, setDwinChats] = useState<any[]>([
    {
      id: "init",
      role: "model",
      content: "SYSTEM ALERT: Sovereign developer core v4.0 is online. All 7 cognitive brains are linked. How shall we accelerate production today, commander?",
      timestamp: new Date().toISOString(),
      engine: "GEMINI Pro 1.5"
    }
  ]);
  const [dwinChatInput, setDwinChatInput] = useState<string>("");

  // Cryptographic API vault
  const [dwinKeys, setDwinKeys] = useState<any[]>([
    { id: "key-1", name: "GEMINI_API_KEY", key: "AIzaSyD-dwinSecureKeyAlphaBeta123...", status: "ACTIVE", type: "AI Secret" },
    { id: "key-2", name: "SOLANA_RPC_URL", key: "https://solana-mainnet.g.alchemy.com/v2/...", status: "ACTIVE", type: "Web3 Endpoint" },
    { id: "key-3", name: "EMOBIES_JWT_SECRET", key: "jwt-sovereign-dubai-kerala-2026-xyz...", status: "ACTIVE", type: "Auth Crypt" }
  ]);
  const [newKeyName, setNewKeyName] = useState<string>("");
  const [newKeyValue, setNewKeyValue] = useState<string>("");
  const [newKeyType, setNewKeyType] = useState<string>("AI Secret");

  // Dynamic Telemetry log simulation
  const [dwinLogs, setDwinLogs] = useState<string[]>([
    "DWIN v4 Kernels initialized successfully.",
    "Decentralized secure memory page locks: ENABLED",
    "Linked with Railway backend at: https://emobies-ap-135-production.up.railway.app",
    "Security checks passed: 100% stable."
  ]);

  const handleSendButterflyMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!butterflyInput.trim()) return;

    const userMsg = { role: "user", text: butterflyInput };
    const nextChat = [...butterflyChat, userMsg];
    setButterflyChat(nextChat);
    setButterflyInput("");

    const lower = userMsg.text.toLowerCase();
    let reply = "I hear you. Thank you for sharing that with me. I'm always here to listen.";
    let healing = false;

    if (lower.includes("sad") || lower.includes("cry") || lower.includes("alone") || lower.includes("lonely") || lower.includes("hurt") || lower.includes("depressed")) {
      reply = "I feel your sadness, and I want you to know you are not alone. Let's take a deep breath together. You are safe here. 💜";
      healing = true;
    } else if (lower.includes("scared") || lower.includes("fear") || lower.includes("afraid") || lower.includes("anxious") || lower.includes("panic") || lower.includes("danger") || lower.includes("help")) {
      reply = "Please take a slow, deep breath. I am holding a safe space for you right now. If there is immediate physical danger, remember that Emowall's Silent SOS is standing by. You are protected. 💜";
      healing = true;
    } else if (lower.includes("angry") || lower.includes("mad") || lower.includes("hate") || lower.includes("frustrated")) {
      reply = "It is completely okay to feel angry. Your feelings are valid. Let's rest here in this quiet space until the storm passes. 🌿";
      healing = false;
    } else if (lower.includes("happy") || lower.includes("good") || lower.includes("excited") || lower.includes("love") || lower.includes("great")) {
      reply = "That makes my wings flutter! Sharing joy makes the universe a brighter place. What else is on your mind? 🦋";
      healing = false;
    }

    if (healing) {
      setIsHealingMode(true);
      setButterflyState("Concerned");
    } else {
      setIsHealingMode(false);
      setButterflyState("Curious");
    }

    setTimeout(() => {
      setButterflyChat(prev => [
        ...prev,
        { role: "ai", text: reply, healing }
      ]);
    }, 1000);
  };

  const handleAnimalScan = (e: FormEvent) => {
    e.preventDefault();
    setScanningAnimal(true);
    setAnimalScanResult(null);

    const animals: { [key: string]: any } = {
      cobra: {
        name: "King Cobra (Ophiophagus hannah)",
        danger: "HIGH",
        urgency: "CRITICAL - IMMEDIATE EMERGENCY RESPONSE REQUIRED",
        warning: "ANTIVENOM REQUIRED — Rush to the nearest government hospital immediately!",
        firstAid: [
          "Keep the patient calm and completely still (movement spreads venom).",
          "Do NOT wash, cut, or suck the bite area.",
          "Apply a broad pressure immobilization bandage from the fingers/toes up the limb.",
          "Note the time of the bite and rush to hospital."
        ]
      },
      scorpion: {
        name: "Indian Red Scorpion (Hottentotta tamulus)",
        danger: "HIGH",
        urgency: "HIGH - RUSH TO EMERGENCY CARE",
        warning: "POTENTIALLY FATAL — Watch for cardiovascular symptoms.",
        firstAid: [
          "Keep the limb immobilized below the level of the heart.",
          "Apply a clean cool compress to reduce pain.",
          "Clean the sting site with mild soap and water.",
          "Transport immediately to emergency care."
        ]
      },
      dog: {
        name: "Stray Dog (Rabies Suspect)",
        danger: "MEDIUM",
        urgency: "URGENT - MEDICAL ATTENTION WITHIN 24 HOURS",
        warning: "RABIES PROTOCOL — Post-exposure prophylaxis required.",
        firstAid: [
          "Wash the wound thoroughly with plenty of running water and soap for 15 minutes.",
          "Apply an antiseptic like povidone-iodine if available.",
          "Do NOT suture or bind the wound tightly.",
          "Consult a doctor immediately for anti-rabies vaccine."
        ]
      },
      mosquito: {
        name: "Aedes Aegypti (Dengue Carrier)",
        danger: "LOW",
        urgency: "MONITOR SYMPTOMS over 3-7 days",
        warning: "NO IMMEDIATE ANTIDOTE REQUIRED — Prevent additional bites.",
        firstAid: [
          "Wash bite area with soap and water.",
          "Use insect repellents containing DEET or Picaridin.",
          "Apply hydrocortisone cream to reduce itching.",
          "Monitor for sudden high fever or joint pain."
        ]
      }
    };

    setTimeout(() => {
      setAnimalScanResult(animals[animalSelection]);
      setScanningAnimal(false);
    }, 1200);
  };

  const runSilentSosTest = () => {
    if (silentSosActive) return;
    setSilentSosActive(true);
    setSilentSosStep(1);
    setSilentSosLogs(["[INIT] Silent SOS triggered silently. Sound/Vibration = OFF, Screen Status = DARK"]);

    setTimeout(() => {
      setSilentSosStep(2);
      setSilentSosLogs(prev => [
        ...prev,
        "⚠️ Step 1: Parent/Guardian notified via WhatsApp + Call. No response in 60s window."
      ]);

      setTimeout(() => {
        setSilentSosStep(3);
        setSilentSosLogs(prev => [
          ...prev,
          "⚠️ Step 2: Relative notified via WhatsApp + Call. No response in 30s window."
        ]);

        setTimeout(() => {
          setSilentSosStep(4);
          setSilentSosLogs(prev => [
            ...prev,
            "⚠️ Step 3: School Principal notified via WhatsApp. No response in 30s window."
          ]);

          setTimeout(() => {
            setSilentSosStep(5);
            setSilentSosLogs(prev => [
              ...prev,
              "🚨 AUTO SOS TRIGGERED!",
              "• Dispatched to Kerala Police: 9497900000",
              "• Dispatched to Cyber Cell: 1930",
              "• Dispatched to Child Helpline: 1098",
              "• Dispatched to Women Helpline: 1091",
              "• Dispatching Live GPS Coordinates every 30 seconds."
            ]);
          }, 800);

        }, 1200);

      }, 1200);

    }, 1200);
  };

  const resetSilentSosTest = () => {
    setSilentSosActive(false);
    setSilentSosStep(0);
    setSilentSosLogs([]);
  };

  const handleCheckMathCheck = (e: FormEvent) => {
    e.preventDefault();
    const ans = mathAnswer.trim();
    if (ans === "10" || ans.toLowerCase() === "0x0a") {
      setMathResultMsg("Correct! Decrypt key validated. You earned +15 Emo Coins!");
      setGlobalCoins(prev => prev + 15);
      setMathChecked(true);
    } else {
      setMathResultMsg("Incorrect key computation. Try calculating the decimal of hex 0x0A again.");
    }
  };

  const handleNextMathQuestion = () => {
    setMathAnswer("");
    setMathChecked(false);
    setMathResultMsg("");
  };

  // Emobies Mobile Fix Handlers
  const handleEmobiesLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (emobiesLockUntil && Date.now() < emobiesLockUntil) {
      return;
    }

    const trimmedPhone = emobiesPhone.trim();
    const trimmedPw = emobiesPassword.trim();

    if (!trimmedPhone) {
      setEmobiesLoginError("Phone number is required");
      return;
    }
    if (!trimmedPw) {
      setEmobiesLoginError("Password is required");
      return;
    }

    // Dynamic browser SHA-256 computation to mimic Flutter client-side cryptography
    const msgBuffer = new TextEncoder().encode(trimmedPw);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPw = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    // The SHA-256 hash of "Emobies@2026!"
    const expectedHash = "f713e73cc354a5f36e4f169d27a69b76e579ef601a91e5e3477169fa37b01d15";

    if (trimmedPhone === "9847842172" && (trimmedPw === "Emobies@2026!" || hashedPw === expectedHash)) {
      setEmobiesRole("superadmin");
      setEmobiesLoginFails(0);
      setEmobiesLockUntil(null);
      setEmobiesLoginError(null);
      setTerminalLogs(prev => [
        ...prev,
        `[EMOBIES AUTH] Superadmin logged in. Secured Phone: 9847842172 | Client-Side Cryptography SHA-256 verified`,
      ]);
      setEmobiesPhone("");
      setEmobiesPassword("");
    } else {
      const nextFails = emobiesLoginFails + 1;
      setEmobiesLoginFails(nextFails);
      setEmobiesShake(true);
      setTimeout(() => setEmobiesShake(false), 500);

      if (nextFails >= 3) {
        const lockDuration = 30000; // 30 seconds
        const lockTime = Date.now() + lockDuration;
        setEmobiesLockUntil(lockTime);
        setEmobiesSecondsLeft(30);
        setEmobiesLoginError("🔒 Too many attempts. Wait 30 seconds.");
      } else {
        const left = 3 - nextFails;
        setEmobiesLoginError(`Wrong password · ${left} attempt${left === 1 ? "" : "s"} left`);
      }
      setEmobiesPassword("");
    }
  };

  const handleEmobiesLogout = () => {
    setEmobiesRole(null);
    setEmobiesLoginFails(0);
    setEmobiesLockUntil(null);
    setEmobiesLoginError(null);
  };

  const handleNewComplaintSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newDeviceModel.trim() || !newDeviceIssue.trim()) return;

    const newId = `EM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newComp = {
      id: newId,
      device: newDeviceModel.trim(),
      issue: newDeviceIssue.trim(),
      status: "Under Diagnosis",
      assignedTech: "Rahul K.",
      serviceCenter: "Kochi Tech Hub",
      deliveryStatus: "Awaiting Pickup",
      deliveryBoy: "Nandu P.",
      emoCoinsReward: 100,
      chatHistory: [
        { sender: "technician", text: `Hello! I am auto-assigned to diagnostic ticket ${newId}. Please describe the issue and physical state of your ${newDeviceModel.trim()}.` }
      ]
    };

    setEmobiesComplaints(prev => [newComp, ...prev]);
    setSelectedComplaintId(newId);
    setEmobiesCoins(prev => prev + 50); // EmoCoins reward
    setNewDeviceModel("");
    setNewDeviceIssue("");
    setEmobiesSubTab("chat"); // Auto switch to chat tab so user can communicate!
  };

  const handleSendEmobiesChatMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!emobiesChatInput.trim()) return;

    const userMsg = { sender: "user", text: emobiesChatInput.trim() };
    
    // Append user message
    setEmobiesComplaints(prev => prev.map(comp => {
      if (comp.id === selectedComplaintId) {
        return {
          ...comp,
          chatHistory: [...comp.chatHistory, userMsg]
        };
      }
      return comp;
    }));

    const userText = emobiesChatInput.trim().toLowerCase();
    setEmobiesChatInput("");

    // Schedule technician response
    setTimeout(() => {
      let techReply = "Got it! Let me run some quick test suites and get back to you with the results.";
      if (userText.includes("cost") || userText.includes("price") || userText.includes("how much")) {
        techReply = "The rough estimate for this repair is around 180 EmoCoins or ₹2,500 INR. We will confirm after full diagnostics.";
      } else if (userText.includes("when") || userText.includes("time") || userText.includes("ready") || userText.includes("how long")) {
        techReply = "Repairs typically take 3 to 5 hours once parts are in stock. Your status will update on your tracker instantly.";
      } else if (userText.includes("status") || userText.includes("update")) {
        techReply = "We are currently running testing protocols. Hardware modules are being checked for safety standards.";
      } else if (userText.includes("thank") || userText.includes("ok") || userText.includes("perfect")) {
        techReply = "You're welcome! We are committed to high-quality service. Let me know if you need anything else.";
      }

      setEmobiesComplaints(prev => prev.map(comp => {
        if (comp.id === selectedComplaintId) {
          return {
            ...comp,
            chatHistory: [...comp.chatHistory, { sender: "technician", text: techReply }]
          };
        }
        return comp;
      }));
    }, 1200);
  };

  const handleEmobiesAiSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!emobiesAiQuery.trim()) return;

    const query = emobiesAiQuery.trim();
    setEmobiesAiResponses(prev => [...prev, { role: "user", text: query }]);
    setEmobiesAiQuery("");
    setEmobiesAiLoading(true);

    setTimeout(() => {
      let diagnosis = "";
      const lower = query.toLowerCase();

      if (lower.includes("green line") || lower.includes("screen flickering") || lower.includes("lines")) {
        diagnosis = "🚨 GEMINI HARDWARE ANALYSIS: This is a classic AMOLED display voltage conflict. Common in target SDK upgrades or high heat. \n\n🔧 REPAIR PLAN:\n1. Check display ribbon cable connections for micro-corrosion.\n2. In 90% of cases, the display panel needs replacement. \n3. EmoCoins Cost: 250 Coins. Service Center assignment recommended: Kochi Tech Hub.";
      } else if (lower.includes("crash") || lower.includes("loading") || lower.includes("google play") || lower.includes("play store") || lower.includes("play loading")) {
        diagnosis = "🚨 GEMINI SOFTWARE ANALYSIS: Google Play loading crashes or boot-loops are often caused by Flutter API 35 upgrade target conflicts or cache overflow.\n\n🔧 WORKAROUND PLAN:\n1. Clear Play Store and Play Services storage caches.\n2. Force stop your Emobies client and relaunch.\n3. If compiling manually, make sure your Android Manifest has permission checks updated.";
      } else if (lower.includes("battery") || lower.includes("drain") || lower.includes("charge")) {
        diagnosis = "🚨 GEMINI POWER ANALYSIS: Rapid battery drain or slow charging cycles points to lithium cell degradation or background process wake-locks.\n\n🔧 REPAIR PLAN:\n1. Run calibration test cycles.\n2. Replace hardware cell if health percentage is under 80%.\n3. EmoCoins Cost: 120 Coins.";
      } else if (lower.includes("camera") || lower.includes("focus") || lower.includes("blur")) {
        diagnosis = "🚨 GEMINI CAMERA ANALYSIS: Camera focus loading crashes are usually hardware actuator failures inside the optical image stabilizer (OIS).\n\n🔧 REPAIR PLAN:\n1. Isolate focus sensors.\n2. Replace camera module assembly if autofocus coils are locked.\n3. EmoCoins Cost: 180 Coins.";
      } else {
        diagnosis = `🚨 GEMINI GENERAL DIAGNOSIS for: "${query}"\n\n1. Initial diagnosis suggests potential system-level optimization issue. \n2. We highly recommend submitting a formal Repair Complaint under the 'Complaints' tab to assign a local technician. \n3. Average repair estimate: 150 EmoCoins.`;
      }

      setEmobiesAiResponses(prev => [...prev, { role: "assistant", text: diagnosis }]);
      setEmobiesAiLoading(false);
    }, 1500);
  };

  // Emobies Lockout Timer Effect
  useEffect(() => {
    if (!emobiesLockUntil) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const left = Math.ceil((emobiesLockUntil - now) / 1000);
      if (left <= 0) {
        setEmobiesLockUntil(null);
        setEmobiesSecondsLeft(0);
        setEmobiesLoginFails(0);
        setEmobiesLoginError(null);
      } else {
        setEmobiesSecondsLeft(left);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [emobiesLockUntil]);

  // Time & Audio State/Refs
  const [currentTime, setCurrentTime] = useState<string>("");
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Sync localStorage with global Emo Coins
  useEffect(() => {
    localStorage.setItem("emo_coins", globalCoins.toString());
    setWalletBalances(prev => ({ ...prev, EMO: globalCoins }));
  }, [globalCoins]);

  // Update real-time clock indicator (Dubai/UTC timezone awareness)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Dubai is UTC+4
      const dubaiTime = new Date(now.getTime() + (now.getTimezoneOffset() + 240) * 60000);
      const timeStr = dubaiTime.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setCurrentTime(timeStr);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll terminal to bottom when logs update
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs]);

  // Simulated live viewer activity
  useEffect(() => {
    const viewerInterval = setInterval(() => {
      if (isLiveStreaming) {
        setStreamViewers(prev => Math.max(800, prev + Math.floor(Math.random() * 15) - 7));
      }
    }, 4000);
    return () => clearInterval(viewerInterval);
  }, [isLiveStreaming]);

  // --- Dwin Studio v4.0 Sovereign Telemetry & Logs Effect ---
  useEffect(() => {
    if (!dwinLoggedIn) return;
    const interval = setInterval(() => {
      // update latency
      setDwinLatencyVal(prev => {
        const base = 18 + dwinSelectedPlace.latencyOffset;
        const change = Math.floor(Math.random() * 5) - 2;
        const nextVal = base + change;
        return nextVal > 4 && nextVal < 80 ? nextVal : base;
      });

      // append mock telemetry logs
      const randomLogs = [
        `[SYNC] Vault API states synchronized successfully. Checksum matched.`,
        `[ROUTER] Cog load distribution normal (latency: ${dwinLatencyVal}ms).`,
        `[AI ENGINE] Pipeline routed to ${dwinActiveEngine} for core cognitive optimization.`,
        `[SOLANA] RPC latency pinged at ${dwinLatencyVal + 15}ms. All web3 nodes alive.`,
        `[STATE] Automatic secure cloud backup committed to data-store.json.`
      ];
      const selectedLog = randomLogs[Math.floor(Math.random() * randomLogs.length)];
      const timestamp = new Date().toISOString().split("T")[1].slice(0, 8);
      setDwinLogs(prev => [...prev.slice(-30), `[${timestamp}] ${selectedLog}`]);
    }, 4500);

    return () => clearInterval(interval);
  }, [dwinLoggedIn, dwinSelectedPlace, dwinActiveEngine, dwinLatencyVal]);

  // --- Dwin Studio v4.0 Sovereign Handlers ---
  const handleDwinLogin = (e: FormEvent) => {
    e.preventDefault();
    if (dwinGitpat.trim() && dwinEmoKey.trim()) {
      setDwinLoggedIn(true);
      // Trigger a success message in telemetry logs
      setDwinLogs(prev => [
        ...prev,
        `[${new Date().toISOString().split("T")[1].slice(0, 8)}] 🔑 SUPERADMIN IDENTITY AUTHENTICATED SUCCESSFULLY. WELCOME COMMANDER.`
      ]);
    }
  };

  const handleDwinLogout = () => {
    setDwinLoggedIn(false);
    setDwinLogs(prev => [
      ...prev,
      `[${new Date().toISOString().split("T")[1].slice(0, 8)}] 🔒 SESSION TERMINATED SAFELY.`
    ]);
  };

  const handleDwinAddProject = (e: FormEvent) => {
    e.preventDefault();
    if (!newDwinProjName.trim()) return;
    const newProj = {
      id: "proj-" + Date.now(),
      name: newDwinProjName.trim(),
      desc: newDwinProjDesc.trim() || "No description provided."
    };
    setDwinProjects(prev => [...prev, newProj]);
    setNewDwinProjName("");
    setNewDwinProjDesc("");
    setDwinLogs(prev => [
      ...prev,
      `[${new Date().toISOString().split("T")[1].slice(0, 8)}] 📂 NEW CONTEXT LOADED: ${newProj.name}`
    ]);
  };

  const handleDwinDeleteProject = (id: string) => {
    setDwinProjects(prev => prev.filter(p => p.id !== id));
    setDwinLogs(prev => [
      ...prev,
      `[${new Date().toISOString().split("T")[1].slice(0, 8)}] 📂 CONTEXT RELEASED.`
    ]);
  };

  const handleDwinAddKey = (e: FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim() || !newKeyValue.trim()) return;
    const newK = {
      id: "key-" + Date.now(),
      name: newKeyName.trim().toUpperCase(),
      key: newKeyValue.trim(),
      status: "ACTIVE",
      type: newKeyType
    };
    setDwinKeys(prev => [...prev, newK]);
    setNewKeyName("");
    setNewKeyValue("");
    setDwinLogs(prev => [
      ...prev,
      `[${new Date().toISOString().split("T")[1].slice(0, 8)}] 🔑 CRYPTOGRAPHIC KEY BOUND: ${newK.name}`
    ]);
  };

  const handleDwinToggleKeyStatus = (id: string) => {
    setDwinKeys(prev => prev.map(k => k.id === id ? { ...k, status: k.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" } : k));
  };

  const handleDwinDeleteKey = (id: string) => {
    setDwinKeys(prev => prev.filter(k => k.id !== id));
    setDwinLogs(prev => [
      ...prev,
      `[${new Date().toISOString().split("T")[1].slice(0, 8)}] 🔑 CRYPTOGRAPHIC KEY EXPUNGED.`
    ]);
  };

  const handleSendDwinMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!dwinChatInput.trim()) return;

    const userMsg = {
      id: "user-" + Date.now(),
      role: "user",
      content: dwinChatInput.trim(),
      timestamp: new Date().toISOString(),
      engine: dwinActiveEngine
    };

    setDwinChats(prev => [...prev, userMsg]);
    const currentInput = dwinChatInput.trim();
    setDwinChatInput("");
    setDwinChatLoading(true);

    // Call the same local model or simulate response based on our current architecture
    setTimeout(() => {
      let replyContent = "";
      const lower = currentInput.toLowerCase();

      if (lower.includes("solana") || lower.includes("rpc")) {
        replyContent = `⚙️ [COGNITIVE SPECS] Solana RPC Latency Report:\n\n1. Target endpoint is active with average response latency of ${dwinLatencyVal + 12}ms.\n2. Detected 2 dynamic load-balancer redirects. Fully operational.\n3. Recommend shifting key vault permissions to READ-ONLY.`;
      } else if (lower.includes("emocoin") || lower.includes("tokenomics")) {
        replyContent = `🪙 [COGNITIVE SPECS] EmoCoin Tokenomics Breakdown:\n\n- Active token ledger sync rate: 100%.\n- Current community gas threshold: 0.00002 SOL.\n- Rewards allocated per compilation: +50 EmoCoins.`;
      } else if (lower.includes("compile") || lower.includes("build")) {
        replyContent = `🚀 [COMPILER ENGINE] Target source verified. Compiling modules using browser-side ESBuild...\n\n- 3 static pages analyzed.\n- All components linked perfectly.\n- Deployment deployed successfully to CDN Edge server in 2.8s!`;
      } else {
        replyContent = `🤖 [${dwinActiveEngine}] Cognitive parsing completed successfully. \n\nI have evaluated your request regarding "${currentInput}". \nAll 7 digital brains have been calibrated to keep your workspace secure and fast.`;
      }

      const modelReply = {
        id: "reply-" + Date.now(),
        role: "model",
        content: replyContent,
        timestamp: new Date().toISOString(),
        engine: dwinActiveEngine
      };

      setDwinChats(prev => [...prev, modelReply]);
      setDwinChatLoading(false);
      setDwinLogs(prev => [
        ...prev,
        `[${new Date().toISOString().split("T")[1].slice(0, 8)}] 🤖 COGNITIVE COUPLING: ANSWER DELIVERED VIA ${dwinActiveEngine}`
      ]);
    }, 1200);
  };

  const handleDwinClearChat = () => {
    setDwinChats([
      {
        id: "cleared",
        role: "model",
        content: "Core conversation logs cleared successfully. Space ready for next command.",
        timestamp: new Date().toISOString(),
        engine: dwinActiveEngine
      }
    ]);
  };

  // Handle simulated terminal inputs
  const handleTerminalCommand = (e: FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let reply = "";
    const newLogs = [...terminalLogs, `Termux@divin-phone:~$ ${terminalInput}`];

    switch (cmd) {
      case "help":
        reply = "Commands:\n• 'projects' - List all apps\n• 'emobies' / 'run emobies' - Boot mobile repair fix hub\n• 'dwinstudio' - Boot Sovereign visual IDE\n• 'mine' - Claim daily coins\n• 'device' - Read phone specs\n• 'credits' - Creator info\n• 'clear' - Clear screen.";
        break;
      case "emobies":
      case "run emobies": {
        const proj = PROJECTS_DATA.find(p => p.id === "emobies");
        if (proj) {
          setSelectedProject(proj);
          setViewMode("sandbox");
          reply = "🚀 Launching Emobies Mobile Fix Core Platform Sandbox...";
        } else {
          reply = "Error: Emobies module not found.";
        }
        break;
      }
      case "dwinstudio":
      case "run dwinstudio": {
        const proj = PROJECTS_DATA.find(p => p.id === "dwinstudio");
        if (proj) {
          setSelectedProject(proj);
          setViewMode("sandbox");
          reply = "🚀 Launching Dwin Studio Sovereign Developer Workspace Sandbox...";
        } else {
          reply = "Error: Dwin Studio module not found.";
        }
        break;
      }
      case "emowall":
      case "run emowall": {
        const proj = PROJECTS_DATA.find(p => p.id === "emowall-ai");
        if (proj) {
          setSelectedProject(proj);
          setViewMode("sandbox");
          reply = "🚀 Launching Emowall AI 2.0 Nebula Wallpaper Engine Sandbox...";
        } else {
          reply = "Error: Emowall AI module not found.";
        }
        break;
      }
      case "emokey":
      case "run emokey": {
        const proj = PROJECTS_DATA.find(p => p.id === "emo-key");
        if (proj) {
          setSelectedProject(proj);
          setViewMode("sandbox");
          reply = "🚀 Launching Emo Key Cryptographic WebAuthn Passkey Vault Sandbox...";
        } else {
          reply = "Error: Emo Key module not found.";
        }
        break;
      }
      case "thewall":
      case "run thewall": {
        const proj = PROJECTS_DATA.find(p => p.id === "thewall-web3");
        if (proj) {
          setSelectedProject(proj);
          setViewMode("sandbox");
          reply = "🚀 Launching TheWall Web3 Decentralized Pixel Canvas Sandbox...";
        } else {
          reply = "Error: TheWall Web3 module not found.";
        }
        break;
      }
      case "ddott":
      case "run ddott": {
        const proj = PROJECTS_DATA.find(p => p.id === "ddott-tv");
        if (proj) {
          setSelectedProject(proj);
          setViewMode("sandbox");
          reply = "🚀 Launching Ddott.TV Ultra-low Latency Media Broadcaster Sandbox...";
        } else {
          reply = "Error: Ddott.TV module not found.";
        }
        break;
      }
      case "emoai":
      case "run emoai": {
        const proj = PROJECTS_DATA.find(p => p.id === "emo-ai-pro");
        if (proj) {
          setSelectedProject(proj);
          setViewMode("sandbox");
          reply = "🚀 Launching Emo AI Pro Empathetic Sentiment Analysis Sandbox...";
        } else {
          reply = "Error: Emo AI Pro module not found.";
        }
        break;
      }
      case "projects":
        reply = PROJECTS_DATA.map(p => `• [${p.badge}] ${p.name} - ${p.url}`).join("\n");
        break;
      case "mine":
        const lastMine = localStorage.getItem("last_mine_time");
        const now = Date.now();
        if (lastMine && now - parseInt(lastMine, 10) < 60000) {
          reply = "🚨 Anti-spam cooldown active! Please wait 1 minute before mining again.";
        } else {
          setGlobalCoins(prev => prev + 10);
          localStorage.setItem("last_mine_time", now.toString());
          reply = "🪙 Success! +10 Emo Coins minted directly onto your device key wallet.";
        }
        break;
      case "device":
        reply = "Device: Xiaomi Poco / F3 Pro\nOS: Termux v0.118 (Arch Linux Container)\nEditor: Acode Code Editor v1.8.4\nStatus: High Temperature - BUILDING AT SPEED 🔥";
        break;
      case "credits":
        reply = "Ecosystem Creator: @divin (Emobies05)\nRegion: Dubai, UAE 🇦🇪 / India 🇮🇳\nDomains: e-mobies.com, emothewall.online\nEmails: info@e-mobies.com, info@emothewall.online";
        break;
      case "clear":
        setTerminalLogs([]);
        setTerminalInput("");
        return;
      default:
        if (cmd.startsWith("cat ")) {
          const fileName = cmd.substring(4).trim();
          if (fileName === "readme.md") {
            reply = "# Dwin Universe Ecosystem\nBuilt entirely on mobile under sheer pressure and burning desire. No laptop, no boundaries, pure Web3 & AI freedom.";
          } else {
            reply = `cat: ${fileName}: No such file or directory in this block container.`;
          }
        } else {
          reply = `DwinOS: Command not found: '${cmd}'. Enter 'help' for suggestions.`;
        }
    }

    setTerminalLogs([...newLogs, ...reply.split("\n")]);
    setTerminalInput("");
  };

  // Web3 Wallet Connections Simulation
  const connectWeb3Wallet = () => {
    if (walletFrozen) {
      alert("🔴 Security Breach Shield Active: TheWall Wallet is currently FROZEN. Transactions are blocked. Enter your security PIN on the Lock tab to restore access.");
      return;
    }
    if (walletConnected) {
      setWalletConnected(false);
      setWalletAddress("");
      setWalletLogs(prev => [...prev, "Wallet disconnected cleanly."]);
    } else {
      const mockAddr = "0xTheWall_" + Math.random().toString(36).substring(2, 10).toUpperCase();
      setWalletConnected(true);
      setWalletAddress(mockAddr);
      setWalletLogs(prev => [
        ...prev,
        `Connected to TheWall Web3 Wallet! Address: ${mockAddr}`,
        "Cross-chain ledger synced: ETH, SOL, MON, ARB, BTC, BASE gasless standard balances online."
      ]);
    }
  };

  // Simulated Web3 Token Swap
  const handleSwapTokens = (e: FormEvent) => {
    e.preventDefault();
    if (walletFrozen) {
      alert("🔴 TRANSACTION REJECTED: Wallet is in FREEZE mode. Enter security PIN to unlock.");
      return;
    }
    if (!walletConnected) {
      alert("Please connect your Web3 Wallet first.");
      return;
    }

    const amount = parseFloat(swapAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid swap amount.");
      return;
    }

    // Check specific balance
    const currentBal = (walletBalances as any)[swapFrom];
    if (currentBal === undefined || currentBal < amount) {
      alert(`Insufficient ${swapFrom} balance.`);
      return;
    }

    // Dynamic mock exchange rates to EMO Coins
    const rates: { [key: string]: number } = {
      SOL: 15,
      ETH: 250,
      MON: 0.8,
      ARB: 0.15,
      BTC: 12000,
      BASE: 1.25
    };

    const rate = rates[swapFrom] || 1;
    const receivedEmo = Math.floor(amount * rate);

    setWalletBalances(prev => {
      const next: any = { ...prev };
      next[swapFrom] = Math.max(0, Number((next[swapFrom] - amount).toFixed(4)));
      return next;
    });

    setGlobalCoins(prev => prev + receivedEmo);

    setWalletLogs(prev => [
      ...prev,
      `🔄 SWAP EXECUTED: Swapped ${amount} ${swapFrom} for +${receivedEmo} EMO Coins.`,
      `Tx Hash: 0x${Math.random().toString(16).substring(2, 12)} (Gasless Alchemy Sponsor)`
    ]);

    setIsSwapSuccess(true);
    setTimeout(() => setIsSwapSuccess(false), 2000);
  };

  // Interactive Web3 NFT Canvas Cell Drawing
  const handlePixelClick = (index: number) => {
    if (walletFrozen) {
      alert("🔴 LEDGER WRITE BLOCKED: Wallet is currently locked in emergency freeze.");
      return;
    }
    if (!walletConnected) {
      alert("Please connect your Web3 Wallet to secure coordinates on TheWall!");
      return;
    }

    const updatedGrid = [...pixelGrid];
    updatedGrid[index] = pixelColor;
    setPixelGrid(updatedGrid);

    const x = index % 16;
    const y = Math.floor(index / 16);

    setWalletLogs(prev => [
      ...prev,
      `🎨 Coordinate Secured: [X: ${x}, Y: ${y}] color changed to ${pixelColor}.`,
      `EVM Block commitment queued. Gasless sponsored via Alchemy Gas Manager.`
    ]);
  };

  // Submit Ddott.TV comment & simulated chatbot response
  const handleSendDdottComment = (e: FormEvent) => {
    e.preventDefault();
    if (!ddottComment.trim()) return;

    const userComment = {
      user: walletConnected ? walletAddress.substring(0, 8) + "..." : "AnonymousViewer",
      text: ddottComment,
      coins: 0,
      timestamp: "Just now"
    };

    setDdottComments([userComment, ...ddottComments]);
    setDdottComment("");

    // AI Response Simulation triggers
    setTimeout(() => {
      const lower = userComment.text.toLowerCase();
      let aiReply = "Aesthetic stream, loving the mood!";
      if (lower.includes("coin") || lower.includes("earn")) {
        aiReply = "🪙 You can claim free Emo Coins directly using the local Termux terminal! Just type 'mine'!";
      } else if (lower.includes("wallet") || lower.includes("sol")) {
        aiReply = "🔒 Secure your layout block on TheWall 5-Chain Wallet. Connect your wallet to try out the pixel grid!";
      } else if (lower.includes("mobile") || lower.includes("phone")) {
        aiReply = "📱 True modular creator: Built strictly on Android using Termux + Acode. Absolute inspiration.";
      }

      setDdottComments(prev => [
        {
          user: "🤖 Emowall_AI_Bot",
          text: aiReply,
          coins: 0,
          timestamp: "Just now"
        },
        ...prev
      ]);
    }, 1500);
  };

  // Interactive Ddott.TV Creator Tip System
  const triggerSpotPayment = (amount: number) => {
    if (globalCoins < amount) {
      alert("Insufficient Emo Coins. Use the Termux console 'mine' command or swap some tokens to earn more!");
      return;
    }

    setGlobalCoins(prev => prev - amount);
    setStreamAlert(`⚡ Spot Payment Received! +${amount} EMO Coins from supportive fan!`);

    setDdottComments(prev => [
      {
        user: "⚡ Tip_Alert",
        text: `Tipped the channel ${amount} Emo Coins!`,
        coins: amount,
        timestamp: "Just now"
      },
      ...prev
    ]);

    setTimeout(() => {
      setStreamAlert(null);
    }, 4000);
  };

  // Call server-side Emo AI Pro sentiment analyzer API
  const handleAnalyzeSentiment = async (e: FormEvent) => {
    e.preventDefault();
    if (!analyzeText.trim()) return;

    setAnalyzingSentiment(true);
    try {
      const response = await fetch("/api/emo-ai-pro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: analyzeText })
      });
      const resData = await response.json();
      if (resData.success && resData.data) {
        setSentimentResult(resData.data);
      } else if (resData.data) {
        setSentimentResult(resData.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzingSentiment(false);
    }
  };

  // Contact Message handling
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      setFormStatus({ type: "error", text: "Please fill in all standard contact fields." });
      return;
    }

    const transportLog = [
      `Initializing SMTP handshake for domain: e-mobies.com`,
      `Routing submission to target email: info@e-mobies.com`,
      `Mirroring transmission backup to: info@emothewall.online`,
      `Origin client address: client-routing-node-dubai`,
      `Transfer completed successfully. [Status code: 250 OK]`
    ];

    setFormLogs(transportLog);
    setFormStatus({
      type: "success",
      text: "Thank you! Your project inquiry has been securely dispatched to the E-Mobies network."
    });

    // Clear fields
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 font-sans relative overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* Absolute Ambient Background Lights */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-radial from-violet-900/15 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-[800px] right-0 w-[600px] h-[600px] bg-radial from-cyan-900/10 via-transparent to-transparent pointer-events-none z-0" />

      {/* Global Status Bar */}
      <div className="w-full bg-[#09090b] border-b border-zinc-900 px-4 py-2 text-xs text-zinc-500 flex justify-between items-center z-50 relative font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            E-MOBIES ECOSYSTEM LIVE
          </span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline text-zinc-400">Node: e-mobies.com</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-cyan-400 font-bold">
            <Coins className="w-3.5 h-3.5 text-amber-500" />
            <span>{globalCoins} EMO COINS</span>
          </div>
          <span>DUBAI TIME: <span className="text-zinc-300">{currentTime || "04:00:00"}</span></span>
        </div>
      </div>

      {/* Modern Dashboard Header */}
      <header className="sticky top-0 z-40 bg-[#030303]/80 backdrop-blur-md border-b border-zinc-900 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <span className="font-display font-extrabold text-black text-xl tracking-wider">e</span>
            </div>
            <div>
              <h1 className="font-display font-extrabold text-lg leading-tight tracking-tight bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                E-MOBIES
              </h1>
              <span className="text-[10px] text-zinc-500 tracking-widest block uppercase font-mono font-bold">Dwin Universe</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-950/80 p-1 rounded-full border border-zinc-900">
            {["all", "AI", "Web3", "Creative", "Security", "Media"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                  activeTab === cat 
                    ? "bg-zinc-900 text-cyan-400 shadow-inner shadow-cyan-900/10 border border-zinc-800" 
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </nav>

          {/* Connected Wallet Indicator */}
          <div className="flex items-center gap-3">
            <button 
              onClick={connectWeb3Wallet}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                walletConnected 
                  ? "bg-emerald-950/40 border-emerald-500 text-emerald-400" 
                  : "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300"
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>{walletConnected ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "CONNECT WALLET"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-10 space-y-12">

        {/* Dynamic Hero Section & Terminal Workspace */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Creator Pitch & Branding */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-violet-950 to-purple-950/40 border border-violet-800/60 rounded-full text-xs text-violet-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
              A MOBILE-FIRST REVOLUTION
            </div>
            
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-zinc-100 tracking-tight leading-none">
              Built on Mobile. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-violet-500 bg-clip-text text-transparent">
                No excuses.
              </span>
            </h2>

            <p className="text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Every single component, smart contract, neural node, and video framework within the 
              <strong className="text-zinc-200"> Dwin Universe</strong> was programmed on an Android smartphone 
              utilizing Termux and Acode. We believe in high-fidelity decentralized tech built from anywhere, by anyone.
            </p>

            {/* Quick stats panel */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-zinc-900 font-mono">
              <div>
                <span className="text-xs text-zinc-500 block">CREATOR</span>
                <span className="text-sm font-bold text-zinc-300">@divin</span>
              </div>
              <div>
                <span className="text-xs text-zinc-500 block">ECOSYSTEM</span>
                <span className="text-sm font-bold text-zinc-300">7 Connected Apps</span>
              </div>
              <div>
                <span className="text-xs text-zinc-500 block">COMMUNITY SIZE</span>
                <span className="text-sm font-bold text-zinc-300">240k+ Active</span>
              </div>
            </div>

            {/* Creator Bio Spotlight Card */}
            <div className="bg-zinc-950/80 p-5 rounded-2xl border border-zinc-900/80 shadow-md flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex-shrink-0 border border-zinc-800 flex items-center justify-center font-bold text-lg text-cyan-400 font-mono">
                🇮🇳
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-zinc-200">Emobies05 — Divin</h4>
                  <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded uppercase tracking-wider">Dubai, UAE 🇦🇪</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Self-taught developer compiling high-end software directly from a mobile device. Pioneering offline screen integrations in local villages, community cinema projects, and robust biometric parental gates.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Termux Device Simulator */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-[#09090b] rounded-2xl border border-zinc-900 overflow-hidden shadow-2xl flex-1 flex flex-col min-h-[350px]">
              
              {/* Terminal Title Bar */}
              <div className="bg-[#0c0c0f] px-4 py-3 flex items-center justify-between border-b border-zinc-900">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-[11px] font-mono text-zinc-400 ml-2">termux@android-poco:~$</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900">
                  <Terminal className="w-3 h-3 text-cyan-500" />
                  <span>DwinOS_V4</span>
                </div>
              </div>

              {/* Terminal Content Screen */}
              <div className="p-4 font-mono text-xs text-zinc-300 flex-1 overflow-y-auto space-y-2 select-text max-h-[280px]">
                {terminalLogs.map((log, index) => (
                  <div key={index} className="whitespace-pre-wrap leading-relaxed text-zinc-400">
                    {log.startsWith("Termux@") ? (
                      <span className="text-cyan-400 font-bold">{log}</span>
                    ) : log.startsWith("🪙") ? (
                      <span className="text-amber-400 font-bold">{log}</span>
                    ) : log.startsWith("🚨") ? (
                      <span className="text-rose-400">{log}</span>
                    ) : (
                      log
                    )}
                  </div>
                ))}
                <div ref={terminalBottomRef} />
              </div>

              {/* Terminal Interactive Input Form */}
              <form onSubmit={handleTerminalCommand} className="p-3 bg-[#0c0c0f] border-t border-zinc-900 flex items-center">
                <span className="text-cyan-400 font-mono text-xs font-bold mr-2">~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type 'help' and press Enter..."
                  className="bg-transparent text-xs font-mono text-zinc-200 outline-none flex-1 placeholder:text-zinc-600 focus:ring-0"
                />
                <button
                  type="submit"
                  className="p-1.5 text-zinc-500 hover:text-cyan-400 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Filter Bar & App Marketplace Carousel */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-900 pb-5">
            <div>
              <h3 className="font-display font-extrabold text-2xl tracking-tight text-zinc-100 flex items-center gap-2">
                <span>The Dwin Project Matrix</span>
                <span className="text-[10px] uppercase tracking-widest font-mono bg-cyan-950/40 border border-cyan-800 text-cyan-400 px-2.5 py-0.5 rounded-full">
                  7 Core Nodes
                </span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                {viewMode === "showcase" 
                  ? "Explore the comprehensive developer showcase website with extensive documentation and high-fidelity project images."
                  : "Click any app module below to activate its live interactive simulator experience."
                }
              </p>
            </div>
            
            {/* Elegant Mode Switcher Toggle */}
            <div className="flex bg-[#09090b] p-1.5 rounded-xl border border-zinc-800 self-stretch md:self-auto shadow-inner shadow-black/60">
              <button
                onClick={() => setViewMode("showcase")}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all duration-300 ${
                  viewMode === "showcase"
                    ? "bg-gradient-to-r from-cyan-950 to-zinc-900 text-cyan-400 border border-cyan-800 shadow-md shadow-cyan-950/40"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>WEBSITE SHOWCASE</span>
              </button>
              <button
                onClick={() => setViewMode("sandbox")}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all duration-300 ${
                  viewMode === "sandbox"
                    ? "bg-gradient-to-r from-violet-950 to-zinc-900 text-violet-400 border border-violet-800 shadow-md shadow-violet-950/40"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>SANDBOX SIMULATORS</span>
              </button>
            </div>

            {/* Visual indicators */}
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span> Live Node</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-500"></span> Active Dev</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROJECTS_DATA
              .filter(p => activeTab === "all" || p.category === activeTab)
              .map((project) => {
                const isSelected = selectedProject?.id === project.id;
                return (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`group bg-[#09090b]/90 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between ${
                      isSelected 
                        ? "border-cyan-500/80 shadow-lg shadow-cyan-950/20 ring-1 ring-cyan-500/20 translate-y-[-4px]" 
                        : "border-zinc-900 hover:border-zinc-800 hover:translate-y-[-2px]"
                    }`}
                  >
                    <div>
                      {/* Image Preview with overlay gradient */}
                      <div className="h-40 w-full relative overflow-hidden bg-zinc-900">
                        {project.id === "ddott-live" ? (
                          <div className="w-full h-full flex items-center justify-center text-zinc-400 font-display text-2xl font-bold bg-zinc-950">
                            Ddott.tv
                          </div>
                        ) : (
                          <LazyImage
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent"></div>
                      </div>
                        <span className={`absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full font-mono border ${
                          project.badge.includes("Live") || project.badge.includes("Flagship")
                            ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-400"
                            : "bg-violet-950/60 border-violet-500/50 text-violet-400"
                        }`}>
                          {project.badge}
                        </span>
                      </div>

                      {/* Info block */}
                      <div className="p-5 space-y-2">
                        <h4 className="font-display font-extrabold text-lg text-zinc-100 flex items-center justify-between">
                          <span>{project.name}</span>
                          <span className="text-xs font-mono text-zinc-500 font-normal">{project.releaseVersion}</span>
                        </h4>
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                        {/* Project Health Progress Bar */}
                        <div className="pt-2">
                          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-1">
                            <span>Health</span>
                            <span>{project.completionPercentage}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                              style={{ width: `${project.completionPercentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-zinc-900 bg-zinc-950/40">
                      <div className="flex gap-1.5">
                        {project.tags.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="text-[9px] font-mono bg-zinc-900 text-zinc-500 px-1.5 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className={`text-[11px] font-mono font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform ${
                        isSelected ? "text-cyan-400" : "text-zinc-500 group-hover:text-zinc-300"
                      }`}>
                        {viewMode === "showcase" ? "View Details" : "Simulate"} <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        {/* Dynamic App Showcase or Sandbox depending on mode */}
        {selectedProject && viewMode === "showcase" && (
          <section className="bg-gradient-to-b from-[#09090b] to-[#040406] rounded-3xl border border-zinc-900 p-6 md:p-8 space-y-10 shadow-xl relative overflow-hidden animate-fadeIn">
            {/* Elegant Background Glow */}
            <div className={`absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br ${selectedProject.accentColor} opacity-[0.03] blur-[120px] pointer-events-none rounded-full`} />
            
            {/* Website Showcase Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-900 pb-6 relative z-10 font-sans">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-900 px-2 py-0.5 rounded uppercase font-bold">
                    Ecosystem Showcase Portal
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-zinc-500">Node Connected</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${selectedProject.accentColor} flex items-center justify-center text-black font-bold shadow-lg`}>
                    {selectedProject.id === "ddott-tv" && <Tv className="w-6 h-6" />}
                    {selectedProject.id === "thewall-web3" && <Wallet className="w-6 h-6" />}
                    {selectedProject.id === "emowall-ai" && <Sparkles className="w-6 h-6" />}
                    {selectedProject.id === "emo-ai-pro" && <BrainCircuit className="w-6 h-6" />}
                    {selectedProject.id === "emobies" && <Gamepad2 className="w-6 h-6" />}
                    {selectedProject.id === "emo-key" && <Key className="w-6 h-6" />}
                    {selectedProject.id === "dwinstudio" && <Code2 className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-3xl text-zinc-100 flex items-center gap-2 tracking-tight">
                      {selectedProject.name}
                      <span className="text-xs bg-zinc-900 text-zinc-400 px-2.5 py-0.5 rounded-full border border-zinc-800 font-mono font-normal uppercase">
                        {selectedProject.releaseVersion}
                      </span>
                    </h3>
                    <p className="text-sm text-zinc-400 font-mono tracking-wide mt-0.5">{selectedProject.tagline}</p>
                  </div>
                </div>
              </div>

              {/* Showcase Action Links */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <a 
                  href={selectedProject.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 md:flex-initial text-center justify-center flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-xs font-mono font-bold text-black transition-all shadow-lg shadow-cyan-950/20"
                >
                  <span>LAUNCH LIVE APPLICATION</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                {selectedProject.edgeWorkerUrl && (
                  <a 
                    href={selectedProject.edgeWorkerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 md:flex-initial text-center justify-center flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded-xl text-xs font-mono font-bold text-violet-400 transition-all"
                  >
                    <span>EDGE WORKER GATEWAY</span>
                    <Cpu className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Main Details Presentation Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 text-zinc-100 font-sans">
              
              {/* Left Column: Big Showcase Image & Fast Stats */}
              <div className="lg:col-span-5 space-y-6">
                <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl group">
                  <LazyImage 
                    src={selectedProject.image} 
                    alt={selectedProject.name} 
                    className="w-full h-[320px] opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                  
                  {/* Category Pill Tag */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className={`text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded border ${
                      selectedProject.category === "AI" ? "bg-fuchsia-950/80 border-fuchsia-500/50 text-fuchsia-400" :
                      selectedProject.category === "Web3" ? "bg-amber-950/80 border-amber-500/50 text-amber-400" :
                      selectedProject.category === "Creative" ? "bg-cyan-950/80 border-cyan-500/50 text-cyan-400" :
                      selectedProject.category === "Security" ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-400" :
                      "bg-rose-950/80 border-rose-500/50 text-rose-400"
                    }`}>
                      {selectedProject.category} MODULE
                    </span>
                  </div>
                </div>

                {/* Key Metrics Dashboard Counter Grid */}
                <div className="bg-zinc-950/60 rounded-2xl border border-zinc-900 p-5 space-y-4">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-500" />
                    <span>Real-Time Node Metrics</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                    {selectedProject.stats.map((stat, idx) => (
                      <div key={idx} className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-900 flex justify-between items-center group hover:border-zinc-800 transition-colors">
                        <span className="text-xs text-zinc-500 font-mono">{stat.label}</span>
                        <span className={`text-base font-bold bg-gradient-to-r ${selectedProject.accentColor} bg-clip-text text-transparent font-mono`}>
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Descriptions, Features, Tech Stack & Architecture */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Expanded Backstory Description */}
                <div className="bg-[#09090b]/80 p-6 rounded-2xl border border-zinc-900 space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block font-bold">Product Backstory & Vision</span>
                  <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Core Features list with checks */}
                <div className="bg-[#09090b]/40 p-6 rounded-2xl border border-zinc-900 space-y-4">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Key Architectural Features</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {selectedProject.features.map((feature, idx) => (
                      <div key={idx} className="bg-zinc-950/60 border border-zinc-900 p-3.5 rounded-xl flex items-start gap-2.5 hover:border-zinc-800 transition-all group">
                        <span className="text-emerald-500 text-xs mt-0.5 group-hover:scale-110 transition-transform">✔</span>
                        <span className="text-xs text-zinc-300 leading-relaxed font-sans">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Frame */}
                <div className="bg-[#09090b]/40 p-6 rounded-2xl border border-zinc-900 space-y-4">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-violet-500" />
                    <span>Integrated Frameworks & Tech Stack</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture Spec layers */}
                <div className="bg-[#09090b]/40 p-6 rounded-2xl border border-zinc-900 space-y-4">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-500" />
                    <span>Module Layers Architecture Spec</span>
                  </h4>
                  <div className="space-y-3">
                    {selectedProject.architecture.map((arch, idx) => (
                      <div key={idx} className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-900 space-y-1 hover:border-zinc-850 transition-all">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block bg-gradient-to-r ${selectedProject.accentColor} bg-clip-text text-transparent`}>
                          Layer {idx + 1}: {arch.layer}
                        </span>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">{arch.details}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connected Nodes Hub Map */}
                <div className="bg-[#09090b]/40 p-6 rounded-2xl border border-zinc-900 space-y-4">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-500" />
                    <span>Ecosystem Hub Connections</span>
                  </h4>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-950/40 p-4 rounded-xl border border-zinc-900/60">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">CONNECTED MATRIX INTERFACES</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.connectedProjects.map((projId, idx) => {
                          const connectedProj = PROJECTS_DATA.find(p => p.id === projId);
                          return (
                            <button 
                              key={idx}
                              onClick={() => {
                                const target = PROJECTS_DATA.find(p => p.id === projId);
                                if (target) setSelectedProject(target);
                              }}
                              className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-cyan-400 transition-colors"
                            >
                              {connectedProj ? connectedProj.name : projId}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="text-right md:text-left">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">COMMUNICATION PIPELINE</span>
                      <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Direct API Node Sync Active
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </section>
        )}

        {/* Dynamic App Sandbox - Shows the rich simulator based on selection */}
        {selectedProject && viewMode === "sandbox" && (
          <section className="bg-gradient-to-b from-[#09090b] to-[#050507] rounded-3xl border border-zinc-900 p-6 md:p-8 space-y-8 shadow-xl">
            
            {/* Simulation Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-6">
              <div className="space-y-1.5">
                <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">ACTIVE ACTIVE SIMULATOR SANDBOX</span>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${selectedProject.accentColor} flex items-center justify-center text-black`}>
                    {selectedProject.id === "ddott-tv" && <Tv className="w-5 h-5" />}
                    {selectedProject.id === "thewall-web3" && <Wallet className="w-5 h-5" />}
                    {selectedProject.id === "emowall-ai" && <Sparkles className="w-5 h-5" />}
                    {selectedProject.id === "emo-ai-pro" && <BrainCircuit className="w-5 h-5" />}
                    {selectedProject.id === "emobies" && <Gamepad2 className="w-5 h-5" />}
                    {selectedProject.id === "emo-key" && <Key className="w-5 h-5" />}
                    {selectedProject.id === "dwinstudio" && <Code2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-2xl text-zinc-100 flex items-center gap-2">
                      {selectedProject.name}
                      <span className="text-xs bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800 font-mono font-normal">
                        {selectedProject.category}
                      </span>
                    </h3>
                    <p className="text-sm text-zinc-400">{selectedProject.tagline}</p>
                  </div>
                </div>
              </div>

              {/* Direct Access URLs */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <a 
                  href={selectedProject.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 md:flex-initial text-center justify-center flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs font-mono font-bold text-zinc-300 transition-colors"
                >
                  <span>LIVE SITE</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                </a>
              </div>
            </div>

            {/* Main Interactive Workspaces */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: The actual app simulator sandbox widget */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* A. Ddott.TV Creator Platform Simulator */}
                {selectedProject.id === "ddott-tv" && (
                  <div className="bg-black rounded-2xl border border-zinc-900 overflow-hidden shadow-2xl relative">
                    
                    {/* Ddott Tab Switcher */}
                    <div className="flex bg-zinc-950 border-b border-zinc-900 p-1">
                      <button
                        onClick={() => setDdottSubTab("player")}
                        className={`flex-1 py-2 text-center text-xs font-mono font-bold rounded-lg transition-all ${
                          ddottSubTab === "player"
                            ? "bg-zinc-900 text-rose-500 border border-zinc-800"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        📺 LIVE FEED
                      </button>
                      <button
                        onClick={() => setDdottSubTab("education")}
                        className={`flex-1 py-2 text-center text-xs font-mono font-bold rounded-lg transition-all ${
                          ddottSubTab === "education"
                            ? "bg-zinc-900 text-rose-500 border border-zinc-800"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        📚 HEY STUDENTS
                      </button>
                      <button
                        onClick={() => setDdottSubTab("cinema")}
                        className={`flex-1 py-2 text-center text-xs font-mono font-bold rounded-lg transition-all ${
                          ddottSubTab === "cinema"
                            ? "bg-zinc-900 text-rose-500 border border-zinc-800"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        🎥 VILLAGE CINEMA
                      </button>
                    </div>

                    {ddottSubTab === "player" && (
                      <>
                        {/* Live Stream View Frame */}
                        <div className="relative aspect-video bg-zinc-950 flex items-center justify-center overflow-hidden">
                          {/* Interactive Canvas/Particle video replacement */}
                          <div className="absolute inset-0 bg-radial from-rose-950/30 via-zinc-950 to-zinc-950 flex flex-col items-center justify-center p-4 text-center">
                            <div className="w-16 h-16 rounded-full bg-rose-600/20 flex items-center justify-center animate-ping absolute"></div>
                            <div className="w-16 h-16 rounded-full bg-rose-600 flex items-center justify-center relative shadow-lg shadow-rose-600/30">
                              <Play className="w-6 h-6 text-white ml-1 fill-white" />
                            </div>
                            <span className="text-xs font-mono text-zinc-500 tracking-wider uppercase mt-4">Simulated High-Bandwidth WebRTC Stream</span>
                            <span className="text-[11px] text-rose-500 font-mono mt-1 font-bold animate-pulse">● BROADCASTING IN SECONDS...</span>
                          </div>

                          {/* Stream top header */}
                          <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10 font-mono text-xs">
                            <span className="bg-rose-600 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px] animate-pulse">LIVE</span>
                            <span className="bg-black/70 backdrop-blur-md text-zinc-300 px-2 py-0.5 rounded flex items-center gap-1 border border-zinc-800">
                              <Eye className="w-3.5 h-3.5 text-rose-400" />
                              <span>{streamViewers} VIEWERS</span>
                            </span>
                          </div>

                          {/* Stream payment alert overlay */}
                          {streamAlert && (
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center">
                              <Zap className="w-12 h-12 text-amber-400 animate-bounce" />
                              <h4 className="font-display font-extrabold text-lg text-amber-300 mt-2">{streamAlert}</h4>
                              <p className="text-xs text-zinc-400 mt-1">Creator earnings ledger synced dynamically with blockchain wallet.</p>
                            </div>
                          )}
                        </div>

                        {/* interactive stream controller bar */}
                        <div className="bg-zinc-950 p-4 border-t border-zinc-900 flex flex-wrap gap-2 items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-zinc-400">Fan Support Spot Payments:</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button 
                              onClick={() => triggerSpotPayment(5)}
                              className="bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-colors"
                            >
                              <Coins className="w-3.5 h-3.5" />
                              <span>5 EMO</span>
                            </button>
                            <button 
                              onClick={() => triggerSpotPayment(15)}
                              className="bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-colors"
                            >
                              <Coins className="w-3.5 h-3.5" />
                              <span>15 EMO</span>
                            </button>
                            <button 
                              onClick={() => triggerSpotPayment(50)}
                              className="bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-colors"
                            >
                              <Coins className="w-3.5 h-3.5 animate-pulse" />
                              <span>50 EMO</span>
                            </button>
                          </div>
                        </div>

                        {/* Chat messaging panel */}
                        <div className="p-4 bg-[#09090b] space-y-4">
                          <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Real-time Stream Comments</h4>
                            <span className="text-[10px] text-zinc-500 font-mono">Real-time DB Sync</span>
                          </div>

                          {/* Comment feed list */}
                          <div className="space-y-3 max-h-[140px] overflow-y-auto">
                            {ddottComments.map((c, idx) => (
                              <div key={idx} className="text-xs flex items-start justify-between bg-zinc-950 p-2.5 rounded-lg border border-zinc-900">
                                <div>
                                  <span className="font-bold font-mono text-zinc-300 block">{c.user}</span>
                                  <p className="text-zinc-400 mt-0.5">{c.text}</p>
                                </div>
                                <div className="flex items-center gap-1 text-zinc-500 font-mono">
                                  {c.coins > 0 && (
                                    <span className="bg-amber-950 text-amber-400 border border-amber-900/60 px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-0.5">
                                      +{c.coins} EMO
                                    </span>
                                  )}
                                  <span className="text-[10px]">{c.timestamp}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Comment input form */}
                          <form onSubmit={handleSendDdottComment} className="flex gap-2">
                            <input
                              type="text"
                              value={ddottComment}
                              onChange={(e) => setDdottComment(e.target.value)}
                              placeholder="Type an overlay trigger comment..."
                              className="bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none flex-1 focus:border-rose-500 transition-colors"
                            />
                            <button
                              type="submit"
                              className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 p-2 rounded-xl text-zinc-300 hover:text-rose-500 transition-colors"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          </form>
                        </div>
                      </>
                    )}

                    {ddottSubTab === "education" && (
                      <div className="p-6 bg-[#09090b] space-y-4">
                        <div className="border-b border-zinc-900 pb-2 flex justify-between items-center">
                          <h4 className="text-sm font-mono font-bold text-rose-500 uppercase">📚 Hey Students! Learning Node</h4>
                          <span className="text-[10px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded font-mono">NODE_ACTIVE</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Empowering students with decentralized study checkpoints. Resolve study nodes directly to mine clean utility credits!
                        </p>
                        
                        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 space-y-3">
                          <span className="text-[10px] text-zinc-500 font-mono uppercase block">CURRENT MATH CHECKPOINT</span>
                          <p className="text-xs font-mono text-zinc-300">
                            Calculate the decimal value of the Hexadecimal number <span className="text-rose-400 font-bold">0x0A</span>:
                          </p>
                          
                          <form onSubmit={handleCheckMathCheck} className="space-y-3">
                            <input
                              type="text"
                              value={mathAnswer}
                              disabled={mathChecked}
                              onChange={(e) => setMathAnswer(e.target.value)}
                              placeholder="Type your numeric answer (e.g. 10)"
                              className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none focus:border-rose-500 font-mono"
                            />
                            
                            <div className="flex gap-2">
                              {!mathChecked ? (
                                <button
                                  type="submit"
                                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-mono font-bold text-xs p-2 rounded-lg transition-colors"
                                >
                                  VALIDATE DECRYPT KEY
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={handleNextMathQuestion}
                                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono font-bold text-xs p-2 rounded-lg transition-colors"
                                >
                                  NEXT CHECKPOINT
                                </button>
                              )}
                            </div>
                          </form>

                          {mathResultMsg && (
                            <p className={`text-xs font-mono mt-2 p-2 rounded border ${
                              mathResultMsg.includes("Correct")
                                ? "bg-emerald-950/20 border-emerald-900/40 text-emerald-400"
                                : "bg-rose-950/20 border-rose-900/40 text-rose-400"
                            }`}>
                              {mathResultMsg}
                            </p>
                          )}
                        </div>

                        <div className="text-[10px] font-mono text-zinc-500 flex justify-between">
                          <span>Verified: Web3 Ledger Engine</span>
                          <span>Reward: +15 EMO Coins</span>
                        </div>
                      </div>
                    )}

                    {ddottSubTab === "cinema" && (
                      <div className="p-6 bg-[#09090b] space-y-4 font-mono text-xs">
                        <div className="border-b border-zinc-900 pb-2 flex justify-between items-center">
                          <h4 className="text-sm font-mono font-bold text-rose-500 uppercase">🎥 VILLAGE COMMUNITY CINEMA</h4>
                          <span className="text-[10px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded">OFFLINE_SYNC_ONLINE</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                          Establishing local community movie screens in villages. Syncing spot payment credits offline and publishing ledger accounts securely.
                        </p>

                        <div className="space-y-2">
                          <span className="text-[10px] text-zinc-500 uppercase block">Active Cinema Districts</span>
                          
                          {cinemaOfflines.map((node, idx) => (
                            <div key={idx} className="bg-zinc-950 p-3 rounded-lg border border-zinc-900 flex justify-between items-center">
                              <div>
                                <span className="font-bold text-zinc-300 block">{node.village}</span>
                                <span className="text-[10px] text-zinc-500">Infrastructure: {node.capacity}</span>
                              </div>
                              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-900/50 px-2 py-0.5 rounded">
                                {node.status}
                              </span>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            alert("Synced offline screen logbooks! Spot payment ledger matches blockchain signatures.");
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700 text-rose-400 font-bold p-2.5 rounded-xl transition-all text-xs"
                        >
                          MANUAL SECURE FORCE-SYNC SIGNATURES
                        </button>
                      </div>
                    )}

                  </div>
                )}

                {/* B. TheWall Web3 6-Chain Wallet Simulator */}
                {selectedProject.id === "thewall-web3" && (
                  <div className="bg-zinc-950 rounded-2xl border border-zinc-900 overflow-hidden shadow-2xl space-y-6 p-6">
                    
                    {/* TheWall Sub-Tabs */}
                    <div className="flex bg-zinc-900/40 border border-zinc-900 p-1 rounded-xl">
                      <button
                        onClick={() => setThewallSubTab("wallet")}
                        className={`flex-1 py-2 text-center text-[11px] font-mono font-bold rounded-lg transition-all ${
                          thewallSubTab === "wallet"
                            ? "bg-zinc-900 text-amber-400 border border-zinc-800"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        💼 PORTFOLIO & SWAP
                      </button>
                      <button
                        onClick={() => setThewallSubTab("billboard")}
                        className={`flex-1 py-2 text-center text-[11px] font-mono font-bold rounded-lg transition-all ${
                          thewallSubTab === "billboard"
                            ? "bg-zinc-900 text-amber-400 border border-zinc-800"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        🎨 COORDINATE BILLBOARD
                      </button>
                      <button
                        onClick={() => setThewallSubTab("freeze")}
                        className={`flex-1 py-2 text-center text-[11px] font-mono font-bold rounded-lg transition-all ${
                          thewallSubTab === "freeze"
                            ? "bg-zinc-900 text-amber-400 border border-zinc-800"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        ❄️ PIN FREEZE LOCK
                      </button>
                      <button
                        onClick={() => setThewallSubTab("news")}
                        className={`flex-1 py-2 text-center text-[11px] font-mono font-bold rounded-lg transition-all ${
                          thewallSubTab === "news"
                            ? "bg-zinc-900 text-amber-400 border border-zinc-800"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        📰 LIVE NEWS
                      </button>
                    </div>

                    {thewallSubTab === "wallet" && (
                      <div className="space-y-6">
                        {/* Multi-chain Asset Balances */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Multi-Chain Assets Ledger</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-mono">
                                GASLESS SPONSOR ENABLED
                              </span>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                                walletFrozen 
                                  ? "bg-rose-950 text-rose-400 border border-rose-900/50" 
                                  : walletConnected 
                                    ? "bg-emerald-950 text-emerald-400 border border-emerald-900/50" 
                                    : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                              }`}>
                                {walletFrozen ? "🛑 WALLET FROZEN" : walletConnected ? "EVM NODE ONLINE" : "WALLET DISCONNECTED"}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-900">
                              <span className="text-[10px] text-zinc-500 font-mono block">🌍 EARTH (ETH)</span>
                              <span className="text-sm font-bold font-mono text-zinc-300">{walletBalances.ETH} ETH</span>
                            </div>
                            <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-900">
                              <span className="text-[10px] text-zinc-500 font-mono block">🌟 SOUL (SOL)</span>
                              <span className="text-sm font-bold font-mono text-zinc-300">{walletBalances.SOL} SOL</span>
                            </div>
                            <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-900">
                              <span className="text-[10px] text-zinc-500 font-mono block">🌙 MOON (MON)</span>
                              <span className="text-sm font-bold font-mono text-zinc-300">{walletBalances.MON} MON</span>
                            </div>
                            <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-900">
                              <span className="text-[10px] text-zinc-500 font-mono block">🪐 ORBIT (ARB)</span>
                              <span className="text-sm font-bold font-mono text-zinc-300">{walletBalances.ARB} ARB</span>
                            </div>
                            <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-900">
                              <span className="text-[10px] text-zinc-500 font-mono block">₿ BIRTH (BTC)</span>
                              <span className="text-sm font-bold font-mono text-zinc-300">{walletBalances.BTC} BTC</span>
                            </div>
                            <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-900">
                              <span className="text-[10px] text-zinc-500 font-mono block">🔵 BASE (BASE)</span>
                              <span className="text-sm font-bold font-mono text-zinc-300">{walletBalances.BASE} BASE</span>
                            </div>
                            <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-800 col-span-2">
                              <span className="text-[10px] text-cyan-400 font-mono block">EMO COINS (EMO)</span>
                              <span className="text-sm font-bold font-mono text-amber-400">{globalCoins} EMO</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Swap Engine Split */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                          <motion.div
                            className="relative"
                            animate={{ scale: isSwapSuccess ? [1, 1.05, 1] : 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <form onSubmit={handleSwapTokens} className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-900 space-y-3">
                              <span className="text-[10px] font-mono text-zinc-500 uppercase block">SWAP TO EMOWALL COINS</span>
                              
                              <div className="space-y-1">
                                <label className="text-[10px] text-zinc-400 font-mono">Pay with chain asset:</label>
                                <select 
                                  value={swapFrom} 
                                  onChange={(e) => setSwapFrom(e.target.value)}
                                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                                >
                                  <option value="SOL">Solana (SOL)</option>
                                  <option value="ETH">Ethereum (ETH)</option>
                                  <option value="MON">Monad (MON)</option>
                                  <option value="ARB">Arbitrum (ARB)</option>
                                  <option value="BTC">Bitcoin (BTC)</option>
                                  <option value="BASE">Base (BASE)</option>
                                </select>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] text-zinc-400 font-mono">Amount to swap:</label>
                                <input 
                                  type="number" 
                                  step="any"
                                  value={swapAmount}
                                  onChange={(e) => setSwapAmount(e.target.value)}
                                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 font-mono"
                                />
                              </div>

                              <button 
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-bold text-xs p-2 rounded-lg transition-all shadow shadow-orange-950/20 font-mono"
                              >
                                EXECUTE GASLESS SWAP
                              </button>
                            </form>
                            {isSwapSuccess && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="absolute inset-0 bg-emerald-950/80 flex items-center justify-center rounded-xl"
                                >
                                  <Check className="w-12 h-12 text-emerald-400" />
                                </motion.div>
                            )}
                          </motion.div>

                          <div className="bg-zinc-900/20 p-4 rounded-xl border border-zinc-900 space-y-3">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Wallet Handshake Connection</span>
                            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                              Connect your decentralized address without seed phrases. Access Alchemy gas manager to execute transactions without gas fees.
                            </p>
                            
                            {walletConnected && (
                              <div className="bg-black/40 p-2.5 rounded-lg border border-zinc-900 font-mono text-[10px] text-zinc-300 break-all space-y-1">
                                <span className="text-zinc-500">Address:</span>
                                <p className="text-amber-400 font-bold">{walletAddress}</p>
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={connectWeb3Wallet}
                              className={`w-full py-2 rounded-lg text-xs font-mono font-bold transition-all border ${
                                walletConnected 
                                  ? "bg-zinc-900 text-rose-500 border-zinc-800 hover:bg-zinc-850" 
                                  : "bg-amber-500 hover:bg-amber-600 text-black border-amber-600"
                              }`}
                            >
                              {walletConnected ? "DISCONNECT HANDSHAKE" : "CONNECT OAUTH WALLET"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {thewallSubTab === "billboard" && (
                      <div className="space-y-4">
                        <div className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-900 space-y-2">
                          <span className="text-[10px] font-mono text-rose-500 block uppercase font-bold">Decentralized Coordinate Billboard</span>
                          <p className="text-xs text-zinc-400 leading-relaxed">
                            Draw pixels on the blockchain. Once secured, pixels persist across the Web3 ledger. Change colors below and click a square on the grid to write.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                          <div className="space-y-3 max-w-[200px] mx-auto">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-mono text-zinc-500 uppercase">Select Pixel Dye</span>
                              <div className="flex gap-1">
                                {["#06b6d4", "#ec4899", "#f59e0b", "#10b981", "#8b5cf6", "#f43f5e"].map((c) => (
                                  <button 
                                    key={c}
                                    onClick={() => setPixelColor(c)}
                                    style={{ backgroundColor: c }}
                                    className={`w-3.5 h-3.5 rounded-full border transition-all ${
                                      pixelColor === c ? "ring-2 ring-zinc-300 scale-110" : "scale-100"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Interactive Pixel Mesh Grid */}
                            <div className="bg-zinc-900 p-2 rounded-xl border border-zinc-900 flex justify-center">
                              <div className="grid grid-cols-16 gap-0.5 w-full max-w-[180px] aspect-square">
                                {pixelGrid.map((p, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => handlePixelClick(idx)}
                                    style={{ backgroundColor: p }}
                                    className="w-full h-full border border-zinc-950/20 hover:opacity-85 transition-opacity aspect-square rounded-[1px]"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3 text-xs leading-relaxed text-zinc-400">
                            <span className="text-[10px] font-mono text-zinc-500 block uppercase">SECURE PROOFS</span>
                            <ul className="space-y-1.5 list-disc pl-4 text-zinc-400">
                              <li>Gas fee: <span className="text-emerald-400 font-mono">0.00 EMO (Fully sponsored)</span></li>
                              <li>Chain: <span className="text-cyan-400 font-mono">Base (L2 Alchemy node)</span></li>
                              <li>Proof: <span className="text-zinc-500 font-mono">EVM SHA-256 Block commitment</span></li>
                            </ul>
                            <div className="bg-black/40 p-2.5 rounded-lg border border-zinc-900 text-[10px] text-zinc-500 font-mono leading-relaxed">
                              Drawing commits coordinates to public state. Requires wallet oauth handshake connected.
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {thewallSubTab === "freeze" && (
                      <div className="p-4 bg-zinc-900/30 border border-zinc-900 rounded-xl space-y-4">
                        <div className="border-b border-zinc-900 pb-2 flex justify-between items-center">
                          <h4 className="text-xs font-mono font-bold text-rose-500 uppercase">❄️ EMERGENCY WALLET FREEZE</h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                            walletFrozen ? "bg-rose-950 text-rose-400 animate-pulse" : "bg-emerald-950 text-emerald-400"
                          }`}>
                            {walletFrozen ? "STATUS: FROZEN" : "STATUS: UNLOCKED"}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                          In case of unauthorized device access, activate Emergency PIN Lock. This halts all outward smart contracts, freezing private keys and blocking balance withdrawals.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                          <div className="space-y-3">
                            <span className="text-[10px] text-zinc-500 uppercase font-mono block">ENTER SECURITY PIN</span>
                            <div className="flex gap-2">
                              <input
                                type="password"
                                maxLength={4}
                                value={freezePinInput}
                                onChange={(e) => setFreezePinInput(e.target.value.replace(/\D/g, ""))}
                                placeholder="4-Digit PIN"
                                className="bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 outline-none focus:border-rose-500 font-mono text-center w-24 tracking-widest"
                              />
                              <button
                                onClick={() => {
                                  if (freezePinInput.length !== 4) {
                                    alert("Please enter a valid 4-digit PIN.");
                                    return;
                                  }
                                  if (walletFrozen) {
                                    setWalletFrozen(false);
                                    setFreezeLogs(prev => [...prev, `[PIN] Wallet unlocked cleanly. Block state: UNLOCKED. Timestamp: ${new Date().toLocaleTimeString()}`]);
                                    setWalletLogs(prev => [...prev, "Emergency unfreeze executed successfully."]);
                                  } else {
                                    setWalletFrozen(true);
                                    setFreezeLogs(prev => [...prev, `[PIN] Emergency FREEZE activated. Block state: STATIC. Timestamp: ${new Date().toLocaleTimeString()}`]);
                                    setWalletLogs(prev => [...prev, "🛑 EMERGENCY PROTOCOL: Wallet frozen. All outbound routes blocked."]);
                                  }
                                  setFreezePinInput("");
                                }}
                                className={`flex-1 font-mono font-bold text-xs p-2 rounded-lg transition-colors ${
                                  walletFrozen 
                                    ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                                    : "bg-rose-600 hover:bg-rose-700 text-white"
                                }`}
                              >
                                {walletFrozen ? "UNFREEZE LEDGER" : "FREEZE WALLET NOW"}
                              </button>
                            </div>
                          </div>

                          <div className="bg-black/50 border border-zinc-900 rounded-lg p-3 h-[110px] overflow-y-auto font-mono text-[10px] text-zinc-500 space-y-1">
                            <span className="text-zinc-400 font-bold uppercase text-[9px] block">Security Log Entries</span>
                            {freezeLogs.length === 0 ? (
                              <p className="italic text-zinc-600">No security freeze actions triggered yet.</p>
                            ) : (
                              freezeLogs.map((log, idx) => (
                                <p key={idx} className={log.includes("FREEZE") ? "text-rose-400" : "text-emerald-400"}>{log}</p>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {thewallSubTab === "news" && (
                      <div className="p-4 bg-zinc-900/30 border border-zinc-900 rounded-xl space-y-3 font-mono text-xs">
                        <div className="border-b border-zinc-900 pb-2 flex justify-between items-center">
                          <h4 className="text-xs font-mono font-bold text-amber-400 uppercase">📰 COINDESK LIVE RSS FEED</h4>
                          <span className="text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded">REAL-TIME</span>
                        </div>
                        
                        <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                          {[
                            { title: "Monad L1 Devnet approaches 10,000 TPS in private beta trials", time: "10 mins ago", source: "CoinDesk" },
                            { title: "Solana mobile 'Seeker' registers over 140,000 preorders across EMEA region", time: "1 hr ago", source: "Helius Insights" },
                            { title: "Base Network L2 transaction cost drops to near-zero with EIP-4844 blobs", time: "3 hrs ago", source: "CoinGecko" },
                            { title: "Ethereum gas consumption reaches historic lows amid L2 compression protocols", time: "5 hrs ago", source: "EtherScan" },
                            { title: "Bitcoin stays rangebound above $65k as whales stack on sovereign reserves", time: "12 hrs ago", source: "Blockchain Ledger" }
                          ].map((news, idx) => (
                            <div key={idx} className="bg-black/40 p-2.5 rounded-lg border border-zinc-900/80 space-y-1">
                              <p className="text-zinc-200 font-medium leading-relaxed font-sans">{news.title}</p>
                              <div className="flex justify-between items-center text-[9px] text-zinc-500">
                                <span>{news.source}</span>
                                <span>{news.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Chain logs console */}
                    <div className="bg-black/80 rounded-lg p-3 border border-zinc-900 text-[10px] font-mono space-y-1 text-zinc-500 max-h-[80px] overflow-y-auto">
                      {walletLogs.map((log, idx) => (
                        <p key={idx} className="leading-tight">{log}</p>
                      ))}
                    </div>

                  </div>
                )}

                {/* C. Emowall AI 2.0 Details */}
                {selectedProject.id === "emowall-ai" && <EmowallDetails />}

                {/* D. Emo AI Pro Sentiment Analyzer Dashboard */}
                {selectedProject.id === "emo-ai-pro" && (
                  <div className="space-y-6">
                    <EmoAiProDetails state={butterflyState} setState={setButterflyState} />
                    <div className="bg-zinc-950 rounded-2xl border border-zinc-900 overflow-hidden shadow-2xl p-6 space-y-6">
                    
                    <form onSubmit={handleAnalyzeSentiment} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Cognitive Sentiment Profiling</h4>
                        <span className="text-[10px] text-zinc-500 font-mono">Sentiment API</span>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs text-zinc-300 font-mono">Enter a sentence or message to evaluate:</label>
                        <textarea
                          rows={2}
                          value={analyzeText}
                          onChange={(e) => setAnalyzeText(e.target.value)}
                          placeholder="e.g. Today we launched on UAE news hubs and I'm feeling incredibly grateful but also a little overwhelmed with all the new user reviews."
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-violet-500 transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={analyzingSentiment}
                        className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-extrabold text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-md shadow-violet-950/20"
                      >
                        <Activity className="w-4 h-4" />
                        <span>{analyzingSentiment ? "EVALUATING SENTIMENT..." : "RUN ANALYSIS"}</span>
                      </button>
                    </form>

                    {/* Sentiment Analysis Metrics Output */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                      
                      {/* Metric Compass Indicator */}
                      <div className="md:col-span-5 bg-zinc-900/40 border border-zinc-900 rounded-xl p-4 flex flex-col justify-center items-center text-center space-y-2">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase block">PRIMARY CATEGORY</span>
                        
                        {/* Dynamic emotion color ring */}
                        <div 
                          style={{ borderColor: sentimentResult.colorAccent }}
                          className="w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-500 shadow-inner"
                        >
                          <span className="text-xs font-mono text-zinc-400 font-bold block">CONFIDENCE</span>
                          <span className="text-sm font-bold text-zinc-200">{sentimentResult.confidence}</span>
                        </div>

                        <span className="text-base font-extrabold font-display" style={{ color: sentimentResult.colorAccent }}>
                          {sentimentResult.sentiment.toUpperCase()}
                        </span>
                      </div>

                      {/* Valence & Arousal Progress Metrics */}
                      <div className="md:col-span-7 bg-zinc-900/40 border border-zinc-900 rounded-xl p-4 flex flex-col justify-between space-y-3">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">Valence & Arousal Coefficients</span>
                        
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-1">
                              <span>VALENCE (Positivity)</span>
                              <span>{sentimentResult.valence > 0 ? `+${sentimentResult.valence}` : sentimentResult.valence}</span>
                            </div>
                            <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                              <div 
                                style={{ width: `${Math.max(0, Math.min(100, (sentimentResult.valence + 1.0) * 50))}%` }}
                                className="h-full bg-gradient-to-r from-red-500 via-zinc-400 to-emerald-500 transition-all duration-500"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-1">
                              <span>AROUSAL (Aesthetic Energy)</span>
                              <span>{sentimentResult.arousal}</span>
                            </div>
                            <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                              <div 
                                style={{ width: `${Math.max(0, Math.min(100, sentimentResult.arousal * 100))}%` }}
                                className="h-full bg-violet-500 transition-all duration-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-zinc-950/80 p-2.5 rounded border border-zinc-900">
                          <span className="text-[8px] font-mono text-zinc-500 uppercase block">Empathetic Response Recommendation</span>
                          <p className="text-[11px] text-zinc-300 italic mt-0.5 leading-relaxed">
                            "{sentimentResult.empatheticResponse}"
                          </p>
                        </div>
                      </div>

                    </div>
                    </div>

                  </div>
                )}

                {/* E. General / Static Project Feature Showcases (Emo Key) */}
                {selectedProject.id === "emo-key" && (
                  <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-6 space-y-6 animate-fadeIn">
                    <div className="h-44 w-full relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                      <LazyImage
                        src={selectedProject.image}
                        alt={selectedProject.name}
                        className="w-full h-full opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="text-[9px] font-mono bg-black/60 text-cyan-400 px-2 py-0.5 rounded border border-zinc-800 uppercase tracking-widest block w-fit mb-1">
                          ARCHITECTURAL MODULE BUILD
                        </span>
                        <h4 className="font-display font-extrabold text-lg text-white">{selectedProject.name} Engine</h4>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="text-xs font-mono text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2">
                        Core System Integration Parameters
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedProject.features.map((feat, idx) => (
                          <div key={idx} className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-lg flex items-start gap-2">
                            <span className="text-cyan-500 mt-0.5">✔</span>
                            <span className="text-xs text-zinc-300 leading-relaxed">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Interactive Dwin Studio v4.0 Sovereign Developer Workspace */}
                {selectedProject.id === "dwinstudio" && (
                  <div className="rounded-3xl border border-zinc-900 p-6 space-y-6 shadow-2xl animate-fadeIn transition-all duration-500 relative bg-zinc-950/95 overflow-hidden">
                    
                    {/* Glowing Accent Spot */}
                    <div className="absolute inset-0 pointer-events-none select-none z-0">
                      {dwinGlowTheme === "green" && <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-[100px] animate-pulse" />}
                      {dwinGlowTheme === "orange" && <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange-500/10 blur-[100px] animate-pulse" />}
                      {dwinGlowTheme === "violet" && <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-violet-600/10 blur-[100px] animate-pulse" />}
                      {dwinGlowTheme === "mix" && (
                        <>
                          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-emerald-500/5 blur-[100px] animate-pulse" />
                          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-violet-600/5 blur-[100px] animate-pulse" />
                        </>
                      )}
                    </div>

                    <div className="relative z-10 space-y-6">
                      
                      {/* Header Info Block */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-5">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="text-[9px] font-mono bg-violet-950/80 text-violet-400 px-2.5 py-0.5 rounded-full border border-violet-800 uppercase tracking-wider font-extrabold flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5 animate-spin-slow" />
                              <span>SOVEREIGN BUILDER HUB 👑</span>
                            </span>
                            <span className="text-xs text-zinc-500">Node Cluster: Dubai · Kerala</span>
                          </div>
                          
                          <h4 className="font-display font-black text-2xl text-zinc-100 flex items-center gap-2">
                            <Cpu className="w-6 h-6 text-violet-500" />
                            <span>Dwin Studio v4.0</span>
                            <span className="text-[10px] font-mono text-zinc-500 font-normal">Sovereign Elite</span>
                          </h4>
                          <p className="text-xs text-zinc-400 mt-1">
                            Visual Integrated Production Suite & Builder Workspace. Link your PAT and Emo Key to unlock compile pipelines.
                          </p>
                        </div>

                        {/* Top controls: Place Selector & Glow switcher */}
                        <div className="flex items-center gap-2">
                          
                          {/* Weather Hub Dropdown */}
                          <div className="relative">
                            <button
                              onClick={() => setDwinShowPlacesDropdown(!dwinShowPlacesDropdown)}
                              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5"
                            >
                              <span>🌍 Hub:</span>
                              <strong className="text-violet-400">{dwinSelectedPlace.city}</strong>
                              <span className="text-zinc-500 text-[8px]">▼</span>
                            </button>

                            {dwinShowPlacesDropdown && (
                              <div className="absolute right-0 top-9 z-50 w-44 bg-zinc-950 border border-zinc-800 rounded-xl p-1 shadow-xl space-y-0.5">
                                {DWIN_PLACES_WEATHER.map((pl) => (
                                  <button
                                    key={pl.city}
                                    onClick={() => {
                                      setDwinSelectedPlace(pl);
                                      setDwinShowPlacesDropdown(false);
                                    }}
                                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono transition flex justify-between items-center ${
                                      dwinSelectedPlace.city === pl.city
                                        ? "bg-violet-950/60 text-violet-400 font-bold border border-violet-800"
                                        : "text-zinc-400 hover:bg-zinc-900"
                                    }`}
                                  >
                                    <span>{pl.city}</span>
                                    <span className="text-[10px] text-zinc-500">{pl.temp}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Glow Switcher */}
                          <div className="relative">
                            <button
                              onClick={() => setDwinShowGlowDropdown(!dwinShowGlowDropdown)}
                              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5"
                            >
                              <span>✨ Glow:</span>
                              <strong className="text-violet-400 uppercase">{dwinGlowTheme}</strong>
                              <span className="text-zinc-500 text-[8px]">▼</span>
                            </button>

                            {dwinShowGlowDropdown && (
                              <div className="absolute right-0 top-9 z-50 w-36 bg-zinc-950 border border-zinc-800 rounded-xl p-1 shadow-xl space-y-0.5">
                                {["green", "orange", "violet", "mix"].map((gl) => (
                                  <button
                                    key={gl}
                                    onClick={() => {
                                      setDwinGlowTheme(gl as any);
                                      setDwinShowGlowDropdown(false);
                                    }}
                                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono transition uppercase ${
                                      dwinGlowTheme === gl
                                        ? "bg-violet-950/60 text-violet-400 font-bold border border-violet-800"
                                        : "text-zinc-400 hover:bg-zinc-900"
                                    }`}
                                  >
                                    {gl}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                        </div>
                      </div>

                      {/* LOGIN GATE SCREEN */}
                      {!dwinLoggedIn ? (
                        <div className="max-w-md mx-auto bg-zinc-900/40 p-6 rounded-3xl border border-zinc-850 space-y-5 animate-fadeIn">
                          <div className="flex flex-col items-center text-center space-y-2">
                            <Lock className="w-10 h-10 text-violet-500 animate-pulse" />
                            <h5 className="text-sm font-mono text-zinc-200 font-extrabold uppercase tracking-widest">
                              Sovereign Core Decryption Bridge
                            </h5>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                              Accessing the visual production compilers requires double cryptographic authorization. Prefill or enter credentials below.
                            </p>
                          </div>

                          <form onSubmit={handleDwinLogin} className="space-y-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">GitHub Personal Access Token (PAT)</label>
                              <div className="relative">
                                <input
                                  type="text"
                                  required
                                  value={dwinGitpat}
                                  onChange={(e) => setDwinGitpat(e.target.value)}
                                  placeholder="ghp_sovereignDwinStudio..."
                                  className="w-full bg-zinc-950 border border-zinc-850 rounded-xl pl-3 pr-20 py-2.5 text-xs text-zinc-250 font-mono focus:outline-none focus:border-violet-500 transition-colors"
                                />
                                <button
                                  type="button"
                                  onClick={() => setDwinGitpat("ghp_sovereignDwinStudio40PremiumTkn")}
                                  className="absolute right-2 top-2 text-[9px] font-mono bg-violet-950 hover:bg-violet-900 text-violet-400 px-2 py-1 rounded border border-violet-800 font-bold transition-all"
                                >
                                  PREFILL
                                </button>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Emo Guardian Safety Key</label>
                              <div className="relative">
                                <input
                                  type="password"
                                  required
                                  value={dwinEmoKey}
                                  onChange={(e) => setDwinEmoKey(e.target.value)}
                                  placeholder="emo_guardian_AI_safety..."
                                  className="w-full bg-zinc-950 border border-zinc-855 rounded-xl pl-3 pr-20 py-2.5 text-xs text-zinc-250 font-mono focus:outline-none focus:border-violet-500 transition-colors"
                                />
                                <button
                                  type="button"
                                  onClick={() => setDwinEmoKey("emo_guardian_AI_safety_active_2026")}
                                  className="absolute right-2 top-2 text-[9px] font-mono bg-violet-950 hover:bg-violet-900 text-violet-400 px-2 py-1 rounded border border-violet-800 font-bold transition-all"
                                >
                                  PREFILL
                                </button>
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-md tracking-widest uppercase flex items-center justify-center gap-2"
                            >
                              <Unlock className="w-4 h-4" />
                              <span>VALIDATE GATEWAY PROTOCOL</span>
                            </button>
                          </form>

                          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900 text-[10px] font-mono text-zinc-500 leading-relaxed space-y-1">
                            <span className="text-zinc-400 font-extrabold uppercase tracking-wider block">Secure Gateway Access:</span>
                            <p>Verify that your Node Cluster is fully synched before triggering compilation workflows. Local EmoCoin incentives apply to active sessions.</p>
                          </div>
                        </div>
                      ) : (
                        
                        // FULL LOGGED-IN STUDIO DASHBOARD
                        <div className="space-y-6 animate-fadeIn">
                          
                          {/* Inner Sub-Navigation Tabs */}
                          <div className="flex flex-wrap gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-900 overflow-x-auto">
                            {["COMMAND CENTER", "SYSTEM MONITOR", "AI ROUTER", "DATA CORE", "AUTOMATION"].map((tb) => {
                              const isAct = dwinActiveTab === tb;
                              return (
                                <button
                                  key={tb}
                                  onClick={() => setDwinActiveTab(tb as any)}
                                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-lg transition-all ${
                                    isAct
                                      ? "bg-violet-500 text-white font-extrabold shadow-md"
                                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                                  }`}
                                >
                                  {tb === "COMMAND CENTER" && <Terminal className="w-3.5 h-3.5" />}
                                  {tb === "SYSTEM MONITOR" && <Gauge className="w-3.5 h-3.5" />}
                                  {tb === "AI ROUTER" && <Sliders className="w-3.5 h-3.5" />}
                                  {tb === "DATA CORE" && <Database className="w-3.5 h-3.5" />}
                                  {tb === "AUTOMATION" && <Activity className="w-3.5 h-3.5" />}
                                  <span>{tb}</span>
                                </button>
                              );
                            })}

                            <button
                              onClick={handleDwinLogout}
                              className="ml-auto text-red-400 hover:bg-red-950/20 px-3 py-2 rounded-lg text-xs font-mono flex items-center gap-1"
                              title="Sign out of sovereign core session"
                            >
                              <Lock className="w-3 h-3" />
                              <span>Logout</span>
                            </button>
                          </div>

                          {/* Dynamic Tab Contents */}
                          <div className="min-h-[400px]">
                            
                            {/* TAB 1: COMMAND CENTER */}
                            {dwinActiveTab === "COMMAND CENTER" && (
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                                
                                {/* Left Side-Panel (Context & Actions) */}
                                <div className={`lg:col-span-4 space-y-4 ${dwinSidebarCollapsed ? "hidden lg:hidden" : "block"}`}>
                                  
                                  {/* Quick Actions Panel */}
                                  <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-4.5 space-y-3">
                                    <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Quick Actions</span>
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                      <button
                                        onClick={() => {
                                          setDwinLogs(prev => [...prev, `[${new Date().toISOString().split("T")[1].slice(0, 8)}] 🛠️ COMPILING SOURCE CODE FILES...`]);
                                          handleSendDwinMessage({ preventDefault: () => {} } as any);
                                        }}
                                        className="bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-zinc-850 p-2.5 rounded-xl text-left hover:border-violet-500/30 transition-all text-xs w-full"
                                      >
                                        <div className="font-bold text-violet-400 mb-0.5">Compile App</div>
                                        <div className="text-[9px] text-zinc-500">Run ESBuild edge build</div>
                                      </button>

                                      <button
                                        onClick={() => {
                                          setDwinLogs(prev => [...prev, `[${new Date().toISOString().split("T")[1].slice(0, 8)}] 🤖 TRIGGERING GEMINI UI GENERATION LAYOUTS...`]);
                                          setDwinChatInput("Generate a complete Web3 dashboard UI for tracking EmoCoin token locks.");
                                        }}
                                        className="bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-zinc-850 p-2.5 rounded-xl text-left hover:border-violet-500/30 transition-all text-xs w-full"
                                      >
                                        <div className="font-bold text-violet-400 mb-0.5">Generate UI</div>
                                        <div className="text-[9px] text-zinc-500">Create layout prototypes</div>
                                      </button>
                                    </div>

                                    <div className="pt-2 border-t border-zinc-900/50 flex justify-between items-center text-[10px] font-mono">
                                      <span className="text-zinc-500 uppercase">Interactive Prompts:</span>
                                    </div>

                                    <div className="space-y-1">
                                      {[
                                        { label: "Solana Latency Check", prompt: "Perform a latency check on active Solana RPC endpoint chains." },
                                        { label: "EmoCoin Breakdown", prompt: "Explain the active tokenomics and reward structures for EmoCoins." }
                                      ].map((pr, idx) => (
                                        <button
                                          key={idx}
                                          type="button"
                                          onClick={() => {
                                            setDwinChatInput(pr.prompt);
                                          }}
                                          className="w-full text-left text-[11px] text-zinc-400 hover:text-zinc-200 bg-zinc-950 border border-zinc-900 hover:border-violet-500/20 px-2.5 py-1.5 rounded-lg transition-colors font-mono block"
                                        >
                                          👉 {pr.label}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Project Contexts Manager */}
                                  <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-4.5 space-y-3">
                                    <h5 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold border-b border-zinc-900 pb-2">
                                      Context Workspace ({dwinProjects.length})
                                    </h5>

                                    <div className="space-y-2 max-h-36 overflow-y-auto pr-0.5">
                                      {dwinProjects.map(proj => (
                                        <div key={proj.id} className="bg-zinc-950/80 p-2 rounded-xl border border-zinc-900 flex justify-between items-center">
                                          <div className="leading-tight truncate pr-2">
                                            <span className="text-[11px] font-extrabold text-zinc-300 block truncate">{proj.name}</span>
                                            <span className="text-[9px] text-zinc-500 truncate block">{proj.desc}</span>
                                          </div>
                                          <button
                                            onClick={() => handleDwinDeleteProject(proj.id)}
                                            className="text-zinc-500 hover:text-red-400 p-1"
                                            title="Remove project"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      ))}
                                    </div>

                                    <form onSubmit={handleDwinAddProject} className="space-y-2 pt-2 border-t border-zinc-900/45">
                                      <input
                                        type="text"
                                        required
                                        value={newDwinProjName}
                                        onChange={(e) => setNewDwinProjName(e.target.value)}
                                        placeholder="Add context name..."
                                        className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-2.5 py-1.5 text-xs text-zinc-350 focus:outline-none"
                                      />
                                      <input
                                        type="text"
                                        value={newDwinProjDesc}
                                        onChange={(e) => setNewDwinProjDesc(e.target.value)}
                                        placeholder="Add tagline/desc..."
                                        className="w-full bg-zinc-950 border border-zinc-900 rounded-lg px-2.5 py-1.5 text-xs text-zinc-350 focus:outline-none"
                                      />
                                      <button
                                        type="submit"
                                        className="w-full bg-violet-900/40 hover:bg-violet-900/60 text-violet-400 px-3 py-1.5 rounded-lg border border-violet-800 text-xs font-bold transition-all"
                                      >
                                        + ADD WORKSPACE CONTEXT
                                      </button>
                                    </form>
                                  </div>

                                </div>

                                {/* Right Side-Panel (Chat & API Vault) */}
                                <div className={`space-y-4 ${dwinSidebarCollapsed ? "lg:col-span-12" : "lg:col-span-8"}`}>
                                  
                                  {/* AI Engine Selection Header & Chat */}
                                  <div className="bg-[#09090b] p-5 rounded-2xl border border-zinc-900 space-y-4">
                                    
                                    {/* Select Active AI Core */}
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-900 pb-3">
                                      <div>
                                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block">Cognitive Engine Block</span>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                          <BrainCircuit className="w-4 h-4 text-violet-500 animate-pulse" />
                                          <span className="text-xs font-mono font-black text-zinc-200 uppercase">{dwinActiveEngine}</span>
                                        </div>
                                      </div>

                                      {/* Selection nodes */}
                                      <div className="flex flex-wrap gap-1">
                                        {["GEMINI Pro 1.5", "GEMINI Flash 1.5", "ANTHROPIC Claude"].map((eng) => (
                                          <button
                                            key={eng}
                                            type="button"
                                            onClick={() => {
                                              setDwinActiveEngine(eng);
                                              setDwinLogs(prev => [
                                                ...prev,
                                                `[${new Date().toISOString().split("T")[1].slice(0, 8)}] 🧠 ROUTED PRIMARY STREAM TO: ${eng}`
                                              ]);
                                            }}
                                            className={`text-[9px] font-mono px-2 py-1 rounded transition-all font-bold ${
                                              dwinActiveEngine === eng
                                                ? "bg-violet-500 text-white shadow-sm"
                                                : "bg-zinc-950 text-zinc-400 border border-zinc-900 hover:text-zinc-200"
                                            }`}
                                          >
                                            {eng.split(" ")[0]}
                                          </button>
                                        ))}
                                      </div>

                                      {/* Thinking Mode Switcher */}
                                      <button
                                        type="button"
                                        onClick={() => setDwinHighThinking(!dwinHighThinking)}
                                        className={`px-2.5 py-1 rounded border text-[9px] font-mono font-bold transition-all ${
                                          dwinHighThinking
                                            ? "bg-violet-950/40 text-violet-400 border-violet-800 animate-pulse"
                                            : "bg-zinc-950 text-zinc-500 border-zinc-900"
                                        }`}
                                      >
                                        🧠 Think: {dwinHighThinking ? "ON" : "OFF"}
                                      </button>
                                    </div>

                                    {/* Chat dialogue list */}
                                    <div className="h-44 overflow-y-auto pr-1 space-y-3 text-xs scrollbar">
                                      {dwinChats.map((ch) => {
                                        const isModel = ch.role === "model";
                                        return (
                                          <div key={ch.id} className={`flex flex-col max-w-[85%] ${isModel ? "mr-auto" : "ml-auto"}`}>
                                            <div className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                                              isModel
                                                ? "bg-zinc-950 text-zinc-300 border border-zinc-900 font-mono rounded-tl-none"
                                                : "bg-violet-500 text-white rounded-tr-none font-semibold"
                                            }`}>
                                              {ch.content}
                                            </div>
                                            <span className="text-[8px] font-mono text-zinc-500 mt-1 self-end uppercase">
                                              {isModel ? ch.engine : "Commander"}
                                            </span>
                                          </div>
                                        );
                                      })}

                                      {dwinChatLoading && (
                                        <div className="bg-zinc-950 p-3 rounded-2xl border border-zinc-900 text-xs text-zinc-500 font-mono flex items-center gap-2 max-w-xs animate-pulse">
                                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
                                          <span>Cognitive calculations processing...</span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Chat send input */}
                                    <form onSubmit={handleSendDwinMessage} className="flex gap-2">
                                      <input
                                        type="text"
                                        required
                                        value={dwinChatInput}
                                        onChange={(e) => setDwinChatInput(e.target.value)}
                                        placeholder={`Instruct AI core (${dwinActiveEngine})...`}
                                        className="flex-grow bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-violet-500 font-mono transition-colors"
                                      />
                                      <button
                                        type="submit"
                                        disabled={dwinChatLoading}
                                        className="bg-violet-500 hover:bg-violet-600 disabled:bg-zinc-800 text-white px-4 rounded-xl font-bold font-mono transition-all flex items-center justify-center"
                                      >
                                        <Send className="w-3.5 h-3.5" />
                                      </button>
                                    </form>

                                  </div>

                                  {/* Encrypted API Vault */}
                                  <div className="bg-[#09090b] p-4 rounded-2xl border border-zinc-900 space-y-3.5">
                                    <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                                      <h5 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-violet-400" />
                                        <span>Cryptographic API Vault</span>
                                      </h5>
                                      <span className="text-[9px] font-mono text-zinc-500 uppercase">AES-256</span>
                                    </div>

                                    <div className="space-y-2">
                                      {dwinKeys.map(k => (
                                        <div key={k.id} className="bg-zinc-950 border border-zinc-900/60 p-2.5 rounded-xl flex items-center justify-between text-xs font-mono">
                                          <div className="leading-tight">
                                            <div className="flex items-center gap-2">
                                              <span className="font-extrabold text-zinc-200">{k.name}</span>
                                              <span className="text-[8px] bg-zinc-900 px-1.5 py-0.2 rounded text-zinc-400">{k.type}</span>
                                            </div>
                                            <span className="text-[10px] text-zinc-500 select-all block mt-0.5">{k.key}</span>
                                          </div>

                                          <div className="flex items-center gap-1.5">
                                            <button
                                              onClick={() => handleDwinToggleKeyStatus(k.id)}
                                              className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase transition-all ${
                                                k.status === "ACTIVE"
                                                  ? "bg-emerald-950/40 text-emerald-400 border border-emerald-900/40"
                                                  : "bg-red-950/40 text-red-400 border border-red-900/40"
                                              }`}
                                            >
                                              {k.status}
                                            </button>
                                            <button
                                              onClick={() => handleDwinDeleteKey(k.id)}
                                              className="text-zinc-500 hover:text-red-400 p-1"
                                            >
                                              <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>

                                    <form onSubmit={handleDwinAddKey} className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-2.5 border-t border-zinc-900/40">
                                      <input
                                        type="text"
                                        required
                                        value={newKeyName}
                                        onChange={(e) => setNewKeyName(e.target.value)}
                                        placeholder="Key Name (e.g. JWT_SECRET)"
                                        className="bg-zinc-950 border border-zinc-900 rounded-lg px-2 py-1 text-xs text-zinc-200 focus:outline-none focus:border-violet-500 font-mono"
                                      />
                                      <input
                                        type="text"
                                        required
                                        value={newKeyValue}
                                        onChange={(e) => setNewKeyValue(e.target.value)}
                                        placeholder="API Key value / connection token..."
                                        className="bg-zinc-950 border border-zinc-900 rounded-lg px-2 py-1 text-xs text-zinc-200 focus:outline-none focus:border-violet-500 font-mono md:col-span-2"
                                      />
                                      <button
                                        type="submit"
                                        className="bg-violet-500 hover:bg-violet-600 text-white rounded-lg text-xs font-bold py-1.5 transition-all"
                                      >
                                        + SECURE BIND
                                      </button>
                                    </form>
                                  </div>

                                  {/* Specs grid */}
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono text-zinc-400">
                                    <div className="bg-zinc-900/20 border border-zinc-900 p-2.5 rounded-xl flex items-center gap-1.5">
                                      <span>🛡️</span>
                                      <span>EMOWALL AI ACTIVE</span>
                                    </div>
                                    <div className="bg-zinc-900/20 border border-zinc-900 p-2.5 rounded-xl flex items-center gap-1.5">
                                      <span>⛓️</span>
                                      <span>SOLANA RPC: {dwinLatencyVal + 12}MS</span>
                                    </div>
                                    <div className="bg-zinc-900/20 border border-zinc-900 p-2.5 rounded-xl flex items-center gap-1.5">
                                      <span>✓</span>
                                      <span>100% SECURE BACKUP</span>
                                    </div>
                                    <div className="bg-zinc-900/20 border border-zinc-900 p-2.5 rounded-xl flex items-center gap-1.5">
                                      <span>📱</span>
                                      <span>TERMUX OPTIMIZED</span>
                                    </div>
                                  </div>

                                </div>

                              </div>
                            )}

                            {/* TAB 2: SYSTEM MONITOR */}
                            {dwinActiveTab === "SYSTEM MONITOR" && (
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-fadeIn">
                                
                                {/* GAUGE DIALS */}
                                <div className="lg:col-span-4 bg-zinc-900/40 border border-zinc-900 rounded-2xl p-5 space-y-6">
                                  <h5 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold border-b border-zinc-900 pb-2 flex items-center gap-1.5">
                                    <Gauge className="w-4 h-4 text-violet-500 animate-spin-slow" />
                                    <span>Workspace compute metrics</span>
                                  </h5>

                                  <div className="space-y-4 text-xs font-mono">
                                    <div>
                                      <div className="flex justify-between text-zinc-400 mb-1">
                                        <span>COGNITIVE BRAINS IN USE</span>
                                        <span className="text-violet-400 font-bold">57% / 100%</span>
                                      </div>
                                      <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-900">
                                        <div className="bg-violet-500 h-full rounded-full transition-all duration-500" style={{ width: "57%" }} />
                                      </div>
                                    </div>

                                    <div>
                                      <div className="flex justify-between text-zinc-400 mb-1">
                                        <span>MEMORY SEGMENTATION LOCKS</span>
                                        <span className="text-violet-400 font-bold">78% / 100%</span>
                                      </div>
                                      <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-900">
                                        <div className="bg-purple-600 h-full rounded-full transition-all duration-500" style={{ width: "78%" }} />
                                      </div>
                                    </div>

                                    <div>
                                      <div className="flex justify-between text-zinc-400 mb-1">
                                        <span>LIVE SECURE CACHE SYNC</span>
                                        <span className="text-emerald-400 font-bold">ACTIVE (100%)</span>
                                      </div>
                                      <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-900">
                                        <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: "100%" }} />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pt-3 border-t border-zinc-900/50 flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-zinc-500 uppercase">Latency Factor:</span>
                                    <span className="text-violet-400 font-bold">{dwinLatencyVal} ms</span>
                                  </div>
                                </div>

                                {/* TERMINAL STREAM LOGS */}
                                <div className="lg:col-span-8 bg-zinc-900/40 border border-zinc-900 rounded-2xl p-5 flex flex-col h-80 justify-between">
                                  <div className="space-y-3 flex-grow flex flex-col justify-between">
                                    <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                                      <h5 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                                        <Terminal className="w-4 h-4 text-violet-500" />
                                        <span>Secure Telemetry Stream</span>
                                      </h5>
                                      <span className="text-[9px] font-mono text-violet-400 animate-pulse">● STREAM LIVE</span>
                                    </div>

                                    <div className="bg-zinc-950 border border-zinc-900 p-4.5 rounded-xl font-mono text-[10px] text-zinc-400 space-y-2 overflow-y-auto h-48 scrollbar flex-grow">
                                      {dwinLogs.map((log, idx) => (
                                        <p key={idx} className="leading-relaxed hover:text-white transition-colors">
                                          {log}
                                        </p>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                              </div>
                            )}

                            {/* TAB 3: AI ROUTER */}
                            {dwinActiveTab === "AI ROUTER" && (
                              <div className="space-y-5 animate-fadeIn">
                                <h5 className="text-sm font-mono text-zinc-200 font-extrabold uppercase tracking-widest flex items-center gap-2 border-b border-zinc-900 pb-2">
                                  <Sliders className="w-4 h-4 text-violet-500" />
                                  <span>AI ROUTER TUNING CONTROL</span>
                                </h5>
                                <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
                                  Optimizes query paths automatically based on token payload sizes, local cache checks, and user-facing requirements.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {[
                                    { name: "Speed Optimized Core", desc: "Routes lightweight formatting requests to Gemini 1.5 Flash-lite instantly. Best for mock test setups.", active: dwinActiveEngine === "GEMINI Flash 1.5" },
                                    { name: "Balanced Hybrid Agent", desc: "Monitors response quality against latency buffers. Uses Gemini 1.5 Pro with fallbacks to Claude.", active: dwinActiveEngine === "GEMINI Pro 1.5" && !dwinHighThinking },
                                    { name: "High Reasoning Engine", desc: "Forces complex prompts through high thinking models with reasoning budget enabled.", active: dwinHighThinking }
                                  ].map((rt, idx) => (
                                    <div key={idx} className={`bg-zinc-900/40 p-4 rounded-xl border transition-all ${rt.active ? "border-violet-500/30 bg-violet-950/5 text-zinc-100" : "border-zinc-900 text-zinc-400"}`}>
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-mono font-bold">{rt.name}</span>
                                        {rt.active && <span className="text-[8px] font-mono bg-violet-900/50 text-violet-400 px-1.5 rounded uppercase font-bold border border-violet-800">ACTIVE</span>}
                                      </div>
                                      <p className="text-[11px] text-zinc-500 leading-relaxed">{rt.desc}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* TAB 4: DATA CORE */}
                            {dwinActiveTab === "DATA CORE" && (
                              <div className="space-y-4 animate-fadeIn">
                                <h5 className="text-sm font-mono text-zinc-200 font-extrabold uppercase tracking-widest flex items-center gap-2 border-b border-zinc-900 pb-2">
                                  <Database className="w-4 h-4 text-violet-500" />
                                  <span>ACTIVE STATE JSON SCHEMA</span>
                                </h5>
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                  Explore raw state parameters synchronized live with local system data registers.
                                </p>

                                <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl font-mono text-xs text-zinc-400 h-80 overflow-y-auto scrollbar">
                                  <pre>{JSON.stringify({
                                    hubPlace: dwinSelectedPlace.city,
                                    latency: dwinLatencyVal,
                                    activeEngine: dwinActiveEngine,
                                    thinkingMode: dwinHighThinking,
                                    connectedKeys: dwinKeys.length,
                                    activeProjects: dwinProjects,
                                    coinsAllocated: emobiesCoins
                                  }, null, 2)}</pre>
                                </div>
                              </div>
                            )}

                            {/* TAB 5: AUTOMATION */}
                            {dwinActiveTab === "AUTOMATION" && (
                              <div className="space-y-4 animate-fadeIn">
                                <h5 className="text-sm font-mono text-zinc-200 font-extrabold uppercase tracking-widest flex items-center gap-2 border-b border-zinc-900 pb-2">
                                  <Activity className="w-4 h-4 text-violet-500" />
                                  <span>SOVEREIGN MACRO TRIGGER BOARD</span>
                                </h5>
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                  Execute automated development macros directly in the active node cluster pipeline.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                  {[
                                    { title: "Trigger Web3 Rollup", action: "Triggering L2 Solana State Commit...", detail: "Pushes transaction bundle states to active ledger." },
                                    { title: "Run Style Transfer Check", action: "Initializing EmoWall Neural Weight Diagnostic...", detail: "Validates style transfer matrix rendering parameters." },
                                    { title: "Flush Secure Temp Caches", action: "Purging Isolated Sandbox Temp Files...", detail: "Frees local memory registers safely." },
                                    { title: "Validate Hub SSL Sync", action: "Renewing API Secure Handshake certificates...", detail: "Asserts 100% end-to-end handshake encryption." }
                                  ].map((mac, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => {
                                        const nowStr = new Date().toISOString().split("T")[1].slice(0, 8);
                                        setDwinLogs(prev => [
                                          ...prev,
                                          `[${nowStr}] ⚙️ MACRO EXECUTE: ${mac.title}...`,
                                          `[${nowStr}] SUCCESS: ${mac.action}`
                                        ]);
                                      }}
                                      className="bg-zinc-900/40 border border-zinc-900 hover:border-violet-500/20 text-left p-3 rounded-xl transition-all duration-150 flex items-start gap-3 cursor-pointer group"
                                    >
                                      <span className="bg-violet-950/60 p-2 rounded-lg border border-violet-800 text-violet-400 text-xs font-mono font-bold group-hover:bg-violet-500 group-hover:text-white transition-all">
                                        F{idx + 1}
                                      </span>
                                      <div>
                                        <div className="font-bold text-zinc-200 text-xs font-mono">{mac.title}</div>
                                        <div className="text-[10px] text-zinc-500 mt-0.5">{mac.detail}</div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                          </div>

                        </div>
                      )}

                    </div>

                  </div>
                )}

                {/* Interactive Emobies Mobile Fix Core Platform */}
                {selectedProject.id === "emobies" && (
                  <div className="bg-zinc-950 rounded-3xl border border-zinc-900 p-6 space-y-6 shadow-2xl animate-fadeIn">
                    
                    {/* Header Info */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-5">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[9px] font-mono bg-cyan-950/80 text-cyan-400 px-2.5 py-0.5 rounded-full border border-cyan-800 uppercase tracking-wider font-extrabold">
                            YOUR TRUSTED REPAIR PARTNER 🔧
                          </span>
                          <span className="text-xs text-zinc-500">Dubai 🇦🇪 · Kerala 🌿</span>
                        </div>
                        <h4 className="font-display font-black text-2xl text-zinc-100 flex items-center gap-2">
                          <Wrench className="w-6 h-6 text-cyan-500" />
                          <span>Emobies Mobile Fix</span>
                          <span className="text-[10px] font-mono text-zinc-500 font-normal">v1.0.4</span>
                        </h4>
                        <p className="text-xs text-zinc-400 mt-1">
                          Connecting customers with trusted technicians, delivery networks, and local service centers.
                        </p>
                      </div>

                      {/* EmoCoins Loyalty Counter */}
                      <div className="bg-zinc-900/40 border border-zinc-800 p-3 rounded-2xl flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                          <Coins className="w-5 h-5 animate-pulse" />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-wider">EmoCoins Balance</span>
                          <div className="flex items-center gap-2">
                            <motion.span 
                              key={emobiesCoins}
                              initial={{ scale: 1, rotate: 0 }}
                              animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
                              transition={{ duration: 0.4 }}
                              className="text-base font-black text-amber-400 font-mono"
                            >
                              {emobiesCoins} 🪙
                            </motion.span>
                            <button 
                              onClick={() => setEmobiesCoins(prev => prev + 10)}
                              className="text-[9px] font-mono bg-amber-500 hover:bg-amber-600 text-black px-1.5 py-0.5 rounded font-bold transition-all"
                            >
                              CLAIM +10
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sub-Tabs Nav */}
                    <div className="flex flex-wrap gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-900 overflow-x-auto">
                      <button
                        onClick={() => setEmobiesSubTab("complaints")}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-lg transition-all ${
                          emobiesSubTab === "complaints" 
                            ? "bg-cyan-500 text-black font-extrabold shadow-md" 
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                        }`}
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        <span>Complaints Tracker</span>
                      </button>
                      <button
                        onClick={() => setEmobiesSubTab("chat")}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-lg transition-all ${
                          emobiesSubTab === "chat" 
                            ? "bg-cyan-500 text-black font-extrabold shadow-md" 
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                        }`}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Technician Chat</span>
                      </button>
                      <button
                        onClick={() => setEmobiesSubTab("delivery")}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-lg transition-all ${
                          emobiesSubTab === "delivery" 
                            ? "bg-cyan-500 text-black font-extrabold shadow-md" 
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                        }`}
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Delivery Boy</span>
                      </button>
                      <button
                        onClick={() => setEmobiesSubTab("assistant")}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-lg transition-all ${
                          emobiesSubTab === "assistant" 
                            ? "bg-cyan-500 text-black font-extrabold shadow-md" 
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                        }`}
                      >
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Gemini AI Bot</span>
                      </button>
                      <button
                        onClick={() => setEmobiesSubTab("admin")}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-lg transition-all ${
                          emobiesSubTab === "admin" 
                            ? "bg-cyan-500 text-black font-extrabold shadow-md" 
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                        }`}
                      >
                        {emobiesRole === "superadmin" ? (
                          <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-zinc-500" />
                        )}
                        <span>Superadmin Portal</span>
                      </button>
                    </div>

                    {/* Tab Contents */}
                    <div className="min-h-[350px]">
                      
                      {/* COMPLAINTS TAB */}
                      {emobiesSubTab === "complaints" && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
                          
                          {/* Submit form - Col 5 */}
                          <div className="lg:col-span-5 bg-[#09090b] p-5 rounded-2xl border border-zinc-900 space-y-4">
                            <div className="flex items-center gap-2">
                              <Settings className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                              <h5 className="text-xs font-mono text-zinc-300 font-extrabold uppercase tracking-widest">
                                Submit Repair Complaint
                              </h5>
                            </div>
                            <p className="text-[11px] text-zinc-500 leading-relaxed">
                              Describe your hardware/software issue. Submitting a complaint rewards you with <span className="text-amber-400 font-bold font-mono">+50 EmoCoins</span>!
                            </p>

                            <form onSubmit={handleNewComplaintSubmit} className="space-y-3.5">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-zinc-400 uppercase">Device Model Name</label>
                                <input
                                  type="text"
                                  required
                                  value={newDeviceModel}
                                  onChange={(e) => setNewDeviceModel(e.target.value)}
                                  placeholder="e.g. iPhone 15 Pro, Pixel 9 XL"
                                  className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-cyan-500 transition-colors"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-zinc-400 uppercase">Hardware Issue details</label>
                                <textarea
                                  required
                                  rows={3}
                                  value={newDeviceIssue}
                                  onChange={(e) => setNewDeviceIssue(e.target.value)}
                                  placeholder="e.g. Cracked screen, green display line, camera loading crash fix..."
                                  className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-cyan-500 transition-colors"
                                />
                              </div>

                              <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black font-extrabold text-xs py-2 rounded-xl transition-all shadow-md"
                              >
                                REGISTER REPAIR COMPLAINT
                              </button>
                            </form>

                            {/* Credentials hint */}
                            <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-900 text-[10px] font-mono text-zinc-500 space-y-1">
                              <span className="text-zinc-400 font-extrabold uppercase tracking-wider block">Superadmin Login Hint:</span>
                              <p>Phone: <span className="text-zinc-300">9847842172</span></p>
                              <p>Password: <span className="text-zinc-300">Emobies@2026!</span></p>
                            </div>
                          </div>

                          {/* Complaints List - Col 7 */}
                          {showQRScanner && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                              <div className="w-full max-w-sm p-4 bg-zinc-900 rounded-2xl">
                                <QrReader
                                  onResult={(result, error) => {
                                    if (result) {
                                      // @ts-ignore
                                      const text = result?.getText();
                                      if (text) {
                                        // Handle QR result (e.g., create a new complaint)
                                        const text = result?.getText();
                                        if (text) {
                                          try {
                                            const data = JSON.parse(text);
                                            setNewDeviceModel(data.device || "QR Scanned Device");
                                            setNewDeviceIssue(data.issue || "Issue from QR code scan");
                                            
                                            // Trigger submission
                                            // We cannot directly call the event handler, so we mimic its logic
                                            const newId = `EM-${Math.floor(1000 + Math.random() * 9000)}`;
                                            const newComp = {
                                              id: newId,
                                              device: data.device || "QR Scanned Device",
                                              issue: data.issue || "Issue from QR code scan",
                                              status: "Under Diagnosis",
                                              assignedTech: "Rahul K.",
                                              serviceCenter: "Kochi Tech Hub",
                                              deliveryStatus: "Awaiting Pickup",
                                              deliveryBoy: "Nandu P.",
                                              emoCoinsReward: 100,
                                              chatHistory: [
                                                { sender: "technician", text: `Hello! I am auto-assigned to diagnostic ticket ${newId}. Please describe the issue and physical state of your ${data.device || "device"}.` }
                                              ]
                                            };
                                            setEmobiesComplaints(prev => [newComp, ...prev]);
                                            setSelectedComplaintId(newId);
                                            setEmobiesCoins(prev => prev + 50); // EmoCoins reward
                                            setNewDeviceModel("");
                                            setNewDeviceIssue("");
                                            setEmobiesSubTab("chat");
                                            
                                            setShowQRScanner(false);
                                          } catch (e) {
                                            console.error("Failed to parse QR code data:", e);
                                            alert("Invalid QR code format. Please use a JSON format with 'device' and 'issue' fields.");
                                          }
                                        }
                                      }
                                    }
                                  }}
                                  constraints={{ facingMode: 'environment' }}
                                />
                                <button onClick={() => setShowQRScanner(false)} className="mt-4 text-white">Close Scanner</button>
                              </div>
                            </div>
                          )}
                          <div className="lg:col-span-7 space-y-4">
                            <h5 className="text-xs font-mono text-zinc-300 font-extrabold uppercase tracking-widest flex items-center gap-2">
                              <Activity className="w-4 h-4 text-cyan-500" />
                              <span>Active Repair Requests ({emobiesComplaints.length})</span>
                                <button
                                  onClick={() => setShowQRScanner(true)}
                                  className="ml-auto flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded hover:bg-cyan-500/20 transition-all"
                                >
                                  <Camera className="w-3 h-3" />
                                  <span>SCAN QR</span>
                                </button>
                            </h5>

                            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                              {emobiesComplaints.map((comp) => {
                                let statusColor = "bg-orange-500/10 text-orange-400 border border-orange-500/20";
                                if (comp.status === "Waiting for Parts") statusColor = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
                                if (comp.status === "Repaired & Ready") statusColor = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                                if (comp.status === "Dispatched") statusColor = "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20";

                                return (
                                  <div key={comp.id} className="bg-zinc-900/30 border border-zinc-900 rounded-xl p-4 space-y-3 hover:border-zinc-800 transition-colors">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <span className="text-[9px] font-mono text-zinc-500 block">{comp.id}</span>
                                        <h6 className="text-xs font-extrabold text-zinc-200">{comp.device}</h6>
                                      </div>
                                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold ${statusColor}`}>
                                        {comp.status}
                                      </span>
                                    </div>

                                    <p className="text-[11px] text-zinc-400 leading-relaxed italic">
                                      " {comp.issue} "
                                    </p>

                                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-500 border-t border-zinc-900/50 pt-2">
                                      <div>
                                        <span className="text-zinc-600 block">ASSIGNED TECH</span>
                                        <span className="text-zinc-300">{comp.assignedTech}</span>
                                      </div>
                                      <div>
                                        <span className="text-zinc-600 block">SERVICE LAB</span>
                                        <span className="text-zinc-300">{comp.serviceCenter}</span>
                                      </div>
                                    </div>

                                    <div className="flex justify-between items-center bg-zinc-950 p-2 rounded-lg border border-zinc-900">
                                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                                        <Truck className="w-3.5 h-3.5 text-cyan-500" />
                                        <span>Courier: <strong className="text-zinc-200 font-normal">{comp.deliveryStatus}</strong> ({comp.deliveryBoy})</span>
                                      </div>
                                      <button
                                        onClick={() => {
                                          setSelectedComplaintId(comp.id);
                                          setEmobiesSubTab("chat");
                                        }}
                                        className="text-[10px] font-mono bg-cyan-950 hover:bg-cyan-900 text-cyan-400 px-2.5 py-1 rounded border border-cyan-800 transition-all font-bold flex items-center gap-1"
                                      >
                                        <MessageSquare className="w-3 h-3" />
                                        <span>Chat with Tech</span>
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                        </div>
                      )}

                      {/* TECHNICIAN CHAT TAB */}
                      {emobiesSubTab === "chat" && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
                          
                          {/* Left Sidebar complaints selector */}
                          <div className="lg:col-span-4 bg-[#09090b] p-4 rounded-2xl border border-zinc-900 space-y-3">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block border-b border-zinc-900 pb-1.5">
                              Repair Tickets
                            </span>
                            <div className="space-y-2">
                              {emobiesComplaints.map(comp => (
                                <button
                                  key={comp.id}
                                  onClick={() => setSelectedComplaintId(comp.id)}
                                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex flex-col ${
                                    selectedComplaintId === comp.id 
                                      ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" 
                                      : "bg-transparent border-zinc-900 text-zinc-400 hover:bg-zinc-900/30"
                                  }`}
                                >
                                  <span className="text-[8px] font-mono uppercase block">{comp.id}</span>
                                  <span className="text-xs font-extrabold truncate">{comp.device}</span>
                                  <span className="text-[9px] text-zinc-500 italic truncate mt-0.5">{comp.issue}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Chat Window */}
                          {(() => {
                            const activeComplaint = emobiesComplaints.find(c => c.id === selectedComplaintId) || emobiesComplaints[0];
                            if (!activeComplaint) {
                              return (
                                <div className="lg:col-span-8 flex items-center justify-center text-xs text-zinc-500 font-mono">
                                  No active repair tickets found. Submit a complaint first.
                                </div>
                              );
                            }

                            return (
                              <div className="lg:col-span-8 bg-[#09090b] p-5 rounded-2xl border border-zinc-900 flex flex-col justify-between min-h-[380px]">
                                
                                {/* Chat Header */}
                                <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-3">
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                      <h6 className="text-xs font-mono font-extrabold text-zinc-300">
                                        Technician: {activeComplaint.assignedTech}
                                      </h6>
                                    </div>
                                    <span className="text-[9px] text-zinc-500 block">
                                      Supporting Ticket {activeComplaint.id} ({activeComplaint.device})
                                    </span>
                                  </div>
                                  <span className="text-[9px] font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-zinc-400">
                                    Lab: {activeComplaint.serviceCenter}
                                  </span>
                                </div>

                                {/* Chat Bubbles */}
                                <div className="flex-1 space-y-3 overflow-y-auto pr-1 max-h-[220px] mb-4">
                                  {activeComplaint.chatHistory.map((msg: any, idx: number) => {
                                    const isTech = msg.sender === "technician";
                                    return (
                                      <div 
                                        key={idx} 
                                        className={`flex flex-col max-w-[85%] ${isTech ? "mr-auto" : "ml-auto"}`}
                                      >
                                        <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                                          isTech 
                                            ? "bg-zinc-900 text-zinc-300 rounded-tl-none border border-zinc-800" 
                                            : "bg-cyan-500 text-black font-medium rounded-tr-none"
                                        }`}>
                                          {msg.text}
                                        </div>
                                        <span className="text-[8px] font-mono text-zinc-600 mt-1 self-end">
                                          {isTech ? "Technician" : "You"}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* Chat Input Form */}
                                <form onSubmit={handleSendEmobiesChatMessage} className="flex gap-2">
                                  <input
                                    type="text"
                                    required
                                    value={emobiesChatInput}
                                    onChange={(e) => setEmobiesChatInput(e.target.value)}
                                    placeholder={`Send message to ${activeComplaint.assignedTech}...`}
                                    className="flex-1 bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-cyan-500 transition-colors"
                                  />
                                  <button
                                    type="submit"
                                    className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 rounded-xl transition-colors flex items-center justify-center"
                                  >
                                    <Send className="w-4 h-4" />
                                  </button>
                                </form>

                              </div>
                            );
                          })()}

                        </div>
                      )}

                      {/* DELIVERY BOY TAB */}
                      {emobiesSubTab === "delivery" && (
                        <div className="space-y-4 animate-fadeIn">
                          <h5 className="text-xs font-mono text-zinc-300 font-extrabold uppercase tracking-widest flex items-center gap-2">
                            <Truck className="w-4 h-4 text-cyan-500" />
                            <span>Delivery Boy Dispatch & Route Tracking</span>
                          </h5>
                          <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
                            Each active repair incorporates integrated pickup and delivery dispatch couriers. Couriers are assigned instantly to streamline Dubai and Kerala service center channels.
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {emobiesComplaints.map(comp => (
                              <div key={comp.id} className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-4 space-y-3">
                                <div className="flex justify-between items-start border-b border-zinc-950 pb-2">
                                  <div>
                                    <span className="text-[8px] font-mono text-zinc-500 uppercase">TICKET {comp.id}</span>
                                    <h6 className="text-xs font-extrabold text-zinc-200">{comp.device}</h6>
                                  </div>
                                  <span className="text-[9px] font-mono bg-zinc-950 text-cyan-400 border border-zinc-850 px-2 py-0.5 rounded font-bold uppercase">
                                    {comp.deliveryStatus}
                                  </span>
                                </div>

                                <div className="space-y-2 text-xs">
                                  <div className="flex items-center gap-2 text-zinc-400">
                                    <User className="w-4 h-4 text-zinc-500" />
                                    <span>Assigned Courier: <strong className="text-zinc-200 font-medium">{comp.deliveryBoy}</strong></span>
                                  </div>
                                  <div className="flex items-center gap-2 text-zinc-400">
                                    <MapPin className="w-4 h-4 text-zinc-500" />
                                    <span>Hub Point: <strong className="text-zinc-200 font-normal">{comp.serviceCenter}</strong></span>
                                  </div>
                                </div>

                                {/* Custom route timeline */}
                                <div className="pt-2">
                                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">Live Courier Milestones</span>
                                  <div className="grid grid-cols-4 gap-1 text-[9px] font-mono text-center">
                                    <div className="p-1 rounded bg-cyan-950/40 text-cyan-400 font-bold border border-cyan-900/40">
                                      Registered
                                    </div>
                                    <div className={`p-1 rounded border ${
                                      comp.deliveryStatus === "Picked Up" || comp.deliveryStatus === "Dispatched"
                                        ? "bg-cyan-950/40 text-cyan-400 font-bold border-cyan-900/40"
                                        : "bg-zinc-950 text-zinc-600 border-zinc-900"
                                    }`}>
                                      Picked Up
                                    </div>
                                    <div className={`p-1 rounded border ${
                                      comp.deliveryStatus === "Dispatched"
                                        ? "bg-cyan-950/40 text-cyan-400 font-bold border-cyan-900/40"
                                        : "bg-zinc-950 text-zinc-600 border-zinc-900"
                                    }`}>
                                      In Lab
                                    </div>
                                    <div className="bg-zinc-950 text-zinc-600 border border-zinc-900 p-1 rounded">
                                      Delivered
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* GEMINI ASSISTANT TAB */}
                      {emobiesSubTab === "assistant" && (
                        <div className="bg-[#09090b] p-5 rounded-2xl border border-zinc-900 flex flex-col justify-between min-h-[380px] animate-fadeIn">
                          
                          {/* Chat Header */}
                          <div className="border-b border-zinc-900 pb-3 mb-3">
                            <div className="flex items-center gap-2">
                              <BrainCircuit className="w-5 h-5 text-cyan-500 animate-pulse" />
                              <h5 className="text-xs font-mono text-zinc-300 font-extrabold uppercase tracking-widest">
                                Gemini-Powered Repair Assistant
                              </h5>
                            </div>
                            <span className="text-[10px] text-zinc-500 block">
                              Automated cognitive analysis engine for mobile software errors, target SDK configurations, and hardware failure loops.
                            </span>
                          </div>

                          {/* Scrollable replies */}
                          <div className="flex-1 space-y-3.5 overflow-y-auto pr-1 max-h-[220px] mb-4">
                            {emobiesAiResponses.map((res, idx) => (
                              <div 
                                key={idx}
                                className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[90%] whitespace-pre-wrap ${
                                  res.role === "assistant"
                                    ? "bg-zinc-950 text-zinc-300 mr-auto border border-zinc-900 font-mono"
                                    : "bg-cyan-500 text-black font-medium ml-auto"
                                }`}
                              >
                                {res.text}
                              </div>
                            ))}
                            {emobiesAiLoading && (
                              <div className="p-3 bg-zinc-950 text-zinc-500 mr-auto border border-zinc-900 rounded-2xl text-xs font-mono flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></span>
                                <span>Gemini hardware analysis in progress...</span>
                              </div>
                            )}
                          </div>

                          {/* Social Links */}
                          <div className="flex justify-center gap-4 py-3 border-y border-zinc-900 my-2">
                            <a href="https://www.facebook.com/share/1E96Aswthi/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-cyan-500 transition-colors"><Facebook className="w-4 h-4" /></a>
                            <a href="https://www.instagram.com/e_mobies_?igsh=YzN2c2premd2eTd1" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-cyan-500 transition-colors"><Instagram className="w-4 h-4" /></a>
                            <a href="https://www.linkedin.com/in/the-win-8956b4a9?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-cyan-500 transition-colors"><Linkedin className="w-4 h-4" /></a>
                            <a href="https://whatsapp.com/channel/0029VaXcgV6E50UZIHkMep0d" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-cyan-500 transition-colors"><MessageSquare className="w-4 h-4" /></a>
                            <a href="https://t.me/Emothewall05" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-cyan-500 transition-colors"><Send className="w-4 h-4" /></a>
                            <a href="https://x.com/thewin0555" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-cyan-500 transition-colors"><Twitter className="w-4 h-4" /></a>
                          </div>

                          {/* Assistant Form */}
                          <ProjectAssistant project={selectedProject} />
                          <form onSubmit={handleEmobiesAiSubmit} className="hidden gap-2">
                            <input
                              type="text"
                              required
                              value={emobiesAiQuery}
                              onChange={(e) => setEmobiesAiQuery(e.target.value)}
                              placeholder="e.g. iPhone green line repair or Google Play loading crash fix..."
                              className="flex-1 bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-cyan-500 transition-colors"
                            />
                            <button
                              type="submit"
                              disabled={emobiesAiLoading}
                              className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-zinc-800 text-black px-4 rounded-xl transition-colors font-bold font-mono text-xs"
                            >
                              ASK AI
                            </button>
                          </form>

                        </div>
                      )}

                      {/* SUPERADMIN PORTAL TAB */}
                      {emobiesSubTab === "admin" && (
                        <div className="animate-fadeIn">
                          {emobiesRole !== "superadmin" ? (
                            <div className={`max-w-md mx-auto bg-zinc-950/85 p-8 rounded-3xl border border-zinc-900 space-y-6 shadow-2xl relative overflow-hidden transition-all duration-300 ${emobiesShake ? "animate-shake" : ""}`}>
                              
                              {/* Sleek top ambient glow decoration */}
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent blur-xs" />

                              {/* Logo & Branding */}
                              <div className="flex flex-col items-center text-center space-y-3.5">
                                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shadow-lg shadow-orange-500/5">
                                  <Hexagon className="w-9 h-9 text-orange-500 animate-pulse" />
                                </div>
                                
                                <h5 className="font-display font-black text-3.5xl tracking-tight leading-none text-zinc-100">
                                  <span className="text-orange-500">E</span>mobies
                                </h5>

                                {/* Dynamic Pills */}
                                <div className="flex flex-wrap gap-2 justify-center max-w-[280px]">
                                  <span className="text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                    📱 Mobile Repair
                                  </span>
                                  <span className="text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">
                                    🔐 TheWall
                                  </span>
                                  <span className="text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                    🤖 Emowall AI
                                  </span>
                                </div>

                                <span className="text-[9px] font-mono text-zinc-500 tracking-[0.2em] font-medium uppercase">
                                  KANNUR · DUBAI · DIVIN K.K.
                                </span>
                              </div>

                              {/* Form Area */}
                              <form onSubmit={handleEmobiesLogin} className="space-y-4">
                                
                                {/* Phone Input */}
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Superadmin Phone</label>
                                  <input
                                    type="text"
                                    required
                                    disabled={!!emobiesLockUntil}
                                    value={emobiesPhone}
                                    onChange={(e) => setEmobiesPhone(e.target.value)}
                                    placeholder="e.g. 9847842172"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-mono"
                                  />
                                </div>

                                {/* Password Input with Obscure Toggle */}
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Secure Password</label>
                                  <div className="relative">
                                    <input
                                      type={emobiesPasswordObscured ? "password" : "text"}
                                      required
                                      disabled={!!emobiesLockUntil}
                                      value={emobiesPassword}
                                      onChange={(e) => setEmobiesPassword(e.target.value)}
                                      placeholder={emobiesLockUntil ? `Locked — wait ${emobiesSecondsLeft}s` : "Superadmin password"}
                                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-mono tracking-wide"
                                    />
                                    <button
                                      type="button"
                                      disabled={!!emobiesLockUntil}
                                      onClick={() => setEmobiesPasswordObscured(!emobiesPasswordObscured)}
                                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 disabled:opacity-30 transition-colors"
                                    >
                                      {emobiesPasswordObscured ? (
                                        <EyeOff className="w-4 h-4" />
                                      ) : (
                                        <Eye className="w-4 h-4" />
                                      )}
                                    </button>
                                  </div>
                                </div>

                                {/* Submit button */}
                                <button
                                  type="submit"
                                  disabled={!!emobiesLockUntil}
                                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2 uppercase tracking-wider font-mono"
                                >
                                  {emobiesLockUntil ? (
                                    <>
                                      <Lock className="w-4 h-4 text-zinc-600 animate-pulse" />
                                      <span>Locked · {emobiesSecondsLeft}s</span>
                                    </>
                                  ) : (
                                    <>
                                      <Unlock className="w-4 h-4" />
                                      <span>⬡ Unlock Emobies</span>
                                    </>
                                  )}
                                </button>
                              </form>

                              {/* Biometric Scan Button */}
                              <button
                                type="button"
                                disabled={!!emobiesLockUntil}
                                onClick={() => {
                                  if (emobiesLockUntil) return;
                                  setEmobiesLoginError("☝ Biometric check failed. Please authenticate using your secure password.");
                                  setEmobiesShake(true);
                                  setTimeout(() => setEmobiesShake(false), 500);
                                }}
                                className="w-full border border-zinc-800 hover:bg-zinc-900/50 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-400 font-extrabold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 font-mono"
                              >
                                <Fingerprint className="w-4 h-4 text-orange-500" />
                                <span>Fingerprint Login</span>
                              </button>

                              {/* Lockout progress bar & Countdown Banner */}
                              {emobiesLockUntil && (
                                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3.5 space-y-2 animate-fadeIn">
                                  <div className="flex items-center gap-2 text-red-400">
                                    <Lock className="w-3.5 h-3.5" />
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Too many attempts — locked</span>
                                  </div>
                                  <div className="w-full bg-zinc-900 rounded-full h-1 overflow-hidden">
                                    <div 
                                      className="bg-red-500 h-1 transition-all duration-1000 ease-linear" 
                                      style={{ width: `${(emobiesSecondsLeft / 30) * 100}%` }}
                                    />
                                  </div>
                                  <span className="text-[9px] font-mono text-zinc-500 block text-right">Remaining: {emobiesSecondsLeft} seconds</span>
                                </div>
                              )}

                              {/* Error Message */}
                              {!emobiesLockUntil && emobiesLoginError && (
                                <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-xl text-[10px] font-mono text-red-400 text-center animate-fadeIn leading-relaxed">
                                  {emobiesLoginError}
                                </div>
                              )}

                            </div>
                          ) : (
                            <div className="bg-[#09090b] p-5 rounded-2xl border border-zinc-900 space-y-6">
                              <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <Unlock className="w-4 h-4 text-emerald-400" />
                                    <h5 className="text-xs font-mono text-zinc-300 font-extrabold uppercase tracking-widest">
                                      Superadmin Command Center
                                    </h5>
                                  </div>
                                  <span className="text-[9px] text-zinc-500">Logged in with Phone Node: 9847842172</span>
                                </div>

                                <button
                                  onClick={handleEmobiesLogout}
                                  className="text-[10px] font-mono bg-red-950/60 hover:bg-red-900/60 text-red-400 px-3 py-1 rounded border border-red-900 transition-all font-bold"
                                >
                                  LOGOUT
                                </button>
                              </div>

                              <div className="space-y-3.5">
                                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Manage Repair Tasks & Allocations</span>
                                
                                <div className="space-y-3 max-h-[260px] overflow-y-auto">
                                  {emobiesComplaints.map(comp => (
                                    <div key={comp.id} className="bg-zinc-950 border border-zinc-900 rounded-xl p-3 flex flex-col md:flex-row justify-between md:items-center gap-3">
                                      <div>
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-xs font-bold text-zinc-200">{comp.device}</span>
                                          <span className="text-[9px] font-mono text-zinc-500">({comp.id})</span>
                                        </div>
                                        <p className="text-[10px] text-zinc-400 italic mt-0.5">"{comp.issue}"</p>
                                      </div>

                                      {/* Controls */}
                                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                        
                                        {/* Status select */}
                                        <div className="space-y-0.5">
                                          <span className="text-[8px] font-mono text-zinc-600 block uppercase">REPAIR STATUS</span>
                                          <select
                                            value={comp.status}
                                            onChange={(e) => {
                                              const nextStatus = e.target.value;
                                              setEmobiesComplaints(prev => prev.map(item => item.id === comp.id ? { ...item, status: nextStatus } : item));
                                            }}
                                            className="bg-zinc-900 border border-zinc-850 p-1 rounded text-[10px] text-zinc-300 focus:outline-none"
                                          >
                                            <option value="Under Diagnosis">Under Diagnosis</option>
                                            <option value="Waiting for Parts">Waiting for Parts</option>
                                            <option value="Repaired & Ready">Repaired & Ready</option>
                                            <option value="Dispatched">Dispatched</option>
                                          </select>
                                        </div>

                                        {/* Tech Select */}
                                        <div className="space-y-0.5">
                                          <span className="text-[8px] font-mono text-zinc-600 block uppercase">ASSIGN TECHNICIAN</span>
                                          <select
                                            value={comp.assignedTech}
                                            onChange={(e) => {
                                              const nextTech = e.target.value;
                                              setEmobiesComplaints(prev => prev.map(item => item.id === comp.id ? { ...item, assignedTech: nextTech } : item));
                                            }}
                                            className="bg-zinc-900 border border-zinc-850 p-1 rounded text-[10px] text-zinc-300 focus:outline-none"
                                          >
                                            <option value="Rahul K.">Rahul K.</option>
                                            <option value="Anjali M.">Anjali M.</option>
                                            <option value="Suresh Kumar">Suresh Kumar</option>
                                            <option value="Biju Nair">Biju Nair</option>
                                          </select>
                                        </div>

                                        {/* Delivery Select */}
                                        <div className="space-y-0.5">
                                          <span className="text-[8px] font-mono text-zinc-600 block uppercase">COURIER STATUS</span>
                                          <select
                                            value={comp.deliveryStatus}
                                            onChange={(e) => {
                                              const nextDel = e.target.value;
                                              setEmobiesComplaints(prev => prev.map(item => item.id === comp.id ? { ...item, deliveryStatus: nextDel } : item));
                                            }}
                                            className="bg-zinc-900 border border-zinc-850 p-1 rounded text-[10px] text-zinc-300 focus:outline-none"
                                          >
                                            <option value="Awaiting Pickup">Awaiting Pickup</option>
                                            <option value="Picked Up">Picked Up</option>
                                            <option value="In Transit">In Transit</option>
                                            <option value="Delivered">Delivered</option>
                                          </select>
                                        </div>

                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                    </div>

                  </div>
                )}

              </div>

              {/* RIGHT COLUMN: Project Technical Meta Spec Panel */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* AI Project Assistant Side Section */}
                {selectedProject && <ProjectAssistant project={selectedProject} allProjects={PROJECTS_DATA} />}
                
                {/* Emo Key Chat Section */}
                <EmoKeyChat />
                <EmoKeyGenerator />

                {/* Tech specifications card */}
                <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-5 space-y-4 font-mono text-xs">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-cyan-500" />
                    <span>Technical Metadata Spec</span>
                  </h4>

                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-zinc-900/50 pb-1.5">
                      <span className="text-zinc-500">Project ID</span>
                      <span className="text-zinc-300 font-bold">{selectedProject.id}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-900/50 pb-1.5">
                      <span className="text-zinc-500">Art Theme Preset</span>
                      <span className="text-zinc-300 font-bold">{selectedProject.category}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-900/50 pb-1.5">
                      <span className="text-zinc-500">Core Stack</span>
                      <span className="text-zinc-300 font-bold text-right max-w-[200px] leading-tight">
                        {selectedProject.techStack.join(", ")}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-900/50 pb-1.5">
                      <span className="text-zinc-500">Production URL</span>
                      <a href={selectedProject.url} target="_blank" rel="noreferrer" className="text-cyan-400 font-bold hover:underline">
                        {selectedProject.url.replace("https://", "")}
                      </a>
                    </div>
                    {selectedProject.edgeWorkerUrl && (
                      <div className="flex justify-between border-b border-zinc-900/50 pb-1.5 items-center">
                        <span className="text-zinc-500 font-mono text-xs">Edge Worker Gateway</span>
                        <a href={selectedProject.edgeWorkerUrl} target="_blank" rel="noreferrer" className="text-violet-400 font-bold hover:underline flex items-center gap-1.5 text-right font-mono text-xs">
                          <span>{selectedProject.edgeWorkerUrl.replace("https://", "")}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Gateway Active" />
                        </a>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-zinc-900/50 pb-1.5">
                      <span className="text-zinc-500">Connected Hub Nodes</span>
                      <span className="text-zinc-300 font-bold">
                        {selectedProject.connectedProjects.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Architecture Layers Breakdown */}
                <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-5 space-y-4">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-violet-500" />
                    <span>Modular Architecture Spec</span>
                  </h4>

                  <div className="space-y-3">
                    {selectedProject.architecture.map((arch, idx) => (
                      <div key={idx} className="bg-[#09090b] p-3 rounded-lg border border-zinc-900 space-y-1">
                        <span className="text-[10px] font-mono font-bold text-violet-400 uppercase tracking-wider block">
                          Layer {idx + 1}: {arch.layer}
                        </span>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">{arch.details}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </section>
        )}

        {/* Dynamic Topology Node Connectivity Map */}
        <section className="bg-[#09090b]/40 rounded-3xl border border-zinc-900 p-6 md:p-8 space-y-6">
          <div className="border-b border-zinc-900 pb-4">
            <h3 className="font-display font-extrabold text-2xl tracking-tight text-zinc-100">
              Ecosystem Connectivity Topology
            </h3>
            <p className="text-xs text-zinc-500">
              Visual map illustrating communication structures and pipelines inside the Dwin Universe.
            </p>
          </div>

          <div className="bg-black/40 rounded-2xl border border-zinc-900 p-6 relative overflow-hidden flex flex-col items-center">
            
            {/* Simple Dynamic SVG layout lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
              <line x1="15%" y1="50%" x2="50%" y2="20%" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="85%" y1="50%" x2="50%" y2="20%" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="80%" x2="50%" y2="20%" stroke="#f59e0b" strokeWidth="2" />
              <line x1="15%" y1="50%" x2="50%" y2="80%" stroke="#ec4899" strokeWidth="1.5" />
              <line x1="85%" y1="50%" x2="50%" y2="80%" stroke="#10b981" strokeWidth="1.5" />
            </svg>

            {/* Simulated Node map bubbles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center w-full max-w-4xl relative z-10 py-6">
              
              {/* Left Wing Nodes */}
              <div className="space-y-4 flex flex-col items-center md:items-end">
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-center md:text-right w-full max-w-[240px] hover:border-cyan-500 transition-colors">
                  <span className="text-[9px] font-mono text-cyan-400 block">AVATAR SUITE</span>
                  <h4 className="font-bold text-zinc-200">Emobies</h4>
                  <p className="text-[10px] text-zinc-500 leading-tight">Syncs modular assets with creator profiles</p>
                </div>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-center md:text-right w-full max-w-[240px] hover:border-emerald-500 transition-colors">
                  <span className="text-[9px] font-mono text-emerald-400 block">IDENTITY / CRYPTO</span>
                  <h4 className="font-bold text-zinc-200">Emo key</h4>
                  <p className="text-[10px] text-zinc-500 leading-tight">WebAuthn passkey security system</p>
                </div>
              </div>

              {/* Core Hub Nodes */}
              <div className="flex flex-col items-center space-y-6">
                <div className="bg-gradient-to-tr from-cyan-900/80 to-violet-950 p-5 rounded-2xl border border-cyan-500 text-center w-full max-w-[260px] shadow-lg shadow-cyan-950/20">
                  <span className="text-[9px] font-mono text-cyan-300 block tracking-widest uppercase">CORE CONTENT LAYER</span>
                  <h4 className="font-extrabold font-display text-lg text-white flex items-center justify-center gap-1">
                    <Tv className="w-4 h-4 text-cyan-400" />
                    <span>Ddott.TV</span>
                  </h4>
                  <p className="text-xs text-zinc-300 mt-1 leading-normal">
                    Decentralized community-owned low latency streaming and spot payouts
                  </p>
                </div>
                <div className="bg-gradient-to-tr from-amber-900/80 to-zinc-950 p-5 rounded-2xl border border-amber-500 text-center w-full max-w-[260px] shadow-lg">
                  <span className="text-[9px] font-mono text-amber-300 block tracking-widest uppercase">LEDGER / TRANSACTION GRID</span>
                  <h4 className="font-extrabold font-display text-lg text-white flex items-center justify-center gap-1">
                    <Wallet className="w-4 h-4 text-amber-400" />
                    <span>TheWall Web3</span>
                  </h4>
                  <p className="text-xs text-zinc-300 mt-1 leading-normal">
                    5-chain wallet indexing EVM, Solana and Bitcoin custom pixel assets
                  </p>
                </div>
              </div>

              {/* Right Wing Nodes */}
              <div className="space-y-4 flex flex-col items-center md:items-start">
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-center md:text-left w-full max-w-[240px] hover:border-violet-500 transition-colors">
                  <LazyImage
                    src="https://raw.githubusercontent.com/EmoThewall05/Emowall-AI-2.0/refs/heads/main/assets/emowall_ai_banner.jpg"
                    alt="Emowall AI Banner"
                    className="w-full h-24 rounded-lg mb-2"
                  />
                  <span className="text-[9px] font-mono text-violet-400 block">AI POWERED</span>
                  <h4 className="font-bold text-zinc-200">Emowall Ai 2.0</h4>
                  <p className="text-[10px] text-zinc-500 leading-tight">Silent multi-generational AI child safety platform</p>
                </div>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-center md:text-left w-full max-w-[240px] hover:border-pink-500 transition-colors">
                  <span className="text-[9px] font-mono text-pink-400 block">DEVELOPER WORKSPACE</span>
                  <h4 className="font-bold text-zinc-200">Dwinstudio v4</h4>
                  <p className="text-[10px] text-zinc-500 leading-tight">Drag and drop code bundle compiler</p>
                </div>
              </div>

            </div>

            {/* Architecture Details bullet row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl border-t border-zinc-900 pt-6 text-xs text-zinc-400 font-mono">
              <div className="flex gap-2">
                <span className="text-cyan-400">1</span>
                <span><strong>Real-time DB synchronization:</strong> Handled natively by Supabase PostgreSQL and secure connection points.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-violet-400">2</span>
                <span><strong>Smart Multi-Chain Locks:</strong> Deployed contracts managing cross-asset ledger balances.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-amber-400">3</span>
                <span><strong>7-Brain Sentiment:</strong> Empowered by Emo AI Pro sentiment analyzers guiding user replies.</span>
              </div>
            </div>

          </div>
        </section>

        {/* Global Contact Hub */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Copy Info details */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <h3 className="font-display font-extrabold text-3xl tracking-tight text-zinc-100">
              Get in Touch with E-Mobies
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Have questions regarding system integrations, local community cinema screens setup, token parameters, or commercial collaboration? Drop us a secure line below.
            </p>

            <div className="space-y-4 font-mono text-xs text-zinc-400 bg-zinc-950 p-5 rounded-2xl border border-zinc-900/80">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-cyan-400" />
                <div>
                  <span className="text-[10px] text-zinc-500 block">DOMAINS</span>
                  <span className="text-zinc-300 font-bold">e-mobies.com · emothewall.online</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-violet-400" />
                <div>
                  <span className="text-[10px] text-zinc-500 block">PRIMARY INBOX</span>
                  <a href="mailto:info@e-mobies.com" className="text-zinc-300 font-bold hover:underline">
                    info@e-mobies.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-[10px] text-zinc-500 block">ALTERNATE CONTACT</span>
                  <a href="mailto:info@emothewall.online" className="text-zinc-300 font-bold hover:underline">
                    info@emothewall.online
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form Block */}
          <div className="lg:col-span-7">
            <div className="bg-[#09090b]/90 rounded-3xl border border-zinc-900 p-6 md:p-8 space-y-6 shadow-2xl">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400">Your Full Name:</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Satoshi Nakamoto"
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400">Email Address:</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. wallet@thewall.online"
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">Target Ecosystem Interest:</label>
                  <select
                    value={contactProject}
                    onChange={(e) => setContactProject(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-xl p-2 text-xs text-zinc-300 focus:outline-none"
                  >
                    <option value="all">General Ecosystem Inquiry</option>
                    <option value="ddott-tv">Ddott.TV Streaming Platform</option>
                    <option value="thewall-web3">TheWall Web3 Wallet / Grid Canvas</option>
                    <option value="emowall-ai">Emowall AI 2.0 Wallpaper</option>
                    <option value="emo-ai-pro">Emo AI Pro Sentiment Analysis</option>
                    <option value="emobies">Emobies Modular Identity</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">Message details:</label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Describe your collaboration vision or questions..."
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 text-black font-extrabold text-xs py-2.5 rounded-xl transition-all shadow-md"
                >
                  DISPATCH TO GLOBAL INFRASTRUCTURE
                </button>

              </form>

              {/* SMTP Routing logs */}
              {formLogs.length > 0 && (
                <div className="bg-black/80 rounded-xl p-4 border border-zinc-900 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>DISPATCH SECURED</span>
                  </div>
                  <div className="font-mono text-[9px] text-zinc-500 leading-tight space-y-0.5">
                    {formLogs.map((log, idx) => (
                      <p key={idx}>{log}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Message */}
              {formStatus.type && (
                <div className={`p-4 rounded-xl text-xs flex items-start gap-2 border ${
                  formStatus.type === "success" 
                    ? "bg-emerald-950/20 border-emerald-900/60 text-emerald-400" 
                    : "bg-rose-950/20 border-rose-900/60 text-rose-400"
                }`}>
                  <span className="font-bold">SYSTEM RESPONSE:</span>
                  <p>{formStatus.text}</p>
                </div>
              )}

            </div>
          </div>
        </section>

      </main>

      {/* Futuristic footer credits */}
      <footer className="w-full bg-[#050507] border-t border-zinc-900 py-10 px-4 md:px-8 mt-20 font-mono text-xs text-zinc-500 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800 text-cyan-400 font-bold">
              d
            </div>
            <span>© 2026 E-MOBIES Ecosystem. All rights reserved.</span>
          </div>
          <div className="flex gap-4 flex-wrap justify-center">
            <a href="https://e-mobies.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">e-mobies.com</a>
            <span>·</span>
            <a href="https://emothewall.online" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">emothewall.online</a>
            <span>·</span>
            <a href="mailto:info@e-mobies.com" className="hover:text-cyan-400 transition-colors">info@e-mobies.com</a>
            <span>·</span>
            <a href="mailto:info@emothewall.online" className="hover:text-cyan-400 transition-colors">info@emothewall.online</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
