import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

// Switzer isn't on Google Fonts — loaded via Fontshare <link> below and
// referenced as the literal family name "Switzer" in tailwind.config.ts.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["500"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "SwapStop — Sell locally. Without the meetup.",
  description:
    "SwapStop holds the payment and moves the item through a locker, so sellers can sell locally without meeting the buyer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable} ${instrumentSans.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap"
        />
      </head>
      <body className="font-display bg-black antialiased">{children}</body>
    </html>
  );
}
