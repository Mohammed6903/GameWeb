// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "../globals.css";
// import Script from "next/script";
// import siteConfig from "@/lib/config/siteConfig";

// const geistSans = localFont({
//   src: "../fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "../fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: siteConfig.general.siteName,
//   description: siteConfig.seo.description,
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <head>
//         <Script async src="https://www.googletagmanager.com/gtag/js?id=G-SJGKC6KJHJ"></Script>
//         {/* <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1651955846469249"
//         crossOrigin="anonymous"></Script> */}
//         <Script id="google-analytics">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());

//             gtag('config', 'G-SJGKC6KJHJ');
//           `}
//         </Script>
//       </head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex flex-col gap-12 items-start">{children}</div>
  );
}
