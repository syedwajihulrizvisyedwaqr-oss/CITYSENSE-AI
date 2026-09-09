export type IssueSeverity = "Critical" | "High" | "Medium" | "Low";
export type IssueCategory = "Accessibility" | "Roads" | "Waste" | "Lighting" | "Safety";
export type IssueStatus = "Reported" | "In Progress" | "Resolved";

export interface CityIssue {
  id: string;
  title: string;
  category: IssueCategory;
  severity: IssueSeverity;
  status: IssueStatus;
  location: string;
  ward: string;
  lat: number;
  lng: number;
  confidence: number;
  timeAgo: string;
  imageUrl: string;
  description: string;
  peopleAffected: string;
  accessibilityImpact: string;
  recommendedAction: string;
  reportedAt: string;
}

export interface AIAnalysisResult {
  detectedIssue: string;
  severity: IssueSeverity;
  confidence: number;
  category: IssueCategory;
  peopleAffected: string;
  accessibilityImpact: string;
  recommendedAction: string;
  urgencyScore?: number;
  estimatedRepairDays?: number;
  ward?: string;
  notes?: string;
  imageUrl?: string;
}

export interface CivicNotification {
  id: string;
  title: string;
  desc: string;
  category: "critical" | "accessibility" | "ai_scan" | "maintenance" | "system";
  timeAgo: string;
  read: boolean;
  actionUrl?: string;
  issueId?: string;
  timestamp: number | string;
}

export interface PredictivePoint {
  date: string;
  dayLabel: string;
  historicalVolume?: number;
  predictedVolume: number;
  predictedCritical: number;
  predictedHigh: number;
  predictedMedium: number;
  confidenceLower: number;
  confidenceUpper: number;
  keyRiskFactor: string;
}

export type ActiveView = 
  | "dashboard" 
  | "scan" 
  | "map" 
  | "accessibility" 
  | "reports" 
  | "analytics" 
  | "alerts" 
  | "team" 
  | "settings";
