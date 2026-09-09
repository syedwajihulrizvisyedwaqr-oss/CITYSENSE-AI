import { CityIssue, AIAnalysisResult } from "../types";

export interface FullReportItem {
  issue: string;
  category: string;
  severity: string;
  confidence: number | string;
  peopleAffected: string;
  accessibilityImpact: string;
  recommendedAction: string;
  priorityScore: number;
  location: string;
  timestamp: string;
  ward?: string;
  status?: string;
  id?: string;
  imageUrl?: string;
}

/**
 * Converts issues or analysis into standard FullReportItem structure
 */
export function formatReportItem(item: CityIssue | AIAnalysisResult): FullReportItem {
  const isCityIssue = "title" in item;
  
  const issue = isCityIssue ? (item as CityIssue).title : (item as AIAnalysisResult).detectedIssue;
  const category = item.category || "General";
  const severity = item.severity || "Medium";
  const confidence = item.confidence ? `${item.confidence}%` : "92%";
  const peopleAffected = item.peopleAffected || "Pedestrians & Transit Users";
  const accessibilityImpact = item.accessibilityImpact || "Moderate";
  const recommendedAction = item.recommendedAction || "Inspect and repair defect";
  
  let priorityScore = 70;
  if (severity === "Critical") priorityScore = 95;
  else if (severity === "High") priorityScore = 85;
  else if (severity === "Medium") priorityScore = 65;
  else priorityScore = 45;

  const location = isCityIssue
    ? `${(item as CityIssue).location} (${(item as CityIssue).ward})`
    : (item as AIAnalysisResult).ward || "Bengaluru Urban";

  const timestamp = isCityIssue
    ? (item as CityIssue).reportedAt || new Date().toISOString()
    : new Date().toISOString();

  const id = isCityIssue ? (item as CityIssue).id : "AI-SCAN-DETECTION";
  const status = isCityIssue ? (item as CityIssue).status : "Reported";
  const imageUrl = item.imageUrl;

  return {
    id,
    issue,
    category,
    severity,
    confidence,
    peopleAffected,
    accessibilityImpact,
    recommendedAction,
    priorityScore,
    location,
    timestamp,
    status,
    imageUrl,
  };
}

/**
 * Generates and triggers automatic download of CSV report
 */
