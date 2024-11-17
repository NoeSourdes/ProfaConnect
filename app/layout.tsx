import { TooltipProvider } from "@/src/components/plate-ui/tooltip";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import NextTopLoader from "nextjs-toploader";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import "./globals.css";
import { Providers } from "./providers";
import "./style/prosemirror.css";
import "katex/dist/katex.min.css";

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
        <Head>
          <script
            type="text/javascript"
            id="MathJax-script"
            async
            src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
          />
        </Head>
        <body className={GeistSans.className}>
          <NextTopLoader
            zIndex={1000000000000000}
            color="#2463EB"
            height={3}
            easing="ease"
            showSpinner={false}
            speed={200}
            shadow="0 0 10px #2463EB,0 0 5px #2463EB"
          />
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Providers>
            <TooltipProvider>
              <div vaul-drawer-wrapper="" className="bg-background">
                {children}
              </div>
            </TooltipProvider>
          </Providers>
        </body>
      </html>
    </>
  );
}
