import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { getMeta } from "@/lib/controllers/meta";
import { GoogleAnalytics } from '@next/third-parties/google'

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
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const metaResult = await getMeta();

  const metaData = metaResult.status === 200 && metaResult.data ? metaResult.data : {};
  const siteTitle = metaData.site_name || "Paneer World";
  const siteDescription = metaData.description || "A Gaming website for people of all ages";

  metadata.title = siteTitle;
  metadata.description = siteDescription;
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4863652914816266" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4863652914816266"
        crossOrigin="anonymous"></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-0TVV790ZXC" />
    </html>
  );
}
