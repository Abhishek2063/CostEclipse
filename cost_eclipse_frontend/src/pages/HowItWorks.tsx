import { FinalCTASection } from '@/components/layouts/public_layouts/FinalCTASection'
import { Footer } from '@/components/layouts/public_layouts/Footer'
import { Header } from '@/components/layouts/public_layouts/Header'
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