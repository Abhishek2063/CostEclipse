import { Header } from './Header';
import { FeaturesPageHeader } from './FeaturesPageHeader';
import { PersonalFinanceSection } from './PersonalFinanceSection';
import { GroupExpenseSection } from './GroupExpenseSection';
import { AnalyticsSection } from './AnalyticsSection';
import { TechnicalFeaturesSection } from './TechnicalFeaturesSection';
import { FinalCTASection } from './FinalCTASection';
import { Footer } from './Footer';

export function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <FeaturesPageHeader />
        <PersonalFinanceSection />
        <GroupExpenseSection />
        <AnalyticsSection />
        <TechnicalFeaturesSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}