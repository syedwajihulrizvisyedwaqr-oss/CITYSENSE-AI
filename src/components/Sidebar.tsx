import React from "react";
import {
  LayoutDashboard,
  Scan,
  MapPin,
  Accessibility,
  FileText,
  BarChart3,
  Bell,
  Users,
  Settings,
  Plus,
  Radio,
  X
} from "lucide-react";
import { ActiveView } from "../types";

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  onOpenReportModal: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  onOpenReportModal,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  interface NavItem {
    id: ActiveView;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "scan", label: "Scan Location", icon: Scan },
    { id: "map", label: "Problem Map", icon: MapPin },
    { id: "accessibility", label: "Accessibility", icon: Accessibility },
    { id: "reports", label: "AI Reports", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "alerts", label: "Alerts", icon: Bell, badge: "12" },
    { id: "team", label: "Team", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          id="sidebar-backdrop"
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        id="main-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#080d1a] border-r border-slate-800/80 flex flex-col justify-between p-4 transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between px-2 pt-1 pb-6">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => {
                setActiveView("dashboard");
                if (onCloseMobile) onCloseMobile();
              }}
            >
              {/* Hexagonal Futuristic Icon */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-sky-500/20 rounded-xl blur-xs group-hover:bg-sky-400/30 transition-all"></div>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500/20 via-blue-600/30 to-indigo-900/60 border border-sky-400/50 flex items-center justify-center shadow-lg shadow-sky-950/50">
                  <svg
                    className="w-6 h-6 text-sky-400 group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 2 8.5 2 15.5 12 22 22 15.5 22 8.5 12 2" />
                    <line x1="12" y1="22" x2="12" y2="15.5" />
                    <polyline points="22 8.5 12 15.5 2 8.5" />
                    <polyline points="2 15.5 12 8.5 22 15.5" />
                    <line x1="12" y1="2" x2="12" y2="8.5" />
                  </svg>
                </div>
              </div>

              <div>
                <h1 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  CITYSENSE AI
                </h1>
                <p className="text-[11px] text-slate-400 font-medium tracking-tight">
                  The City That Sees Itself.
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              id="sidebar-close-btn"
              onClick={onCloseMobile}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5 px-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => {
                    setActiveView(item.id as ActiveView);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-inner shadow-sky-500/10"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-[18px] h-[18px] transition-colors ${
                        isActive ? "text-sky-400" : "text-slate-400"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="text-[11px] font-semibold bg-purple-600/40 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Report Button & System Status */}
        <div className="space-y-3 px-1 pt-4 border-t border-slate-800/80">
          {/* Report an Issue Button */}
          <button
            id="report-issue-btn"
            onClick={onOpenReportModal}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-950/60 transition-all duration-200 hover:shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Report an Issue</span>
          </button>

          {/* AI System Status Card */}
          <div
            id="ai-system-status-card"
            className="bg-[#0b1222] border border-slate-800/80 rounded-xl p-3.5 space-y-2 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute opacity-75"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <span className="text-xs font-semibold text-slate-300">
                  AI System Status
                </span>
              </div>
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            </div>

            <p className="text-xs font-semibold text-emerald-400">
              All Systems Operational
            </p>

            {/* Glowing Sine Sparkline */}
            <div className="h-9 w-full overflow-hidden flex items-end">
              <svg
                className="w-full h-full text-emerald-400/80"
                viewBox="0 0 200 40"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,25 Q15,35 30,20 T60,22 T90,10 T120,30 T150,15 T180,26 T200,18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M0,25 Q15,35 30,20 T60,22 T90,10 T120,30 T150,15 T180,26 T200,18 L200,40 L0,40 Z"
                  fill="url(#emerald-gradient)"
                  opacity="0.18"
                />
                <defs>
                  <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
