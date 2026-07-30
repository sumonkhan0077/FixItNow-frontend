"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarPickerProps {
  value: number;
  onChange: (v: number) => void;
}

export function StarPicker({ value, onChange }: StarPickerProps) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`size-6 transition-colors ${
              i < (hovered || value)
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
      {value > 0 && <span className="ml-2 text-sm font-bold text-amber-500">{value}/5</span>}
    </div>
  );
}