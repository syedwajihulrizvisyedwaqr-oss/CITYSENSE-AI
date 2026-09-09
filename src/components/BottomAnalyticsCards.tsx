import React from "react";
import { CityIssue } from "../types";
import { CATEGORY_BREAKDOWN, SEVERITY_BREAKDOWN } from "../data/mockData";

interface BottomAnalyticsCardsProps {
  issues: CityIssue[];
  onSelectIssue: (issue: CityIssue) => void;
  onViewAllDetections: () => void;
  onViewCategoryReport: () => void;
  onViewSeverityReport: () => void;
}

export const BottomAnalyticsCards: React.FC<BottomAnalyticsCardsProps> = ({
  issues,
  onSelectIssue,
  onViewAllDetections,
  onViewCategoryReport,
  onViewSeverityReport,
}) => {
  // SVG Donut Helper
  const renderDonutSegments = (
    data: { name: string; percentage: number; color: string }[],
    radius = 54,
    strokeWidth = 14
  ) => {
    const circumference = 2 * Math.PI * radius;
    let accumulatedPercent = 0;

    return data.map((item, index) => {
      const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
      const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
      accumulatedPercent += item.percentage;

      return (
        <circle
          key={index}
          cx="70"
          cy="70"
          r={radius}
          fill="transparent"
          stroke={item.color}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 hover:opacity-80 cursor-pointer"
        />
      );
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
      {/* 1. RECENT AI DETECTIONS CARD */}
      <div
        id="recent-detections-card"
        className="rounded-xl bg-[#0a101f] border border-slate-800/90 shadow-md p-4 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            RECENT AI DETECTIONS
          </h3>
          <button
            onClick={onViewAllDetections}
            className="text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="space-y-2.5 pt-3">
          {issues.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectIssue(item)}
              className="flex items-center justify-between gap-3 p-1.5 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-10 h-10 rounded-lg object-cover shrink-0 border border-slate-700/60 group-hover:border-sky-500/50 transition-colors"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-200 truncate group-hover:text-sky-400 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {item.location}
                    {item.timeAgo && ` • ${item.timeAgo}`}
                  </p>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                  item.severity === "Critical"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : item.severity === "High"
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    : item.severity === "Medium"
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                }`}
              >
                {item.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. ISSUES BY CATEGORY CARD */}
      <div
        id="issues-by-category-card"
        className="rounded-xl bg-[#0a101f] border border-slate-800/90 shadow-md p-4 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            ISSUES BY CATEGORY
          </h3>
          <button
            onClick={onViewCategoryReport}
            className="text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2">
          {/* Donut Chart with Center Total */}
          <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
              {renderDonutSegments(CATEGORY_BREAKDOWN)}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-base font-extrabold text-white leading-none">
                1,248
              </span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                Total
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-1.5 flex-1 pl-2">
            {CATEGORY_BREAKDOWN.map((cat) => (
              <div
                key={cat.name}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-slate-400 font-medium text-[11px]">
                    {cat.name}
                  </span>
                </div>
                <span className="text-slate-300 font-semibold text-[11px]">
                  {cat.percentage}% ({cat.count})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. SEVERITY BREAKDOWN CARD */}
      <div
        id="severity-breakdown-card"
        className="rounded-xl bg-[#0a101f] border border-slate-800/90 shadow-md p-4 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            SEVERITY BREAKDOWN
          </h3>
          <button
            onClick={onViewSeverityReport}
            className="text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2">
          {/* Donut Chart with Center Total */}
          <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
              {renderDonutSegments(SEVERITY_BREAKDOWN)}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-base font-extrabold text-white leading-none">
                1,248
              </span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                Total
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2 flex-1 pl-2">
            {SEVERITY_BREAKDOWN.map((sev) => (
              <div
                key={sev.name}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: sev.color }}
                  />
                  <span className="text-slate-400 font-medium text-[11px]">
                    {sev.name}
                  </span>
                </div>
                <span className="text-slate-300 font-semibold text-[11px]">
                  {sev.percentage}% ({sev.count})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
