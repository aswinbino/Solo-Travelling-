import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AiItineraryPlanner from "@/components/AiItineraryPlanner";
import Exploring from "@/components/Exploring";
import StayFood from "@/components/StayFood";
import Tracking from "@/components/Tracking";
import TouristPlaces from "@/components/TouristPlaces";
import { Compass } from "lucide-react";

export default function App() {
    const [selectedState, setSelectedState] = useState("");

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />
            <Hero onStateChange={setSelectedState} />
            <AiItineraryPlanner />
            <Exploring selectedState={selectedState} />
            <TouristPlaces selectedState={selectedState} />
            <StayFood selectedState={selectedState} />
            <Tracking />

            <footer className="py-20 bg-zinc-950 text-white border-t border-white/10">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                        <div>
                            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter mb-4 uppercase text-amber-400">
                                <Compass className="w-8 h-8 text-amber-400" />
                                BHARAT • SOLO TRAVERSE
                            </div>
                            <p className="text-white/50 max-w-sm font-light leading-relaxed text-sm">
                                Dedicated to the solo navigator in Bharat. Mapping the untracked, supporting the local, and respecting the wild across the subcontinent.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                            <div>
                                <h5 className="font-bold text-xs uppercase tracking-widest mb-4 text-amber-400 font-mono">Explore</h5>
                                <ul className="space-y-2 text-sm text-white/50 font-light">
                                    <li><a href="#explore" className="hover:text-amber-400 transition-colors">Kanyakumari & Dhanushkodi</a></li>
                                    <li><a href="#explore" className="hover:text-amber-400 transition-colors">Nilgiris & Kodaikanal</a></li>
                                    <li><a href="#explore" className="hover:text-amber-400 transition-colors">Western Ghats Trails</a></li>
                                </ul>
                            </div>

                            <div>
                                <h5 className="font-bold text-xs uppercase tracking-widest mb-4 text-amber-400 font-mono">Stays</h5>
                                <ul className="space-y-2 text-sm text-white/50 font-light">
                                    <li><a href="#stays" className="hover:text-amber-400 transition-colors">Chettinad Mansions</a></li>
                                    <li><a href="#stays" className="hover:text-amber-400 transition-colors">Coastal Homestays</a></li>
                                    <li><a href="#stays" className="hover:text-amber-400 transition-colors">Ashrams & Hostels</a></li>
                                </ul>
                            </div>

                            <div>
                                <h5 className="font-bold text-xs uppercase tracking-widest mb-4 text-amber-400 font-mono">Connect</h5>
                                <ul className="space-y-2 text-sm text-white/50 font-light">
                                    <li><a href="#" className="hover:text-amber-400 transition-colors">Instagram Feed</a></li>
                                    <li><a href="#" className="hover:text-amber-400 transition-colors">Solo Travellers Club</a></li>
                                    <li><a href="#" className="hover:text-amber-400 transition-colors">Safety Community</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/30">
                        <span>© 2026 Bharat Solo Traverse Systems</span>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-white">Privacy Protocol</a>
                            <a href="#" className="hover:text-white">Terms of Traversal</a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
