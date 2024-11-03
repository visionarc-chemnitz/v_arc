'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BrainCircuit, Zap, Target, Users, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Github, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { MagicCard } from "@/components/ui/magic-card"
import Marquee from "@/components/ui/marquee";
import { Sun, Moon } from "lucide-react"
import RetroGrid from "@/components/ui/retro-grid";
import BlurIn from "@/components/ui/blur-in";
import { RainbowButton } from '@/components/ui/rainbow-button'


export function LandingPageComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTeamMember, setCurrentTeamMember] = useState(0)
  const progressRef = useRef(null)
  const [visibleSteps, setVisibleSteps] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const teamMembers = [
    { name: "Eshwari Kangutkar", role: "Developer", image: "/assets/img/team/eshwari.png", github: "https://github.com/EshwariK", linkedin: "https://www.linkedin.com/in/eshwari-kangutkar" },
    { name: "Roshita Shakya", role: "Developer", image: "/assets/img/team/roshita.jpg", github: "https://github.com/roshita02", linkedin: "https://www.linkedin.com/in/roshitashk/" },
    { name: "Omkar Mirgal", role: "Developer", image: "/assets/img/team/omkar.jpeg", github: "https://github.com/OmkarMirgal", linkedin: "https://www.linkedin.com/in/omkar-mirgal-19a959227/" },
    { name: "Toushika Islam", role: "Developer", image: "/assets/img/team/toushika.jpeg", github: "https://github.com/Toushika", linkedin: "https://www.linkedin.com/in/toushika-islam-38a7323b/" },
    { name: "Shrushti Sakala", role: "Developer", image: "/assets/img/team/shrushti.jpeg", github: "https://github.com/ShrushtiSakala/", linkedin: "https://www.linkedin.com/in/shrushtisakala" },
  ]

  // const navLinks = ["Features", "Solution", "Team", "Progress", "Testimonials"]
  const navLinks = ["Team"];

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTeamMember((prev) => (prev + 1) % teamMembers.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => Math.min(prev + 1, 4))
          }
        })
      },
      { threshold: 0.5 }
    )

    if (progressRef.current) {
      observer.observe(progressRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const renderThemeToggle = () => {
    if (!mounted) return null

    return (
      <Button
        variant="ghost"
        size="icon"
        className="ml-4"
        onClick={toggleTheme}
      >
        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    )
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <header className="fixed top-0 w-full px-3 xs:px-4 lg:px-6 h-14 xs:h-16 flex items-center bg-white dark:bg-background/30 backdrop-blur-2xl z-50 border-b border-gray-200 dark:border-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)] supports-[backdrop-filter]:dark:bg-background/20">
        <Link className="flex items-center" href="">
          <Image
            src={theme === 'dark' ? '/assets/img/vision_arc_logo_transparent.png' : '/assets/img/vision_arc_logo_transparent.png'}
            alt="VisionArc Logo"
            width={100}
            height={80} 
            className="h-auto w-auto"
            priority
          />
        </Link>
        
        <nav className="ml-auto hidden md:flex items-center justify-end gap-8">
          {navLinks.map((item) => (
            <Link 
              key={item} 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 relative group"
              href={`#${item.toLowerCase()}`}
            >
              <span className="relative z-10">{item}</span>
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right group-hover:origin-left duration-300"></span>
              <span className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4 ml-auto md:ml-0">
          {renderThemeToggle()}
          <Button
            variant="ghost" 
            size="icon"
            className="md:hidden hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed top-14 xs:top-16 left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg z-40 md:hidden">
          <nav className="flex flex-col p-4">
            {navLinks.map((item) => (
              <Link 
                key={item} 
                className="text-sm font-medium py-3 px-4 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-300 transform hover:translate-x-2" 
                href={`#${item.toLowerCase()}`} 
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <main className="flex-1 pt-14 xs:pt-16">
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

        {/* <section id="features" className="px-3 xs:px-4 py-8 xs:py-12 md:py-16 lg:py-24 bg-white dark:bg-gray-900">
          <div className="container">
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-center mb-8 xs:mb-12 text-gray-900 dark:text-white">
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6">
              {[
                { icon: Zap, title: "Real-time Analytics", description: "Get instant insights from your data with our advanced AI algorithms." },
                { icon: Target, title: "Predictive Modeling", description: "Forecast trends and make data-driven decisions with our predictive AI models." },
                { icon: Users, title: "Collaborative Platform", description: "Seamlessly collaborate with your team on AI-powered projects and insights." },
              ].map((feature, index) => (
                <MagicCard key={index} className="relative overflow-hidden group bg-white dark:bg-gray-800">
                  <div className="p-6">
                    <feature.icon className="h-8 w-8 mb-2 text-[#00A3FF] dark:text-[#00A3FF]" />
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-muted-foreground dark:text-gray-400">{feature.description}</p>
                  </div>
                </MagicCard>
              ))}
            </div>
          </div>
        </section>

        <section id="solution" className="py-8 xs:py-12 md:py-16 lg:py-24 bg-gray-50">
          <div className="container">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00A3FF] to-[#0047FF] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <Image
                  alt="AI Solution Visualization"
                  className="relative rounded-lg shadow-2xl"
                  height="310"
                  src="/placeholder.svg"
                  width="550"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How We Solve Your Problems</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  VisionArc's AI-powered platform tackles complex business challenges through:
                </p>
                <div className="grid gap-6">
                  {[
                    { title: "Data Analysis Automation", description: "Save time and reduce errors with our AI-driven data processing." },
                    { title: "Strategic Insights", description: "Gain actionable insights for informed decision-making." },
                    { title: "Scalable Solutions", description: "Our platform grows and adapts with your business needs." },
                  ].map((item, index) => (
                    <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-primary mr-2" />
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section id="team" className="py-8 xs:py-12 md:py-16 lg:py-24 bg-background">
          <div className="container">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 xs:mb-8 md:mb-12 text-foreground">
              Meet Our Team
            </h2>
            <div className="relative px-6 sm:px-12">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTeamMember * (window.innerWidth >= 768 ? 50 : 100)}%)` }}>
                  {teamMembers.map((member, index) => (
                    <div key={index} className="w-full md:w-1/2 flex-shrink-0 px-4">
                      <Card className="max-w-sm mx-auto overflow-hidden h-full bg-card hover:shadow-xl transition-all duration-300">
                        <div className="relative h-64">
                          <Image
                            alt={member.name}
                            src={member.image}
                            layout="fill"
                            className="object-cover"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-foreground">{member.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{member.role}</p>
                          <div className="mt-4 flex justify-start space-x-4">
                            <Link 
                              href={member.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:scale-110 transition-transform duration-200"
                            >
                              <Github className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
                            </Link>
                            <Link 
                              href={member.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:scale-110 transition-transform duration-200"
                            >
                              <Linkedin className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-card hover:scale-110 transition-all duration-200"
                onClick={() => setCurrentTeamMember((prev) => (prev - 1 + Math.ceil(teamMembers.length / (window.innerWidth >= 768 ? 2 : 1))) % Math.ceil(teamMembers.length / (window.innerWidth >= 768 ? 2 : 1)))}
                aria-label="Previous team member"
              >
                <ChevronLeft className="h-6 w-6 text-foreground" />
              </button>
              <button
                className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-card hover:scale-110 transition-all duration-200"
                onClick={() => setCurrentTeamMember((prev) => (prev + 1) % Math.ceil(teamMembers.length / (window.innerWidth >= 768 ? 2 : 1)))}
                aria-label="Next team member"
              >
                <ChevronRight className="h-6 w-6 text-foreground" />
              </button>
            </div>
          </div>
        </section>

        {/* <section id="progress" className="w-full py-12 md:py-24 lg:py-32" ref={progressRef}>
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Journey</h2>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-8 md:left-1/2 top-0 h-full w-0.5 bg-[#00A3FF] dark:bg-[#00A3FF]"></div>
              {[
                { title: "Inception", description: "VisionArc was founded with a mission to revolutionize AI-powered business solutions." },
                { title: "First Product Launch", description: "We released our flagship AI analytics platform, transforming data processing for businesses." },
                { title: "Global Expansion", description: "VisionArc expanded operations to serve clients across multiple continents." },
                { title: "AI Breakthrough", description: "Our team achieved a significant breakthrough in predictive modeling accuracy." },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`relative z-10 mb-12 ${
                    index < visibleSteps ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-500`}
                >
                  <div className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="absolute left-8 md:left-1/2 w-8 h-8 transform -translate-x-4 md:-translate-x-4 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-[#00A3FF] dark:bg-[#00A3FF] border-4 border-background"></div>
                      <div className="absolute w-8 h-0.5 bg-[#00A3FF] dark:bg-[#00A3FF] transform -translate-y-1/2 top-1/2"
                           style={{ left: index % 2 === 0 ? '100%' : 'auto', right: index % 2 === 0 ? 'auto' : '100%' }}></div>
                    </div>
                    <MagicCard className={`w-full md:w-[calc(50%-2rem)] ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </MagicCard>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* <section id="testimonials" className="w-full py-8 md:py-12 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8 sm:mb-12">
              What Our Clients Say
            </h2>
            <Marquee className="py-4 sm:py-8" pauseOnHover>
              {[
                {
                  quote: "VisionArc has transformed the way we analyze market trends. Their AI solutions are unparalleled.",
                  author: "Alex Thompson",
                  role: "CEO of MarketPro",
                },
                {
                  quote: "The insights we've gained through VisionArc have been instrumental in our company's growth strategy.", 
                  author: "Samantha Lee",
                  role: "Director of Operations at TechGrowth",
                },
                {
                  quote: "Working with VisionArc has given us a competitive edge in the market.",
                  author: "Michael Chen",
                  role: "CTO of InnovateTech",
                },
                {
                  quote: "The AI-powered analytics have exceeded our expectations.",
                  author: "Sarah Williams",
                  role: "Head of Data Science at FutureScale",
                }
              ].map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-[280px] sm:w-[400px] mx-2 sm:mx-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 h-full transform transition-transform hover:scale-105">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="rounded-full bg-gradient-to-r from-[#00A3FF] to-[#0047FF] h-12 w-12 flex items-center justify-center text-white font-bold text-xl shadow-md">
                        {testimonial.author[0]}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <blockquote className="text-lg italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </section> */}
      </main>

      <footer className="w-full px-3 xs:px-4 py-6 xs:py-8 md:py-12 bg-gray-800 text-white">
        <div className="container">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About VisionArc</h3>
              <p className="text-sm text-gray-400">Revolutionizing businesses with AI-powered insights and SaaS solutions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                {navLinks.map((item) => (
                  <Link key={item} className="text-sm text-gray-400 hover:text-white transition-colors" href={`#${item.toLowerCase()}`}>
                    {item}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Send us a message</h3>
              <form 
                action="https://api.web3forms.com/submit"
                method="POST"
                className="flex flex-col space-y-2"
              >
                <input 
                  type="hidden" 
                  name="access_key" 
                  value="f2854aa1-bf75-4ef7-8a7a-46922de4ab03"
                />
                <input
                  type="email"
                  name="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required
                  placeholder="Enter your email"
                  className="bg-gray-700 text-white border-gray-600 rounded-md p-2 w-full"
                />
                <textarea
                  name="message"
                  required
                  placeholder="Enter your message"
                  rows={3}
                  className="bg-gray-700 text-white border-gray-600 rounded-md p-2 w-full resize-none"
                />
                <RainbowButton type="submit">
                  Send
                </RainbowButton>
              </form>
            </div>
          </div>
          <div className="mt-6 xs:mt-8 pt-6 xs:pt-8 border-t border-gray-700">
            <div className="flex flex-col xs:flex-row justify-between items-center gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-xs xs:text-sm text-gray-400 text-center xs:text-left">
                  © 2024 VisionArc. All rights reserved.
                </p>
                <p className="text-xs xs:text-sm text-gray-400 text-center xs:text-left">
                  Disclaimer: This website is not associated with an actual company but is part of the "Planspiel" web engineering project at the TU Chemnitz.
                </p>
              </div>
              {/* <div className="flex gap-4">
                <Link className="text-xs xs:text-sm text-gray-400 hover:text-white" href="#">
                  Terms
                </Link>
                <Link className="text-xs xs:text-sm text-gray-400 hover:text-white" href="#">
                  Privacy
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}