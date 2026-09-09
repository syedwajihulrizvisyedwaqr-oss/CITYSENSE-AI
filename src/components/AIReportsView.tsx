import React, { useState } from "react";
import {
  FileText,
  Download,
  Printer,
  Sparkles,
  Calendar,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  FileSpreadsheet,
  FileCode,
  ShieldCheck,
  Check
} from "lucide-react";
import { CityIssue } from "../types";
import {
  exportPrintablePDFReport,
  downloadCSVReport,
  downloadHTMLReport,
  formatReportItem,
  FullReportItem,
} from "../utils/reportExporter";

interface AIReportsViewProps {
  issues?: CityIssue[];
}

export const AIReportsView: React.FC<AIReportsViewProps> = ({ issues = [] }) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  const reports = [
    {
      id: "REP-2026-09",
      title: "Bengaluru Municipal Urban Intelligence Briefing - September 2026",
      type: "Monthly Synthesis",
      generatedAt: "Today, 08:30 AM",
      status: "Verified by BBMP Command",
      summary:
        "Surface road defects decreased by 4.2% across Central wards. Koramangala pedestrian accessibility requires immediate sidewalk slab remediation. Solid waste collection turnaround improved to 4.2 hours.",
      metrics: { totalDetected: 1248, resolved: 892, criticalPending: 156 },
      sampleItem: {
        issue: "Koramangala 80 Feet Road Major Pothole & Slab Fracture",
        category: "Roads & Sidewalks",
        severity: "Critical",
        confidence: "96.4%",
        peopleAffected: "14,500 daily pedestrians and commuters",
        accessibilityImpact: "Complete wheelchair blockage on east corridor",
        recommendedAction: "Dispatch asphalt resurfacing unit; install temporary barrier ramp within 6h",
        priorityScore: 96,
        location: "80 Feet Road, 4th Block, Koramangala (Ward 151)",
        timestamp: new Date().toISOString(),
      } as FullReportItem,
    },
    {
      id: "REP-2026-W36",
      title: "Automated Accessibility & Wheelchair Barrier Audit - Week 36",
      type: "Weekly Spatial Audit",
      generatedAt: "Yesterday",
      status: "Action Required",
      summary:
        "Identified 18 high-priority sidewalk breaches near transit junctions. 92% confidence on tactile paving disrepair along 80 Feet Road corridor.",
      metrics: { totalDetected: 250, resolved: 178, criticalPending: 28 },
      sampleItem: {
        issue: "Broken Tactile Paving & Discontinuous Kerb Ramp",
        category: "Accessibility",
        severity: "High",
        confidence: "94.1%",
        peopleAffected: "1,200 visually impaired and mobility-impaired transit users",
        accessibilityImpact: "High danger of tripping; non-compliant with National Inclusivity Code",
        recommendedAction: "Lay high-durability warning studs; rebuild 1:12 gradient kerb slope",
        priorityScore: 88,
        location: "100 Feet Road Junction, Indiranagar (Ward 74)",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
      } as FullReportItem,
    },
    {
      id: "REP-2026-ENV",
      title: "Microclimate & AQI Correlated Civic Sensor Report",
      type: "Environmental Sensor Stream",
      generatedAt: "3 days ago",
      status: "Optimal",
      summary:
        "Ambient AQI held steady at 42 (Good) due to seasonal precipitation and reduced street dust after road sweeping automation.",
      metrics: { totalDetected: 42, resolved: 39, criticalPending: 3 },
      sampleItem: {
        issue: "Dust Dispersion & Road Debris Accumulation",
        category: "Sanitation & AQI",
        severity: "Medium",
        confidence: "91.8%",
        peopleAffected: "6,800 residents and school zone commuters",
        accessibilityImpact: "Reduced visibility and minor respiratory irritant on walkway",
        recommendedAction: "Deploy BBMP mechanical vacuum sweeper during low-traffic window (03:00 - 05:00)",
        priorityScore: 68,
        location: "Hebbal Outer Ring Flyover Underpass (Ward 7)",
        timestamp: new Date(Date.now() - 172800000).toISOString(),
      } as FullReportItem,
    },
  ];

  // Helper to compile current live issues or fallback items into full report items
  const getCompiledReportItems = (): FullReportItem[] => {
    if (issues && issues.length > 0) {
      return issues.map(formatReportItem);
    }
    return reports.map((r) => r.sampleItem);
  };

  const handleExportPDF = (items: FullReportItem[], title?: string) => {
    setDownloadingId("pdf");
    try {
      exportPrintablePDFReport(items, title || "CITYSENSE AI - Municipal Urban Intelligence Audit Dossier");
      setExportSuccess("PDF Dossier exported successfully");
      setTimeout(() => setExportSuccess(null), 3500);
    } catch (err) {
      console.error("PDF export error:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleExportCSV = (items: FullReportItem[], filename?: string) => {
    setDownloadingId("csv");
    try {
      downloadCSVReport(items, filename || `citysense_audit_${new Date().toISOString().split("T")[0]}.csv`);
      setExportSuccess("CSV audit file downloaded successfully");
      setTimeout(() => setExportSuccess(null), 3500);
    } catch (err) {
      console.error("CSV export error:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleExportSingleReport = (rep: (typeof reports)[0]) => {
    setDownloadingId(rep.id);
    const item = rep.sampleItem;
    // Generate single-item PDF
    exportPrintablePDFReport([item], `CITYSENSE AI - ${rep.title}`);
    setExportSuccess(`Exported ${rep.id}`);
    setTimeout(() => {
      setDownloadingId(null);
      setTimeout(() => setExportSuccess(null), 3000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Title and Top Export Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-400" />
            <span>AI Executive Reports & Municipal Intelligence</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Automated civic synthesis generated from 1,420 IoT nodes, optical scans, and field patrols.
          </p>
        </div>

        {/* Global Export Options */}
        <div className="flex flex-wrap items-center gap-2">
          {exportSuccess && (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-lg flex items-center gap-1 animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>{exportSuccess}</span>
            </span>
          )}

          <button
            id="export-csv-btn"
            onClick={() => handleExportCSV(getCompiledReportItems())}
            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-200 bg-[#0a101f] hover:bg-slate-800 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Download formatted CSV spreadsheet"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV Log</span>
          </button>

          <button
            id="export-full-dossier-btn"
            onClick={() => handleExportPDF(getCompiledReportItems())}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-sky-950"
            title="Export official printable dossier / PDF"
          >
            <Printer className="w-4 h-4" />
            <span>{downloadingId === "pdf" ? "Compiling Dossier..." : "Export Official PDF"}</span>
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="rounded-xl bg-[#0a101f] border border-slate-800 p-5 space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b border-slate-800/80">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30 font-bold">
                    {rep.id}
                  </span>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-medium">
                    {rep.type}
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    {rep.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">{rep.title}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Generated {rep.generatedAt}</span>
                </p>
              </div>

              {/* Action Buttons for this Report */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleExportCSV([rep.sampleItem], `${rep.id}_audit_log.csv`)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer border border-slate-700"
                  title="Download CSV"
                >
                  <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={() => handleExportSingleReport(rep)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  title="Export official printable report"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloadingId === rep.id ? "Generating..." : "Export Report"}</span>
                </button>
              </div>
            </div>

            {/* AI Summary Section */}
            <div className="p-3.5 rounded-xl bg-[#070b16] border border-slate-800/90 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Synthesis & Remedial Recommendation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {rep.summary}
              </p>
            </div>

            {/* Complete Data Fields Breakdown included in Report */}
            <div className="rounded-lg bg-[#070b16]/60 border border-slate-800/80 p-3 space-y-2 text-xs">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-between">
                <span>Dossier Audit Fields (Included in Download)</span>
                <span className="text-sky-400 font-mono">10 / 10 Attributes Verified</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2 rounded bg-slate-900/60 border border-slate-800/60">
                  <span className="text-slate-500 text-[10px] block">Severity & Priority</span>
                  <span className="font-bold text-white">{rep.sampleItem.severity} ({rep.sampleItem.priorityScore}/100)</span>
                </div>
                <div className="p-2 rounded bg-slate-900/60 border border-slate-800/60">
                  <span className="text-slate-500 text-[10px] block">Optical Confidence</span>
                  <span className="font-mono font-bold text-emerald-400">{rep.sampleItem.confidence}</span>
                </div>
                <div className="p-2 rounded bg-slate-900/60 border border-slate-800/60">
                  <span className="text-slate-500 text-[10px] block">People Affected</span>
                  <span className="font-medium text-slate-200 truncate block">{rep.sampleItem.peopleAffected}</span>
                </div>
                <div className="p-2 rounded bg-slate-900/60 border border-slate-800/60">
                  <span className="text-slate-500 text-[10px] block">Accessibility Impact</span>
                  <span className="font-medium text-amber-400 truncate block">{rep.sampleItem.accessibilityImpact}</span>
                </div>
              </div>
            </div>

            {/* Metrics pills */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-2.5 rounded-lg bg-[#070b16] border border-slate-800 text-center">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Total Detected</p>
                <p className="text-base font-black text-white mt-0.5">{rep.metrics.totalDetected}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#070b16] border border-slate-800 text-center">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Resolved</p>
                <p className="text-base font-black text-emerald-400 mt-0.5">{rep.metrics.resolved}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#070b16] border border-slate-800 text-center">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Critical Queue</p>
                <p className="text-base font-black text-red-400 mt-0.5">{rep.metrics.criticalPending}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
