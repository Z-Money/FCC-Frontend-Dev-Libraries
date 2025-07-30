import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  BrowserRouter, Routes, Route } from 'react-router'

import IndexPage from './pages/IndexPage'
import QuotePage from './pages/RandomQuoteMachinePage'
import MarkdownPage from './pages/MarkdownPreviewerPage'
import DrumMachinePage from './pages/DrumMachinePage'
import ClockPage from './pages/ClockPage'
import JavascriptCalculatorPage from './pages/JavascriptCalculatorPage'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} errorElement={<IndexPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/markdown" element={<MarkdownPage />} />
        <Route path="/drum-machine" element={<DrumMachinePage />} />
        <Route path="/clock" element={<ClockPage />} />
        <Route path="/calculator" element={<JavascriptCalculatorPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

