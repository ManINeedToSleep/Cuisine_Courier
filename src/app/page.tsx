// Landing page component
// Public route: "/"
// Features:
// - Hero section with animations
// - Call-to-action buttons
// - Feature highlights
// - Wood-textured UI elements

'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  const headerRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"
    })
    .from(contentRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.5")
  }, [])

  return (
    <main className="min-h-screen bg-[url('/textures/wood-bg.jpg')] bg-cover">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <header 
          ref={headerRef}
          className="pt-20 pb-12 text-center"
        >
          <h1 className="text-6xl font-bold text-amber-50 mb-4 font-serif">
            Cuisine Courier
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Discover recipes that bring the warmth of a cozy cabin to your kitchen
          </p>
        </header>

        {/* Main Content */}
        <div 
          ref={contentRef}
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 py-12"
        >
          {/* Left Side - CTA */}
          <div className="bg-[url('/textures/light-wood.jpg')] bg-cover rounded-lg p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="bg-black/30 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-amber-50 mb-4">
                Join Our Culinary Journey
              </h2>
              <p className="text-amber-100 mb-6">
                Explore hundreds of home-style recipes, from hearty soups to rustic desserts.
              </p>
              <div className="space-x-4">
                <Link 
                  href="/signup"
                  className="inline-block px-6 py-3 bg-amber-700 hover:bg-amber-800 text-amber-50 rounded-lg transition-colors duration-300 shadow-lg"
                >
                  Get Started
                </Link>
                <Link 
                  href="/login"
                  className="inline-block px-6 py-3 bg-amber-50/10 hover:bg-amber-50/20 text-amber-50 rounded-lg transition-colors duration-300 backdrop-blur-sm"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Features */}
          <div className="space-y-6">
            {['Discover', 'Create', 'Share'].map((feature, index) => (
              <div 
                key={feature}
                className="bg-[url('/textures/dark-wood.jpg')] bg-cover rounded-lg p-6 shadow-xl transform hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="bg-black/40 rounded-lg p-4 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-amber-50 mb-2">
                    {feature}
                  </h3>
                  <p className="text-amber-100">
                    {getFeatureDescription(feature)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

function getFeatureDescription(feature: string): string {
  switch (feature) {
    case 'Discover':
      return 'Find recipes that match your taste and kitchen inventory.'
    case 'Create':
      return 'Save and customize recipes to make them your own.'
    case 'Share':
      return 'Connect with other food enthusiasts and share your culinary creations.'
    default:
      return ''
  }
}
