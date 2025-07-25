import { FinalCTASection } from '@/components/pages/home/FinalCTASection'
import { Footer } from '@/components/pages/home/Footer'
import { Header } from '@/components/pages/home/Header'
import { HowItWorksSection } from '@/components/pages/how_it_works/HowItWorksSection'
import React from 'react'

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
         <Header />
         <main>
           <HowItWorksSection />
           
           <FinalCTASection />
         </main>
         <Footer />
       </div>
  )
}

export default HowItWorks