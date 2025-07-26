import React from 'react'
import { FinalCTASection } from '@/components/pages/home/FinalCTASection'
import { Footer } from '@/components/pages/home/Footer'
import { Header } from '@/components/pages/home/Header'
import { FAQSection } from '@/components/pages/faq/FAQSection'
const Faq = () => {
  return (
    <div className="min-h-screen bg-background">
    <Header />
    <main>
      <FAQSection />
      
      <FinalCTASection />
    </main>
    <Footer />
  </div>
  )
}

export default Faq