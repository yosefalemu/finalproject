import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "../lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={inter.className}>
        <div>
          <EdgeStoreProvider basePath="http://localhost:3000/edgestore">
            <Providers>
              <main className="bg-white min-h-screen h-full">{children}</main>
            </Providers>
          </EdgeStoreProvider>
        </div>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}