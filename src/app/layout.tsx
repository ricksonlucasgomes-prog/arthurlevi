import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arthur Levi | Young Football Athlete",
  description: "Site profissional de Arthur Levi, jovem atacante em desenvolvimento com foco em carreira esportiva e oportunidades futuras.",
  keywords: ["Arthur Levi", "Arthur Levi futebol", "Arthur Levi atacante", "jovem atleta Arthur Levi"],
  openGraph: {
    title: "Arthur Levi | Young Football Athlete",
    description: "Site profissional de Arthur Levi, jovem atacante em desenvolvimento.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arthur Levi | Young Football Athlete",
    description: "Site profissional de Arthur Levi, jovem atacante em desenvolvimento.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
