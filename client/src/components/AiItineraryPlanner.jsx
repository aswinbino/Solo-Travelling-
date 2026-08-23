import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Compass, 
    CloudSun, 
    Home, 
    Sparkles, 
    Calendar, 
    IndianRupee, 
    MapPin, 
    Sun, 
    Moon, 
    Sunrise, 
    ShieldAlert, 
    CheckCircle2, 
    Loader2, 
    ArrowRight,
    Umbrella,
    RotateCcw
} from "lucide-react";

export default function AiItineraryPlanner() {
    const [destination, setDestination] = useState("Kanyakumari, Tamil Nadu");
    const [days, setDays] = useState(3);
    const [maxDailyBudget, setMaxDailyBudget] = useState(2500);
    const [travelStyle, setTravelStyle] = useState("Solo Coastal & Temple Traversal");
    
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState(1);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const QUICK_DESTINATIONS = [
        "Kanyakumari, Tamil Nadu",
        "Rameshwaram, Tamil Nadu",
        "Ooty, Tamil Nadu",
        "Kodaikanal, Tamil Nadu",
        "Madurai, Tamil Nadu",
        "Munnar, Kerala",
        "Hampi, Karnataka"
    ];

    const TRAVEL_STYLES = [
        "Solo Coastal & Temple Traversal",
        "High-Altitude Hill Station Trekking",
        "Heritage & Ancient Architecture",
        "Budget Solo Backpacking",
        "Spiritual & Meditation Retreat"
    ];

    const handleGenerate = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);
        setLoadingStep(1);

        const stepTimer1 = setTimeout(() => setLoadingStep(2), 700);
        const stepTimer2 = setTimeout(() => setLoadingStep(3), 1400);

        try {
            const res = await fetch("/api/itinerary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    destination,
                    days: Number(days),
                    maxDailyBudget: Number(maxDailyBudget),
                    travelStyle
                })
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || `Server responded with status ${res.status}`);
            }

            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error("Failed to generate AI itinerary:", err);
            setError(err.message || "Failed to generate itinerary. Please try again.");
        } finally {
            clearTimeout(stepTimer1);
            clearTimeout(stepTimer2);
            setLoading(false);
        }
    };

    return (
        <section id="ai-planner" className="py-24 bg-zinc-950 text-white relative overflow-hidden border-t border-white/10">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header with Subtle Tamil Cultural Accent */}
                <div className="max-w-3xl mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-amber-500/20 text-[11px] font-mono uppercase tracking-widest text-amber-300 mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Real-Time Traversal Engine • பயண வழிகாட்டி
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">
                        Live Neural <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400">Itinerary Generator</span>
                    </h2>
                    <p className="text-white/60 text-base font-light leading-relaxed">
                        Fuses real-time <strong>Google Maps Geocoding & Places</strong> with live <strong>OpenWeather atmospheric telemetry</strong>. Customizes Tamil Nadu and pan-Indian solo itineraries with real-time costs in Indian Rupees (₹).
                    </p>
                </div>

                {/* Main Grid: Form + Output */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: Input Form Panel in English */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 bg-zinc-900/80 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6"
                    >
                        <form onSubmit={handleGenerate} className="space-y-6">
                            {/* Destination */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-amber-400/80 mb-2 flex items-center justify-between">
                                    <span>Target Destination (இடம்)</span>
                                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                                </label>
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="e.g. Kanyakumari, Tamil Nadu"
                                    required
                                    className="w-full bg-black/60 border border-white/15 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                                />

                                {/* Quick South Indian chips */}
                                <div className="flex flex-wrap gap-1.5 mt-2.5">
                                    {QUICK_DESTINATIONS.map((d) => (
                                        <button
                                            key={d}
                                            type="button"
                                            onClick={() => setDestination(d)}
                                            className={`text-[10px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                                                destination === d
                                                    ? "bg-amber-500/20 border-amber-400/60 text-amber-300"
                                                    : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20"
                                            }`}
                                        >
                                            {d.split(',')[0]}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Days & Budget Grid in Rupees (₹) */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-amber-400/80 mb-2 flex items-center justify-between">
                                        <span>Duration</span>
                                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                                    </label>
                                    <select
                                        value={days}
                                        onChange={(e) => setDays(Number(e.target.value))}
                                        className="w-full bg-black/60 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-3 text-sm text-white focus:outline-none transition-all cursor-pointer"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                            <option key={num} value={num} className="bg-zinc-900 text-white">
                                                {num} {num === 1 ? "Day" : "Days"}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-emerald-400/80 mb-2 flex items-center justify-between">
                                        <span>Daily Budget (₹)</span>
                                        <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="500"
                                            max="50000"
                                            step="100"
                                            value={maxDailyBudget}
                                            onChange={(e) => setMaxDailyBudget(e.target.value)}
                                            className="w-full bg-black/60 border border-white/15 focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                                        />
                                        <span className="absolute right-3 top-3 text-xs font-mono text-white/40">₹ INR/day</span>
                                    </div>
                                </div>
                            </div>

                            {/* Travel Style */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-amber-400/80 mb-2 flex items-center justify-between">
                                    <span>Navigation Style</span>
                                    <Compass className="w-3.5 h-3.5 text-amber-400" />
                                </label>
                                <select
                                    value={travelStyle}
                                    onChange={(e) => setTravelStyle(e.target.value)}
                                    className="w-full bg-black/60 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-3 text-sm text-white focus:outline-none transition-all cursor-pointer"
                                >
                                    {TRAVEL_STYLES.map((st) => (
                                        <option key={st} value={st} className="bg-zinc-900 text-white">
                                            {st}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-black font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-500/20"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Synthesizing Live Traversal Plan...
                                    </>
                                ) : (
                                    <>
                                        Generate AI Traversal Plan
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Loading progress step indicator */}
                        {loading && (
                            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-xs font-mono">
                                <div className="flex items-center gap-2 text-amber-400">
                                    {loadingStep >= 1 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                    <span>Querying Google Maps Geocoding & Places...</span>
                                </div>
                                <div className={`flex items-center gap-2 ${loadingStep >= 2 ? 'text-amber-400' : 'text-white/30'}`}>
                                    {loadingStep >= 2 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <div className="w-3.5 h-3.5 rounded-full border border-white/20" />}
                                    <span>Retrieving Live OpenWeather Telemetry...</span>
                                </div>
                                <div className={`flex items-center gap-2 ${loadingStep >= 3 ? 'text-amber-300' : 'text-white/30'}`}>
                                    {loadingStep >= 3 ? <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" /> : <div className="w-3.5 h-3.5 rounded-full border border-white/20" />}
                                    <span>LLM Synthesizing Weather-Aware DTO Itinerary in ₹ INR...</span>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Right: Output Payload Panel */}
                    <div className="lg:col-span-7">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-300 flex items-start gap-4"
                                >
                                    <ShieldAlert className="w-6 h-6 shrink-0 mt-0.5 text-red-400" />
                                    <div>
                                        <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Execution Error</h4>
                                        <p className="text-xs text-red-200/80 font-light">{error}</p>
                                    </div>
                                </motion.div>
                            )}

                            {!result && !loading && !error && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full min-h-[440px] rounded-3xl border border-dashed border-white/10 bg-zinc-900/30 flex flex-col items-center justify-center p-8 text-center"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                                        <Compass className="w-8 h-8 stroke-1" />
                                    </div>
                                    <h3 className="font-bold text-lg text-white/80 uppercase tracking-tight mb-2">
                                        Ready For AI Traversal
                                    </h3>
                                    <p className="text-xs text-white/40 max-w-sm leading-relaxed mb-6">
                                        Specify destination, duration, and budget in Rupees (₹) to generate a live, weather-adapted itinerary with Google Maps places context.
                                    </p>
                                    <button 
                                        onClick={() => handleGenerate()}
                                        className="px-6 py-2.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-mono uppercase tracking-widest text-amber-300 transition-all cursor-pointer"
                                    >
                                        Try Sample ("Kanyakumari, Tamil Nadu")
                                    </button>
                                </motion.div>
                            )}

                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    {/* Destination & Meta Header Card */}
                                    <div className="p-6 rounded-3xl bg-zinc-900/90 border border-white/15 backdrop-blur-xl shadow-xl space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div>
                                                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                                    Verified Location (Google Maps)
                                                </div>
                                                <h3 className="text-2xl font-black tracking-tight text-white">
                                                    {result.destination}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <div className="text-2xl font-black text-emerald-400 tracking-tighter">
                                                        ₹{(result.totalEstCostInr || (result.totalEstCostUsd * 85) || 0).toLocaleString('en-IN')}
                                                    </div>
                                                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                                                        Total Est. Cost (INR)
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Weather & Stay Badges */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-white/10">
                                            {/* Weather summary */}
                                            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/5">
                                                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 shrink-0">
                                                    <CloudSun className="w-4 h-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-[10px] font-mono uppercase tracking-wider text-amber-300/80">
                                                        Live Atmospheric Telemetry
                                                    </div>
                                                    <div className="text-xs text-white font-medium truncate">
                                                        {result.weatherSummary}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Recommended Homestay */}
                                            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/5">
                                                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 shrink-0">
                                                    <Home className="w-4 h-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-300/80 flex items-center justify-between">
                                                        <span>Recommended Sanctuary</span>
                                                        <span className="text-emerald-400 font-bold">
                                                            ₹{(result.recommendedHomestay?.estNightlyCostInr || (result.recommendedHomestay?.estNightlyCostUsd * 85) || 0).toLocaleString('en-IN')}/nt
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-white font-medium truncate">
                                                        {result.recommendedHomestay?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Daily Itinerary Timeline */}
                                    <div className="space-y-4">
                                        {result.itinerary?.map((dayObj) => (
                                            <div
                                                key={dayObj.day}
                                                className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-amber-400/30 transition-all space-y-4"
                                            >
                                                {/* Day title */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 font-mono font-bold text-xs uppercase tracking-wider text-amber-300">
                                                            Day {dayObj.day} (நாள் {dayObj.day})
                                                        </span>
                                                        <span className="text-xs text-white/40 font-mono">
                                                            {dayObj.activities?.length || 0} Expeditions
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Activities Grid */}
                                                <div className="grid grid-cols-1 gap-3">
                                                    {dayObj.activities?.map((act, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="p-4 rounded-2xl bg-black/50 border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                                                        >
                                                            <div className="flex items-start gap-3">
                                                                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                                                                    {act.timeOfDay === "Morning" && <Sunrise className="w-4 h-4 text-amber-400" />}
                                                                    {act.timeOfDay === "Afternoon" && <Sun className="w-4 h-4 text-orange-400" />}
                                                                    {act.timeOfDay === "Evening" && <Moon className="w-4 h-4 text-indigo-400" />}
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                                                                            {act.timeOfDay}
                                                                        </span>
                                                                        {act.indoorAlternative && (
                                                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[9px] font-mono text-amber-300">
                                                                                <Umbrella className="w-2.5 h-2.5" />
                                                                                Indoor Alternative (Weather-adapted)
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <h5 className="font-bold text-sm text-white mb-1">
                                                                        {act.title}
                                                                    </h5>
                                                                    <p className="text-xs text-white/60 font-light leading-relaxed">
                                                                        {act.description}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="text-right shrink-0 self-end sm:self-start">
                                                                <div className="text-sm font-black text-emerald-400 font-mono">
                                                                    ₹{(act.estimatedCostInr || (act.estimatedCostUsd * 85) || 0).toLocaleString('en-IN')}
                                                                </div>
                                                                <div className="text-[9px] font-mono uppercase tracking-widest text-white/30">
                                                                    Est. Cost
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Bar */}
                                    <div className="flex items-center justify-between pt-2">
                                        <button
                                            onClick={() => handleGenerate()}
                                            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/70 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
                                        >
                                            <RotateCcw className="w-3.5 h-3.5" />
                                            Re-synthesize Plan
                                        </button>
                                        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                                            Schema: ItineraryResponseDto (Rupees / ₹)
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
