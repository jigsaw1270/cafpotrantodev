'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ComboboxProps {
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  className?: string;
}

export function Combobox({ 
  placeholder = "Select option...", 
  options = [],
  className 
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className={cn("relative w-full", className)}>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-full justify-between"
        onClick={() => setOpen(!open)}
      >
        {value
          ? options.find((option) => option.value === value)?.label
          : placeholder}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      
      {/* Placeholder dropdown - not functional yet */}
      {open && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-md border  p-0  bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
          <div className="p-1">
            {options.length > 0 ? (
              options.map((option) => (
                <div
                  key={option.value}
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-muted-foreground"
                  onClick={() => {
                    setValue(option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                No options available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
