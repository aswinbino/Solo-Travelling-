

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Utensils, Star, Loader2 } from "lucide-react";

interface StayFoodProps {
  selectedState?: string;
}

export default function StayFood({ selectedState }: StayFoodProps) {
  const [data, setData] = useState<{ stays: any[], food: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = selectedState ? `/api/data?state=${encodeURIComponent(selectedState)}` : '/api/data';
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [selectedState]);

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-black/20" />
      </div>
    );
  }

  const STAYS = data?.stays || [];
  const FOODS = data?.food || [];

  return (
    <section id="stays" className="py-24 bg-white text-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center lg:text-left">
          {selectedState && (
            <div className="inline-block px-4 py-1 rounded-full bg-black/5 border border-black/10 text-[10px] font-black uppercase tracking-widest mb-6">
              Showing Results for {selectedState}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Stays Column */}
          <div>
            <div className="mb-12">
              <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-black/40 mb-4">Base Camps</h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-6">AFFORDABLE <br />SANCTUARIES</h3>
              <p className="text-black/60 font-light max-w-md">
                Rest without the luxury tax. We've vetted the best local stays that prioritize community and comfort over excess.
              </p>
            </div>
            
            <div className="space-y-4">
              {STAYS.length > 0 ? STAYS.map((stay, idx) => (
                  <motion.div 
                    key={stay.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-6 rounded-2xl border border-black/5 hover:bg-zinc-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white overflow-hidden">
                        {stay.image ? (
                          <img src={stay.image} alt={stay.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                        ) : (
                          <Home className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{stay.name}</h4>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-[10px] text-black/60 font-bold ml-1 uppercase tracking-widest">{stay.rating}</span>
                          <span className="text-[10px] text-black/20 font-bold mx-1 uppercase tracking-widest">•</span>
                          <span className="text-[10px] text-black/40 font-bold uppercase tracking-widest">{stay.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black tracking-tighter">{stay.price}</div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-black/40">Base Price</div>
                    </div>
                  </motion.div>
              )) : (
                <div className="py-12 text-center border border-dashed border-black/10 rounded-2xl text-black/40 font-bold uppercase tracking-widest text-xs">
                  No sanctuaries found in this region yet.
                </div>
              )}
            </div>
          </div>

          {/* Food Column */}
            <div id="food">
              <div className="mb-12">
                <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-black/40 mb-4">Wild Table</h2>
                <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-6">LOCAL <br />PROVISIONS</h3>
                  <p className="text-black/60 font-light max-w-md">
                    Fuel your journey with the authentic flavors of Bharat. Sustainable, communal, and incredibly affordable local cuisine from across the subcontinent.
                  </p>
              </div>
              
              <div className="space-y-4">
                {FOODS.length > 0 ? FOODS.map((food, idx) => (
                  <motion.div 
                    key={food.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-6 rounded-2xl border border-black/5 hover:bg-zinc-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors">
                        <Utensils className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{food.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-black/40">{food.type}</span>
                          <span className="text-[10px] text-black/10 font-bold uppercase tracking-widest">•</span>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-black/60 italic">{food.origin}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black tracking-tighter">{food.price}</div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-black/40">Avg Price</div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="py-12 text-center border border-dashed border-black/10 rounded-2xl text-black/40 font-bold uppercase tracking-widest text-xs">
                    No local provisions listed for this region.
                  </div>
                )}
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
