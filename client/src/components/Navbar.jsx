import { Compass, Map, Home, Utensils, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 md:px-7 py-3 bg-zinc-950/90 backdrop-blur-xl border border-amber-500/20 rounded-full flex items-center gap-4 md:gap-7 shadow-2xl shadow-black/80 max-w-[95vw]">
      <a href="/" className="flex items-center gap-2 font-black text-white tracking-widest uppercase text-sm group">
        <Compass className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
        <span className="tracking-tight text-xs md:text-sm">BHARAT</span>
        <span className="hidden sm:inline-block text-[9px] font-mono font-normal text-amber-400 uppercase px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
          SOLO
        </span>
      </a>
      
      <div className="h-4 w-[1px] bg-white/20" />
      
      <div className="flex items-center gap-3 md:gap-6">
        <a href="#ai-planner" className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Planner</span>
        </a>
        <a href="#explore" className="text-white/70 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider">
          <Map className="w-3.5 h-3.5 text-amber-400/60" />
          <span>Trails</span>
        </a>
        <a href="#stays" className="text-white/70 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider">
          <Home className="w-3.5 h-3.5 text-amber-400/60" />
          <span>Stays</span>
        </a>
        <a href="#food" className="text-white/70 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider">
          <Utensils className="w-3.5 h-3.5 text-orange-400/60" />
          <span>Food</span>
        </a>
      </div>
    </nav>
  );
}
