import localFont from "next/font/local";
import "./globals.css";

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

export const metadata = {
  title: "可視化できーる",
  description: "システムを可視化するアプリケーション",
  robots: "noindex,nofollow", 
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <meta name="robots" content="noindex,nofollow" /> 
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}