import { ComingSoon } from "../coming-soon/main";

export default function CloudStoragePage() {
  return (
    <ComingSoon
      title="Cloud Storage"
      subtitle="Seamless Integration"
      description="Direct integration with popular cloud storage providers. Convert files stored in Google Drive, Dropbox, OneDrive, and more without downloading them locally."
      expectedDate="Novemeber 2025"
      gradient="from-purple-600 to-pink-600"
      features={[
        "Google Drive integration",
        "Dropbox file conversion",
        "OneDrive support",
        "Amazon S3 connectivity",
        "Box.com integration",
        "Direct cloud-to-cloud conversion",
        "Automatic file organization",
        "Shared folder processing",
      ]}
    />
  );
}
