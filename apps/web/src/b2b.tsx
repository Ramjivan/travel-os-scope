import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import B2bApp from './B2bApp'
import './index.css'
import './workspace.css'
import './review.css'
createRoot(document.getElementById('root')!).render(<StrictMode><B2bApp /></StrictMode>)
