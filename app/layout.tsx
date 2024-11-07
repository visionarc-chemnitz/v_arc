import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VisionArc - Where Vision Meets Innovation",
  description: "VisionArc combines cutting-edge AI technology with intuitive SaaS solutions to transform your data.",
  keywords: ["AI", "SaaS", "Data Analytics", "Business Intelligence", "Machine Learning"],
  authors: [{ name: "VisionArc Team" }],
  openGraph: {
    title: "VisionArc - Where Vision Meets Innovation",
    description: "VisionArc combines cutting-edge AI technology with intuitive SaaS solutions to transform your data.",
    url: "https://vision-arc.com",
    siteName: "VisionArc",
    images: [
      {
        url: "/assets/img/vision_arc_logo_transparent.png",
        width: 1200,
        height: 630,
        alt: "VisionArc Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VisionArc - Where Vision Meets Innovation",
    description: "VisionArc combines cutting-edge AI technology with intuitive SaaS solutions to transform your data.",
    images: ["/assets/img/vision_arc_logo_transparent.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-14 xs:pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
