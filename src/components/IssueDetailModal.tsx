import React, { useState } from "react";
import {
  X,
  MapPin,
  CheckCircle2,
  Clock,
  Send,
  Printer,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Accessibility,
  Flame,
  FileCheck,
  FileSpreadsheet,
  Download
} from "lucide-react";
import { CityIssue, AIAnalysisResult, IssueStatus } from "../types";
import { exportPrintablePDFReport, downloadCSVReport, formatReportItem } from "../utils/reportExporter";

interface IssueDetailModalProps {
  issue: CityIssue | AIAnalysisResult | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus?: (issueId: string, newStatus: IssueStatus) => void;
}

export const IssueDetailModal: React.FC<IssueDetailModalProps> = ({
  issue,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  if (!isOpen || !issue) return null;

  const [isDispatched, setIsDispatched] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<IssueStatus>(
    (issue as any).status || "Reported"
  );

  const title = (issue as CityIssue).title || (issue as AIAnalysisResult).detectedIssue;
  const severity = issue.severity;
  const category = issue.category;
  const confidence = issue.confidence || 92;
  const location = (issue as CityIssue).location || (issue as AIAnalysisResult).ward || "Bengaluru Urban";
  const peopleAffected = issue.peopleAffected || "High Footfall Area";
  const accessibilityImpact = issue.accessibilityImpact || "Severe - Not wheelchair friendly";
  const recommendedAction = issue.recommendedAction || "Immediate repair required, ensure level surface and proper ramp installation";
  const imageUrl = issue.imageUrl || "https://images.unsplash.com/photo-1515260268569-9271009adfdb?auto=format&fit=crop&w=600&q=80";
  const issueId = (issue as CityIssue).id || "ISSUE-AI-902";

  const handleDispatch = () => {
    setIsDispatched(true);
    setCurrentStatus("In Progress");
    if (onUpdateStatus && (issue as CityIssue).id) {
      onUpdateStatus((issue as CityIssue).id, "In Progress");
    }
  };

  const handleResolve = () => {
    setCurrentStatus("Resolved");
    if (onUpdateStatus && (issue as CityIssue).id) {
      onUpdateStatus((issue as CityIssue).id, "Resolved");
    }
  };

  const handleExportPDF = () => {
    const reportItem = formatReportItem(issue);
    exportPrintablePDFReport([reportItem], `CITYSENSE AI - Audit Dossier #${issueId}`);
  };

  const handleExportCSV = () => {
    const reportItem = formatReportItem(issue);
    downloadCSVReport([reportItem], `${issueId}_audit_log.csv`);
  };

  return (
    <div
      id="issue-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-[#0c1324] border border-slate-700/90 rounded-2xl shadow-2xl p-6 text-slate-200 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30 font-semibold">
                {issueId}
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded ${
                  severity === "Critical"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : severity === "High"
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                }`}
              >
                {severity}
              </span>
              <span className="text-xs font-medium text-slate-400">
                Confidence: <strong className="text-emerald-400">{confidence}%</strong>
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white mt-1.5">
              {title}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>{location}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4 pt-4">
          {/* Image & Bounding Scan Overlay */}
          <div className="relative h-56 sm:h-64 rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            {/* Synthetic AI Bounding Box */}
            <div className="absolute inset-x-8 inset-y-10 border-2 border-dashed border-red-400 rounded-lg pointer-events-none flex items-start justify-between p-2">
              <span className="bg-red-500 text-white text-[10px] font-mono px-1.5 py-0.5 rounded uppercase font-bold shadow-md">
                DEFECT: {category} (CONF: {confidence}%)
              </span>
              <span className="text-red-400 font-mono text-[10px] bg-black/60 px-1 py-0.5 rounded">
                Δz &gt; 45mm
              </span>
            </div>
          </div>

          {/* Key Intelligence Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#070b16] border border-slate-800 space-y-1">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Category
              </p>
              <p className="text-sm font-bold text-white">{category}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#070b16] border border-slate-800 space-y-1">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Current Ticket Status
              </p>
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    currentStatus === "Resolved"
                      ? "bg-emerald-400"
                      : currentStatus === "In Progress"
                      ? "bg-sky-400 animate-pulse"
                      : "bg-amber-400"
                  }`}
                />
                <p className="text-sm font-bold text-white">{currentStatus}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#070b16] border border-slate-800 space-y-1">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                People Affected
              </p>
              <p className="text-xs font-semibold text-slate-300">{peopleAffected}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#070b16] border border-slate-800 space-y-1">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Accessibility Impact
              </p>
              <p className="text-xs font-bold text-red-400">{accessibilityImpact}</p>
            </div>
          </div>

          {/* Recommended Municipal Action */}
          <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Recommended Action Protocol</span>
            </div>
            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              {recommendedAction}
            </p>
          </div>

          {/* Dispatch Notice if triggered */}
          {isDispatched && (
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center gap-2.5 text-xs text-emerald-300 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>
                Field maintenance crew BBMP-Team-4 notified and dispatched to {location}.
              </span>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
            {/* Export Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportPDF}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Export official printable dossier"
              >
                <Printer className="w-3.5 h-3.5 text-sky-400" />
                <span>Export Dossier</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                title="Export CSV record"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>CSV</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {currentStatus !== "Resolved" ? (
                <>
                  <button
                    onClick={handleDispatch}
                    disabled={isDispatched}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition-colors flex items-center gap-1.5 shadow-md shadow-sky-950 cursor-pointer disabled:opacity-60"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isDispatched ? "Crew Dispatched" : "Dispatch Field Crew"}</span>
                  </button>
                  <button
                    onClick={handleResolve}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-950 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Resolved</span>
                  </button>
                </>
              ) : (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Issue Successfully Resolved
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
