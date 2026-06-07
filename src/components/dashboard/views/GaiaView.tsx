'use client';

import { useState } from 'react';

import { MessageSquare, Send } from 'lucide-react';

interface Message {
  r: 'u' | 'g';
  t: string;
}

export default function GaiaView() {
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Message[]>([
    {
      r: 'g',
      t: 'Gaia Neural Core v4.2 active. Accessing Amazon Sector Alpha biometrics... Resonance optimal. How can I assist with your restoration audit?',
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMsgs([...msgs, { r: 'u', t: input }]);
    setInput('');
    setTimeout(
      () =>
        setMsgs((prev) => [
          ...prev,
          {
            r: 'g',
            t: 'Neural logic updated. Sequestration yield is trending +14.8% above the seasonal baseline. Initiating Sector 7B surge calibration.',
          },
        ]),
      1200
    );
  };

  return (
    <div
      className="glass-god rounded-[6rem] p-20 xl:p-32 shadow-[0_150px_200px_rgba(0,0,0,1)] relative overflow-hidden h-[85vh] flex flex-col gap-16"
    >
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="flex items-center gap-12 relative z-10">
        <div className="w-28 h-28 bg-emerald-500 rounded-[3rem] flex items-center justify-center text-[#020617] shadow-[0_0_100px_rgba(16,185,129,0.3)] animate-float">
          <MessageSquare size={50} />
        </div>
        <div>
          <h4 className="text-6xl font-black tracking-tighter uppercase leading-none text-iridescent">Gaia Core</h4>
          <p className="text-xs font-black text-emerald-500 uppercase tracking-[0.5em] mt-4">
            Deep Neural Link: Online
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-16 p-12 relative z-10">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.r === 'u' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[75%] p-10 rounded-[3.5rem] shadow-2xl ${
                m.r === 'u'
                  ? 'bg-emerald-500 text-slate-950 font-black text-xl'
                  : 'bg-white/5 border border-white/10 text-white/90 text-2xl font-medium leading-relaxed'
              }`}
            >
              {m.t}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-8 p-8 glass-god rounded-[4rem] relative z-10 border-2 border-white/10">
        <input
          type="text"
          placeholder="Consult Gaia Core..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="bg-transparent border-none outline-none flex-1 text-2xl font-medium placeholder:text-white/5 uppercase tracking-widest"
        />
        <button
          onClick={handleSend}
          className="w-20 h-20 bg-white text-slate-950 rounded-[2rem] flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-2xl"
        >
          <Send size={32} />
        </button>
      </div>
    </div>
  );
}
