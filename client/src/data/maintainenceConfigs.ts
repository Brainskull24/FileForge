export interface StatusUpdate {
  id: string;
  time: string;
  message: string;
  type: "info" | "success" | "warning";
}

export interface MaintenancePhase {
  id: number;
  name: string;
  status: "complete" | "in-progress" | "pending";
  progress?: number;
}

export const statusUpdate: StatusUpdate[] = [
  {
    id: "1",
    time: "14:32",
    message: "Database backup completed successfully",
    type: "success",
  },
  {
    id: "2",
    time: "14:45",
    message: "Beginning system updates...",
    type: "info",
  },
  {
    id: "3",
    time: "15:12",
    message: "API services temporarily offline",
    type: "warning",
  },
  {
    id: "4",
    time: "15:28",
    message: "Installing security patches...",
    type: "info",
  },
  {
    id: "5",
    time: "15:45",
    message: "Running system diagnostics...",
    type: "info",
  },
];

export const maintenancePhases: MaintenancePhase[] = [
  { id: 1, name: "Database Backup", status: "complete" },
  { id: 2, name: "Service Shutdown", status: "complete" },
  { id: 3, name: "System Updates", status: "in-progress", progress: 67 },
  { id: 4, name: "Testing & Validation", status: "pending" },
  { id: 5, name: "Service Restoration", status: "pending" },
];

export const codeSnippets: string[] = [
  "const maintenance = true;",
  "UPDATE systems SET status = 'upgrading';",
  "Base64.encode('MAINTENANCE')",
  "await database.backup();",
  "npm install --production",
  "docker build -t app:latest .",
  "kubectl apply -f deployment.yaml",
  "SELECT * FROM improvements;",
  "git push origin production",
  "systemctl restart services",
];

export const encodingFacts: string[] = [
  "The term 'bug' in programming dates back to 1947",
  "Base64 encoding was first described in RFC 1421",
  "UTF-8 can encode over 1 million characters",
  "The first computer weighed 30 tons",
  "ASCII stands for American Standard Code for Information Interchange",
  "Binary code uses only 0s and 1s to represent data",
];
