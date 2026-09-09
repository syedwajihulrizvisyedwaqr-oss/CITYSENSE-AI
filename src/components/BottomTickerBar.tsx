import React from "react";
import {
  Flame,
  AlertTriangle,
  TrendingUp,
  Wind
} from "lucide-react";

export const BottomTickerBar: React.FC = () => {
  return (
    <div
      id="bottom-intelligence-bar"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
    >
      {/* 1. AI Insight */}
      <div
        id="ticker-ai-insight"
        className="rounded-xl bg-[#0a101f] border border-slate-800/90 p-3.5 flex items-center gap-3.5 shadow-md"
      >
        <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0 text-sky-400">
          <Flame className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            AI INSIGHT
          </p>
          <p className="text-xs font-semibold text-slate-200 mt-0.5 leading-snug">
            Koramangala area shows 32% increase in accessibility issues this month.
          </p>
        </div>
      </div>

      {/* 2. Top Priority */}
      <div
        id="ticker-top-priority"
        className="rounded-xl bg-[#0a101f] border border-slate-800/90 p-3.5 flex items-center gap-3.5 shadow-md"
      >
        <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0 text-red-400">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-wider text-red-400 uppercase">
            TOP PRIORITY
          </p>
          <p className="text-xs font-semibold text-slate-200 mt-0.5 leading-snug">
            15 Critical issues require immediate attention
          </p>
        </div>
      </div>

      {/* 3. Trending Up */}
      <div
        id="ticker-trending-up"
        className="rounded-xl bg-[#0a101f] border border-slate-800/90 p-3.5 flex items-center justify-between gap-3 shadow-md"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
              TRENDING UP
            </p>
            <p className="text-xs font-semibold text-slate-200 mt-0.5 leading-snug truncate">
              Waste issues increased 18% this week
            </p>
          </div>
        </div>

        {/* Mini Sparkline */}
        <div className="w-14 h-6 shrink-0">
          <svg className="w-full h-full text-emerald-400" viewBox="0 0 60 25">
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0,20 12,18 24,14 36,15 48,6 60,4"
            />
          </svg>
        </div>
      </div>

      {/* 4. Air Quality */}
      <div
        id="ticker-air-quality"
        className="rounded-xl bg-[#0a101f] border border-slate-800/90 p-3.5 flex items-center justify-between gap-3 shadow-md"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              AIR QUALITY
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xs font-bold text-emerald-400">Good</span>
              <span className="text-xs font-semibold text-slate-200">AQI 42</span>
            </div>
          </div>
        </div>

        {/* Oscillating Smooth Air Quality Wave */}
        <div className="w-24 h-7 shrink-0 overflow-hidden">
          <svg className="w-full h-full text-emerald-400" viewBox="0 0 100 30" preserveAspectRatio="none">
            <path
              d="M0,18 Q12,28 25,16 T50,15 T75,8 T100,16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M0,18 Q12,28 25,16 T50,15 T75,8 T100,16 L100,30 L0,30 Z"
              fill="currentColor"
              opacity="0.12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
