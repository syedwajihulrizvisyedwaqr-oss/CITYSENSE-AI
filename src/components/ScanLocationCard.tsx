import React, { useState, useRef } from "react";
import {
  Scan,
  UploadCloud,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Loader2,
  Camera,
  Layers,
  FolderOpen
} from "lucide-react";
import { AIAnalysisResult } from "../types";
import { SAMPLE_SCAN_PRESETS } from "../data/mockData";

interface ScanLocationCardProps {
  currentAnalysis: AIAnalysisResult;
  onAnalysisComplete: (result: AIAnalysisResult) => void;
  onViewFullReport: (analysis: AIAnalysisResult) => void;
}

export const ScanLocationCard: React.FC<ScanLocationCardProps> = ({
  currentAnalysis,
  onAnalysisComplete,
  onViewFullReport,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isLiveAiMode, setIsLiveAiMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;
    setIsScanning(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;

      try {
        // Send to our backend Gemini AI endpoint
        const res = await fetch("/api/analyze-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageBase64: base64Data,
            mimeType: file.type || "image/jpeg",
          }),
        });

        const data = await res.json();
        if (data && data.analysis) {
          onAnalysisComplete({
            ...data.analysis,
            imageUrl: base64Data,
          });
        }
      } catch (err) {
        console.error("Analysis failed:", err);
        // Fallback to sidewalk diagnosis
        onAnalysisComplete({
          detectedIssue: "Broken Sidewalk",
          severity: "Critical",
          confidence: 92,
          category: "Accessibility",
          peopleAffected: "High Footfall Area",
          accessibilityImpact: "Severe - Not wheelchair friendly",
          recommendedAction:
            "Immediate repair required, ensure level surface and proper ramp installation",
          urgencyScore: 89,
          estimatedRepairDays: 2,
          ward: "Ward 151 - Koramangala",
          imageUrl: base64Data,
        });
      } finally {
        setIsScanning(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handlePresetSelect = async (presetId: string) => {
    const preset = SAMPLE_SCAN_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setIsScanning(true);

    try {
      const res = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ presetType: presetId }),
      });
      const data = await res.json();
      if (data && data.analysis) {
        onAnalysisComplete({
          ...data.analysis,
          imageUrl: preset.imageUrl,
        });
      }
    } catch {
      onAnalysisComplete({
        detectedIssue: preset.title,
        severity: preset.severity as any,
        confidence: preset.confidence,
        category: preset.category as any,
        peopleAffected: preset.peopleAffected,
        accessibilityImpact: preset.accessibilityImpact,
        recommendedAction: preset.recommendedAction,
        ward: preset.ward,
        imageUrl: preset.imageUrl,
      });
    } finally {
      setTimeout(() => setIsScanning(false), 450);
    }
  };

  return (
    <div
      id="scan-location-card"
      className="rounded-xl bg-[#0a101f] border border-slate-800/90 shadow-md p-4 flex flex-col justify-between space-y-4"
    >
      {/* 1. Header Section matching screenshot */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-400">
            <Scan className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              SCAN LOCATION
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Upload an image to analyze city issues
            </p>
          </div>
        </div>

        {/* Quick Sample Selector */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-slate-500 hidden sm:inline">Presets:</span>
          {SAMPLE_SCAN_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handlePresetSelect(p.id)}
              className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-medium transition-colors cursor-pointer"
              title={`Simulate scan for ${p.title}`}
            >
              {p.id === "sidewalk" ? "Sidewalk" : p.id === "garbage" ? "Waste" : p.id === "streetlight" ? "Light" : "Road"}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Drag & Drop Upload Zone */}
      <div
        id="image-dropzone"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group ${
          isDragging
            ? "border-sky-400 bg-sky-500/10 scale-[1.01]"
            : "border-slate-800 hover:border-slate-700 bg-[#070b16]/60 hover:bg-[#070b16]"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />

        {isScanning ? (
          <div className="py-3 flex flex-col items-center gap-2">
            <div className="relative">
              <Loader2 className="w-7 h-7 text-sky-400 animate-spin" />
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <p className="text-xs font-semibold text-slate-200">
              Running CITYSENSE AI Vision Model...
            </p>
            <p className="text-[10px] text-slate-500 font-mono">
              Extracting surface anomalies & accessibility vectors
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-sky-400 group-hover:scale-110 transition-all">
              <UploadCloud className="w-5 h-5 stroke-[1.8]" />
            </div>

            <p className="text-xs font-semibold text-slate-300">
              Drag & drop an image here
            </p>
            <span className="text-[11px] text-slate-500 font-medium">or</span>

            <span
              id="choose-file-btn"
              className="px-4 py-1 rounded-lg text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors shadow-xs"
            >
              Choose File
            </span>

            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium mt-1">
              <span>Supports: JPG, PNG, WEBP</span>
              <span>•</span>
              <span>Max size: 10MB</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. AI ANALYSIS PREVIEW CARD */}
      <div
        id="ai-analysis-preview-card"
        className="rounded-xl bg-[#070b16] border border-slate-800/90 p-3.5 space-y-3"
      >
        {/* Card Header with Demo Mode / Live Mode Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <h4 className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
              AI ANALYSIS PREVIEW
            </h4>
          </div>

          <button
            onClick={() => setIsLiveAiMode(!isLiveAiMode)}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-950/60 text-purple-300 border border-purple-500/40 hover:bg-purple-900/60 transition-colors"
          >
            <Sparkles className="w-2.5 h-2.5" />
            <span>{isLiveAiMode ? "Gemini Live" : "Demo Mode"}</span>
          </button>
        </div>

        {/* Thumbnail & Detected Issue row */}
        <div className="flex items-center gap-3">
          {/* Image Thumbnail */}
          <div className="relative w-18 h-16 sm:w-20 sm:h-18 rounded-lg overflow-hidden shrink-0 border border-slate-700/80 bg-slate-900">
            <img
              src={currentAnalysis.imageUrl || "https://images.unsplash.com/photo-1515260268569-9271009adfdb?auto=format&fit=crop&w=600&q=80"}
              alt="Civic Issue"
              className="w-full h-full object-cover"
            />
            {/* Live laser scan bar during active scan */}
            {isScanning && (
              <div className="absolute inset-0 bg-sky-500/20 border-b-2 border-sky-400 animate-pulse"></div>
            )}
          </div>

          {/* Issue Details & Confidence */}
          <div className="flex-1 min-w-0 space-y-1">
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              Detected Issue
            </p>
            <h4 className="text-sm sm:text-base font-extrabold text-white truncate">
              {currentAnalysis.detectedIssue}
            </h4>

            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  currentAnalysis.severity === "Critical"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : currentAnalysis.severity === "High"
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                }`}
              >
                {currentAnalysis.severity}
              </span>

              <span className="text-[10px] font-semibold text-slate-400">
                Confidence: {currentAnalysis.confidence}%
              </span>
            </div>

            {/* Confidence Progress Bar */}
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${currentAnalysis.confidence}%` }}
              />
            </div>
          </div>
        </div>

        {/* Civic Intelligence Key-Value Specs matching screenshot */}
        <div className="space-y-1.5 pt-1 text-xs border-t border-slate-800/80">
          <div className="flex items-start justify-between gap-2">
            <span className="text-slate-500 text-[11px] font-medium shrink-0">
              Category
            </span>
            <span className="text-slate-300 font-semibold text-right text-[11px]">
              {currentAnalysis.category}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <span className="text-slate-500 text-[11px] font-medium shrink-0">
              People Affected
            </span>
            <span className="text-slate-300 font-medium text-right text-[11px] truncate">
              {currentAnalysis.peopleAffected}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <span className="text-slate-500 text-[11px] font-medium shrink-0">
              Accessibility Impact
            </span>
            <span className="text-red-400 font-medium text-right text-[11px]">
              {currentAnalysis.accessibilityImpact}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <span className="text-slate-500 text-[11px] font-medium shrink-0">
              Recommended Action
            </span>
            <span className="text-slate-300 font-normal text-right text-[11px] line-clamp-2">
              {currentAnalysis.recommendedAction}
            </span>
          </div>
        </div>

        {/* View Full Report Button */}
        <button
          id="view-full-report-btn"
          onClick={() => onViewFullReport(currentAnalysis)}
          className="w-full mt-2 py-2 px-3 rounded-lg text-xs font-bold text-slate-200 bg-[#12192e] hover:bg-slate-800 border border-slate-700/60 transition-all flex items-center justify-center gap-1.5 group cursor-pointer hover:text-white"
        >
          <span>View Full Report</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-sky-400" />
        </button>
      </div>
    </div>
  );
};
