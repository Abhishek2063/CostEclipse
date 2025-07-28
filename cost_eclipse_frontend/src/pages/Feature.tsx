import { AdminControlsSection } from '@/components/pages/features/AdminControlsSection'
import { AnalyticsSection } from '@/components/pages/features/AnalyticsSection'
import { FeaturesPageHeader } from '@/components/pages/features/FeaturesPageHeader'
import { GroupExpenseSection } from '@/components/pages/features/GroupExpenseSection'
import { PersonalFinanceSection } from '@/components/pages/features/PersonalFinanceSection'
import { TechnicalFeaturesSection } from '@/components/pages/features/TechnicalFeaturesSection'
import { UserRolesSection } from '@/components/pages/features/UserRolesSection'
import { WhyChooseSection } from '@/components/pages/features/WhyChooseSection'

const Feature = () => {
  return (
  <>
   <FeaturesPageHeader />
        <PersonalFinanceSection />
        <GroupExpenseSection />
        <AnalyticsSection />
        <TechnicalFeaturesSection />
        <UserRolesSection />
        <AdminControlsSection />
        <WhyChooseSection />
  </>
  )
}

export default Feature