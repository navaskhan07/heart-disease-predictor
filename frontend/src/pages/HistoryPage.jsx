import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './HistoryPage.css'

export default function HistoryPage() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('heartHistory') || '[]')
    setHistory(saved)
  }, [])

  const clearHistory = () => {
    localStorage.removeItem('heartHistory')
    setHistory([])
  }

  if (history.length === 0) {
    return (
      <div className="history-page">
        <div className="history-empty">
          <div className="empty-icon">📋</div>
          <h2>No predictions yet</h2>
          <p>Your prediction history will appear here after you make your first assessment.</p>
          <Link to="/predict" className="btn-primary">Make First Prediction</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="history-page">
      <div className="history-container">
        <div className="history-header">
          <div>
            <h1>Prediction History</h1>
            <p>{history.length} prediction{history.length !== 1 ? 's' : ''} recorded</p>
          </div>
          <button className="btn-clear" onClick={clearHistory}>Clear All</button>
        </div>

        <div className="history-list">
          {history.map((entry, i) => {
            const isHigh = entry.prediction === 'High Risk'
            const pct = (entry.probability * 100).toFixed(1)
            return (
              <div key={i} className={`history-card ${isHigh ? 'high' : 'low'}`}>
                <div className="history-left">
                  <span className="history-icon">{isHigh ? '⚠️' : '✅'}</span>
                  <div>
                    <div className="history-prediction">{entry.prediction}</div>
                    <div className="history-date">{entry.date}</div>
                  </div>
                </div>
                <div className="history-right">
                  <div className="history-prob">{pct}%</div>
                  <div className="history-prob-label">probability</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}