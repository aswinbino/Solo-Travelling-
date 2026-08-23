import { motion } from "framer-motion";
import { ArrowRight, MapPin, Compass, Sparkles, Navigation } from "lucide-react";
import { LocationSelector } from "./LocationSelector";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Hero({ onStateChange }) {
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleStateSelect = (state) => {
    setSelectedLocation(state);
    if (onStateChange) onStateChange(state);
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950 flex items-center justify-center pt-24 pb-16">
      {/* Background Travel Imagery (Coastal & Mountain Ridgelines) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] scale-105"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2070&auto=format&fit=crop')",
          animation: "kenburns 35s infinite alternate"
        }}
      >
        {/* Layered Saffron & Coastal Deep Obsidian overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-black/80" />
      </div>

      {/* Cultural Sacred Geometry (Kolam / Mandala / Compass SVG Overlay) */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-15 flex items-center justify-center">
        <svg className="w-[800px] h-[800px] text-amber-400/40 animate-[spin_120s_linear_infinite]" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="100" cy="100" r="90" strokeDasharray="4,4" />
          <circle cx="100" cy="100" r="70" />
          <circle cx="100" cy="100" r="50" strokeDasharray="2,2" />
          <circle cx="100" cy="100" r="30" />
          <polygon points="100,10 120,70 190,70 135,110 155,180 100,140 45,180 65,110 10,70 80,70" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <line x1="10" y1="100" x2="190" y2="100" strokeDasharray="1,2" />
          <line x1="100" y1="10" x2="100" y2="190" strokeDasharray="1,2" />
        </svg>
      </div>

      {/* Topographic Traversal Elevation Paths */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-10">
        <motion.path
          d="M 50 150 Q 250 80 450 200 T 850 150 T 1250 250"
          stroke="#f59e0b"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="6,6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.circle
          r="4"
          fill="#f59e0b"
          animate={{
            cx: [50, 450, 850, 1250],
            cy: [150, 200, 150, 250],
          }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center"
        >
          {/* Top Cultural Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md text-amber-300 text-xs font-mono uppercase tracking-[0.25em]">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>வணக்கம் (Vanakkam) • Solo Navigator’s Odyssey</span>
          </div>

          {/* Main Title: Clean BHARAT Traverse */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-4 tracking-tighter uppercase leading-[0.9]">
            BHARAT<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 italic">
              Traverse
            </span>
          </h1>

          {/* Subheading with Tamil Accent */}
          <div className="text-amber-300/90 font-mono text-xs md:text-sm mb-4 tracking-widest uppercase">
            கன்னியாகுமரி முதல் இமயமலை வரை // From Kanyakumari Ocean Confluence to the Himalayas
          </div>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/70 mb-8 leading-relaxed font-light">
            From the 3-ocean coastline of Kanyakumari and Western Ghats cloudlines to the highest Himalayan passes. An autonomous AI-driven travel companion for solo explorers.
          </p>

          {/* Location Selector */}
          <div className="mb-10 w-full">
            <LocationSelector onSelect={handleStateSelect} />
          </div>

          {/* Action Buttons in English */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              onClick={() => scrollTo('explore')}
              className="rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-black hover:opacity-90 px-8 py-6 text-sm font-black uppercase tracking-widest group min-w-[230px] shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              {selectedLocation ? `Explore ${selectedLocation}` : "Start Traversal"}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo('ai-planner')}
              className="rounded-full border-white/20 text-white bg-white/5 hover:bg-white/10 hover:border-amber-400/40 px-8 py-6 text-sm font-semibold uppercase tracking-wider min-w-[200px] backdrop-blur-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
              AI Itinerary Planner
            </Button>

            <Button
              size="lg"
              variant="ghost"
              onClick={() => scrollTo('stays')}
              className="rounded-full text-white/60 hover:text-white px-6 py-6 text-sm font-mono uppercase tracking-wider cursor-pointer"
            >
              Basecamps & Food
            </Button>
          </div>

          {/* Geographic Coordinate Bar */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 border-t border-white/10 pt-4">
            <span className="flex items-center gap-1.5"><Navigation className="w-3 h-3 text-amber-400" /> 8°04′N (கன்னியாகுமரி) to 37°06′N</span>
            <span>•</span>
            <span>68°7′E to 97°25′E</span>
            <span>•</span>
            <span className="text-amber-400/80">3,287,263 SQ KM BHARAT</span>
          </div>

        </motion.div>
      </div>

      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-1.5%, -1.5%); }
        }
      `}</style>
    </div>
  );
}
