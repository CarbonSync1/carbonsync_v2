'use client';


import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), { ssr: false });

import { Activity, Globe } from 'lucide-react';

const MAP_NODES = [
  { id: 1, pos: [51.505, -0.09] as [number, number], name: 'Amazon Alpha', status: 'Optimal' },
  { id: 2, pos: [51.51, -0.1] as [number, number], name: 'Borneo Hub', status: 'Syncing' },
  { id: 3, pos: [48.8566, 2.3522] as [number, number], name: 'Paris Node', status: 'Active' },
];

export default function NodesView() {
  return (
    <div
      className="grid grid-cols-1 xl:grid-cols-12 gap-12"
    >
      <div className="xl:col-span-8 glass-god rounded-[5rem] p-6 flex flex-col h-[750px] border-2 border-emerald-500/20 shadow-[0_0_100px_rgba(16,185,129,0.1)]">
        <div className="h-full w-full rounded-[4rem] overflow-hidden relative grayscale-[0.6] hover:grayscale-0 transition-all duration-1000 group">
          <MapContainer center={[51.505, -0.09]} zoom={4} style={{ height: '100%', width: '100%' }} zoomControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OSM" />
            {MAP_NODES.map((n) => (
              <Marker key={n.id} position={n.pos}>
                <Popup>
                  <div className="p-4 text-center font-sans">
                    <h6 className="font-black text-slate-900 uppercase tracking-tighter text-lg">{n.name}</h6>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase mt-2 tracking-widest">{n.status}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          <div className="absolute inset-0 pointer-events-none border-[20px] border-slate-950/20 rounded-[4rem] z-[1000]" />
        </div>
      </div>
      <div className="xl:col-span-4 glass-god rounded-[5rem] p-16 flex flex-col justify-center text-center relative overflow-hidden">
        <div className="w-32 h-32 bg-emerald-500/10 rounded-[3rem] flex items-center justify-center text-emerald-500 mx-auto mb-12 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
          <Activity size={60} className="animate-pulse" />
        </div>
        <h4 className="text-5xl font-black tracking-tighter mb-8 text-iridescent">Node Health</h4>
        <p className="text-2xl text-white/30 font-medium mb-12 leading-relaxed">&ldquo;Amazon Sector Alpha reporting 100% resonance.&rdquo;</p>
        <div className="space-y-6 text-left">
          {['Alpha', 'Borneo', 'Congo'].map((n) => (
            <div
              key={n}
              className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 flex justify-between items-center group cursor-pointer hover:bg-emerald-500/10 transition-all"
            >
              <span className="text-lg font-black uppercase tracking-tight">{n} Hub</span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-emerald-500">SYNCED</span>
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_#10b981]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
