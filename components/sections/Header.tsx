'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Sun, Moon, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"

const navLinks = ["Features", "Solution", "Team", "Progress", "Testimonials"]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()


  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const renderThemeToggle = () => {

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
    <>
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
    </>
  )
} 