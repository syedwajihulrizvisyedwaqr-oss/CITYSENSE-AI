import React, { useState } from "react";
import { Settings, Sliders, Cpu, Bell, Globe, CheckCircle2, Shield } from "lucide-react";

export const SettingsView: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState("Bengaluru, India");
  const [aiSensitivity, setAiSensitivity] = useState("High");
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-sky-400" />
            <span>CITYSENSE System Settings & Core Config</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Global civic telemetry parameters, vision model sensitivity, and urban boundary configuration.
          </p>
        </div>

        {saved && (
          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1.5 font-bold animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Configuration Saved
          </span>
        )}
      </div>

      <div className="space-y-4">
        {/* City selection */}
        <div className="p-5 rounded-xl bg-[#0a101f] border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Globe className="w-4 h-4 text-sky-400" />
            <span>Target Metropolitan Jurisdiction</span>
          </div>
          <p className="text-xs text-slate-400">
            Select the primary municipality database and coordinate boundary.
          </p>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full sm:w-80 px-3 py-2 bg-[#070b16] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500 font-semibold"
          >
            <option value="Bengaluru, India">Bengaluru, India (BBMP Command)</option>
            <option value="Singapore">Singapore (Smart Nation Singapore)</option>
            <option value="Tokyo, Japan">Tokyo, Japan (Metropolitan Bureau)</option>
            <option value="New York, USA">New York, USA (NYC DOT / 311)</option>
            <option value="London, UK">London, UK (TfL Civic)</option>
          </select>
        </div>

        {/* AI Model Parameters */}
        <div className="p-5 rounded-xl bg-[#0a101f] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>AI Vision Engine & Anomaly Detection Sensitivity</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {["Standard", "High", "Maximum (Strict)"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setAiSensitivity(lvl)}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  aiSensitivity === lvl
                    ? "bg-sky-500/15 border-sky-500 text-white font-bold"
                    : "bg-[#070b16] border-slate-800 text-slate-400 hover:bg-slate-800/40"
                }`}
              >
                <p className="text-sm text-white font-bold">{lvl}</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {lvl === "Standard"
                    ? "Filters minor pavement scuffs. Triggers on >30mm fractures."
                    : lvl === "High"
                    ? "Standard municipal threshold. Detects tripping points >15mm."
                    : "Ultra-sensitive. Captures hairline paver cracks and curb misalignments."}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Automated Dispatch Toggle */}
        <div className="p-5 rounded-xl bg-[#0a101f] border border-slate-800 flex items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Automated Emergency Dispatch for Critical Hazards</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Automatically trigger rapid response SMS and crew notification when confidence exceeds 92% on critical alerts.
            </p>
          </div>

          <button
            onClick={() => setAutoDispatch(!autoDispatch)}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              autoDispatch ? "bg-emerald-600" : "bg-slate-700"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                autoDispatch ? "left-7" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-500 transition-colors shadow-lg shadow-sky-950 cursor-pointer"
          >
            Save Configuration Changes
          </button>
        </div>
      </div>
    </div>
  );
};
