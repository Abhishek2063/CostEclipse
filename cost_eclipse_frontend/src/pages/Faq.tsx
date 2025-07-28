import React from 'react'
import { FinalCTASection } from '@/components/layouts/public_layouts/FinalCTASection'
import { Footer } from '@/components/layouts/public_layouts/Footer'
import { Header } from '@/components/layouts/public_layouts/Header'
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