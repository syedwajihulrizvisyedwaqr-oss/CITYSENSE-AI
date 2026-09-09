import React, { useState } from "react";
import {
  MapPin,
  Layers,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Accessibility,
  Eye,
  Crosshair,
  Maximize2,
  Flame,
  Info,
  X
} from "lucide-react";
import { CityIssue } from "../types";
import { MAP_LOCATIONS, MAP_PINS, ACCESSIBILITY_HEAT_ZONES } from "../data/mockData";

interface ProblemMapViewProps {
  issues: CityIssue[];
  onSelectIssue: (issue: CityIssue) => void;
}

export const ProblemMapView: React.FC<ProblemMapViewProps> = ({
  issues,
  onSelectIssue,
}) => {
  const [selectedWard, setSelectedWard] = useState<string>("All");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("All");
  const [searchFilter, setSearchFilter] = useState("");
  const [mapDisplayMode, setMapDisplayMode] = useState<"markers" | "heatmap" | "hybrid">("hybrid");
  const [selectedZone, setSelectedZone] = useState<(typeof ACCESSIBILITY_HEAT_ZONES)[0] | null>(null);

  const filteredIssues = issues.filter((issue) => {
    const matchesWard = selectedWard === "All" || issue.ward.includes(selectedWard);
    const matchesSev = selectedSeverity === "All" || issue.severity === selectedSeverity;
    const matchesSearch =
      issue.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesWard && matchesSev && matchesSearch;
  });

  const filteredZones = selectedWard === "All"
    ? ACCESSIBILITY_HEAT_ZONES
    : ACCESSIBILITY_HEAT_ZONES.filter((z) => z.ward.includes(selectedWard) || z.name.includes(selectedWard));

  return (
    <div className="space-y-4">
      {/* Title & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-sky-400" />
            <span>Problem Map & Municipal GIS</span>
          </h2>
          <p className="text-xs text-slate-400">
            Geospatial sensor telemetry, accessibility risk heatmaps, and ward health distribution.
          </p>
        </div>

        {/* Filters and Layer Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Map Layer Mode Switcher */}
          <div className="flex items-center bg-[#0a101f] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setMapDisplayMode("markers")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                mapDisplayMode === "markers"
                  ? "bg-sky-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <MapPin className="w-3 h-3" />
              <span>Markers</span>
            </button>
            <button
              onClick={() => setMapDisplayMode("heatmap")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                mapDisplayMode === "heatmap"
                  ? "bg-amber-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Flame className="w-3 h-3" />
              <span>Accessibility Heatmap</span>
            </button>
            <button
              onClick={() => setMapDisplayMode("hybrid")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                mapDisplayMode === "hybrid"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Hybrid View</span>
            </button>
          </div>

          {/* Ward filter */}
          <select
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="px-3 py-1.5 bg-[#0a101f] border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-sky-500"
          >
            <option value="All">All Wards (198)</option>
            <option value="Koramangala">Ward 151 - Koramangala</option>
            <option value="Indiranagar">Ward 74 - Indiranagar</option>
            <option value="HSR Layout">Ward 174 - HSR Layout</option>
            <option value="Hebbal">Ward 7 - Hebbal</option>
            <option value="Whitefield">Ward 84 - Whitefield</option>
            <option value="Jayanagar">Ward 153 - Jayanagar</option>
          </select>

          {/* Severity filter */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-1.5 bg-[#0a101f] border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-sky-500"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Grid: Map + Side Issues List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Large GIS Canvas (8 cols) */}
        <div className="lg:col-span-8 rounded-xl overflow-hidden bg-[#070b16] border border-slate-800 h-[520px] relative flex flex-col">
          {/* Map Header Status */}
          <div className="px-4 py-2.5 bg-[#0a101f]/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 z-20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Bengaluru Tactical Grid {mapDisplayMode === "heatmap" ? "• Accessibility Risk Heatmap" : ""}
              </span>
            </div>

            {/* Heatmap Legend when in heatmap or hybrid mode */}
            {(mapDisplayMode === "heatmap" || mapDisplayMode === "hybrid") && (
              <div className="flex items-center gap-3 text-[10px] font-bold">
                <div className="flex items-center gap-1 text-red-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span>High Risk (&lt;70)</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                  <span>Moderate (70-80)</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>Low Risk (&gt;80)</span>
                </div>
              </div>
            )}
          </div>

          {/* Vector Map Surface */}
          <div className="relative flex-1 w-full h-full overflow-hidden select-none">
            {/* Background Grid */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* SVG Canvas for Arteries and Heatmap Radial Gradients */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 480" preserveAspectRatio="none">
              <defs>
                {/* Radial gradients for accessibility heat zones */}
                {ACCESSIBILITY_HEAT_ZONES.map((zone) => (
                  <radialGradient
                    key={`grad-${zone.id}`}
                    id={`grad-${zone.id}`}
                    cx="50%"
                    cy="50%"
                    r="50%"
                  >
                    <stop offset="0%" stopColor={zone.riskColor} stopOpacity="0.65" />
                    <stop offset="50%" stopColor={zone.riskColor} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={zone.riskColor} stopOpacity="0" />
                  </radialGradient>
                ))}
              </defs>

              {/* City Ward Outlines */}
              <path
                d="M100,60 Q300,20 480,80 T720,120 T780,300 T640,420 T380,440 T160,380 T80,220 Z"
                fill="rgba(14, 25, 48, 0.5)"
                stroke="#1e3a5f"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Road network */}
              <path d="M420,0 L440,160 L450,320 L460,480" stroke="#2563eb" strokeWidth="2.5" strokeOpacity="0.45" />
              <path d="M0,240 L260,250 L440,280 L680,290 L800,300" stroke="#2563eb" strokeWidth="2.5" strokeOpacity="0.45" />
              <path d="M220,100 Q360,240 440,360" stroke="#0ea5e9" strokeWidth="2" strokeOpacity="0.4" />
              <path d="M440,160 Q600,220 760,260" stroke="#0ea5e9" strokeWidth="2" strokeOpacity="0.4" />

              {/* 1. ACCESSIBILITY HEATMAP LAYER */}
              {(mapDisplayMode === "heatmap" || mapDisplayMode === "hybrid") && (
                <g id="accessibility-heat-layer" className="transition-opacity duration-300">
                  {filteredZones.map((zone) => (
                    <g
                      key={zone.id}
                      className="cursor-pointer group"
                      onClick={() => setSelectedZone(zone)}
                    >
                      {/* Outer heat dispersion circle */}
                      <circle
                        cx={zone.x}
                        cy={zone.y}
                        r={zone.radius * 1.3}
                        fill={`url(#grad-${zone.id})`}
                        className="animate-pulse"
                        style={{ animationDuration: "3s" }}
                      />
                      {/* Core hot spot */}
                      <circle
                        cx={zone.x}
                        cy={zone.y}
                        r={zone.radius * 0.4}
                        fill={zone.riskColor}
                        fillOpacity="0.4"
                      />
                      {/* Zone perimeter ring */}
                      <circle
                        cx={zone.x}
                        cy={zone.y}
                        r={zone.radius * 0.8}
                        fill="none"
                        stroke={zone.riskColor}
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        strokeOpacity="0.6"
                      />
                    </g>
                  ))}
                </g>
              )}
            </svg>

            {/* Ward markers */}
            {MAP_LOCATIONS.map((loc) => (
              <div
                key={loc.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: `${(loc.x / 800) * 100}%`, top: `${(loc.y / 420) * 100}%` }}
              >
                <div className="flex flex-col items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mb-0.5"></span>
                  <span className="text-[10px] font-bold text-slate-300 drop-shadow-md">
                    {loc.name}
                  </span>
                </div>
              </div>
            ))}

            {/* 2. NORMAL ISSUE PINS LAYER */}
            {(mapDisplayMode === "markers" || mapDisplayMode === "hybrid") && (
              <>
                {MAP_PINS.map((pin) => (
                  <button
                    key={pin.id}
                    onClick={() => {
                      const match = issues.find((i) => i.location.toLowerCase().includes(pin.location.toLowerCase())) || issues[0];
                      onSelectIssue(match);
                    }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
                    style={{ left: `${(pin.x / 800) * 100}%`, top: `${(pin.y / 420) * 100}%` }}
                    title={`${pin.label} (${pin.location})`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-125 ${
                        pin.severity === "Critical"
                          ? "bg-red-500 shadow-red-500/60 ring-2 ring-red-400/40"
                          : pin.severity === "High"
                          ? "bg-orange-500 shadow-orange-500/60"
                          : "bg-blue-500 shadow-blue-500/60"
                      }`}
                    >
                      <AlertTriangle className="w-2.5 h-2.5 text-white" />
                    </div>
                  </button>
                ))}
              </>
            )}

            {/* Zone Inspector Popup on map */}
            {selectedZone && (
              <div
                className="absolute z-30 transform -translate-x-1/2 -translate-y-full mb-3 w-72 bg-[#0c1324] border border-slate-700 rounded-xl shadow-2xl p-3 text-left animate-in fade-in zoom-in-95 duration-150"
                style={{
                  left: `${(selectedZone.x / 800) * 100}%`,
                  top: `${(selectedZone.y / 420) * 100}%`,
                }}
              >
                <div className="flex items-start justify-between pb-2 border-b border-slate-800">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Accessibility className="w-3.5 h-3.5 text-amber-400" />
                      <span>{selectedZone.name}</span>
                    </h4>
                    <p className="text-[10px] text-slate-400">{selectedZone.ward}</p>
                  </div>
                  <button
                    onClick={() => setSelectedZone(null)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-1.5 py-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Accessibility Score:</span>
                    <span className="font-bold text-white">{selectedZone.accessibilityScore}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Risk Level:</span>
                    <span
                      className="font-bold"
                      style={{ color: selectedZone.riskColor }}
                    >
                      {selectedZone.riskLevel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Active Barriers:</span>
                    <span className="text-amber-400 font-bold">{selectedZone.activeBarriers} defects</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Wheelchair Passability:</span>
                    <span className="text-emerald-400 font-mono font-bold">{selectedZone.wheelchairPassability}</span>
                  </div>
                  <div className="pt-1 border-t border-slate-800 text-[10px] text-slate-300">
                    <strong className="text-slate-400">Main Obstacle:</strong> {selectedZone.topObstacle}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Incidents Side Feed (4 cols) */}
        <div className="lg:col-span-4 rounded-xl bg-[#0a101f] border border-slate-800 p-4 flex flex-col h-[520px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Active Geotagged Tickets
              </h3>
              <p className="text-[10px] text-slate-400">Filtered by selected criteria</p>
            </div>
            <span className="text-xs bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded-full font-mono font-bold">
              {filteredIssues.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 pt-3 pr-1">
            {filteredIssues.map((issue) => (
              <div
                key={issue.id}
                onClick={() => onSelectIssue(issue)}
                className="p-3 rounded-xl bg-[#070b16] border border-slate-800/80 hover:border-sky-500/40 cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-sky-400 font-bold">
                    {issue.id}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      issue.severity === "Critical"
                        ? "bg-red-500/20 text-red-400"
                        : issue.severity === "High"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {issue.severity}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <img
                    src={issue.imageUrl}
                    alt={issue.title}
                    className="w-10 h-10 rounded-lg object-cover shrink-0 border border-slate-800"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate group-hover:text-sky-400 transition-colors">
                      {issue.title}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">{issue.location}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] text-slate-500">
                  <span>{issue.category}</span>
                  <span className="text-emerald-400 font-semibold">{issue.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
