//Icns
import 'bootstrap-icons/font/bootstrap-icons.css';

import 'bootstrap/dist/css/bootstrap.css';

import 'aos/dist/aos.css';


import type { Metadata } from "next";
import localFont from "next/font/local";
import "./variables.css";
import "./globals.css";
import Header from './components/Header';
import Footer from './components/Footer';

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
  title: "Outapi Tradingcc",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
