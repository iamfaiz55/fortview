import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Crimson_Text } from "next/font/google";
import "./globals.css";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const headingSerif = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  display: "swap",
});

const bodySerif = Crimson_Text({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400","600","700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luxury Resort & Banquet Venues | Your Resort Name",
  description: "Discover our luxurious resort with exquisite banquet venues, adventure zones, and fine dining experiences. Perfect for weddings, family trips, and events.",
  keywords: ["resort", "banquet hall", "wedding venue", "family activities", "luxury rooms", "fine dining"],
  authors: [{ name: "Your Resort Name", url: "https://yourwebsite.com" }],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Luxury Resort & Banquet Venues | Your Resort Name",
    description: "Discover our luxurious resort with exquisite banquet venues, adventure zones, and fine dining experiences.",
    url: "https://fortviewresort.com",
    siteName: "Your Resort Name",
    images: [
      {
        url: "https://fortviewresort.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury Resort & Banquet Venues",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Resort & Banquet Venues | Your Resort Name",
    description: "Discover our luxurious resort with exquisite banquet venues, adventure zones, and fine dining experiences.",
    images: ["https://fortviewresort.com/og-image.jpg"],
    site: "@YourTwitterHandle",
    creator: "@YourTwitterHandle",
  },
  metadataBase: new URL("https://fortviewresort.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tagesschrift&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://fortviewresort.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${headingSerif.variable} ${bodySerif.variable} antialiased`}
      >
        <PerformanceMonitor />
        {children}
      </body>
    </html>
  );
}
