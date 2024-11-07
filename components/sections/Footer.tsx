'use client'

import Link from 'next/link'
import { RainbowButton } from '@/components/ui/rainbow-button'

const navLinks = ["Team"]

export default function Footer() {
  return (
    <footer className="w-full px-3 xs:px-4 py-6 xs:py-8 md:py-12 bg-gray-800 text-white">
      <div className="container">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About VisionArc</h3>
            <p className="text-sm text-gray-400">
              Revolutionizing businesses with AI-powered insights and SaaS solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((item) => (
                <Link 
                  key={item} 
                  className="text-sm text-gray-400 hover:text-white transition-colors" 
                  href={`#${item.toLowerCase()}`}
                >
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
                Disclaimer: This website is not associated with an actual company but is part of the &quot;Planspiel&quot; web engineering project at the TU Chemnitz.
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
  )
} 