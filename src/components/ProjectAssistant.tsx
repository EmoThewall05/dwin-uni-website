import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, Send, Trash2, Sparkles, Cpu, Brain, X, 
  MessageSquareCode, ChevronDown, ChevronUp, AlertCircle, RefreshCw
} from "lucide-react";
import { Project } from "../types";

interface Message {
  role: "user" | "model";
  text: string;
  timestamp: string;
  source?: string;
}

interface ProjectAssistantProps {
  project: Project;
  allProjects: Project[];
}

export const ProjectAssistant: React.FC<ProjectAssistantProps> = ({ project, allProjects }) => {
  const [activeProject, setActiveProject] = useState<Project>(project);
  
  // Sync when parent project changes
  useEffect(() => {
    setActiveProject(project);
  }, [project]);

  // Store chat history and message count per project in localStorage for durable persistence
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageCount, setMessageCount] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true); // For floating panel toggle
  const [useEdgeWorker, setUseEdgeWorker] = useState<boolean>(!!activeProject.edgeWorkerUrl);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sync useEdgeWorker whenever active project changes
  useEffect(() => {
    setUseEdgeWorker(!!activeProject.edgeWorkerUrl);
  }, [activeProject.id, activeProject.edgeWorkerUrl]);

  // Load chat and count for the current project
  useEffect(() => {
    const savedChats = localStorage.getItem(`dwin_assistant_chat_${activeProject.id}`);
    const savedCount = localStorage.getItem(`dwin_assistant_count_${activeProject.id}`);
    
    if (savedChats) {
      try {
        setMessages(JSON.parse(savedChats));
      } catch (e) {
        setMessages([]);
      }
    } else {
      // Default welcome message
      const introMessage = activeProject.id === "emo-key" 
        ? `Welcome to the **Emo key** dashboard! I am your dedicated AI Assistant for the **Emo key Engine**. 

I can guide you through the active simulator and explain our core system features:
- **WebAuthn Passkey Registration:** Supporting hardware biometric scanners.
- **Advanced Private Key Segmentation:** Protecting against client-side memory scraping.
- **Zero-knowledge Proof (ZKP) Identity Synchronization:** Securely syncing identities across devices.
- **Encrypted Cloud Backups:** Utilizing distributed IPFS encrypted nodes.

Would you like to initiate a simulated **WebAuthn Registration** flow, or shall we inspect how the **Rust WASM compiler** segments the private key?`
        : `Hello! I am your dedicated AI Assistant for **${activeProject.name}**. I can explain its architecture, tech stack, connected nodes, or guide you through the active simulator. Ask me anything about this system!`;

      setMessages([
        {
          role: "model",
          text: introMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }

    if (savedCount) {
      setMessageCount(parseInt(savedCount, 10));
    } else {
      setMessageCount(0);
    }
  }, [activeProject.id, activeProject.name]);

  // Save changes to localStorage
  const saveChatState = (newMessages: Message[], newCount: number) => {
    setMessages(newMessages);
    setMessageCount(newCount);
    localStorage.setItem(`dwin_assistant_chat_${activeProject.id}`, JSON.stringify(newMessages));
    localStorage.setItem(`dwin_assistant_count_${activeProject.id}`, newCount.toString());
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;
    if (messageCount >= 5) return;

    const userMessage: Message = {
      role: "user",
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const nextMessages = [...messages, userMessage];
    const nextCount = messageCount + 1;
    saveChatState(nextMessages, nextCount);
    setInputValue("");
    setIsLoading(true);

    try {
      // Map full history to format expected by backend
      const historyPayload = messages.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        text: msg.text
      }));

      const response = await fetch("/api/project-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectId: activeProject.id,
          projectName: activeProject.name,
          projectTagline: activeProject.tagline,
          projectDescription: activeProject.description,
          projectFeatures: activeProject.features,
          projectTechStack: activeProject.techStack,
          message: userMessage.text,
          history: historyPayload,
          edgeWorkerUrl: activeProject.edgeWorkerUrl,
          useEdgeWorker: useEdgeWorker
        })
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: "model",
        text: data.reply || "I encountered an error computing a response.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source
      };

      saveChatState([...nextMessages, assistantMessage], nextCount);
    } catch (error) {
      console.error("Failed to query project assistant:", error);
      const errorMessage: Message = {
        role: "model",
        text: "My communication relays are temporarily offline. Please verify your connection or try resetting the assistant session.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      saveChatState([...nextMessages, errorMessage], nextCount);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    const defaultMessages: Message[] = [
      {
        role: "model",
        text: `Welcome back! I have refreshed my context registers for **${activeProject.name}**. What system details shall we explore now?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    saveChatState(defaultMessages, 0);
  };

  const suggestions = [
    { label: "Explain Architecture 🌐", text: "Explain the architecture and layer structure of this project." },
    { label: "Analyze Tech Stack 💻", text: "What is the tech stack used here and why was it chosen?" },
    { label: "Key Features 🔑", text: "What are the key capabilities and features of this project simulator?" }
  ];

  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-900 overflow-hidden shadow-xl transition-all duration-300">
      
      {/* Header Panel */}
      <div 
        className="bg-gradient-to-r from-zinc-900 to-zinc-950 border-b border-zinc-900 p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-violet-950/80 border border-violet-800/40 flex items-center justify-center text-violet-400">
              <Brain className="w-4 h-4 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-zinc-950" />
          </div>
          <div>
            <select
              value={activeProject.id}
              onChange={(e) => {
                const proj = allProjects.find(p => p.id === e.target.value);
                if (proj) setActiveProject(proj);
              }}
              className="bg-transparent text-xs font-mono font-extrabold text-zinc-100 uppercase focus:outline-none"
            >
              {allProjects.map(p => (
                <option key={p.id} value={p.id} className="bg-zinc-950 text-zinc-200">{p.name}</option>
              ))}
            </select>
            <p className="text-[10px] font-mono text-zinc-400">Interactive Project Advisor</p>
          </div>
        </div>

        {/* Header Right: Message Counter Badge & Toggle */}
        <div className="flex items-center gap-3">
          <div 
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border transition-colors ${
              messageCount >= 5 
                ? "bg-red-950/50 text-red-400 border-red-800" 
                : messageCount >= 3
                ? "bg-amber-950/40 text-amber-400 border-amber-800"
                : "bg-violet-950/40 text-violet-400 border-violet-900/60"
            }`}
            title="Sovereign AI query message limit counter"
          >
            <span>Queries:</span>
            <span className="font-black">{messageCount}/5</span>
          </div>

          <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Chat View */}
      {isOpen && (
        <div className="p-4 space-y-4 animate-fadeIn">
          {/* Messages container */}
          <div className="h-64 overflow-y-auto pr-1 space-y-3.5 text-xs scrollbar">
            {messages.map((msg, index) => {
              const isModel = msg.role === "model";
              return (
                <div key={index} className={`flex flex-col max-w-[88%] ${isModel ? "mr-auto" : "ml-auto"}`}>
                  <div className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    isModel 
                      ? "bg-zinc-900/40 text-zinc-300 border border-zinc-900 font-mono rounded-tl-none text-[11px]" 
                      : "bg-violet-500 text-white rounded-tr-none font-semibold"
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[8px] font-mono text-zinc-500 mt-1 self-end uppercase flex items-center gap-1">
                    <span>{isModel ? (msg.source ? `Copilot (${msg.source})` : "Gemini Copilot") : "You"}</span>
                    <span>·</span>
                    <span>{msg.timestamp}</span>
                    {isModel && msg.source === "Cloudflare Edge Worker" && (
                      <>
                        <span>·</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                      </>
                    )}
                  </span>
                </div>
              );
            })}

            {isLoading && (
              <div className="bg-zinc-900/20 p-3 rounded-2xl border border-zinc-900 text-xs text-zinc-500 font-mono flex items-center gap-2 max-w-xs animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
                <span>Analyzing specs...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestions - Shown only if limit not reached */}
          {messageCount < 5 && messages.length > 0 && !isLoading && (
            <div className="space-y-1.5 pt-2 border-t border-zinc-900/50">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1 font-bold">Recommended Queries:</span>
              <div className="flex flex-col gap-1">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(sug.text)}
                    className="w-full text-left text-[10px] text-zinc-400 hover:text-zinc-200 bg-zinc-900/40 border border-zinc-850 hover:border-violet-500/20 px-2.5 py-1.5 rounded-lg transition-all font-mono"
                  >
                    💡 {sug.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Locked / Counter Limit Screen */}
          {messageCount >= 5 && (
            <div className="bg-red-950/20 border border-red-900/30 p-3.5 rounded-xl space-y-2.5 animate-fadeIn">
              <div className="flex items-start gap-2 text-xs text-red-400 font-mono leading-relaxed">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" />
                <div>
                  <strong className="text-red-300 block uppercase font-bold text-[10px]">COGNITIVE BUDGET LIMIT REACHED</strong>
                  You have sent 5 of your 5 allowed questions for this sandbox project instance. Please reset context to restore query access.
                </div>
              </div>
              <button
                onClick={handleReset}
                className="w-full bg-red-900/30 hover:bg-red-900/50 text-red-300 border border-red-800/50 rounded-lg text-xs font-mono font-bold py-2 transition-all flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>REFRESH ASSISTANT CONTEXT (RESET 0/5)</span>
              </button>
            </div>
          )}

          {/* Edge Worker Routing Selector */}
          {project.edgeWorkerUrl && messageCount < 5 && (
            <div className="flex items-center justify-between bg-zinc-900/30 border border-zinc-900/60 p-2 rounded-xl text-[10px] font-mono">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500"></span>
                </span>
                <span>Route via Cloudflare Edge Worker</span>
              </span>
              <button
                type="button"
                onClick={() => setUseEdgeWorker(!useEdgeWorker)}
                className={`px-2 py-0.5 rounded font-bold uppercase transition-all ${
                  useEdgeWorker
                    ? "bg-violet-950/50 text-violet-400 border border-violet-800/40"
                    : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                }`}
              >
                {useEdgeWorker ? "Active" : "Bypass"}
              </button>
            </div>
          )}

          {/* Send Input Panel */}
          {messageCount < 5 && (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex gap-1.5 pt-2 border-t border-zinc-900/50"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Ask Copilot about ${project.name}...`}
                className="flex-grow bg-zinc-900/50 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-violet-500/50 font-mono transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-violet-500 hover:bg-violet-600 disabled:bg-zinc-800 disabled:text-zinc-600 text-white px-3.5 rounded-xl font-bold font-mono transition-all flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Bottom actions: Clear/Reset manual trigger */}
          {messageCount > 0 && messageCount < 5 && (
            <div className="flex justify-end pt-1">
              <button
                onClick={handleReset}
                className="text-[9px] font-mono text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-1"
                title="Reset session history"
              >
                <Trash2 className="w-3 h-3" />
                <span>Reset Chat</span>
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
