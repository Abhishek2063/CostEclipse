import { AdminControlsSection } from '@/components/pages/features/AdminControlsSection'
import { AnalyticsSection } from '@/components/pages/features/AnalyticsSection'
import { FeaturesPageHeader } from '@/components/pages/features/FeaturesPageHeader'
import { GroupExpenseSection } from '@/components/pages/features/GroupExpenseSection'
import { PersonalFinanceSection } from '@/components/pages/features/PersonalFinanceSection'
import { TechnicalFeaturesSection } from '@/components/pages/features/TechnicalFeaturesSection'
import { UserRolesSection } from '@/components/pages/features/UserRolesSection'
import { WhyChooseSection } from '@/components/pages/features/WhyChooseSection'
import { FinalCTASection } from '@/components/layouts/public_layouts/FinalCTASection'
import { Footer } from '@/components/layouts/public_layouts/Footer'
import { Header } from '@/components/layouts/public_layouts/Header'

const Feature = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <FeaturesPageHeader />
        <PersonalFinanceSection />
        <GroupExpenseSection />
        <AnalyticsSection />
        <TechnicalFeaturesSection />
        <UserRolesSection />
        <AdminControlsSection />
        <WhyChooseSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}

export default Feature