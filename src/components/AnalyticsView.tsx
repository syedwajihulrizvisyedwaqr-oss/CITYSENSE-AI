import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { CATEGORY_BREAKDOWN, SEVERITY_BREAKDOWN } from "../data/mockData";
import { PredictiveTrendsCard } from "./PredictiveTrendsCard";

export const AnalyticsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"predictive" | "historical">("predictive");

  const weeklyTrends = [
    { day: "Mon", detected: 48, resolved: 42 },
    { day: "Tue", detected: 62, resolved: 55 },
    { day: "Wed", detected: 55, resolved: 58 },
    { day: "Thu", detected: 71, resolved: 68 },
    { day: "Fri", detected: 64, resolved: 62 },
    { day: "Sat", detected: 38, resolved: 45 },
    { day: "Sun", detected: 29, resolved: 34 },
  ];

  return (
    <div className="space-y-6">
      {/* Title & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-sky-400" />
            <span>Civic Intelligence Analytics & Telemetry</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Predictive AI trajectory modeling, historical incident velocity, and infrastructure decay forecasting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#0a101f] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("predictive")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "predictive"
                  ? "bg-sky-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Predictive Trends (AI)</span>
            </button>
            <button
              onClick={() => setActiveTab("historical")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "historical"
                  ? "bg-slate-700 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Historical Telemetry</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-[#0a101f] border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">Mean Time to Resolution</p>
          <p className="text-xl sm:text-2xl font-black text-white">18.4 hrs</p>
          <p className="text-[11px] text-emerald-400 font-semibold">↓ 2.1 hrs faster vs Q2</p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0a101f] border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">AI Forecast Reliability</p>
          <p className="text-xl sm:text-2xl font-black text-white">94.2%</p>
          <p className="text-[11px] text-sky-400 font-semibold">Bayesian sensor modeling</p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0a101f] border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">Resolution Throughput</p>
          <p className="text-xl sm:text-2xl font-black text-white">892</p>
          <p className="text-[11px] text-emerald-400 font-semibold">↑ 15.3% this month</p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0a101f] border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">Citizen Satisfaction</p>
          <p className="text-xl sm:text-2xl font-black text-white">4.7 / 5</p>
          <p className="text-[11px] text-amber-400 font-semibold">Based on 3,420 votes</p>
        </div>
      </div>

      {/* 1. PREDICTIVE TRENDS COMPONENT */}
      {activeTab === "predictive" && (
        <div className="animate-in fade-in duration-200">
          <PredictiveTrendsCard />
        </div>
      )}

      {/* 2. HISTORICAL VELOCITY SECTION */}
      {activeTab === "historical" && (
        <div className="rounded-xl bg-[#0a101f] border border-slate-800 p-5 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Weekly Detection vs Resolution Velocity
              </h3>
              <p className="text-[11px] text-slate-400">
                Comparative volume of incoming defect telemetry vs closed tickets.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-sky-500"></span>
                <span className="text-slate-300">Detected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500"></span>
                <span className="text-slate-300">Resolved</span>
              </div>
            </div>
          </div>

          {/* Bar Graph */}
          <div className="h-60 flex items-end justify-between gap-3 pt-6 px-2">
            {weeklyTrends.map((w) => (
              <div key={w.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1.5 h-full max-h-[180px]">
                  <div
                    className="w-1/2 max-w-[20px] bg-sky-500/80 hover:bg-sky-400 rounded-t transition-all"
                    style={{ height: `${(w.detected / 80) * 100}%` }}
                    title={`Detected: ${w.detected}`}
                  />
                  <div
                    className="w-1/2 max-w-[20px] bg-emerald-500/80 hover:bg-emerald-400 rounded-t transition-all"
                    style={{ height: `${(w.resolved / 80) * 100}%` }}
                    title={`Resolved: ${w.resolved}`}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-400">{w.day}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category & Severity Distribution Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Breakdown */}
        <div className="rounded-xl bg-[#0a101f] border border-slate-800 p-4 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Issue Category Breakdown
          </h3>
          <div className="space-y-2.5">
            {CATEGORY_BREAKDOWN.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">{cat.name}</span>
                  <span className="font-bold text-white">
                    {cat.count} ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Severity Breakdown */}
        <div className="rounded-xl bg-[#0a101f] border border-slate-800 p-4 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Severity Distribution
          </h3>
          <div className="space-y-2.5">
            {SEVERITY_BREAKDOWN.map((sev) => (
              <div key={sev.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">{sev.name}</span>
                  <span className="font-bold text-white">
                    {sev.count} ({sev.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${sev.percentage}%`, backgroundColor: sev.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
