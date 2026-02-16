

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveRight, MapPin, Trophy, Loader2 } from "lucide-react";

interface ExploringProps {
  selectedState?: string;
}

export default function Exploring({ selectedState }: ExploringProps) {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setLoading(true);
    const url = selectedState ? `/api/data?state=${encodeURIComponent(selectedState)}` : '/api/data';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setActivities(data.activities || []);
      })
      .finally(() => setLoading(false));
  }, [selectedState]);

  const filteredActivities = filter === "All" 
    ? activities 
    : activities.filter(a => a.category === filter);

  // Dynamically get categories from activities
  const categories = ["All", ...Array.from(new Set(activities.map(a => a.category)))];

  return (
    <section id="explore" className="py-24 bg-zinc-950 text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40 mb-4">
              {selectedState ? `${selectedState} Traverses` : "The Traverses"}
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-none uppercase">
              Solo Retreats & <br />
              <span className="italic text-white/60 font-serif">Tracking Sports</span>
            </h3>
          </div>
          <div className="space-y-4">
            <p className="max-w-xs text-white/40 font-light leading-relaxed">
              Every trail is mapped for safety and soul. From vertical climbs to meditative solo retreats.
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-black transition-all ${
                    filter === cat 
                    ? "bg-white text-black" 
                    : "bg-white/5 text-white/40 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-white/20" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.length > 0 ? filteredActivities.map((activity, idx) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6 border border-white/5">
                  <img
                    src={activity.image_url}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="w-fit px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-[9px] uppercase tracking-widest font-black text-emerald-400">
                      {activity.category}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
                        <Trophy className="w-3 h-3 text-white/40" />
                        <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">
                          {activity.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
                        <MapPin className="w-3 h-3 text-white/40" />
                        <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">
                          {activity.location}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-3xl font-black tracking-tighter uppercase leading-tight group-hover:text-emerald-400 transition-colors">
                      {activity.title}
                    </h4>
                  </div>
                </div>
                <p className="text-white/40 text-sm font-light leading-relaxed mb-6 line-clamp-2">
                  {activity.description}
                </p>
                  <button className="w-full flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-[0.2em] group-hover:gap-5 transition-all text-white/60 hover:text-white">
                    <span className="flex items-center gap-3">
                      Secure Path Access <MoveRight className="w-4 h-4 text-emerald-500" />
                    </span>
                    <span className="text-[8px] text-white/20">System ID: {activity.id.slice(0, 8)}</span>
                  </button>

              </motion.div>
            )) : (
              <div className="col-span-full py-24 text-center border border-dashed border-white/10 rounded-3xl text-white/20 font-black uppercase tracking-[0.3em]">
                No traverses mapped for this region yet.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
