import React from 'react'
import { FinalCTASection } from '@/components/pages/home/FinalCTASection'
import { Footer } from '@/components/pages/home/Footer'
import { Header } from '@/components/pages/home/Header'
import { CookiesPolicySection } from '@/components/pages/cookies_policy/CookiesPolicySection'

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
    <Header />
    <main>
      <CookiesPolicySection />
      
      <FinalCTASection />
    </main>
    <Footer />
  </div>
  )
}

export default CookiesPolicy