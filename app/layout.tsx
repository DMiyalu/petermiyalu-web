import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peter Miyalu — Artiste visuel & Cinéaste",
  description:
    "Peter Miyalu, artiste visuel et cinéaste congolais. Films, installations, performances, photographies et images en mouvement.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
