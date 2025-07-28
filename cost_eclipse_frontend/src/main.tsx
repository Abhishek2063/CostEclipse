import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/globals.css"
import AllRoutes from './routes/AllRoutes.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AllRoutes />
  </StrictMode>,
)
