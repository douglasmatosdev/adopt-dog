import type { Metadata } from "next";
import { Barriecito } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const barriecitotSans = Barriecito({
  variable: "--font-barriecito-sans",
  subsets: ["latin"],
  weight: "400",
});


export const metadata: Metadata = {
  title: "Adote um Amiguinho",
  description: "Adote um amiguinho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${barriecitotSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
