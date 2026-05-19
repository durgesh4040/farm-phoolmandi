import "./globals.css"

import { Geist_Mono, Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import AnnouncementBar from "@/components/layout/announcement-bar";
import Navbar from "@/components/layout/nav-bar";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})
export const metadata: Metadata = {
  title: "PhoolMandi — Fresh Flowers From Our Farm",
  description:
    "Farm-fresh flowers delivered with love. Bulk wedding orders, event flowers, daily shop supply. 100% natural, chemical-free blooms.",
  keywords: "flower farm, fresh flowers, bulk flowers, wedding flowers, marigold, rose, lily, gerbera",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <AnnouncementBar />
        <Navbar />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
