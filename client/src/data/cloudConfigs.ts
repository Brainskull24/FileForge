export const integrationServices = [
  {
    id: "gdrive",
    name: "Google Drive",
    logo: "🔵",
    connected: true,
    features: [
      "Direct file upload/download",
      "Folder synchronization",
      "Shared file processing",
      "Automatic organization",
    ],
    stats: { files: 1247, storage: "2.3 GB" },
  },
  {
    id: "dropbox",
    name: "Dropbox",
    logo: "🔷",
    connected: true,
    features: [
      "Team folder access",
      "File versioning",
      "Collaborative processing",
      "Webhook notifications",
    ],
    stats: { files: 892, storage: "1.8 GB" },
  },
  {
    id: "onedrive",
    name: "OneDrive",
    logo: "🔶",
    connected: false,
    features: [
      "SharePoint integration",
      "Office 365 compatibility",
      "Enterprise security",
      "Bulk operations",
    ],
    stats: { files: 0, storage: "0 GB" },
  },
];

export const workflows = [
  { name: "Auto-convert uploaded PDFs", active: true, triggers: 12 },
  { name: "Batch process images in folder", active: false, triggers: 0 },
  { name: "Encode sensitive documents", active: true, triggers: 8 },
];

export const services = [
  {
    id: "gdrive",
    name: "Google Drive",
    email: "user@company.com",
    connected: true,
    lastSync: "2 minutes ago",
  },
  {
    id: "dropbox",
    name: "Dropbox",
    email: "user@company.com",
    connected: true,
    lastSync: "1 hour ago",
  },
  {
    id: "onedrive",
    name: "OneDrive",
    email: "user@company.com",
    connected: false,
    lastSync: "Never",
  },
];
