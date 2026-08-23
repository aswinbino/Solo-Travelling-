import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveRight, MapPin, Trophy, Loader2, Compass, Footprints } from "lucide-react";

export default function Exploring({ selectedState }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setLoading(true);
    const url = selectedState ? `/api/data?state=${encodeURIComponent(selectedState)}` : '/api/data';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setActivities(data?.activities || []);
      })
      .catch(err => {
        console.error("Failed to load activities:", err);
      })
      .finally(() => setLoading(false));
  }, [selectedState]);

  const filteredActivities = filter === "All"
    ? activities
    : activities.filter((a) => a.category?.toLowerCase() === filter.toLowerCase());

  const categories = ["All", ...Array.from(new Set(activities.map(a => a.category).filter(Boolean)))];

  return (
    <section id="explore" className="py-24 bg-zinc-950 text-white relative overflow-hidden border-t border-white/10">
      {/* Indian Cultural Background Motifs & Ambient Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-topo-pattern opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-[0.25em] mb-3">
              <Footprints className="w-4 h-4" />
              <span>{selectedState ? `${selectedState} • Solo Traversal (பயணம்)` : "Bharat Traverses • தனிப்பயணம்"}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none uppercase">
              Untracked Trails & <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 font-serif normal-case">
                Spiritual Passes
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            <p className="max-w-md text-white/50 text-sm font-light leading-relaxed">
              Kanyakumari 3-ocean point, Dhanushkodi submerged town, Kodaikanal Dolphin's Nose cliff, Nilgiri Shola mist trails, and Himalayan passes.
            </p>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-mono font-bold transition-all cursor-pointer ${
                    filter === cat
                      ? "bg-amber-400 text-black shadow-md shadow-amber-400/20"
                      : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {cat === "All" ? "All Routes (அனைத்தும்)" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="h-[360px] flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Loading Bharat Trails...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.length > 0 ? filteredActivities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-zinc-900/60 border border-white/10 hover:border-amber-500/30 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={activity.image_url}
                      alt={activity.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1000&auto=format&fit=crop";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

                    {/* Category pill */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-[9px] uppercase tracking-widest font-mono font-bold text-amber-300">
                        {activity.category}
                      </span>
                    </div>

                    {/* State pill */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-wider font-mono text-white/70">
                        {activity.state}
                      </span>
                    </div>

                    {/* Difficulty & Location */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80">
                        <Trophy className="w-3 h-3 text-amber-400" />
                        <span>{activity.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80 truncate">
                        <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                        <span className="truncate">{activity.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h4 className="text-xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {activity.title}
                    </h4>
                    <p className="text-white/50 text-xs font-light leading-relaxed line-clamp-3">
                      {activity.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between">
                  <a
                    href="#ai-planner"
                    className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 group-hover:text-amber-300 transition-all font-semibold cursor-pointer"
                  >
                    Plan AI Traversal for this Trail
                    <MoveRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl text-white/40 font-mono text-xs uppercase tracking-widest space-y-3">
                <Compass className="w-8 h-8 mx-auto text-amber-400/40" />
                <div>No traverses found matching this filter for {selectedState || 'this region'}.</div>
                <button
                  onClick={() => setFilter("All")}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-mono uppercase tracking-widest text-white cursor-pointer"
                >
                  View All Traverses
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
