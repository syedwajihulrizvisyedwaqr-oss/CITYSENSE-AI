import React from "react";
import {
  Bell,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Clock,
  Send,
  MapPin,
  ShieldAlert
} from "lucide-react";
import { CityIssue } from "../types";

interface AlertsViewProps {
  issues: CityIssue[];
  onSelectIssue: (issue: CityIssue) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  issues,
  onSelectIssue,
}) => {
  const criticalAlerts = issues.filter(
    (i) => i.severity === "Critical" || i.severity === "High"
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <span>Emergency Incident & Dispatch Center</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Prioritized critical alerts requiring active municipal squad intervention.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            156 Critical Pending
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {criticalAlerts.map((issue) => (
          <div
            key={issue.id}
            onClick={() => onSelectIssue(issue)}
            className="rounded-xl bg-[#0a101f] border border-slate-800 hover:border-red-500/40 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  issue.severity === "Critical"
                    ? "bg-red-500/15 text-red-400 border border-red-500/30"
                    : "bg-orange-500/15 text-orange-400 border border-orange-500/30"
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-sky-400">
                    {issue.id}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      issue.severity === "Critical"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-orange-500/20 text-orange-400"
                    }`}
                  >
                    {issue.severity}
                  </span>
                  <span className="text-[11px] text-slate-500">{issue.timeAgo}</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors mt-0.5 truncate">
                  {issue.title}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>{issue.location} ({issue.ward})</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <span
                className={`text-xs px-2.5 py-1 rounded-lg font-semibold ${
                  issue.status === "In Progress"
                    ? "bg-sky-500/20 text-sky-300"
                    : "bg-amber-500/20 text-amber-300"
                }`}
              >
                {issue.status}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectIssue(issue);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>Inspect Incident</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
