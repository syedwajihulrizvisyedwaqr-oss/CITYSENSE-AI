import React from "react";
import { X, Keyboard, Command, Sparkles } from "lucide-react";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: "D", description: "Navigate to Main Dashboard", category: "Navigation" },
    { key: "S", description: "Navigate to Scan Location Laboratory", category: "Navigation" },
    { key: "M", description: "Navigate to Problem Map / GIS", category: "Navigation" },
    { key: "A", description: "Navigate to Urban Accessibility Index", category: "Navigation" },
    { key: "R", description: "Navigate to AI Executive Reports", category: "Navigation" },
    { key: "N", description: "Toggle Notification Center panel", category: "Actions" },
    { key: "?", description: "Open / Close this Keyboard Shortcuts help", category: "System" },
    { key: "Esc", description: "Close active modals, dialogs, and popups", category: "System" },
  ];

  return (
    <div
      id="keyboard-shortcuts-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-[#0c1324] border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Command & Keyboard Shortcuts</h3>
              <p className="text-xs text-slate-400">
                Rapid municipal command navigation for power dispatchers
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

        {/* Shortcuts list */}
        <div className="py-4 space-y-2">
          {shortcuts.map((sc) => (
            <div
              key={sc.key}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#070b16] border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <span className="text-xs text-slate-300 font-medium">{sc.description}</span>
              <kbd className="px-2.5 py-1 text-xs font-mono font-bold text-sky-300 bg-slate-800/90 border border-slate-700 rounded-lg shadow-inner min-w-[28px] text-center">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>Shortcuts disabled during text inputs & searches</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Got it (Esc)
          </button>
        </div>
      </div>
    </div>
  );
};
