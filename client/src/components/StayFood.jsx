import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Utensils, Star, Loader2, MapPin, Sparkles, Coffee } from "lucide-react";

export default function StayFood({ selectedState }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all"); // "all" | "stays" | "food"

  useEffect(() => {
    setLoading(true);
    const url = selectedState ? `/api/data?state=${encodeURIComponent(selectedState)}` : '/api/data';
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Error loading stays and food:", err))
      .finally(() => setLoading(false));
  }, [selectedState]);

  const STAYS = data?.stays || [];
  const FOODS = data?.food || [];

  return (
    <section id="stays" className="py-24 bg-zinc-950 text-white relative overflow-hidden border-t border-white/10">
      {/* Indian Cultural Background Glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-indian-mandala opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-[0.25em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {selectedState ? `Heritage & Stays • ${selectedState}` : "Basecamps & Flavours • தங்குமிடம் & சுவை"}
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-tight">
              Desi Basecamps & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 italic font-serif normal-case">
                Traditional Provisions & Kaapi
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            <p className="max-w-md text-white/50 text-sm font-light leading-relaxed">
              Kanyakumari coast stays, Chettinad heritage mansions, Nilgiri tea canopy cottages, and Kumbakonam degree filter kaapi. Zero luxury tax, authentic connection.
            </p>

            {/* Tab Filter in English */}
            <div className="flex items-center gap-2 p-1 rounded-2xl bg-zinc-900 border border-white/10 w-fit">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "all" ? "bg-amber-400 text-black shadow-md" : "text-white/60 hover:text-white"
                }`}
              >
                All Provisions
              </button>
              <button
                onClick={() => setActiveTab("stays")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "stays" ? "bg-amber-400 text-black shadow-md" : "text-white/60 hover:text-white"
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                Stays ({STAYS.length})
              </button>
              <button
                onClick={() => setActiveTab("food")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "food" ? "bg-amber-400 text-black shadow-md" : "text-white/60 hover:text-white"
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                Food & Kaapi ({FOODS.length})
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="h-[360px] flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Fetching Stays & Food...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Homestays & Sanctuaries */}
            {(activeTab === "all" || activeTab === "stays") && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-tight text-white">
                        Sanctuaries & Homestays (தங்குமிடம்)
                      </h3>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                        Heritage Mansions • Wood Cottages • Beachfront Shacks
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-amber-400">
                    {STAYS.length} Listed
                  </span>
                </div>

                <div className="space-y-4">
                  {STAYS.length > 0 ? STAYS.map((stay) => (
                    <motion.div
                      key={stay.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group p-5 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-black/60 shrink-0 border border-white/10">
                          <img
                            src={stay.image}
                            alt={stay.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1000&auto=format&fit=crop";
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              {stay.type || 'Local Stay'}
                            </span>
                            <div className="flex items-center gap-1 text-amber-400">
                              <Star className="w-3 h-3 fill-current" />
                              <span className="text-[10px] font-bold font-mono">{stay.rating}</span>
                            </div>
                          </div>
                          <h4 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                            {stay.name}
                          </h4>
                          <div className="flex items-center gap-1.5 text-xs text-white/50 font-light mt-0.5">
                            <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                            <span className="truncate">{stay.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 self-end sm:self-center">
                        <div className="text-xl font-black font-mono text-emerald-400 tracking-tight">
                          {stay.price}
                        </div>
                        <div className="text-[9px] font-mono uppercase tracking-widest text-white/40">
                          Per Night
                        </div>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="py-12 text-center border border-dashed border-white/10 rounded-2xl text-white/30 text-xs font-mono uppercase">
                      No stays mapped for this region yet.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Right Column: Local Food & Dhaba Provisions */}
            {(activeTab === "all" || activeTab === "food") && (
              <div id="food" className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                      <Utensils className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-tight text-white">
                        Local Food & Kaapi (சுவை)
                      </h3>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                        Banana Leaf Feasts • Kari Dosa • Degree Filter Kaapi
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-orange-400">
                    {FOODS.length} Specialities
                  </span>
                </div>

                <div className="space-y-4">
                  {FOODS.length > 0 ? FOODS.map((food) => (
                    <motion.div
                      key={food.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group p-5 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-orange-400/40 transition-all flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-black transition-all shrink-0">
                          <Coffee className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-300 border border-orange-500/20">
                              {food.type}
                            </span>
                          </div>
                          <h4 className="font-bold text-base text-white group-hover:text-orange-300 transition-colors">
                            {food.name}
                          </h4>
                          <span className="text-xs text-white/50 italic">
                            Origin: {food.origin}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xl font-black font-mono text-amber-400 tracking-tight">
                          {food.price}
                        </div>
                        <div className="text-[9px] font-mono uppercase tracking-widest text-white/40">
                          Avg Meal
                        </div>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="py-12 text-center border border-dashed border-white/10 rounded-2xl text-white/30 text-xs font-mono uppercase">
                      No local food provisions listed for this region yet.
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
