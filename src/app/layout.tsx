import type { Metadata } from "next";
import { Google_Sans_Flex, JetBrains_Mono } from "next/font/google";
import NavOverlay from "@/components/navigation/navOverlay";
import { SectionProvider } from "@/components/navigation/pillConfig";
import { TrackedEnd } from "@/components/navigation/TrackedEnd";
import { THEME_INIT_SCRIPT } from "@/content/themes";
import "./globals.css";

// width, slant, grade and roundness drive the type animations. opsz is left out on
// purpose: it alone takes the latin file from ~290 KB to 1 MB
const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  axes: ["GRAD", "ROND", "slnt", "wdth"],
  variable: "--font-google-sans-flex",
  display: "swap",
  // next has no fallback metrics for this font yet and warns on every build
  adjustFontFallback: false,
});

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
      // the theme script below sets data-theme before react hydrates
      suppressHydrationWarning
      className={`${googleSansFlex.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <SectionProvider>
          <NavOverlay />
          {children}
          <TrackedEnd />
        </SectionProvider>
      </body>
    </html>
  );
}
