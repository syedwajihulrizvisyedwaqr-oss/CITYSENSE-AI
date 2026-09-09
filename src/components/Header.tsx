import React, { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  MapPin,
  RefreshCw,
  ChevronDown,
  CloudSun,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  X,
  Keyboard,
  Accessibility,
  Sparkles,
  Wrench,
  CheckCheck
} from "lucide-react";
import { CivicNotification } from "../types";

interface HeaderProps {
  onToggleMobileSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onRefreshData?: () => void;
  notifications: CivicNotification[];
  onMarkAllAsRead: () => void;
  onNotificationClick: (notif: CivicNotification) => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  onOpenShortcutsModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar,
  searchQuery,
  setSearchQuery,
  onRefreshData,
  notifications,
  onMarkAllAsRead,
  onNotificationClick,
  showNotifications,
  setShowNotifications,
  onOpenShortcutsModal,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (onRefreshData) onRefreshData();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const getNotificationIcon = (cat: CivicNotification["category"]) => {
    switch (cat) {
      case "critical":
        return <AlertTriangle className="w-3.5 h-3.5 text-red-400" />;
      case "accessibility":
        return <Accessibility className="w-3.5 h-3.5 text-amber-400" />;
      case "ai_scan":
        return <Sparkles className="w-3.5 h-3.5 text-purple-400" />;
      case "maintenance":
        return <Wrench className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />;
    }
  };

  return (
    <header
      id="top-header"
      className="sticky top-0 z-30 h-16 bg-[#080d1a]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 flex items-center justify-between gap-4"
    >
      {/* Left: Mobile Toggle & Search Bar */}
      <div className="flex items-center gap-3.5 flex-1 max-w-xl">
        <button
          id="mobile-menu-toggle"
          onClick={onToggleMobileSidebar}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors lg:hidden cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar matching screenshot */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search locations, issues, reports..."
            className="w-full pl-10 pr-4 py-2 bg-[#0d1424] border border-slate-800/90 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/40 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right Controls: Keyboard Shortcuts, Notifications, City Status Pill, Admin Profile */}
      <div className="flex items-center gap-2 sm:gap-3.5">
        {/* Keyboard Shortcuts Trigger Button */}
        <button
          id="shortcuts-help-trigger"
          onClick={onOpenShortcutsModal}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0d1424] hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-mono transition-colors cursor-pointer"
          title="Press '?' for keyboard shortcuts"
        >
          <Keyboard className="w-3.5 h-3.5" />
          <span>?</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            id="notifications-bell-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-800 cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-orange-500 text-[10px] font-black text-white flex items-center justify-center ring-2 ring-[#080d1a] animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div
              id="notifications-dropdown"
              className="absolute right-0 mt-2 w-84 sm:w-96 bg-[#0d1424] border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Municipal Alerts & Feed
                  </span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-mono font-bold bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/30">
                      {unreadCount} Unread
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllAsRead}
                    className="text-[11px] text-sky-400 font-semibold cursor-pointer hover:text-sky-300 flex items-center gap-1"
                  >
                    <CheckCheck className="w-3 h-3" />
                    <span>Mark all as read</span>
                  </button>
                )}
              </div>

              {/* Notification items list */}
              <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-6">
                    No active civic notifications.
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => onNotificationClick(n)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer text-left ${
                        !n.read
                          ? "bg-slate-900/90 border-sky-500/40 hover:bg-slate-800/90"
                          : "bg-[#080d18] border-slate-800/80 hover:bg-slate-800/60 opacity-80"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="p-1.5 rounded-lg bg-slate-800 shrink-0 mt-0.5">
                          {getNotificationIcon(n.category)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className={`text-xs font-bold truncate ${!n.read ? "text-white" : "text-slate-300"}`}>
                              {n.title}
                            </p>
                            <span className="text-[10px] text-slate-500 shrink-0 ml-1 font-mono">
                              {n.timeAgo}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                            {n.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Panel Footer */}
              <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>Automatic feed from 1,420 IoT sensors</span>
                <span className="text-sky-400 font-medium">Press Esc to close</span>
              </div>
            </div>
          )}
        </div>

        {/* City Status Pill matching screenshot */}
        <div
          id="city-status-pill"
          className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#0d1424] border border-slate-800/90 text-xs text-slate-300"
        >
          <div className="flex items-center gap-1.5 font-medium text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>Bengaluru, India</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1 text-slate-300">
            <CloudSun className="w-3.5 h-3.5 text-amber-400" />
            <span>24°C</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">AQI</span>
            <span className="font-semibold text-emerald-400">42</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
              Good
            </span>
          </div>
        </div>

        {/* Refresh Sync Button */}
        <button
          id="sync-refresh-btn"
          onClick={handleRefresh}
          className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-800 transition-colors cursor-pointer"
          title="Refresh City Sensors"
          aria-label="Refresh City Sensors"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-sky-400" : ""}`} />
        </button>

        {/* Admin Profile Dropdown */}
        <div className="relative">
          <button
            id="admin-profile-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 sm:pl-2 sm:pr-2.5 rounded-xl hover:bg-slate-800/60 transition-colors cursor-pointer border border-transparent hover:border-slate-800"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
              CA
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-slate-200 leading-none">City Admin</p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">BBMP Command</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
          </button>

          {showProfileMenu && (
            <div
              id="profile-dropdown-menu"
              className="absolute right-0 mt-2 w-48 bg-[#0d1424] border border-slate-800 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in duration-150 text-xs"
            >
              <div className="px-3 py-2 border-b border-slate-800">
                <p className="font-bold text-white">City Administrator</p>
                <p className="text-[10px] text-slate-400">admin@bbmp.gov.in</p>
              </div>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onOpenShortcutsModal();
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-800/80 rounded-lg text-slate-300 hover:text-white flex items-center justify-between"
              >
                <span>Keyboard Shortcuts</span>
                <kbd className="text-[10px] font-mono text-sky-400">?</kbd>
              </button>
              <div className="border-t border-slate-800 my-1"></div>
              <div className="px-3 py-1.5 text-[10px] text-slate-500">
                CITYSENSE OS v2.4 • Bengaluru
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
