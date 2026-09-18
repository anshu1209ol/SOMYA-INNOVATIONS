"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui";
import {
  MapPin,
  Compass,
  Plus,
  Minus,
  Navigation,
  Layers,
  ExternalLink,
} from "lucide-react";

export interface MapPlaceholderProps {
  city?: string;
  address?: string;
  coordinatesLabel?: string;
  apiKey?: string;
  className?: string;
}

export function MapPlaceholder({
  city = "[YOUR CITY]",
  address = "[YOUR CITY], India",
  coordinatesLabel = "[COORDINATES: LAT / LONG]",
  apiKey,
  className = "",
}: MapPlaceholderProps) {
  const [zoomLevel, setZoomLevel] = useState(14);
  const [isLayerModalOpen, setIsLayerModalOpen] = useState(false);

  // If a real API key is configured in environment, render live Google Maps iframe
  if (apiKey) {
    return (
      <div className={`relative w-full h-[400px] rounded-3xl overflow-hidden border border-white/[0.1] bg-zinc-950 ${className}`}>
        <iframe
          title="Office Location Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
            address
          )}`}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-[440px] rounded-3xl overflow-hidden border border-white/[0.1] bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950/40 shadow-2xl flex flex-col justify-between p-6 sm:p-8 ${className}`}
    >
      {/* ─── Cartographic Stylized Grid & Vectors ────────────────────── */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 500"
          preserveAspectRatio="none"
        >
          {/* Stylized road arteries */}
          <path
            d="M-50,120 Q300,180 500,80 T850,220"
            fill="none"
            stroke="rgba(99, 102, 241, 0.4)"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <path
            d="M100,550 Q250,280 400,240 T750,50"
            fill="none"
            stroke="rgba(6, 182, 212, 0.3)"
            strokeWidth="2"
          />
          <path
            d="M-20,380 C200,320 380,240 820,310"
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="2"
          />
          <path
            d="M400,-20 L400,520"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.5"
          />
          <path
            d="M-20,240 L820,240"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.5"
          />
          {/* Radial grid circles */}
          <circle
            cx="400"
            cy="240"
            r="80"
            fill="none"
            stroke="rgba(99, 102, 241, 0.2)"
            strokeWidth="1"
          />
          <circle
            cx="400"
            cy="240"
            r="160"
            fill="none"
            stroke="rgba(99, 102, 241, 0.1)"
            strokeWidth="1"
          />
          <circle
            cx="400"
            cy="240"
            r="240"
            fill="none"
            stroke="rgba(6, 182, 212, 0.05)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Central Pulsing Map Pin Indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-indigo-500/20 animate-ping absolute inset-0" />
          <div className="w-12 h-12 rounded-full bg-indigo-600/30 border border-indigo-400/50 flex items-center justify-center text-white shadow-[0_0_30px_rgba(99,102,241,0.6)] backdrop-blur-sm relative z-10">
            <MapPin className="w-6 h-6 text-indigo-300" />
          </div>
        </div>
        <div className="mt-2 px-3 py-1 rounded-full bg-zinc-950/90 border border-indigo-500/40 text-xs font-mono text-white shadow-lg whitespace-nowrap">
          {city}
        </div>
      </div>

      {/* Top Bar: Integration Status & Layer Toggles */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="accent" size="sm" dot>
            Interactive Map Placeholder
          </Badge>
          <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-500 bg-white/[0.04] px-2.5 py-0.5 rounded-full border border-white/[0.06]">
            {coordinatesLabel}
          </span>
        </div>

        {/* Map Control Tools */}
        <div className="flex items-center gap-1.5 bg-zinc-950/80 p-1 rounded-xl border border-white/[0.08] backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(z + 1, 18))}
            className="w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
            title="Zoom in"
            aria-label="Zoom in"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(z - 1, 8))}
            className="w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
            title="Zoom out"
            aria-label="Zoom out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-mono text-zinc-500 px-1.5">
            {zoomLevel}z
          </span>
          <button
            type="button"
            onClick={() => setIsLayerModalOpen(!isLayerModalOpen)}
            className="w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
            title="Map provider settings"
            aria-label="Map provider settings"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Layer Modal Dialog / Config Flyout */}
      {isLayerModalOpen && (
        <div className="absolute top-16 right-6 z-30 w-80 p-4 rounded-2xl bg-zinc-950/95 border border-indigo-500/30 shadow-2xl backdrop-blur-md text-xs space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <span className="font-semibold text-white">Map Integration Guide</span>
            <button
              onClick={() => setIsLayerModalOpen(false)}
              className="text-zinc-500 hover:text-white"
            >
              &times;
            </button>
          </div>
          <p className="text-zinc-400 leading-relaxed">
            This module is pre-wired to accept:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-zinc-300 font-mono text-[11px]">
            <li>Google Maps Platform Embed API</li>
            <li>Mapbox GL JS Vector Tiles</li>
            <li>Leaflet / OpenStreetMap Tiles</li>
          </ul>
          <div className="pt-2 text-[10px] text-indigo-400 font-mono">
            Pass <code className="bg-white/[0.06] px-1 py-0.5 rounded">NEXT_PUBLIC_MAPS_API_KEY</code> to enable live tiles.
          </div>
        </div>
      )}

      {/* Bottom Information Card & Actions */}
      <div className="relative z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="max-w-md p-4 rounded-2xl bg-zinc-950/85 border border-white/[0.08] backdrop-blur-md space-y-1.5 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
            <Compass className="w-3.5 h-3.5" />
            <span>Facility Location</span>
          </div>
          <h4 className="text-sm font-bold text-white tracking-tight">
            {city}
          </h4>
          <p className="text-xs text-zinc-400">
            {address}
          </p>
          <p className="text-[10px] font-mono text-zinc-500 pt-1">
            Ready for integration with Google Maps Platform or Mapbox.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Maps</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>
    </div>
  );
}
