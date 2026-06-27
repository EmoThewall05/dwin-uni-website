import React from 'react';
import { ShieldCheck, BrainCircuit, Users, Heart, Camera, Zap } from 'lucide-react';

export const EmowallDetails: React.FC = () => {
  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-6 space-y-6 text-zinc-300">
      <div className="border-b border-zinc-900 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="text-emerald-400" />
          Emowall AI 2.0
        </h3>
        <p className="text-sm text-zinc-400 italic">"No button press needed. Emowall knows before the child does."</p>
      </div>

      <div className="space-y-4">
        <h4 className="font-bold text-white uppercase tracking-wider text-xs">Mission</h4>
        <p className="text-xs leading-relaxed">
          Free child safety for Kerala government school children. No subscription. No compromise. No button needed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-900 p-4 rounded-xl space-y-2">
          <h5 className="font-bold text-emerald-400 text-xs flex items-center gap-1.5"><BrainCircuit className="w-3 h-3" /> Detection</h5>
          <ul className="text-[10px] space-y-1 text-zinc-400">
            <li>👂 Sound Detection</li>
            <li>⌚ Smart Watch Integration</li>
            <li>📱 Phone Sensors</li>
            <li>📍 GPS Safe Zones</li>
          </ul>
        </div>
        <div className="bg-zinc-900 p-4 rounded-xl space-y-2">
          <h5 className="font-bold text-violet-400 text-xs flex items-center gap-1.5"><Users className="w-3 h-3" /> Verification Chain</h5>
          <ul className="text-[10px] space-y-1 text-zinc-400">
            <li>👨👩👧 Parent (60s)</li>
            <li>👨👩👦 Relative (30s)</li>
            <li>🏫 School Principal (30s)</li>
            <li>🚨 Auto SOS</li>
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-bold text-white uppercase tracking-wider text-xs">New Features</h4>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Heart className="w-4 h-4 text-pink-400" />
            <div>
              <p className="text-xs font-bold text-white">Butterfly Guardian</p>
              <p className="text-[10px] text-zinc-400">Emotional wellness AI, safe space chat, empathetic support.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Camera className="w-4 h-4 text-cyan-400" />
            <div>
              <p className="text-xs font-bold text-white">Animal Alert</p>
              <p className="text-[10px] text-zinc-400">Real-time wildlife danger identification & first aid instructions.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-[10px] text-zinc-400 font-mono">
        <p>Built from Dubai 🇦🇪 · Made for Kerala 🌿 · Free for Every Child 💚</p>
        <p>Powered by 7 AI Brains 🧠</p>
      </div>
    </div>
  );
};
