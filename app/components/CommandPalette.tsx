"use client";

import { useEffect, useState } from "react";

type Command = {
  label: string;
  action: () => void;
  hint?: string;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const commands: Command[] = [
    { label: "Behandlungen", action: () => document.getElementById("treatments")?.scrollIntoView({ behavior: "smooth" }), hint: "#treatments" },
    { label: "Preise", action: () => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }), hint: "#pricing" },
    { label: "Über Uns", action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), hint: "#about" },
    { label: "Kontakt", action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), hint: "#contact" },
    { label: "Blog", action: () => (window.location.href = "/blog"), hint: "/blog" },
  ];

  const results = query
    ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24">
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-2xl mx-auto glass rounded-2xl p-4">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Suchen… (⌘K)"
          className="w-full bg-transparent outline-none text-lg px-3 py-2 focus-glow"
        />
        <div className="mt-2 divide-y divide-white/10">
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => {
                r.action();
                setOpen(false);
              }}
              className="w-full text-left px-3 py-3 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-between"
            >
              <span>{r.label}</span>
              {r.hint && <span className="text-sm opacity-60">{r.hint}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


