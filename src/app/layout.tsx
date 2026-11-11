import type { Metadata } from "next";
import { Google_Sans_Flex, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import NavOverlay from "@/components/navigation/navOverlay";
import { SectionProvider } from "@/components/navigation/pillConfig";
import { TrackedEnd } from "@/components/navigation/TrackedEnd";
import "./globals.css";

// Every axis, not just weight: width, slant, grade and roundness drive the
// type animation in the pill and the hover states across the site.
const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  axes: ["GRAD", "ROND", "opsz", "slnt", "wdth"],
  variable: "--font-google-sans-flex",
  display: "swap",
  // Next has no fallback metrics for this family yet, and warns on every build.
  adjustFontFallback: false,
});

// Display serif for headings: the classy half of the pairing.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

// Small labels, indices and code.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
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
      className={`${googleSansFlex.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
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
