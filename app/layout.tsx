import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AR Menu - Your Restaurant",
  description: "Interactive digital menu with AR viewing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

