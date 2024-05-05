import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProfaConnect",
  description:
    "Un outil unique pour gérer toutes tes activités d'enseignant et d'étudiant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="fr" suppressHydrationWarning>
        <head />
        <body className={GeistSans.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </>
  );
}
