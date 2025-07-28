import { BenefitsSection } from '@/components/pages/home/BenefitsSection'
import { ExpenseManagementShowcase } from '@/components/pages/home/ExpenseManagementShowcase'
import { FeaturesSection } from '@/components/pages/home/FeaturesSection'
import { HeroSection } from '@/components/pages/home/HeroSection'
import { HowItWorksSection } from '@/components/pages/home/HowItWorksSection'
import { ProblemSection } from '@/components/pages/home/ProblemSection'
import { SocialProofSection } from '@/components/pages/home/SocialProofSection'

const Home = () => {
  return (
   <>
    <HeroSection />
        <ProblemSection />
        <FeaturesSection />
        <ExpenseManagementShowcase />
        <HowItWorksSection />
        <SocialProofSection />
        <BenefitsSection />
   </>
  )
}

export default Home