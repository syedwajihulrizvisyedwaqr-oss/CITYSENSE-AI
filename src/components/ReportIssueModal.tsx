import React, { useState } from "react";
import {
  X,
  UploadCloud,
  MapPin,
  AlertTriangle,
  Send,
  Loader2,
  Sparkles
} from "lucide-react";
import { IssueCategory, IssueSeverity } from "../types";

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitIssue: (issueData: any) => Promise<void>;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
  onSubmitIssue,
}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<IssueCategory>("Accessibility");
  const [severity, setSeverity] = useState<IssueSeverity>("Critical");
  const [location, setLocation] = useState("Koramangala 5th Block, Bengaluru");
  const [ward, setWard] = useState("Ward 151 - Koramangala");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1515260268569-9271009adfdb?auto=format&fit=crop&w=600&q=80");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmitIssue({
        title: title || `${category} Anomaly`,
        category,
        severity,
        location,
        ward,
        description: description || "Reported via CITYSENSE AI field patrol terminal.",
        imageUrl,
        peopleAffected: "Pedestrians & Local Commuters",
        accessibilityImpact: severity === "Critical" ? "Severe - Not wheelchair friendly" : "Moderate",
        recommendedAction: "Dispatch inspection unit and clear hazard"
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="report-issue-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-[#0c1324] border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Report Civic Issue</h3>
              <p className="text-xs text-slate-400">
                CITYSENSE Automated Municipal Ingestion
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Image Preview & Upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Defect Photo Evidence
            </label>
            <div className="relative h-36 rounded-xl border border-slate-800 bg-[#070b16] overflow-hidden group">
              <img
                src={imageUrl}
                alt="Defect Preview"
                className="w-full h-full object-cover"
              />
              <label
                htmlFor="modal-photo-upload"
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-white text-xs font-semibold gap-1"
              >
                <UploadCloud className="w-6 h-6" />
                <span>Change Defect Image</span>
              </label>
              <input
                id="modal-photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Issue Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Issue Headline
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Broken Pavers on Sidewalk"
              className="w-full px-3.5 py-2 bg-[#070b16] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Category and Severity Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as IssueCategory)}
                className="w-full px-3 py-2 bg-[#070b16] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="Accessibility">Accessibility</option>
                <option value="Roads">Roads & Pavements</option>
                <option value="Waste">Waste Management</option>
                <option value="Lighting">Street Lighting</option>
                <option value="Safety">Public Safety Hazard</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Severity
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as IssueSeverity)}
                className="w-full px-3 py-2 bg-[#070b16] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="Critical">Critical (Immediate Hazard)</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>

          {/* Location & Ward */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Location
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Koramangala 5th Block"
                className="w-full px-3 py-2 bg-[#070b16] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Ward / District
              </label>
              <input
                type="text"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                placeholder="e.g. Ward 151"
                className="w-full px-3 py-2 bg-[#070b16] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Field Description & Observational Notes
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the defect, dimensions, potential impact on wheelchair or pedestrian flow..."
              className="w-full px-3 py-2 bg-[#070b16] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all flex items-center gap-2 shadow-lg shadow-indigo-950/80 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Logging Defect...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit to City System</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
