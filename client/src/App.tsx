import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Exploring from "@/components/Exploring";
import StayFood from "@/components/StayFood";
import Tracking from "@/components/Tracking";
import TouristPlaces from "@/components/TouristPlaces";
import { Compass } from "lucide-react";

export default function App() {
    const [selectedState, setSelectedState] = useState<string>("");

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />
            <Hero onStateChange={setSelectedState} />
            <Exploring selectedState={selectedState} />
            <TouristPlaces selectedState={selectedState} />
            <StayFood selectedState={selectedState} />
            <Tracking />

            <footer className="py-20 bg-zinc-950 text-white border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                        <div>
                            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter mb-4 uppercase">
                                <Compass className="w-8 h-8" />
                                India
                            </div>
                            <p className="text-white/40 max-w-sm font-light leading-relaxed">
                                Dedicated to the solo navigator in Bharat. Mapping the untracked, supporting the local, and respecting the wild across the subcontinent.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                            <div>
                                <h5 className="font-bold text-xs uppercase tracking-widest mb-4">Explore</h5>
                                <ul className="space-y-2 text-sm text-white/40 font-light">
                                    <li><a href="#explore" className="hover:text-white transition-colors">Traverses</a></li>
                                    <li><a href="#explore" className="hover:text-white transition-colors">Himalayan Safety</a></li>
                                    <li><a href="#explore" className="hover:text-white transition-colors">Altitude API</a></li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-bold text-xs uppercase tracking-widest mb-4">Base Camps</h5>
                                <ul className="space-y-2 text-sm text-white/40 font-light">
                                    <li><a href="#stays" className="hover:text-white transition-colors">Homestays</a></li>
                                    <li><a href="#stays" className="hover:text-white transition-colors">Zostels</a></li>
                                    <li><a href="#stays" className="hover:text-white transition-colors">Booking</a></li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-bold text-xs uppercase tracking-widest mb-4">Connect</h5>
                                <ul className="space-y-2 text-sm text-white/40 font-light">
                                    <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
                        <span>© 2026 Spiti Traverse Systems</span>
                        <div className="flex gap-8">
                            <a href="#">Privacy Protocol</a>
                            <a href="#">Terms of Traversal</a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
