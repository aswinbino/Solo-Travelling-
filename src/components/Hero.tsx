"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationSelector } from "./LocationSelector";
import { useState } from "react";

export default function Hero({ onStateChange }: { onStateChange?: (state: string) => void }) {
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleStateSelect = (state: string) => {
    setSelectedLocation(state);
    if (onStateChange) onStateChange(state);
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] scale-110"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1584439793392-564344498308?q=80&w=2070&auto=format&fit=crop')",
            animation: "kenburns 40s infinite alternate"
          }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90" />
      </div>

      {/* Tracking Lines (Visual Interest) */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-10">
        <motion.path
          d="M 100 100 L 300 200 L 500 150 L 800 400 L 1200 300"
          stroke="white"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.circle
          r="4"
          fill="white"
          animate={{
            cx: [100, 300, 500, 800, 1200],
            cy: [100, 200, 150, 400, 300],
          }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>

      <div className="relative z-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
              <div className="flex items-center gap-2 mb-6 px-4 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white/60 text-xs font-medium uppercase tracking-[0.3em]">
                <MapPin className="w-3 h-3" />
                <span>India | The Ultimate Frontier</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter">
                INDIA<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/40 to-white/10 italic uppercase">
                  Traverse
                </span>
              </h1>
              
            <p className="max-w-xl mx-auto text-lg md:text-xl text-white/60 mb-10 leading-relaxed font-light">
              Navigate the diverse soul of Bharat. From the frozen peaks of Ladakh to the tropical backwaters of Kerala, discover a solo traveler's guide to the subcontinent.
            </p>

              <div className="mb-10 w-full">
                <LocationSelector onSelect={handleStateSelect} />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button 
                size="lg" 
                onClick={() => scrollTo('explore')}
                className="rounded-full bg-white text-black hover:bg-white/90 px-8 py-6 text-base font-semibold group min-w-[200px] whitespace-nowrap"
              >
                {selectedLocation ? `Explore ${selectedLocation}` : "Start Traversal"}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => scrollTo('tracking')}
                className="rounded-full border-white/20 text-white bg-transparent hover:bg-white/10 px-8 py-6 text-base font-medium whitespace-nowrap"
              >
                Explore Map
              </Button>
            </div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white to-white/0" />
      </motion.div>

      <style jsx>{`
        @keyframes kenburns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-2%, -2%); }
        }
      `}</style>
    </div>
  );
}
