import React from "react";
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Activity,
  ArrowUpRight
} from "lucide-react";

export const TopKpiCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
      {/* 1. CITY OVERVIEW BANNER CARD */}
      <div
        id="card-city-overview"
        className="sm:col-span-2 lg:col-span-1 relative rounded-xl overflow-hidden p-4 border border-sky-500/20 shadow-lg flex flex-col justify-between min-h-[140px] bg-gradient-to-br from-[#0c152a] to-[#09101f] group"
      >
        {/* Background Skyline Image with Cyberpunk Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen scale-105 group-hover:scale-100 transition-transform duration-700"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#09101f]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-radial from-sky-500/10 via-transparent to-transparent"></div>

        <div className="relative z-10">
          <p className="text-[10px] font-bold tracking-wider text-sky-400 uppercase">
            CITY OVERVIEW
          </p>
          <h2 className="text-base sm:text-lg font-black tracking-tight text-white mt-1 leading-snug">
            THE CITY THAT <br />
            SEES ITSELF
          </h2>
        </div>

        <p className="relative z-10 text-[11px] text-slate-300 font-medium leading-relaxed mt-2 line-clamp-2">
          Turn everyday observations into actionable urban intelligence.
        </p>
      </div>

      {/* 2. City Health Score */}
      <div
        id="card-city-health-score"
        className="rounded-xl p-4 bg-[#0e1526] border border-slate-800/90 shadow-sm flex flex-col justify-between hover:border-slate-700/80 transition-all"
      >
        <div>
          <p className="text-xs font-semibold text-slate-400">City Health Score</p>
          <div className="flex items-baseline justify-between mt-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                78
              </span>
              <span className="text-xs font-semibold text-slate-500">/100</span>
            </div>

            {/* Circular Gauge / Pulse Wave */}
            <div className="relative w-11 h-11 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-400"
                  strokeDasharray="78, 100"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              {/* Center Pulse Icon */}
              <Activity className="w-3.5 h-3.5 text-emerald-400 absolute" />
            </div>
          </div>
          <p className="text-xs font-bold text-emerald-400 mt-0.5">Good</p>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 mt-2.5 pt-2 border-t border-slate-800/60">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>6.2% vs last month</span>
        </div>
      </div>

      {/* 3. Accessibility Score */}
      <div
        id="card-accessibility-score"
        className="rounded-xl p-4 bg-[#0e1526] border border-slate-800/90 shadow-sm flex flex-col justify-between hover:border-slate-700/80 transition-all"
      >
        <div>
          <p className="text-xs font-semibold text-slate-400">Accessibility Score</p>
          <div className="flex items-baseline justify-between mt-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                72
              </span>
              <span className="text-xs font-semibold text-slate-500">/100</span>
            </div>

            {/* Circular Gauge / Pulse Wave in Amber */}
            <div className="relative w-11 h-11 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-400"
                  strokeDasharray="72, 100"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute"></span>
            </div>
          </div>
          <p className="text-xs font-bold text-amber-400 mt-0.5">Fair</p>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 mt-2.5 pt-2 border-t border-slate-800/60">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>4.8% vs last month</span>
        </div>
      </div>

      {/* 4. Total Issues */}
      <div
        id="card-total-issues"
        className="rounded-xl p-4 bg-[#0e1526] border border-slate-800/90 shadow-sm flex flex-col justify-between hover:border-slate-700/80 transition-all"
      >
        <div>
          <p className="text-xs font-semibold text-slate-400">Total Issues</p>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              1,248
            </span>
            <p className="text-xs text-slate-500 font-medium mt-0.5">All Time</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 mt-2.5 pt-2 border-t border-slate-800/60">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>12.5% vs last month</span>
        </div>
      </div>

      {/* 5. Critical Issues */}
      <div
        id="card-critical-issues"
        className="rounded-xl p-4 bg-[#0e1526] border border-slate-800/90 shadow-sm flex flex-col justify-between hover:border-red-500/30 transition-all"
      >
        <div>
          <p className="text-xs font-semibold text-slate-400">Critical Issues</p>
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                156
              </span>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Require Immediate Action
              </p>
            </div>

            {/* Glowing Red Warning Badge */}
            <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shadow-sm shadow-red-950">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-semibold text-red-400 mt-2.5 pt-2 border-t border-slate-800/60">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>8.1% vs last month</span>
        </div>
      </div>

      {/* 6. Resolved Issues */}
      <div
        id="card-resolved-issues"
        className="rounded-xl p-4 bg-[#0e1526] border border-slate-800/90 shadow-sm flex flex-col justify-between hover:border-emerald-500/30 transition-all"
      >
        <div>
          <p className="text-xs font-semibold text-slate-400">Resolved Issues</p>
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                892
              </span>
              <p className="text-xs text-slate-500 font-medium mt-0.5">This Month</p>
            </div>

            {/* Glowing Green Checkmark Badge */}
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm shadow-emerald-950">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 mt-2.5 pt-2 border-t border-slate-800/60">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>15.3% vs last month</span>
        </div>
      </div>
    </div>
  );
};
