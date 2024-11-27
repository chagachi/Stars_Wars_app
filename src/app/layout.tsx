import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FavWrapper } from '@/context/index'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Star Wars App",
  description: "Find yours favorites characters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className='stars'></div>
        <FavWrapper>
          {children}
        </FavWrapper>
      </body>
    </html>
  );
}
