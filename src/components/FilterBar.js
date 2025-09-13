"use client";
import { useState } from "react";

export default function FilterBar({ onChange }) {
  const [active, setActive] = useState("all");

  const handleFilter = (filter) => {
    setActive(filter);
    onChange(filter);
  };

  return (
    <div className="flex gap-2 justify-center sm:justify-start">
      {["all", "active", "completed"].map((f) => (
        <button
          key={f}
          className={`px-4 py-2 rounded-full transition text-sm ${
            active === f
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => handleFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
