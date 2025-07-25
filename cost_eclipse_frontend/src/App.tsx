import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Feature from './pages/Feature';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Feature />} />

    </Routes>
  </Router>
  )
}

export default App
