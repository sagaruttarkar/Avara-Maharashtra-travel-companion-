import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maharashtra Travel Companion | Plan a better weekend",
  description: "Discover Maharashtra trips matched to your group, budget, time and travel mood.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
