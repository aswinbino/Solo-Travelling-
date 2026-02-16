

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, Youtube, ExternalLink, Hash, Sparkles, Loader2 } from "lucide-react";

// TouristPlacesProps removed

// Place interface removed

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

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <section id="places" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-12 bg-emerald-500/50" />
              <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-emerald-500">
                Discovery Protocol
              </h2>
            </div>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              Tourist Archives & <br />
              <span className="text-white/30 italic font-serif normal-case tracking-normal">Hidden Echoes</span>
            </h3>
          </div>
          <p className="max-w-sm text-white/40 font-light leading-relaxed border-l border-white/10 pl-6">
            From iconic landmarks to off-grid coordinates. Cross-referenced with real-time social data and local legends.
          </p>
        </div>

        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-500/20" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {places.length > 0 ? places.map((place, idx) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="group bg-zinc-950/50 rounded-[32px] overflow-hidden border border-white/5 hover:border-emerald-500/20 transition-all duration-500 p-2"
              >
                <div className="relative aspect-video overflow-hidden rounded-[24px]">
                  <img
                    src={place.image_url}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {place.is_hidden_spot && (
                    <div className="absolute top-6 right-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest">
                      <Sparkles className="w-3 h-3 fill-current" />
                      Hidden Spot
                    </div>
                  )}

                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Hash className="w-3 h-3 text-emerald-500" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
                        #{place.instagram_hashtag}
                      </span>
                    </div>
                    <h4 className="text-4xl font-black tracking-tighter uppercase mb-2">
                      {place.name}
                    </h4>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                      {place.state} Terminal
                    </span>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  <p className="text-white/40 font-light leading-relaxed">
                    {place.description}
                  </p>

                  <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Social Connect:</span>
                      <div className="flex gap-2">
                        {Object.entries(place.social_media_links || {}).map(([platform, url]) => (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all border border-white/10"
                            title={platform}
                          >
                            {getSocialIcon(platform)}
                          </a>
                        ))}
                      </div>
                    </div>

                    <a
                      href={`https://www.instagram.com/explore/tags/${place.instagram_hashtag}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-colors group/btn"
                    >
                      View Real-Time Feed
                      <Instagram className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full py-40 text-center border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-white/10" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black uppercase tracking-widest text-white/20">No archives found</h4>
                  <p className="text-sm text-white/10 uppercase tracking-[0.2em]">Coordinates unmapped for {selectedState || 'this region'}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
