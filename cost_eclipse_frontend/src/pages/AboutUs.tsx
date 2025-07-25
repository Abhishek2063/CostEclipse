import { AboutUsSection } from '@/components/pages/about_us/AboutUsSection'
import { FinalCTASection } from '@/components/pages/home/FinalCTASection'
import { Footer } from '@/components/pages/home/Footer'
import { Header } from '@/components/pages/home/Header'
import React from 'react'

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
             <Header />
             <main>
               <AboutUsSection />
               
               <FinalCTASection />
             </main>
             <Footer />
           </div>
  )
}

export default AboutUs