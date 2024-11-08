'use client'

import { useState, useEffect } from 'react'

import Hero from '@/components/sections/Hero'
import Team from '@/components/sections/Team'
import Features from '@/components/sections/Features'
import Solutions from '@/components/sections/Solutions'
import Testimonials from '@/components/sections/Testimonials'
import ProgressStepper from '@/components/sections/ProgressStepper'
import { Team_swiper } from '@/components/sections/Team_swiper'

export function LandingPageComponent() {
  return (
    <>
      <Hero />
      {/* <Solutions /> */}
      {/* <Features /> */}
      {/* <Team windowWidth={windowWidth} /> */}
      <Team_swiper />
      {/* <ProgressStepper />
      <Testimonials /> */}
    </>
  )
}