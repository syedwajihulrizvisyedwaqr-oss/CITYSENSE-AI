import React, { useState } from "react";
import {
  Scan,
  Camera,
  UploadCloud,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Send,
  Zap,
  Layers,
  ArrowRight
} from "lucide-react";
import { AIAnalysisResult } from "../types";
import { SAMPLE_SCAN_PRESETS } from "../data/mockData";

interface ScanLocationViewProps {
  onViewFullReport: (analysis: AIAnalysisResult) => void;
  onIssueCreated: (newIssue: any) => void;
}

export const ScanLocationView: React.FC<ScanLocationViewProps> = ({
  onViewFullReport,
  onIssueCreated,
}) => {
  const [selectedPreset, setSelectedPreset] = useState(SAMPLE_SCAN_PRESETS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<AIAnalysisResult | null>(null);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [hasDispatched, setHasDispatched] = useState(false);

  const runDiagnosis = async (imageUrl: string, presetId?: string) => {
    setIsScanning(true);
    setHasDispatched(false);

    try {
      const res = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: imageUrl,
          presetType: presetId,
        }),
      });
      const data = await res.json();
      if (data && data.analysis) {
        setScanResult({
          ...data.analysis,
          imageUrl,
        });
      }
    } catch {
      // Fallback
      setScanResult({
        detectedIssue: selectedPreset.title,
        severity: selectedPreset.severity as any,
        confidence: selectedPreset.confidence,
        category: selectedPreset.category as any,
        peopleAffected: selectedPreset.peopleAffected,
        accessibilityImpact: selectedPreset.accessibilityImpact,
        recommendedAction: selectedPreset.recommendedAction,
        ward: selectedPreset.ward,
        imageUrl,
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setCustomImage(reader.result);
          runDiagnosis(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDispatchTicket = () => {
    if (!scanResult) return;
    setHasDispatched(true);
    onIssueCreated({
      title: scanResult.detectedIssue,
      category: scanResult.category,
      severity: scanResult.severity,
      location: scanResult.ward || "Bengaluru",
      ward: scanResult.ward || "Ward 151",
      description: scanResult.notes || "Automated optical telemetry issue.",
      imageUrl: scanResult.imageUrl || selectedPreset.imageUrl,
      peopleAffected: scanResult.peopleAffected,
      accessibilityImpact: scanResult.accessibilityImpact,
      recommendedAction: scanResult.recommendedAction,
    });
  };

  return (
    <div className="space-y-6">
      {/* Title & Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Scan className="w-5 h-5 text-sky-400" />
            <span>AI Optical Inspection & Diagnostic Terminal</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time urban surface defect analysis powered by CITYSENSE Deep Vision models.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Vision Model Online
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Upload & Presets (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl bg-[#0a101f] border border-slate-800 p-4 space-y-4">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              1. Select Test Imagery or Upload Field Photo
            </h3>

            {/* Upload Zone */}
            <label
              htmlFor="field-photo-input"
              className="border-2 border-dashed border-slate-800 hover:border-sky-500/60 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-[#070b16] hover:bg-slate-900/50 transition-all group"
            >
              <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-sky-400 mb-2 transition-colors" />
              <p className="text-xs font-semibold text-slate-200">
                Click or Drop Field Camera Photo
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                PNG, JPG, WebP up to 15MB
              </p>
              <input
                id="field-photo-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>

            {/* Presets Grid */}
            <div>
              <p className="text-xs font-semibold text-slate-400 mb-2">
                Or choose standard urban defect benchmark:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_SCAN_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSelectedPreset(preset);
                      setCustomImage(null);
                      runDiagnosis(preset.imageUrl, preset.id);
                    }}
                    className={`p-2 rounded-xl text-left border transition-all flex items-center gap-2 ${
                      selectedPreset.id === preset.id && !customImage
                        ? "bg-sky-500/15 border-sky-500/50 text-white"
                        : "bg-[#070b16] border-slate-800 text-slate-300 hover:bg-slate-800/60"
                    }`}
                  >
                    <img
                      src={preset.imageUrl}
                      alt={preset.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold truncate">{preset.title}</p>
                      <p className="text-[10px] text-slate-500">{preset.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => runDiagnosis(customImage || selectedPreset.imageUrl, selectedPreset.id)}
              disabled={isScanning}
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing Optical Vectors...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Re-Execute AI Inspection</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Live Inspection Screen (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-xl bg-[#0a101f] border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-sky-400" />
                <span>Diagnostic Telemetry & Defect Assessment</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                FRAME-RES: 1920x1080
              </span>
            </div>

            {/* Viewport with Bounding Scan Overlay */}
            <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
              <img
                src={customImage || selectedPreset.imageUrl}
                alt="Active Frame"
                className="w-full h-full object-cover"
              />

              {/* Scanning Laser animation */}
              {isScanning ? (
                <div className="absolute inset-0 bg-sky-500/20 backdrop-blur-[1px] flex flex-col items-center justify-center gap-3">
                  <div className="w-full h-1 bg-sky-400 shadow-[0_0_15px_#38bdf8] animate-pulse"></div>
                  <div className="bg-[#0b1222]/90 border border-sky-500 px-4 py-2 rounded-xl text-center shadow-xl">
                    <Loader2 className="w-5 h-5 text-sky-400 animate-spin mx-auto mb-1" />
                    <p className="text-xs font-bold text-white">Segmenting Infrastructure...</p>
                    <p className="text-[10px] text-slate-400">Classifying curb profile & surface fractures</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-x-12 inset-y-12 border-2 border-dashed border-red-400 rounded-lg pointer-events-none flex flex-col justify-between p-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-red-600 text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                      {scanResult ? scanResult.detectedIssue : selectedPreset.title}
                    </span>
                    <span className="bg-black/70 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded">
                      Confidence: {scanResult ? scanResult.confidence : selectedPreset.confidence}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="bg-black/70 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded">
                      SEVERITY: {scanResult ? scanResult.severity : selectedPreset.severity}
                    </span>
                    <span className="bg-black/70 text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded">
                      WHEELCHAIR RESTRICTED
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Diagnostic Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-2.5 rounded-lg bg-[#070b16] border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Category</p>
                <p className="text-xs font-bold text-white mt-0.5">
                  {scanResult?.category || selectedPreset.category}
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#070b16] border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Severity</p>
                <p className="text-xs font-bold text-red-400 mt-0.5">
                  {scanResult?.severity || selectedPreset.severity}
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#070b16] border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Ward Code</p>
                <p className="text-xs font-bold text-slate-200 mt-0.5">
                  {scanResult?.ward || selectedPreset.ward}
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#070b16] border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Resolution SLA</p>
                <p className="text-xs font-bold text-emerald-400 mt-0.5">
                  &lt; 48 Hours
                </p>
              </div>
            </div>

            {/* Impact & Recommended Action */}
            <div className="p-3.5 rounded-xl bg-[#070b16] border border-slate-800 space-y-1.5">
              <p className="text-xs text-red-400 font-semibold">
                Impact: {scanResult?.accessibilityImpact || selectedPreset.accessibilityImpact}
              </p>
              <p className="text-xs text-slate-300">
                Action: {scanResult?.recommendedAction || selectedPreset.recommendedAction}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() =>
                  onViewFullReport(
                    scanResult || {
                      detectedIssue: selectedPreset.title,
                      severity: selectedPreset.severity as any,
                      confidence: selectedPreset.confidence,
                      category: selectedPreset.category as any,
                      peopleAffected: selectedPreset.peopleAffected,
                      accessibilityImpact: selectedPreset.accessibilityImpact,
                      recommendedAction: selectedPreset.recommendedAction,
                      ward: selectedPreset.ward,
                      imageUrl: selectedPreset.imageUrl,
                    }
                  )
                }
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1.5"
              >
                <span>Full Audit Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleDispatchTicket}
                disabled={hasDispatched}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-950 disabled:opacity-60"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{hasDispatched ? "Dispatched to Field Crew" : "Dispatch Maintenance Crew"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
