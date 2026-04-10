import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hello World — Nucleo IA SOITIC",
  description: "Integration test: Next.js + Supabase + Vercel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
