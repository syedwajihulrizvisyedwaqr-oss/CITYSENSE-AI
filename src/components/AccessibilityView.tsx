import React, { useState } from "react";
import {
  Accessibility,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Compass,
  Flame,
  Layers,
  Info,
  X
} from "lucide-react";
import { CityIssue } from "../types";
import { ACCESSIBILITY_HEAT_ZONES } from "../data/mockData";

interface AccessibilityViewProps {
  issues: CityIssue[];
  onSelectIssue: (issue: CityIssue) => void;
}

export const AccessibilityView: React.FC<AccessibilityViewProps> = ({
  issues,
  onSelectIssue,
}) => {
  const [activeTab, setActiveTab] = useState<"heatmap" | "scorecard">("heatmap");
  const [selectedHeatZone, setSelectedHeatZone] = useState<(typeof ACCESSIBILITY_HEAT_ZONES)[0] | null>(
    ACCESSIBILITY_HEAT_ZONES[0]
  );

  const accessibilityIssues = issues.filter(
    (i) => i.category === "Accessibility" || i.accessibilityImpact.includes("wheelchair")
  );

  const wardAccessibilityScores = [
    { ward: "Ward 151 - Koramangala", score: 68, status: "Moderate", defects: 14, wheelchairPassable: "72%" },
    { ward: "Ward 74 - Indiranagar", score: 79, status: "Good", defects: 8, wheelchairPassable: "84%" },
    { ward: "Ward 174 - HSR Layout", score: 74, status: "Good", defects: 11, wheelchairPassable: "79%" },
    { ward: "Ward 153 - Jayanagar", score: 86, status: "Excellent", defects: 4, wheelchairPassable: "92%" },
    { ward: "Ward 7 - Hebbal", score: 62, status: "Poor", defects: 19, wheelchairPassable: "64%" },
    { ward: "Ward 84 - Whitefield", score: 65, status: "Moderate", defects: 16, wheelchairPassable: "67%" },
  ];

  return (
    <div className="space-y-6">
      {/* Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Accessibility className="w-5 h-5 text-amber-400" />
            <span>Urban Accessibility & Inclusion Index</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Automated pedestrian audit: wheelchair navigability, curb ramp defects, and geospatial risk heatmap.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab Switcher */}
          <div className="flex items-center bg-[#0a101f] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("heatmap")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "heatmap"
                  ? "bg-amber-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Accessibility Heatmap</span>
            </button>
            <button
              onClick={() => setActiveTab("scorecard")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "scorecard"
                  ? "bg-sky-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Ward Scorecard</span>
            </button>
          </div>

          <div className="hidden md:flex px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold items-center gap-1.5">
            <span>City Index: 72 / 100</span>
          </div>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-[#0a101f] border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">Sidewalk Obstacles</p>
          <p className="text-xl sm:text-2xl font-black text-white">250</p>
          <p className="text-[11px] text-red-400 font-semibold">28 severe wheelchair blocks</p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0a101f] border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">Tactile Paving Coverage</p>
          <p className="text-xl sm:text-2xl font-black text-white">64.2%</p>
          <p className="text-[11px] text-emerald-400 font-semibold">↑ 3.8% this quarter</p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0a101f] border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">Curb Ramp Compliance</p>
          <p className="text-xl sm:text-2xl font-black text-white">78.5%</p>
          <p className="text-[11px] text-slate-400 font-semibold">812 compliant intersections</p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0a101f] border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">Mean Fix Time</p>
          <p className="text-xl sm:text-2xl font-black text-white">36 hrs</p>
          <p className="text-[11px] text-emerald-400 font-semibold">Fast-track municipal dispatch</p>
        </div>
      </div>

      {/* 1. INTERACTIVE ACCESSIBILITY HEATMAP SECTION */}
      {activeTab === "heatmap" && (
        <div className="rounded-xl bg-[#0a101f] border border-slate-800 p-5 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Geospatial Wheelchair Barrier & Accessibility Risk Heatmap</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Thermal density zones showing pedestrian friction, missing curb ramps, and fractured paver concentration.
              </p>
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center gap-3 text-[11px] font-bold">
              <div className="flex items-center gap-1 text-red-400">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span>Critical Risk (&lt;65)</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                <span>Moderate (65-80)</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Accessible (&gt;80)</span>
              </div>
            </div>
          </div>

          {/* Canvas + Inspector Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Vector Map with Heatmap Overlays (8 cols) */}
            <div className="lg:col-span-8 rounded-xl overflow-hidden bg-[#070b16] border border-slate-800 h-[420px] relative">
              <svg className="w-full h-full" viewBox="0 0 800 480" preserveAspectRatio="none">
                <defs>
                  {ACCESSIBILITY_HEAT_ZONES.map((zone) => (
                    <radialGradient
                      key={`acc-grad-${zone.id}`}
                      id={`acc-grad-${zone.id}`}
                      cx="50%"
                      cy="50%"
                      r="50%"
                    >
                      <stop offset="0%" stopColor={zone.riskColor} stopOpacity="0.7" />
                      <stop offset="50%" stopColor={zone.riskColor} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={zone.riskColor} stopOpacity="0" />
                    </radialGradient>
                  ))}
                </defs>

                {/* Gridlines */}
                <path
                  d="M100,60 Q300,20 480,80 T720,120 T780,300 T640,420 T380,440 T160,380 T80,220 Z"
                  fill="rgba(14, 25, 48, 0.5)"
                  stroke="#1e3a5f"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Major streets */}
                <path d="M420,0 L440,160 L450,320 L460,480" stroke="#2563eb" strokeWidth="2.5" strokeOpacity="0.4" />
                <path d="M0,240 L260,250 L440,280 L680,290 L800,300" stroke="#2563eb" strokeWidth="2.5" strokeOpacity="0.4" />

                {/* Heat zones */}
                {ACCESSIBILITY_HEAT_ZONES.map((zone) => {
                  const isSelected = selectedHeatZone?.id === zone.id;
                  return (
                    <g
                      key={zone.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedHeatZone(zone)}
                    >
                      {/* Radiating heat */}
                      <circle
                        cx={zone.x}
                        cy={zone.y}
                        r={zone.radius * (isSelected ? 1.4 : 1.2)}
                        fill={`url(#acc-grad-${zone.id})`}
                        className="transition-all duration-300"
                      />
                      {/* Center core point */}
                      <circle
                        cx={zone.x}
                        cy={zone.y}
                        r={isSelected ? 8 : 6}
                        fill={zone.riskColor}
                        stroke="#ffffff"
                        strokeWidth={isSelected ? 2 : 1}
                      />
                      {/* Label */}
                      <text
                        x={zone.x}
                        y={zone.y + 20}
                        fill="#f8fafc"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="select-none pointer-events-none drop-shadow"
                      >
                        {zone.name.split(" ")[0]} ({zone.accessibilityScore})
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected Zone Deep Dive Card (4 cols) */}
            <div className="lg:col-span-4 rounded-xl bg-[#070b16] border border-slate-800 p-4 space-y-3 flex flex-col justify-between h-[420px]">
              {selectedHeatZone ? (
                <>
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div>
                        <span className="text-[10px] font-mono text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30">
                          {selectedHeatZone.ward}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1">
                          {selectedHeatZone.name}
                        </h4>
                      </div>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: `${selectedHeatZone.riskColor}25`,
                          color: selectedHeatZone.riskColor,
                          border: `1px solid ${selectedHeatZone.riskColor}50`,
                        }}
                      >
                        {selectedHeatZone.riskLevel}
                      </span>
                    </div>

                    <div className="space-y-3 py-3">
                      <div className="p-3 rounded-xl bg-[#0a101f] border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase font-semibold">
                            Accessibility Score
                          </span>
                          <p className="text-xl font-black text-white mt-0.5">
                            {selectedHeatZone.accessibilityScore} / 100
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 uppercase font-semibold">
                            Wheelchair Passability
                          </span>
                          <p className="text-xl font-black text-emerald-400 mt-0.5">
                            {selectedHeatZone.wheelchairPassability}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-800/80">
                          <span className="text-slate-400">Active Barriers:</span>
                          <span className="font-bold text-amber-400">{selectedHeatZone.activeBarriers} identified defects</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800/80">
                          <span className="text-slate-400">Tactile Compliance:</span>
                          <span className="font-bold text-slate-200">
                            {selectedHeatZone.accessibilityScore >= 75 ? "High (Compliant)" : "Sub-standard"}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                          Primary Detected Obstacle
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed font-medium">
                          {selectedHeatZone.topObstacle}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        const matched = issues.find(
                          (i) => i.location.toLowerCase().includes(selectedHeatZone.name.toLowerCase().split(" ")[0])
                        ) || issues[0];
                        onSelectIssue(matched);
                      }}
                      className="w-full py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-sky-950 cursor-pointer"
                    >
                      <span>Inspect Ward Defect Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 text-xs">
                  <p>Click any heatmap circle on the map to inspect ward metrics.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. WARD BREAKDOWN TABLE */}
      {activeTab === "scorecard" && (
        <div className="rounded-xl bg-[#0a101f] border border-slate-800 p-4 space-y-3 animate-in fade-in duration-200">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Ward-by-Ward Accessibility Scorecard
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#070b16] text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Ward / Zone</th>
                  <th className="py-2.5 px-3">Accessibility Score</th>
                  <th className="py-2.5 px-3">Rating</th>
                  <th className="py-2.5 px-3">Active Barrier Defects</th>
                  <th className="py-2.5 px-3 rounded-r-lg">Wheelchair Passability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {wardAccessibilityScores.map((row) => (
                  <tr key={row.ward} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-bold text-white">{row.ward}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm">{row.score}/100</span>
                        <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              row.score >= 80
                                ? "bg-emerald-400"
                                : row.score >= 70
                                ? "bg-amber-400"
                                : "bg-red-400"
                            }`}
                            style={{ width: `${row.score}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          row.status === "Excellent"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : row.status === "Good"
                            ? "bg-sky-500/20 text-sky-300"
                            : row.status === "Moderate"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-200">{row.defects} defects</td>
                    <td className="py-3 px-3 font-mono text-emerald-400 font-bold">{row.wheelchairPassable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Active Accessibility Barriers List */}
      <div className="rounded-xl bg-[#0a101f] border border-slate-800 p-4 space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Flagged Accessibility Obstructions & Tripping Hazards
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {accessibilityIssues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => onSelectIssue(issue)}
              className="p-3 rounded-xl bg-[#070b16] border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all flex items-start gap-3 group"
            >
              <img
                src={issue.imageUrl}
                alt={issue.title}
                className="w-14 h-14 rounded-lg object-cover shrink-0 border border-slate-700"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                    {issue.title}
                  </p>
                  <span className="text-[10px] bg-red-500/20 text-red-400 font-bold px-1.5 py-0.5 rounded">
                    {issue.severity}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{issue.location}</p>
                <p className="text-[11px] text-red-400/90 font-medium mt-1 line-clamp-1">
                  {issue.accessibilityImpact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
