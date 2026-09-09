import React, { useState, useEffect, useCallback } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { TopKpiCards } from "./components/TopKpiCards";
import { LiveCityMap } from "./components/LiveCityMap";
import { ScanLocationCard } from "./components/ScanLocationCard";
import { BottomAnalyticsCards } from "./components/BottomAnalyticsCards";
import { BottomTickerBar } from "./components/BottomTickerBar";
import { ReportIssueModal } from "./components/ReportIssueModal";
import { IssueDetailModal } from "./components/IssueDetailModal";
import { KeyboardShortcutsModal } from "./components/KeyboardShortcutsModal";

// Additional specialized views
import { ScanLocationView } from "./components/ScanLocationView";
import { ProblemMapView } from "./components/ProblemMapView";
import { AccessibilityView } from "./components/AccessibilityView";
import { AIReportsView } from "./components/AIReportsView";
import { AnalyticsView } from "./components/AnalyticsView";
import { AlertsView } from "./components/AlertsView";
import { TeamView } from "./components/TeamView";
import { SettingsView } from "./components/SettingsView";

import { CityIssue, AIAnalysisResult, ActiveView, IssueStatus, CivicNotification } from "./types";
import { INITIAL_ISSUES, INITIAL_ANALYSIS_PREVIEW, INITIAL_NOTIFICATIONS } from "./data/mockData";

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>("dashboard");
  const [issues, setIssues] = useState<CityIssue[]>(INITIAL_ISSUES);
  const [currentAnalysis, setCurrentAnalysis] = useState<AIAnalysisResult>(INITIAL_ANALYSIS_PREVIEW);
  const [selectedIssueModal, setSelectedIssueModal] = useState<CityIssue | AIAnalysisResult | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<CivicNotification[]>(INITIAL_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch live issues from server if available
  const fetchIssues = async () => {
    try {
      const res = await fetch("/api/issues");
      if (res.ok) {
        const data = await res.json();
        if (data.issues && data.issues.length > 0) {
          setIssues(data.issues);
        }
      }
    } catch {
      // Keep initial issues in memory
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target?.tagName?.toLowerCase();
      const isEditing =
        tagName === "input" ||
        tagName === "textarea" ||
        tagName === "select" ||
        target?.isContentEditable;

      // When editing text, only allow Escape to unfocus
      if (isEditing) {
        if (e.key === "Escape") {
          target.blur();
        }
        return;
      }

      // Escape closes dialogs and panels
      if (e.key === "Escape") {
        setIsShortcutsOpen(false);
        setIsReportModalOpen(false);
        setSelectedIssueModal(null);
        setShowNotifications(false);
        setIsMobileSidebarOpen(false);
        return;
      }

      // '?' or 'Shift + /' opens shortcuts help
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      // Single-key navigation
      const key = e.key.toLowerCase();
      switch (key) {
        case "d":
          setActiveView("dashboard");
          break;
        case "s":
          setActiveView("scan");
          break;
        case "m":
          setActiveView("map");
          break;
        case "a":
          setActiveView("accessibility");
          break;
        case "r":
          setActiveView("reports");
          break;
        case "n":
          setShowNotifications((prev) => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCreateIssue = async (newIssueData: any) => {
    let createdIssue: CityIssue;
    try {
      const res = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIssueData),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.issue) {
          createdIssue = data.issue;
          setIssues((prev) => [data.issue, ...prev]);
          pushNotificationForNewIssue(createdIssue);
          return;
        }
      }
    } catch (err) {
      console.error("Issue creation error:", err);
    }

    // Local fallback
    const fallbackIssue: CityIssue = {
      id: `ISSUE-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newIssueData.title || "Reported Civic Defect",
      category: newIssueData.category || "Roads",
      severity: newIssueData.severity || "Critical",
      status: "Reported",
      location: newIssueData.location || "Koramangala, Bengaluru",
      ward: newIssueData.ward || "Ward 151",
      lat: 12.9352,
      lng: 77.6245,
      confidence: 94,
      timeAgo: "Just now",
      imageUrl: newIssueData.imageUrl || "https://images.unsplash.com/photo-1515260268569-9271009adfdb?auto=format&fit=crop&w=600&q=80",
      description: newIssueData.description || "Reported via patrol terminal.",
      peopleAffected: newIssueData.peopleAffected || "Pedestrians",
      accessibilityImpact: newIssueData.accessibilityImpact || "Severe",
      recommendedAction: newIssueData.recommendedAction || "Inspect and repair",
      reportedAt: new Date().toISOString()
    };
    setIssues((prev) => [fallbackIssue, ...prev]);
    pushNotificationForNewIssue(fallbackIssue);
  };

  const pushNotificationForNewIssue = (issue: CityIssue) => {
    const newNotif: CivicNotification = {
      id: `notif-${Date.now()}`,
      title: `${issue.severity === "Critical" ? "Critical Defect Alert" : "Civic Issue Reported"}: ${issue.title}`,
      desc: `Geotagged at ${issue.location}. Priority queue updated.`,
      category: issue.severity === "Critical" ? "critical" : issue.category === "Accessibility" ? "accessibility" : "maintenance",
      timestamp: new Date().toISOString(),
      timeAgo: "Just now",
      read: false,
      issueId: issue.id,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleUpdateStatus = async (issueId: string, newStatus: IssueStatus) => {
    setIssues((prev) =>
      prev.map((i) => (i.id === issueId ? { ...i, status: newStatus } : i))
    );

    // Push notification for status change
    const updatedIssue = issues.find((i) => i.id === issueId);
    if (updatedIssue) {
      const statusNotif: CivicNotification = {
        id: `notif-stat-${Date.now()}`,
        title: `Work Order Status: ${updatedIssue.title}`,
        desc: `Status updated to "${newStatus}" for ${updatedIssue.location}.`,
        category: newStatus === "Resolved" ? "maintenance" : "critical",
        timestamp: new Date().toISOString(),
        timeAgo: "Just now",
        read: false,
        issueId: issueId,
      };
      setNotifications((prev) => [statusNotif, ...prev]);
    }

    try {
      await fetch(`/api/issues/${issueId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      // Ignored
    }
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notif: CivicNotification) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    setShowNotifications(false);

    // Navigate or inspect
    if (notif.issueId) {
      const matched = issues.find((i) => i.id === notif.issueId);
      if (matched) {
        setSelectedIssueModal(matched);
        return;
      }
    }
    if (notif.category === "accessibility") {
      setActiveView("accessibility");
    } else if (notif.category === "ai_scan") {
      setActiveView("scan");
    } else {
      setActiveView("map");
    }
  };

  const handleAnalysisComplete = (result: AIAnalysisResult) => {
    setCurrentAnalysis(result);
    // Push AI scan notification
    const scanNotif: CivicNotification = {
      id: `notif-scan-${Date.now()}`,
      title: `AI Optical Scan Completed: ${result.detectedIssue}`,
      desc: `Confidence ${result.confidence}% with severity ${result.severity}. Remedial protocol generated.`,
      category: "ai_scan",
      timestamp: new Date().toISOString(),
      timeAgo: "Just now",
      read: false,
    };
    setNotifications((prev) => [scanNotif, ...prev]);
  };

  // Filtered issues if searching
  const displayedIssues = searchQuery
    ? issues.filter(
        (i) =>
          i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : issues;

  return (
    <div className="min-h-screen bg-[#070b16] text-slate-100 flex">
      {/* 1. Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64 w-full">
        {/* Top Header Bar */}
        <Header
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onRefreshData={fetchIssues}
          notifications={notifications}
          onMarkAllAsRead={handleMarkAllNotificationsRead}
          onNotificationClick={handleNotificationClick}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          onOpenShortcutsModal={() => setIsShortcutsOpen(true)}
        />

        {/* Dynamic View Switcher */}
        <main className="flex-1 p-4 sm:p-5 lg:p-6 space-y-4 max-w-[1700px] w-full mx-auto">
          {activeView === "dashboard" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Row 1: Top KPI Cards & City Overview */}
              <TopKpiCards />

              {/* Row 2: Live City Map (Left) & Scan Location / AI Preview (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
                <div className="lg:col-span-7">
                  <LiveCityMap
                    onSelectPin={(pin) => {
                      const matched = issues.find(
                        (i) => i.location.toLowerCase().includes(pin.location.toLowerCase())
                      );
                      if (matched) {
                        setSelectedIssueModal(matched);
                      }
                    }}
                    onOpenFullMap={() => setActiveView("map")}
                  />
                </div>

                <div className="lg:col-span-5">
                  <ScanLocationCard
                    currentAnalysis={currentAnalysis}
                    onAnalysisComplete={handleAnalysisComplete}
                    onViewFullReport={(analysis) => setSelectedIssueModal(analysis)}
                  />
                </div>
              </div>

              {/* Row 3: Bottom Analytics Cards (Recent Detections, Category Donut, Severity Donut) */}
              <BottomAnalyticsCards
                issues={displayedIssues}
                onSelectIssue={(issue) => setSelectedIssueModal(issue)}
                onViewAllDetections={() => setActiveView("alerts")}
                onViewCategoryReport={() => setActiveView("reports")}
                onViewSeverityReport={() => setActiveView("reports")}
              />

              {/* Row 4: Bottom Intelligence Ticker Bar */}
              <BottomTickerBar />
            </div>
          )}

          {activeView === "scan" && (
            <div className="animate-in fade-in duration-200">
              <ScanLocationView
                onViewFullReport={(analysis) => setSelectedIssueModal(analysis)}
                onIssueCreated={handleCreateIssue}
              />
            </div>
          )}

          {activeView === "map" && (
            <div className="animate-in fade-in duration-200">
              <ProblemMapView
                issues={displayedIssues}
                onSelectIssue={(issue) => setSelectedIssueModal(issue)}
              />
            </div>
          )}

          {activeView === "accessibility" && (
            <div className="animate-in fade-in duration-200">
              <AccessibilityView
                issues={displayedIssues}
                onSelectIssue={(issue) => setSelectedIssueModal(issue)}
              />
            </div>
          )}

          {activeView === "reports" && (
            <div className="animate-in fade-in duration-200">
              <AIReportsView issues={displayedIssues} />
            </div>
          )}

          {activeView === "analytics" && (
            <div className="animate-in fade-in duration-200">
              <AnalyticsView />
            </div>
          )}

          {activeView === "alerts" && (
            <div className="animate-in fade-in duration-200">
              <AlertsView
                issues={displayedIssues}
                onSelectIssue={(issue) => setSelectedIssueModal(issue)}
              />
            </div>
          )}

          {activeView === "team" && (
            <div className="animate-in fade-in duration-200">
              <TeamView />
            </div>
          )}

          {activeView === "settings" && (
            <div className="animate-in fade-in duration-200">
              <SettingsView />
            </div>
          )}
        </main>
      </div>

      {/* Report Issue Modal */}
      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitIssue={handleCreateIssue}
      />

      {/* Detailed Issue Inspection Modal */}
      <IssueDetailModal
        issue={selectedIssueModal}
        isOpen={!!selectedIssueModal}
        onClose={() => setSelectedIssueModal(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Global Keyboard Shortcuts Help Dialog */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
