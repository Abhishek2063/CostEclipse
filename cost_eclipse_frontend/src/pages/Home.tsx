import { BenefitsSection } from '@/components/pages/home/BenefitsSection'
import { ExpenseManagementShowcase } from '@/components/pages/home/ExpenseManagementShowcase'
import { FeaturesSection } from '@/components/pages/home/FeaturesSection'
import { FinalCTASection } from '@/components/pages/home/FinalCTASection'
import { Footer } from '@/components/pages/home/Footer'
import { Header } from '@/components/pages/home/Header'
import { HeroSection } from '@/components/pages/home/HeroSection'
import { HowItWorksSection } from '@/components/pages/home/HowItWorksSection'
import { ProblemSection } from '@/components/pages/home/ProblemSection'
import { SocialProofSection } from '@/components/pages/home/SocialProofSection'

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <FeaturesSection />
        <ExpenseManagementShowcase />
        <HowItWorksSection />
        <SocialProofSection />
        <BenefitsSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}

export default Home