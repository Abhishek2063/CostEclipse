import { ContactUsSection } from '@/components/pages/contact_us/ContactUsSection'
import { FinalCTASection } from '@/components/pages/home/FinalCTASection'
import { Footer } from '@/components/pages/home/Footer'
import { Header } from '@/components/pages/home/Header'
import React from 'react'

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-background">
    <Header />
    <main>
      <ContactUsSection />
      
      <FinalCTASection />
    </main>
    <Footer />
  </div>
  )
}

export default ContactUs