import React, { useState } from "react";
import {
  TrendingUp,
  Brain,
  AlertTriangle,
  Calendar,
  Sparkles,
  Info,
  ShieldAlert,
  ArrowUpRight,
  Clock,
  Layers
} from "lucide-react";
import { PREDICTIVE_TRENDS_7D, PREDICTIVE_TRENDS_30D } from "../data/mockData";

export const PredictiveTrendsCard: React.FC = () => {
  const [timeHorizon, setTimeHorizon] = useState<"7d" | "30d">("7d");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(2); // Default Friday

  const activeDay = PREDICTIVE_TRENDS_7D[selectedDayIndex];

  return (
    <div
      id="predictive-trends-module"
      className="rounded-xl bg-[#0a101f] border border-slate-800 p-5 space-y-5"
    >
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/30">
              <Brain className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Predictive Incident Trends & Risk Forecasting</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30">
                PROJECTION ENGINE v2.4
              </span>
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Machine learning extrapolation combining weather radar, 24-month pavement fatigue, and pedestrian density.
          </p>
        </div>

        {/* Time Horizon Switcher */}
        <div className="flex items-center bg-[#070b16] p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setTimeHorizon("7d")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              timeHorizon === "7d"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            7-Day Horizon
          </button>
          <button
            onClick={() => setTimeHorizon("30d")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              timeHorizon === "30d"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            30-Day Outlook
          </button>
        </div>
      </div>

      {/* Prominent Mandatory AI-Assisted Disclaimer */}
      <div className="p-3 rounded-xl bg-amber-950/25 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-300/90">
        <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
        <div>
          <span className="font-bold text-amber-300">AI-Assisted Projection Notice: </span>
          <span>
            These predictive figures are algorithmic estimates calibrated with a 90% confidence interval.
            They are intended for proactive municipal squad staging and material procurement, not guaranteed incident counts.
          </span>
        </div>
      </div>

      {/* 7-Day View */}
      {timeHorizon === "7d" && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[#070b16] border border-slate-800/90">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Predicted 7D Volume
              </span>
              <p className="text-xl font-black text-white mt-0.5">450 Incidents</p>
              <p className="text-[11px] text-amber-400 font-semibold flex items-center gap-1 mt-0.5">
                <ArrowUpRight className="w-3 h-3" />
                <span>+16.4% vs last week</span>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#070b16] border border-slate-800/90">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Predicted Critical
              </span>
              <p className="text-xl font-black text-red-400 mt-0.5">84 Incidents</p>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">18.6% of incoming load</p>
            </div>

            <div className="p-3 rounded-xl bg-[#070b16] border border-slate-800/90">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Peak Risk Window
              </span>
              <p className="text-xl font-black text-purple-400 mt-0.5">Sep 11 - 14</p>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Monsoon front ingress</p>
            </div>

            <div className="p-3 rounded-xl bg-[#070b16] border border-slate-800/90">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Primary Vulnerability
              </span>
              <p className="text-xl font-black text-sky-400 mt-0.5">Curbs & Storm Drains</p>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Ward 151 & 7 focus</p>
            </div>
          </div>

          {/* Interactive Responsive SVG Projection Chart */}
          <div className="p-4 rounded-xl bg-[#070b16] border border-slate-800/90 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                  <span>Predicted Daily Volume vs Confidence Interval (90%)</span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  Select a day pill to examine forecasted severity distribution and local risk factors.
                </p>
              </div>

              {/* Chart Legend */}
              <div className="flex flex-wrap items-center gap-3 text-[11px]">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-0.5 bg-sky-400 inline-block"></span>
                  <span className="text-slate-400">Baseline Historical</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-0.5 bg-purple-400 border-b border-dashed inline-block"></span>
                  <span className="text-purple-300 font-semibold">Predicted Volume</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-2 bg-purple-500/20 border border-purple-500/40 inline-block rounded-xs"></span>
                  <span className="text-slate-400">Confidence Band</span>
                </div>
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="h-52 w-full pt-2">
              <svg className="w-full h-full" viewBox="0 0 700 180" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                <line x1="40" y1="30" x2="680" y2="30" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="40" y1="75" x2="680" y2="75" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="40" y1="120" x2="680" y2="120" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="40" y1="160" x2="680" y2="160" stroke="#334155" />

                {/* Y-axis labels */}
                <text x="10" y="34" fill="#64748b" fontSize="10" fontFamily="monospace">90</text>
                <text x="10" y="79" fill="#64748b" fontSize="10" fontFamily="monospace">60</text>
                <text x="10" y="124" fill="#64748b" fontSize="10" fontFamily="monospace">30</text>

                {/* Confidence Band Polygon: lower and upper bounds */}
                {/* Points: x = 60 + i * 95 */}
                {/* y formula: 160 - (val / 100) * 140 */}
                <polygon
                  fill="url(#confidenceBand)"
                  stroke="#a855f7"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  strokeOpacity="0.4"
                  points="
                    60,70  155,59  250,42  345,62  440,83  535,35  630,45
                    630,76 535,68 440,108 345,90  250,72  155,83  60,93
                  "
                />

                {/* Baseline Historical Path */}
                <path
                  d="M60,87 L155,79 L250,66 L345,91 L440,107 L535,75 L630,77"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Predicted Curve */}
                <path
                  d="M60,82 L155,70 L250,56 L345,75 L440,96 L535,51 L630,61"
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />

                {/* Interactive Points on predicted curve */}
                {PREDICTIVE_TRENDS_7D.map((p, idx) => {
                  const cx = 60 + idx * 95;
                  const cy = 160 - (p.predictedVolume / 100) * 140;
                  const isSelected = selectedDayIndex === idx;

                  return (
                    <g key={p.date} className="cursor-pointer" onClick={() => setSelectedDayIndex(idx)}>
                      {isSelected && (
                        <circle cx={cx} cy={cy} r="10" fill="#a855f7" fillOpacity="0.3" className="animate-ping" />
                      )}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? "5.5" : "4"}
                        fill={isSelected ? "#c084fc" : "#0f172a"}
                        stroke="#a855f7"
                        strokeWidth="2"
                      />
                      <text
                        x={cx}
                        y={cy - 10}
                        fill={isSelected ? "#e9d5ff" : "#94a3b8"}
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {p.predictedVolume}
                      </text>
                      <text
                        x={cx}
                        y="174"
                        fill={isSelected ? "#38bdf8" : "#64748b"}
                        fontSize="10"
                        fontWeight={isSelected ? "bold" : "normal"}
                        textAnchor="middle"
                      >
                        {p.dayLabel} ({p.date.split(" ")[1]})
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected Day Inspection Banner */}
            <div className="p-3 rounded-xl bg-[#0a101f] border border-purple-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-white">
                    {activeDay.dayLabel}, {activeDay.date} Breakdown:
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-purple-950 px-2 py-0.5 rounded text-purple-300 border border-purple-500/30">
                    Est. {activeDay.predictedVolume} Incidents (Range: {activeDay.confidenceLower} - {activeDay.confidenceUpper})
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Key Risk Factor: {activeDay.keyRiskFactor}</span>
                </p>
              </div>

              {/* Severity Mini Badges */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] px-2 py-1 rounded bg-red-500/20 text-red-300 font-bold border border-red-500/30">
                  {activeDay.predictedCritical} Critical
                </span>
                <span className="text-[10px] px-2 py-1 rounded bg-orange-500/20 text-orange-300 font-bold border border-orange-500/30">
                  {activeDay.predictedHigh} High
                </span>
                <span className="text-[10px] px-2 py-1 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                  {activeDay.predictedMedium} Medium
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 30-Day View */}
      {timeHorizon === "30d" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {PREDICTIVE_TRENDS_30D.map((item, idx) => (
              <div
                key={item.period}
                className="p-4 rounded-xl bg-[#070b16] border border-slate-800 space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono">
                    {item.period.split(" ")[0]} {item.period.split(" ")[1]}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.projectedRiskLevel === "Critical"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : item.projectedRiskLevel === "High"
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                        : item.projectedRiskLevel === "Moderate"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {item.projectedRiskLevel} Risk
                  </span>
                </div>

                <div>
                  <p className="text-2xl font-black text-white">{item.predictedTotal}</p>
                  <p className="text-[11px] text-slate-400">Projected Monthly Detections</p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Critical Ratio:</span>
                    <span className="text-red-400 font-bold">{item.predictedCritical} tickets</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Primary Anomaly:</span>
                    <span className="text-slate-200 font-medium truncate max-w-[130px]" title={item.dominantDefect}>
                      {item.dominantDefect}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Weather Driver:</span>
                    <span className="text-sky-400 font-mono">{item.weatherImpact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Forecast Explanation Card */}
      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>AI Forecast Explanation & Diagnostic Methodology</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The CITYSENSE predictive model runs an ensemble neural regression using historical BBMP maintenance logs,
          meteorological radar updates (monsoon precipitation), and IoT accelerometer readings from transit buses.
          Over the next 14 days, low-lying wards (Koramangala Ward 151 and Hebbal Ward 7) exhibit a{" "}
          <strong className="text-white">+28% elevation in predicted slab displacement</strong> caused by water saturation
          beneath pedestrian pavers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] text-slate-400">
          <div className="p-2.5 rounded-lg bg-[#070b16] border border-purple-500/20">
            <span className="font-bold text-slate-200 block mb-0.5">1. Monsoon Soil Saturation</span>
            Sub-base liquification index indicates higher likelihood of sidewalk cavity collapses along drainage margins.
          </div>
          <div className="p-2.5 rounded-lg bg-[#070b16] border border-purple-500/20">
            <span className="font-bold text-slate-200 block mb-0.5">2. Commuter Footfall Velocity</span>
            Weekend market pedestrian concentrations increase tipping and edge fractures by 1.8x.
          </div>
          <div className="p-2.5 rounded-lg bg-[#070b16] border border-purple-500/20">
            <span className="font-bold text-slate-200 block mb-0.5">3. Recommended Municipal Staging</span>
            Pre-position cold-mix asphalt and pre-cast concrete paver inventory at South Zone depots.
          </div>
        </div>
      </div>
    </div>
  );
};
