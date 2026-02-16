

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

export function LocationSelector({ onSelect }: { onSelect?: (value: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    if (onSelect) onSelect(newValue);
    setOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full sm:w-[300px] justify-between bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white h-14 rounded-2xl px-6 text-base font-light backdrop-blur-md transition-all"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-white/40" />
              <span className="truncate">
                {value ? value : "Select State..."}
              </span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full sm:w-[300px] p-0 bg-zinc-950 border-white/10 text-white backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl">
          <Command className="bg-transparent text-white">
            <CommandInput placeholder="Search states..." className="h-12 border-none focus:ring-0 text-white placeholder:text-white/30" />
            <CommandList className="max-h-[300px] scrollbar-hide">
              <CommandEmpty className="py-6 text-center text-sm text-white/40">No state found.</CommandEmpty>
              <CommandGroup heading="All India States" className="px-2 text-white/40 text-[10px] uppercase tracking-widest font-bold">
                {INDIAN_STATES.map((state) => (
                  <CommandItem
                    key={state}
                    value={state}
                    onSelect={handleSelect}
                    className="flex items-center gap-2 px-3 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors aria-selected:bg-white/10"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-white",
                        value === state ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="text-white/80 font-medium">{state}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="hidden sm:flex items-center text-white/20 font-bold text-xs uppercase tracking-widest">
        Or explore
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {TOP_LOCATIONS.slice(0, 3).map((loc) => (
          <button
            key={loc.name}
            onClick={() => handleSelect(loc.state)}
            className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-bold uppercase tracking-wider hover:bg-white/10 hover:border-white/30 transition-all active:scale-95"
          >
            {loc.name}
          </button>
        ))}
      </div>
    </div>
  );
}
