import React from 'react';
import { BrainCircuit, ShieldCheck, Zap, Lock, Sparkles } from 'lucide-react';
import { ButterflyCanvas } from './ButterflyCanvas';
import { ButterflyState } from '../types';

interface EmoAiProDetailsProps {
  state: ButterflyState;
  setState: (state: ButterflyState) => void;
}

export const EmoAiProDetails: React.FC<EmoAiProDetailsProps> = ({ state, setState }) => {
  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-6 space-y-6 text-zinc-300">
      <div className="border-b border-zinc-900 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          {/* Replaced Butterfly icon with Sparkles to avoid build issues */}
          <div className="w-10 h-10">
            <ButterflyCanvas state={state} />
          </div>
          Emo AI Pro
        </h3>
        <p className="text-sm text-zinc-400 italic">"Understanding lives, while Emowall saves them."</p>
      </div>
      
      <div className="flex gap-2">
        {(['hover', 'rest', 'active'] as ButterflyState[]).map((s) => (
          <button
            key={s}
            onClick={() => setState(s)}
            className={`text-[10px] px-2 py-1 rounded border ${state === s ? 'bg-fuchsia-900 border-fuchsia-500 text-white' : 'border-zinc-700 hover:border-zinc-500'}`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <h4 className="font-bold text-white uppercase tracking-wider text-xs">Product Relationship</h4>
        <div className="bg-zinc-900 p-4 rounded-xl text-xs space-y-2 border border-zinc-800">
          <p className="font-bold text-fuchsia-400">Emo AI Pro (Emotional Intelligence Layer)</p>
          <p className="pl-4 text-zinc-400">↓</p>
          <p className="font-bold text-emerald-400">Emowall AI 2.0 (Guardian & Safety Engine)</p>
          <p className="text-zinc-500 mt-2 italic">Enhances safety with proactive emotional awareness.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-900 p-4 rounded-xl space-y-2">
          <h5 className="font-bold text-fuchsia-400 text-xs flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> Living Butterfly Interface</h5>
          <ul className="text-[10px] space-y-1 text-zinc-400">
            <li>Active Mode: Free flight, expressive motion</li>
            <li>Idle Mode: Gentle hover</li>
            <li>Resting Mode: Lotus landing with breathing glow</li>
            <li>Alert Mode: Faster wings, focused presence</li>
          </ul>
        </div>
        <div className="bg-zinc-900 p-4 rounded-xl space-y-2">
          <h5 className="font-bold text-cyan-400 text-xs flex items-center gap-1.5"><BrainCircuit className="w-3 h-3" /> Emotional Engine</h5>
          <ul className="text-[10px] space-y-1 text-zinc-400">
            <li>Voice tone & pace analysis</li>
            <li>Message sentiment tracking</li>
            <li>Interaction & safety context patterns</li>
            <li>Supports: Calm, Curious, Concerned, Protective, Resting</li>
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-bold text-white uppercase tracking-wider text-xs">Why Emo AI Pro</h4>
        <div className="space-y-2 text-[11px] text-zinc-400">
          <p>• Detects stress before danger escalates.</p>
          <p>• Offers calm guidance and builds emotional trust.</p>
          <p>• Reduces false alarms by understanding intent.</p>
          <p>• Multi-Model Brain (OpenAI, Gemini, Grok, Vercel AI) for best-fit intelligence.</p>
        </div>
      </div>
      
      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-[10px] text-zinc-400 font-mono flex items-center gap-2">
        <Lock className="w-4 h-4 text-amber-400" />
        <p>Privacy First: No emotional data selling, transient processing, explicit consent required.</p>
      </div>
    </div>
  );
};
