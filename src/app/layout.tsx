import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/context/SessionContext";

export const metadata: Metadata = {
  title: "AI with Agency & Urgency | FINN",
  description: "A memo for all FINN employees — January 2026. Learn how to leverage AI tools effectively.",
  openGraph: {
    title: "AI with Agency & Urgency | FINN",
    description: "A memo for all FINN employees — January 2026",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
