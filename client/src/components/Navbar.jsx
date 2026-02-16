
import { Compass, Map, Home, Utensils } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-8 shadow-2xl">
      <a href="/" className="flex items-center gap-2 font-bold text-white tracking-widest uppercase text-sm">
        <Compass className="w-5 h-5" />
        India
      </a>
      <div className="h-4 w-[1px] bg-white/20" />
      <div className="flex items-center gap-6">
        <a href="#explore" className="text-white/70 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider">
          <Map className="w-3.5 h-3.5" />
          Explore
        </a>
        <a href="#stays" className="text-white/70 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider">
          <Home className="w-3.5 h-3.5" />
          Stays
        </a>
        <a href="#food" className="text-white/70 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider">
          <Utensils className="w-3.5 h-3.5" />
          Food
        </a>
      </div>
    </nav>
  );
}
