

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Signal, Battery, Wind, Droplets, Thermometer, Target } from "lucide-react";

export default function Tracking() {
  const [isTracking, setIsTracking] = useState(false);
  const [points, setPoints] = useState<{ top: string; left: string }[]>([]);

  useEffect(() => {
    const newPoints = [...Array(5)].map(() => ({
      top: `${20 + Math.random() * 60}%`,
      left: `${20 + Math.random() * 60}%`
    }));
    setPoints(newPoints);
  }, []);

  return (
    <section id="tracking" className="py-24 bg-black text-white overflow-hidden relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-500">System Live</span>
          </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 uppercase">Bharat Tracker v1.0</h2>
            <p className="text-white/40 max-w-lg font-light">
              Integrated navigation and safety systems for the independent explorer in India. Stay connected from the deserts of Rajasthan to the forests of the North-East.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Signal Status */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl"
          >
            <div className="flex justify-between items-start mb-8">
              <Signal className="w-6 h-6 text-white/40" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Active</span>
            </div>
            <div className="text-4xl font-black mb-1 tabular-nums tracking-tighter">98%</div>
            <div className="text-xs font-medium text-white/40 uppercase tracking-widest">Signal Integrity</div>
          </motion.div>

          {/* Battery Status */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl"
          >
            <div className="flex justify-between items-start mb-8">
              <Battery className="w-6 h-6 text-white/40" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Solar Charging</span>
            </div>
            <div className="text-4xl font-black mb-1 tabular-nums tracking-tighter">74%</div>
            <div className="text-xs font-medium text-white/40 uppercase tracking-widest">Power Reserve</div>
          </motion.div>

          {/* Environment Status */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl lg:col-span-2"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="flex gap-4">
                <Thermometer className="w-6 h-6 text-white/40" />
                <Wind className="w-6 h-6 text-white/40" />
                <Droplets className="w-6 h-6 text-white/40" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Atmospheric Data</span>
            </div>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="text-2xl font-black tabular-nums tracking-tighter">-5°C</div>
                  <div className="text-[10px] font-medium text-white/40 uppercase tracking-widest">Temp</div>
                </div>
                <div>
                  <div className="text-2xl font-black tabular-nums tracking-tighter">18km/h</div>
                  <div className="text-[10px] font-medium text-white/40 uppercase tracking-widest">Wind</div>
                </div>
                <div>
                  <div className="text-2xl font-black tabular-nums tracking-tighter">15%</div>
                  <div className="text-[10px] font-medium text-white/40 uppercase tracking-widest">Humidity</div>
                </div>
              </div>
          </motion.div>
        </div>

        {/* Visual Map/Tracking Feed */}
        <div className="mt-12 rounded-3xl overflow-hidden aspect-video relative bg-zinc-900 border border-white/10 group cursor-crosshair">
            <div className="absolute inset-0 opacity-40">
              <img 
                src="https://images.unsplash.com/photo-1524333865982-db448545e163?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale brightness-50"
                alt="Map Surface"
              />
            </div>
            <div className="absolute inset-0 bg-emerald-500/5 mix-blend-overlay" />
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            {/* Scanning Line */}
            <motion.div 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-10"
            />

            {/* Pulsing Point */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={() => setIsTracking(!isTracking)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
            >
              <span className="relative flex h-16 w-16 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
                <span className={`relative inline-flex rounded-full h-12 w-12 bg-emerald-500/20 backdrop-blur-md border ${isTracking ? 'border-emerald-400 bg-emerald-500/40' : 'border-emerald-500/40'} flex items-center justify-center transition-all`}>
                  <Target className={`w-5 h-5 ${isTracking ? 'text-white' : 'text-emerald-500'} transition-colors`} />
                </span>
              </span>
            </motion.div>

            {/* Tracking Status Indicator */}
            <AnimatePresence>
              {isTracking && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute top-1/2 left-[calc(50%+40px)] -translate-y-1/2 px-4 py-2 bg-emerald-500 text-black rounded-lg text-[10px] font-black uppercase tracking-widest z-30 shadow-2xl"
                >
                  Location Locked // Tracking Path
                </motion.div>
              )}
            </AnimatePresence>

            {/* Random Data Points */}
            <div className="absolute inset-0 pointer-events-none">
              {points.map((point, i) => (
                <div 
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full"
                  style={{ 
                    top: point.top, 
                    left: point.left 
                  }}
                />
              ))}
            </div>
  
            <div className="absolute bottom-8 left-8 p-6 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 text-xs font-mono uppercase tracking-widest text-white/80 z-20 shadow-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-2 h-2 rounded-full ${isTracking ? 'bg-emerald-400' : 'bg-zinc-600'} animate-pulse`} />
                <span className={`font-black ${isTracking ? 'text-emerald-500' : 'text-white/40'}`}>
                  {isTracking ? 'LIVE FEED // HK-47' : 'SYSTEM STANDBY'}
                </span>
              </div>
              <div className="space-y-1 text-white/40">
                <p>LAT: 32.2426 // LON: 78.0349</p>
                <p>ALTITUDE: 4,205m MSL</p>
                <p>HEADING: 142° SE</p>
              </div>
            </div>

            <div className="absolute top-8 right-8 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/5 text-[10px] font-mono uppercase tracking-widest text-white/40 z-20">
              SATELLITE: INSAT-3DR <br />
              LOCK: {isTracking ? 'STABLE' : 'SEARCHING...'}
            </div>
        </div>
      </div>
    </section>
  );
}
