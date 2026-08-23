import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, Youtube, ExternalLink, Hash, Sparkles, Loader2, Landmark } from "lucide-react";

export default function TouristPlaces({ selectedState }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = selectedState ? `/api/places?state=${encodeURIComponent(selectedState)}` : '/api/places';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPlaces(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error("Error fetching places:", err))
      .finally(() => setLoading(false));
  }, [selectedState]);

  return (
    <section id="places" className="py-24 bg-zinc-950 text-white relative overflow-hidden border-t border-white/10">
      {/* Indian Cultural Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-topo-pattern opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-[0.25em] mb-3">
              <Landmark className="w-4 h-4" />
              <span>{selectedState ? `${selectedState} • Heritage Archives (வரலாறு)` : "Historic Monuments & Sacred Archives • BHARAT"}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">
              Historic Monuments & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 italic font-serif normal-case">
                Hidden Coastal Sanctuaries
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-white/50 text-sm font-light leading-relaxed border-l border-white/10 pl-6">
            Vivekananda Rock Memorial, Dhanushkodi submerged town, Madurai Meenakshi gopuram, Thanjavur Big Temple, and Mahabalipuram shore monoliths.
          </p>
        </div>

        {loading ? (
          <div className="h-[360px] flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Accessing Heritage Data...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {places.length > 0 ? places.map((place) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group bg-zinc-900/60 rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/40 transition-all duration-500 p-3"
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl">
                  <img
                    src={place.image_url}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1000&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                  {place.is_hidden_spot && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-black text-[9px] font-mono font-bold uppercase tracking-widest shadow-lg">
                      <Sparkles className="w-3 h-3 fill-current" />
                      Hidden Spot (ரகசிய இடம்)
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                        #{place.instagram_hashtag}
                      </span>
                      <span className="text-[10px] text-white/30">•</span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                        {place.state}
                      </span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-black tracking-tight uppercase text-white group-hover:text-amber-300 transition-colors">
                      {place.name}
                    </h4>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <p className="text-white/60 text-xs font-light leading-relaxed">
                    {place.description}
                  </p>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <a
                      href={`https://www.instagram.com/explore/tags/${place.instagram_hashtag}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                      Explore Live Photos
                    </a>

                    <span className="text-[10px] font-mono uppercase text-white/30 tracking-widest">
                      Verified Landmark
                    </span>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full py-24 text-center border border-dashed border-white/10 rounded-3xl text-white/30 font-mono text-xs uppercase tracking-widest">
                No monuments listed for {selectedState || 'this region'}.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
