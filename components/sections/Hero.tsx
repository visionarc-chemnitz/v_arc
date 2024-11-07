'use client'

import RetroGrid from "@/components/ui/retro-grid"
import BlurIn from "@/components/ui/blur-in"

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[50vh] lg:min-h-[90vh] px-3 xs:px-4 py-8 xs:py-12 md:py-16 lg:py-24 bg-background flex items-center justify-center">
      <div className="absolute inset-0 bg-[rgb(0_163_255_/_27%)]" />
      <RetroGrid className="absolute inset-0 opacity-60 dark:opacity-100 transition-opacity duration-300" />
      <div className="container relative z-10 flex items-center justify-center">
        <div className="flex flex-col items-center text-center w-full lg:translate-y-[-25%]">
          <BlurIn
            word="Where Vision Meets Innovation"
            className="inline-block bg-clip-text text-transparent bg-[linear-gradient(180deg,#09abf8,#2c6488)] text-5xl sm:text-6xl lg:text-7xl font-bold"
          />
          
          <p className="mt-4 text-base xs:text-lg sm:text-xl max-w-[90%] xs:max-w-[85%] sm:max-w-2xl mx-auto text-muted-foreground">
            VisionArc combines cutting-edge AI technology with intuitive SaaS solutions to transform your data.
          </p>
        </div>
      </div>
    </section>
  )
} 