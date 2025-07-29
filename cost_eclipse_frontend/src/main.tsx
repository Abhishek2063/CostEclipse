import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/css/globals.css"
import AllRoutes from './routes/AllRoutes.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AllRoutes />
  </StrictMode>,
)
