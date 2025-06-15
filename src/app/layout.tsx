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
  title: "Marcar",
  description: "Test task on middle frontend position",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className='font-[family-name:var(--font-geist-sans)] w-full mx-auto flex flex-col px-5 sm:px-7 md:px-[60px] items-center'>
          <div className='w-full flex flex-col max-w-[1440px]'>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
