import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Feature from './pages/Feature';
import HowItWorks from './pages/HowItWorks';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import CookiesPolicy from './pages/CookiesPolicy';
import Faq from './pages/Faq';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import DashboardUser from './pages/DashboardUser';
import DashboardSuperAdmin from './pages/DashboardSuperAdmin';
import UserManagment from './pages/UserManagment';
import ExpenseManagment from './pages/ExpenseManagment';
import IncomeManagment from './pages/IncomeManagment';
import SavingManagementMain from './pages/SavingManagement';
import BudgetManagment from './pages/BudgetManagment';
import FeedbackManagment from './pages/FeedbackManagment';
import QueryManagementMain from './pages/QueryManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Feature />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/cookies-policy" element={<CookiesPolicy />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/user-dashboard" element={<DashboardUser />} />
        <Route path="/superadmin-dashboard" element={<DashboardSuperAdmin />} />
        <Route path="/user-managment" element={<UserManagment />} />
        <Route path="/expanse-management" element={<ExpenseManagment />} />
        <Route path="/income-managment" element={<IncomeManagment />} />
        <Route path="/saving-managment" element={<SavingManagementMain />} />
        <Route path="/budget-managment" element={<BudgetManagment />} />
        <Route path="/feedback-managment" element={<FeedbackManagment />} />
        <Route path="/query-management" element={<QueryManagementMain />} />




      </Routes>
    </Router>
  );
}

export default App;
