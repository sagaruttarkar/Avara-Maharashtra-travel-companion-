import type { Metadata } from "next";
import "./globals.css";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
const logoPath = `${basePath}/avara-logo.png`;

export const metadata: Metadata = {
  title: {
    default: "Avara | Maharashtra Travel Companion",
    template: "%s | Avara",
  },
  description: "Discover Maharashtra trips matched to your group, budget, time and travel mood.",
  applicationName: "Avara Maharashtra Travel Companion",
  icons: {
    icon: logoPath,
    shortcut: logoPath,
    apple: logoPath,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
