import React, { useState, useEffect, useRef } from "react";
import { Send, Key, AlertCircle, RefreshCw, Brain, Copy, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "model";
  text: string;
  timestamp: string;
}

const TypingText = ({ text, isTyping }: { text: string; isTyping: boolean }) => {
  const [displayedText, setDisplayedText] = useState(isTyping ? "" : text);
  useEffect(() => {
    if (!isTyping) {
      setDisplayedText(text);
      return;
    }
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [text, isTyping]);
  return <>{displayedText}</>;
};

export const EmoKeyChat: React.FC = () => {
  const [emoKey, setEmoKey] = useState<string>("");
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [showKey, setShowKey] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageCount, setMessageCount] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load state
  useEffect(() => {
    const saved = localStorage.getItem("emokey_chat_data");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data && Array.isArray(data.messages)) {
          setMessages(data.messages);
        }
        if (typeof data.count === 'number') setMessageCount(data.count);
        if (typeof data.isValidated === 'boolean') setIsValidated(data.isValidated);
        if (typeof data.emoKey === 'string') setEmoKey(data.emoKey);
      } catch (e) {
        console.error("Failed to parse chat data", e);
      }
    }
  }, []);

  // Save state
  useEffect(() => {
    localStorage.setItem("emokey_chat_data", JSON.stringify({ messages, count: messageCount, isValidated, emoKey }));
  }, [messages, messageCount, isValidated, emoKey]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleValidateKey = () => {
    const generatedKey = localStorage.getItem("emo_generated_key");
    if (emoKey === "emo_guardian_AI_safety_active_2026" || (generatedKey && emoKey === generatedKey)) {
      setIsValidated(true);
      if (messages.length === 0) {
        setMessages([{ role: "model", text: "Key validated. Emo Key Engine initialized. How can I assist you with security parameters?", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      }
    } else {
      alert("Invalid Emo Key.");
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(emoKey);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || messageCount >= 25) return;

    const userMessage: Message = { role: "user", text: inputValue.trim(), timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMessage]);
    setMessageCount(prev => prev + 1);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("https://dwin-emothewall-ai.meradivin.workers.dev", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Emo-Key": "emo_guardian_AI_safety_active_2026"
        },
        body: JSON.stringify({ prompt: userMessage.text })
      });
      
      if (!response.ok) {
        throw new Error(`Worker returned status ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Worker response data:", data);
      setMessages(prev => [...prev, { role: "model", text: data.reply || data.text || JSON.stringify(data) || "No response received.", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "model", text: "Worker communication error.", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-900 overflow-hidden shadow-xl p-4 space-y-4">
      <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
        <Brain className="text-violet-400 w-5 h-5" />
        <h3 className="text-zinc-100 font-bold font-mono">Emo Key Chat ({messageCount}/25)</h3>
      </div>

      {!isValidated ? (
        <div className="space-y-3">
          <input type="password" value={emoKey} onChange={e => setEmoKey(e.target.value)} placeholder="Enter Emo Key..." className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-zinc-200 font-mono text-sm" />
          <button onClick={handleValidateKey} className="w-full bg-violet-600 text-white rounded-lg p-2 font-bold font-mono text-sm">Upload Key & Access</button>
        </div>
      ) : (
        <>
          <div className="bg-zinc-900 rounded-lg p-3 flex items-center justify-between border border-zinc-800">
            <span className="font-mono text-xs text-zinc-400 truncate mr-2">
              {showKey ? emoKey : "••••••••••••••••••••••••••••••••"}
            </span>
            <div className="flex gap-2">
              <button onClick={() => setShowKey(!showKey)} className="text-zinc-500 hover:text-zinc-300">
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button onClick={handleCopyKey} className="text-zinc-500 hover:text-zinc-300">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="h-64 overflow-y-auto space-y-3 pr-2 scrollbar">
            <AnimatePresence>
              {messages?.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-xs p-2 rounded-lg ${m.role === "model" ? "bg-zinc-900 text-zinc-300" : "bg-violet-900/50 text-white ml-auto max-w-[80%]"}`}
                >
                  {m.role === "model" ? <TypingText text={m.text} isTyping={i === messages.length - 1 && messages[i].text === m.text} /> : m.text}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={e => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
            <input value={inputValue} onChange={e => setInputValue(e.target.value)} disabled={isLoading} placeholder="Message..." className="flex-grow bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-zinc-200 font-mono text-sm" />
            <button disabled={isLoading || messageCount >= 25} className="bg-violet-600 p-2 rounded-lg text-white"><Send className="w-4 h-4" /></button>
          </form>
        </>
      )}
    </div>
  );
};
