import { ThemeProvider } from "@/components/theme-provider";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

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
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </SessionProvider>
        </body>
      </html>
    </>
  );
}
