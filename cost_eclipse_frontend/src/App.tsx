import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Feature from './pages/Feature';
import HowItWorks from './pages/HowItWorks';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Feature />} />
<Route path="/how-it-works" element={<HowItWorks />} />
    </Routes>
  </Router>
  )
}

export default App