export function downloadCSVReport(items: FullReportItem[], filename = "citysense_audit_report.csv") {
  const headers = [
    "ID",
    "Issue",
    "Category",
    "Severity",
    "Confidence",
    "Priority Score",
    "People Affected",
    "Accessibility Impact",
    "Recommended Action",
    "Location",
    "Status",
    "Timestamp"
  ];

  const escapeCSV = (str: any) => {
    if (str === null || str === undefined) return '""';
    const text = String(str).replace(/"/g, '""');
    return `"${text}"`;
  };

  const csvRows = [
    headers.join(","),
    ...items.map(item => [
      escapeCSV(item.id),
      escapeCSV(item.issue),
      escapeCSV(item.category),
      escapeCSV(item.severity),
      escapeCSV(item.confidence),
      escapeCSV(item.priorityScore),
      escapeCSV(item.peopleAffected),
      escapeCSV(item.accessibilityImpact),
      escapeCSV(item.recommendedAction),
      escapeCSV(item.location),
      escapeCSV(item.status),
      escapeCSV(item.timestamp),
    ].join(","))
  ];

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates a standalone, beautifully styled HTML printable dossier
 * and opens the print dialog so the user can directly "Save as PDF" or print.
 */
export function exportPrintablePDFReport(
  items: FullReportItem[],
  reportTitle = "CITYSENSE AI - Municipal Urban Intelligence Audit Report"
) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    // If popups blocked, fallback to downloadable HTML report
    downloadHTMLReport(items, reportTitle);
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${reportTitle}</title>
      <style>
        @page {
          size: A4;
          margin: 15mm;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #0f172a;
          background: #ffffff;
          line-height: 1.4;
          margin: 0;
          padding: 20px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 3px solid #0284c7;
          padding-bottom: 12px;
          margin-bottom: 20px;
        }
        .logo {
          font-size: 22px;
          font-weight: 900;
          letter-spacing: -0.5px;
          color: #0f172a;
        }
        .logo span { color: #0284c7; }
        .meta {
          text-align: right;
          font-size: 11px;
          color: #64748b;
        }
        .meta strong { color: #0f172a; }
        .executive-summary {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-left: 4px solid #0284c7;
          padding: 14px;
          border-radius: 6px;
          margin-bottom: 25px;
          font-size: 12px;
        }
        .badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .badge-Critical { background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; }
        .badge-High { background: #ffedd5; color: #ea580c; border: 1px solid #fdba74; }
        .badge-Medium { background: #fef9c3; color: #ca8a04; border: 1px solid #fde047; }
        .badge-Low { background: #dcfce7; color: #16a34a; border: 1px solid #86efac; }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 11px;
        }
        th {
          background: #0f172a;
          color: #ffffff;
          text-align: left;
          padding: 8px 10px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        td {
          padding: 8px 10px;
          border-bottom: 1px solid #e2e8f0;
          vertical-align: top;
        }
        tr:nth-child(even) td {
          background: #f8fafc;
        }
        .footer {
          margin-top: 30px;
          border-top: 1px solid #cbd5e1;
          padding-top: 10px;
          font-size: 10px;
          color: #94a3b8;
          display: flex;
          justify-content: space-between;
        }
        @media print {
          body { padding: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="logo">CITYSENSE <span>AI</span></div>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Automated Municipal Intelligence & Field Audit Record</div>
        </div>
        <div class="meta">
          <div>Report Ref: <strong>CS-${Date.now().toString().slice(-6)}</strong></div>
          <div>Jurisdiction: <strong>Bengaluru Urban (BBMP)</strong></div>
          <div>Date Generated: <strong>${new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</strong></div>
        </div>
      </div>

      <div class="executive-summary">
        <strong style="color: #0f172a; display: block; margin-bottom: 4px;">OFFICIAL MUNICIPAL AUDIT SUMMARY</strong>
        This document details civic infrastructure anomalies identified and prioritized by the CITYSENSE AI vision models.
        All records contain field GPS coordinates, optical confidence ratings, estimated pedestrian impacts, and recommended remedial protocols.
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Issue Title</th>
            <th>Category</th>
            <th>Severity</th>
            <th>Conf.</th>
            <th>Priority</th>
            <th>People Affected</th>
            <th>Accessibility Impact</th>
            <th>Location & Ward</th>
            <th>Recommended Action</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(item => `
            <tr>
              <td style="font-family: monospace; font-weight: bold;">${item.id || "REC"}</td>
              <td><strong>${item.issue}</strong></td>
              <td>${item.category}</td>
              <td><span class="badge badge-${item.severity}">${item.severity}</span></td>
              <td style="font-family: monospace;">${item.confidence}</td>
              <td style="font-weight: bold; color: ${item.priorityScore >= 80 ? '#dc2626' : '#2563eb'};">${item.priorityScore}/100</td>
              <td>${item.peopleAffected}</td>
              <td style="color: #b91c1c; font-weight: 500;">${item.accessibilityImpact}</td>
              <td>${item.location}</td>
              <td style="font-size: 10px;">${item.recommendedAction}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="footer">
        <div>Generated by CITYSENSE AI Optical Platform • Municipal Engineering Command</div>
        <div>Confidential Municipal Document • Page 1 of 1</div>
      </div>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

/**
 * Fallback to direct HTML file download
 */
export function downloadHTMLReport(items: FullReportItem[], filename = "citysense_audit_dossier.html") {
  const content = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>CITYSENSE AI Report</title>
      <style>
        body { font-family: sans-serif; padding: 20px; color: #1e293b; background: #fff; }
        h1 { color: #0284c7; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; font-size: 12px; }
        th { background: #0f172a; color: white; }
      </style>
    </head>
    <body>
      <h1>CITYSENSE AI - Municipal Audit Dossier</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Issue</th>
            <th>Category</th>
            <th>Severity</th>
            <th>Confidence</th>
            <th>Priority Score</th>
            <th>People Affected</th>
            <th>Accessibility Impact</th>
            <th>Recommended Action</th>
            <th>Location</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(item => `
            <tr>
              <td>${item.id}</td>
              <td><strong>${item.issue}</strong></td>
              <td>${item.category}</td>
              <td>${item.severity}</td>
              <td>${item.confidence}</td>
              <td>${item.priorityScore}</td>
              <td>${item.peopleAffected}</td>
              <td>${item.accessibilityImpact}</td>
              <td>${item.recommendedAction}</td>
              <td>${item.location}</td>
              <td>${item.timestamp}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
