import * as React from "react";
import { Check, ChevronsUpDown, Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { INDIAN_STATES, TOP_LOCATIONS } from "@/lib/india-data";

export function LocationSelector({ onSelect }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (currentValue) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    if (onSelect) onSelect(newValue);
    setOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl mx-auto items-center justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full sm:w-[320px] justify-between bg-zinc-900/80 border-amber-500/30 text-white hover:bg-zinc-800 hover:text-white h-14 rounded-2xl px-6 text-base font-light backdrop-blur-md transition-all shadow-lg"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="truncate">
                {value ? value : "Select State / Region..."}
              </span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-amber-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full sm:w-[320px] p-0 bg-zinc-950 border-amber-500/20 text-white backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl">
          <Command className="bg-transparent text-white">
            <CommandInput placeholder="Search states (Tamil Nadu, Kerala)..." className="h-12 border-none focus:ring-0 text-white placeholder-white/30" />
            <CommandList className="max-h-[300px] scrollbar-hide">
              <CommandEmpty className="py-6 text-center text-sm text-white/40">No state found.</CommandEmpty>
              <CommandGroup heading="All States & Territories (மாநிலங்கள்)" className="px-2 text-amber-400/70 text-[10px] uppercase tracking-widest font-mono font-bold">
                {INDIAN_STATES.map((state) => (
                  <CommandItem
                    key={state}
                    value={state}
                    onSelect={handleSelect}
                    className="flex items-center gap-2 px-3 py-3 rounded-xl hover:bg-amber-500/10 cursor-pointer transition-colors aria-selected:bg-amber-500/20"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-amber-400",
                        value === state ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="text-white font-medium">{state}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="hidden sm:flex items-center text-amber-400/40 font-mono font-bold text-xs uppercase tracking-widest">
        Or Explore
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {TOP_LOCATIONS.slice(0, 4).map((loc) => (
          <button
            key={loc.name}
            onClick={() => handleSelect(loc.state)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-amber-500/20 hover:border-amber-400/50 transition-all active:scale-95 cursor-pointer"
          >
            <span>{loc.name}</span>
            {loc.tag && <span className="text-[10px] opacity-70 text-amber-200">({loc.tag})</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
