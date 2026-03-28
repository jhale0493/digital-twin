import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joseph Hale – Digital Twin",
  description:
    "Chat with Joseph Hale's AI-powered digital twin. Learn about his career, skills, and experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
