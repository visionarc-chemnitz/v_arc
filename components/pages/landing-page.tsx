'use client'

import { useState, useEffect } from 'react'

import Hero from '../sections/Hero'
import Team from '../sections/Team'
import Features from '../sections/Features'
import Solutions from '../sections/Solutions'
import Testimonials from '../sections/Testimonials'
import ProgressStepper from '../sections/ProgressStepper'

export function LandingPageComponent() {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Hero />
      <Solutions />
      <Features />
      <Team windowWidth={windowWidth} />
      <ProgressStepper />
      <Testimonials />
    </>
  )
}