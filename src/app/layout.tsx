import type { Metadata } from "next";
import React from "react";
import localFont from "next/font/local";
import "./globals.css";
import { getMeta } from "@/lib/controllers/meta";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getAllHeadScripts, getAllScripts } from "@/lib/controllers/ads";
import DynamicScripts from "@/components/adSense/DynamicScripts";

const geistSans = localFont({
  src: "fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch metadata and ad scripts
  const metaResult = await getMeta();
  const adResponse = await getAllScripts();
  const headResponse = await getAllHeadScripts();

  const metaData = metaResult.status === 200 && metaResult.data ? metaResult.data : {};
  const siteTitle = metaData.site_name || "Paneer World";
  const siteDescription = metaData.description || "A Gaming website for people of all ages";

  metadata.title = siteTitle;
  metadata.description = siteDescription;

  const adsData = adResponse.status === 200 && adResponse.data ? adResponse.data : [];
  const headData = ((headResponse.error === null) && headResponse.data !== null)? headResponse.data : [];

  return (
    <html lang="en">
      <head>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Inject Ads dynamically */}
        <DynamicScripts headScripts={headData} adsData={adsData} />

        {/* Main Application Content */}
        {children}

        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-0TVV790ZXC" />
      </body>
    </html>
  );
}