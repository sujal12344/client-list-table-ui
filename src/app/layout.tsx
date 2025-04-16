import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Client List Table",
  description: "Client management with sortable table",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} px-4 sm:px-6 md:px-8 max-h-screen w-screen`}
      >
        {children}
      </body>
    </html>
  );
}
