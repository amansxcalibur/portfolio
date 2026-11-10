import type { Metadata } from "next";
import localFont from "next/font/local";
import NavOverlay from "@/components/navigation/navOverlay";
import { SectionProvider } from "@/components/navigation/pillConfig";
import { TrackedEnd } from "@/components/navigation/TrackedEnd";
import "./globals.css";

const googleSansFlex = localFont({
  src: "./fonts/google-sans-flex.woff2",
  variable: "--font-google-sans-flex",
  // Declares the variable range; without it every weight is synthesized from 400.
  weight: "1 1000",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aman Valiyakath",
    template: "%s · Aman Valiyakath",
  },
  description:
    "Aman Valiyakath explores the intersection of art and programming: desktop environments and UI tooling for Linux, visual art and animation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${googleSansFlex.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SectionProvider>
          <NavOverlay />
          {children}
          <TrackedEnd />
        </SectionProvider>
      </body>
    </html>
  );
}
