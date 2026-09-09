import React, { useState } from "react";
import {
  MapPin,
  Plus,
  Minus,
  Layers,
  Crosshair,
  AlertTriangle,
  AlertCircle,
  Accessibility,
  Trash2,
  Lightbulb,
  Info,
  Maximize2
} from "lucide-react";
import { MAP_LOCATIONS, MAP_PINS } from "../data/mockData";
import { CityIssue } from "../types";

interface LiveCityMapProps {
  onSelectPin?: (pin: (typeof MAP_PINS)[0]) => void;
  onSelectIssue?: (issueId: string) => void;
  activeFilter?: string;
  onOpenFullMap?: () => void;
}

export const LiveCityMap: React.FC<LiveCityMapProps> = ({
  onSelectPin,
  onSelectIssue,
  onOpenFullMap,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedPin, setSelectedPin] = useState<(typeof MAP_PINS)[0] | null>(null);
  const [activeLayer, setActiveLayer] = useState<"all" | "Critical" | "High" | "Medium" | "Low">("all");
  const [showSatellite, setShowSatellite] = useState(false);

  const filteredPins = activeLayer === "all"
    ? MAP_PINS
    : MAP_PINS.filter((p) => p.severity === activeLayer);

  const handlePinClick = (pin: (typeof MAP_PINS)[0]) => {
    setSelectedPin(pin);
    if (onSelectPin) onSelectPin(pin);
  };

  const getPinIcon = (pin: (typeof MAP_PINS)[0]) => {
    switch (pin.type) {
      case "alert":
        return <AlertTriangle className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />;
      case "warning":
        return <AlertCircle className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />;
      case "wheelchair":
        return <Accessibility className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />;
      case "trash":
        return <Trash2 className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />;
      case "light":
        return <Lightbulb className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />;
      default:
        return <Info className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />;
    }
  };

  const getPinBg = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500 shadow-red-500/50";
      case "High":
        return "bg-orange-500 shadow-orange-500/50";
      case "Medium":
        return "bg-yellow-500 shadow-yellow-500/50";
      case "Low":
      default:
        return "bg-blue-500 shadow-blue-500/50";
    }
  };

  return (
    <div
      id="live-city-map-card"
      className="relative rounded-xl overflow-hidden bg-[#0a101f] border border-slate-800/90 shadow-md flex flex-col h-[380px] sm:h-[420px]"
    >
      {/* Map Header with title and filter legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#0a101f]/95 border-b border-slate-800/80 z-20">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping absolute opacity-75"></span>
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
          </div>
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            LIVE CITY MAP
          </h3>
        </div>

        {/* Severity Legend pills */}
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => setActiveLayer(activeLayer === "Critical" ? "all" : "Critical")}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-all ${
              activeLayer === "Critical" ? "bg-red-500/20 text-red-300 ring-1 ring-red-500" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="text-[11px] font-medium">Critical</span>
          </button>

          <button
            onClick={() => setActiveLayer(activeLayer === "High" ? "all" : "High")}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-all ${
              activeLayer === "High" ? "bg-orange-500/20 text-orange-300 ring-1 ring-orange-500" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="text-[11px] font-medium">High</span>
          </button>

          <button
            onClick={() => setActiveLayer(activeLayer === "Medium" ? "all" : "Medium")}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-all ${
              activeLayer === "Medium" ? "bg-yellow-500/20 text-yellow-300 ring-1 ring-yellow-500" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span className="text-[11px] font-medium">Medium</span>
          </button>

          <button
            onClick={() => setActiveLayer(activeLayer === "Low" ? "all" : "Low")}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-all ${
              activeLayer === "Low" ? "bg-blue-500/20 text-blue-300 ring-1 ring-blue-500" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-[11px] font-medium">Low</span>
          </button>
        </div>
      </div>

      {/* Map Interactive Viewport */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-[#070b16] select-none">
        {/* Dark Tactical Vector Map Graphic */}
        <div
          className="absolute inset-0 transition-transform duration-300 origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Subtle Grid Lines */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
              backgroundSize: "36px 36px",
            }}
          />

          {/* SVG Road Network & Arterials */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 420" preserveAspectRatio="none">
            {/* Outer Ring Road & Radial Corridors */}
            <path
              d="M120,80 Q280,40 450,70 T680,110 T760,260 T640,360 T420,380 T200,340 T100,220 Z"
              fill="rgba(14, 25, 48, 0.4)"
              stroke="#1e3a5f"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            {/* Primary Expressways */}
            <path
              d="M400,20 L430,120 L440,260 L450,400"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeOpacity="0.4"
            />
            <path
              d="M100,200 L300,220 L440,260 L620,280 L780,290"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeOpacity="0.4"
            />
            <path
              d="M440,140 Q560,180 720,220"
              stroke="#0ea5e9"
              strokeWidth="1.8"
              strokeOpacity="0.35"
            />
            <path
              d="M260,120 Q360,210 420,320"
              stroke="#0ea5e9"
              strokeWidth="1.8"
              strokeOpacity="0.35"
            />
            <path
              d="M440,260 L540,350 L680,390"
              stroke="#38bdf8"
              strokeWidth="1.8"
              strokeOpacity="0.35"
            />

            {/* Minor Street Grid Web */}
            <g stroke="#1a2744" strokeWidth="1" strokeOpacity="0.6">
              <line x1="200" y1="140" x2="360" y2="160" />
              <line x1="220" y1="280" x2="380" y2="300" />
              <line x1="480" y1="180" x2="600" y2="190" />
              <line x1="460" y1="310" x2="580" y2="320" />
              <line x1="320" y1="80" x2="350" y2="240" />
              <line x1="530" y1="120" x2="550" y2="280" />
              <line x1="620" y1="160" x2="640" y2="340" />
            </g>

            {/* Glowing Center Hub Ring */}
            <circle cx="440" cy="265" r="45" fill="rgba(56, 189, 248, 0.04)" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.3" />
            <circle cx="440" cy="265" r="85" fill="none" stroke="#38bdf8" strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.2" />
          </svg>

          {/* Area / Ward Names from Screenshot */}
          {MAP_LOCATIONS.map((loc) => (
            <div
              key={loc.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all"
              style={{ left: `${(loc.x / 800) * 100}%`, top: `${(loc.y / 420) * 100}%` }}
            >
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-bold text-slate-400/90 tracking-wide drop-shadow-sm">
                  {loc.name}
                </span>
              </div>
            </div>
          ))}

          {/* Interactive Pins from Screenshot */}
          {filteredPins.map((pin) => {
            const isSelected = selectedPin?.id === pin.id;
            return (
              <button
                key={pin.id}
                id={`map-pin-${pin.id}`}
                onClick={() => handlePinClick(pin)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group focus:outline-none"
                style={{ left: `${(pin.x / 800) * 100}%`, top: `${(pin.y / 420) * 100}%` }}
                title={`${pin.label} (${pin.location}) - ${pin.severity}`}
              >
                {/* Pulse Ring */}
                {pin.severity === "Critical" && (
                  <span className="absolute -inset-1 rounded-full bg-red-500 animate-ping opacity-60"></span>
                )}
                {pin.severity === "High" && (
                  <span className="absolute -inset-1 rounded-full bg-orange-500 animate-ping opacity-40"></span>
                )}

                {/* Main Pin Dot */}
                <div
                  className={`relative w-5 h-5 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-125 ${getPinBg(
                    pin.severity
                  )} ${isSelected ? "ring-2 ring-white scale-125" : ""}`}
                >
                  {getPinIcon(pin)}
                </div>
              </button>
            );
          })}
        </div>

        {/* Floating Selected Pin Info Box */}
        {selectedPin && (
          <div className="absolute bottom-4 left-4 z-30 p-2.5 rounded-xl bg-[#0d1424]/95 border border-sky-500/40 shadow-xl backdrop-blur-sm max-w-xs animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between gap-2">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                selectedPin.severity === "Critical" ? "bg-red-500/20 text-red-300" :
                selectedPin.severity === "High" ? "bg-orange-500/20 text-orange-300" :
                "bg-blue-500/20 text-blue-300"
              }`}>
                {selectedPin.severity}
              </span>
              <button
                onClick={() => setSelectedPin(null)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ✕
              </button>
            </div>
            <p className="text-xs font-bold text-white mt-1">{selectedPin.label}</p>
            <p className="text-[11px] text-slate-400">{selectedPin.location}, Bengaluru</p>
          </div>
        )}

        {/* Map Controls (Top Right: Zoom +, Zoom -, Layers) */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 bg-[#0d1424]/90 border border-slate-800 p-1 rounded-xl shadow-lg backdrop-blur-xs">
          <button
            id="map-zoom-in-btn"
            onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2))}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            id="map-zoom-out-btn"
            onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.85))}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            id="map-toggle-layers-btn"
            onClick={() => setShowSatellite(!showSatellite)}
            className={`p-1.5 rounded-lg transition-colors ${
              showSatellite ? "text-sky-400 bg-sky-950/60" : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
            title="Toggle Map Layers"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Right Location Crosshair */}
        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5">
          {onOpenFullMap && (
            <button
              onClick={onOpenFullMap}
              className="p-2 rounded-xl bg-[#0d1424]/90 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow-lg"
              title="Expand Full Problem Map"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            id="map-recenter-btn"
            onClick={() => {
              setZoomLevel(1);
              setSelectedPin(null);
            }}
            className="p-2 rounded-xl bg-[#0d1424]/90 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow-lg"
            title="Recenter Map (Bengaluru HQ)"
          >
            <Crosshair className="w-4 h-4 text-sky-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
