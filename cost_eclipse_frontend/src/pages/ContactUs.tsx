import { ContactUsSection } from '@/components/pages/contact_us/ContactUsSection'
import { FinalCTASection } from '@/components/layouts/public_layouts/FinalCTASection'
import { Footer } from '@/components/layouts/public_layouts/Footer'
import { Header } from '@/components/layouts/public_layouts/Header'
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