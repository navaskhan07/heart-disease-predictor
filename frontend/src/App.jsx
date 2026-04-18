import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import PredictPage from './pages/PredictPage'
import ResultPage from './pages/ResultPage'
import AboutPage from './pages/AboutPage'
import HistoryPage from './pages/HistoryPage'
import { useState } from 'react'

export default function App() {
  const [result, setResult] = useState(null)
  const [formData, setFormData] = useState(null)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/predict" element={
          <PredictPage setResult={setResult} setFormData={setFormData} />
        } />
        <Route path="/result" element={
          <ResultPage result={result} formData={formData} />
        } />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  )
}