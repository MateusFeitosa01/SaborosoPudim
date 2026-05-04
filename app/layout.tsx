import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/components/contexts/cartContext";
import { TooltipProvider } from "@/components/ui/tooltip";

/* 🔥 FONTES PROFISSIONAIS */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saboroso Pudim",
  description: "Pudins gourmets deliciosos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <TooltipProvider>
          <CartProvider>{children}</CartProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
