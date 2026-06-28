import React, { useState } from "react";
import { Key, Copy, Sparkles, User } from "lucide-react";
import { motion } from "motion/react";

export const EmoKeyGenerator: React.FC = () => {
  const [name, setName] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");

  const handleGenerate = () => {
    if (!name.trim()) return;
    const timestamp = Date.now().toString(36);
    const key = `emo_${name.toLowerCase().replace(/\s+/g, '_')}_${timestamp}`;
    setGeneratedKey(key);
    localStorage.setItem("emo_generated_key", key);
  };

  const handleCopy = () => {
    if (generatedKey) navigator.clipboard.writeText(generatedKey);
  };

  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-900 overflow-hidden shadow-xl p-4 space-y-4">
      <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
        <Sparkles className="text-violet-400 w-5 h-5" />
        <h3 className="text-zinc-100 font-bold font-mono">Emo Key Generator</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-2">
            <User className="text-zinc-500 w-4 h-4 mr-2" />
            <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="Enter User Name..." 
                className="flex-grow bg-transparent text-zinc-200 font-mono text-sm focus:outline-none" 
            />
        </div>
        <button 
            onClick={handleGenerate} 
            className="w-full bg-violet-600 text-white rounded-lg p-2 font-bold font-mono text-sm hover:bg-violet-700 transition"
        >
            Generate Emo Key
        </button>
      </div>

      {generatedKey && (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 rounded-lg p-3 flex items-center justify-between border border-zinc-800"
        >
          <span className="font-mono text-xs text-violet-300 truncate mr-2">{generatedKey}</span>
          <button onClick={handleCopy} className="text-zinc-500 hover:text-zinc-300">
            <Copy className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
