import { Link, useNavigate } from 'react-router-dom'
import { RadialBarChart, RadialBar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import './ResultPage.css'

export default function ResultPage({ result, formData }) {
  const navigate = useNavigate()

  if (!result) {
    return (
      <div className="result-empty">
        <p>No prediction found.</p>
        <Link to="/predict" className="btn-primary">Make a Prediction</Link>
      </div>
    )
  }

  if (result.error) {
    return (
      <div className="result-empty">
        <p>Error: {result.error}</p>
        <Link to="/predict" className="btn-primary">Try Again</Link>
      </div>
    )
  }

  const isHigh = result.prediction === 'High Risk'
  const pct = (result.probability * 100).toFixed(1)

  const pieData = [
    { name: 'Risk', value: result.probability * 100 },
    { name: 'Safe', value: 100 - result.probability * 100 },
  ]

  const riskColor = isHigh ? '#e53e3e' : '#38a169'

  const getRiskLevel = (prob) => {
    if (prob >= 0.7) return { label: 'High Risk', color: '#e53e3e', bg: '#fff5f5', border: '#fc8181' }
    if (prob >= 0.4) return { label: 'Medium Risk', color: '#d69e2e', bg: '#fffff0', border: '#f6e05e' }
    return { label: 'Low Risk', color: '#38a169', bg: '#f0fff4', border: '#68d391' }
  }

  const risk = getRiskLevel(result.probability)

  return (
    <div className="result-page">
      <div className="result-container">

        <div className="result-hero" style={{ background: risk.bg, border: `2px solid ${risk.border}` }}>
          <div className="result-icon-big">{isHigh ? '⚠️' : '✅'}</div>
          <h1 style={{ color: risk.color }}>{risk.label}</h1>
          <p className="result-subtitle">Based on the provided clinical parameters</p>
        </div>

        <div className="result-grid">
          <div className="result-card chart-card">
            <h3>Risk Probability</h3>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    <Cell fill={riskColor} />
                    <Cell fill="#edf2f7" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="chart-center">
                <span className="pct-value" style={{ color: riskColor }}>{pct}%</span>
                <span className="pct-label">probability</span>
              </div>
            </div>
          </div>

          <div className="result-card metrics-card">
            <h3>Assessment Summary</h3>
            <div className="metric-list">
              <div className="metric-item">
                <span className="metric-label">Risk Level</span>
                <span className="metric-value badge" style={{ background: risk.bg, color: risk.color, border: `1px solid ${risk.border}` }}>
                  {risk.label}
                </span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Probability</span>
                <span className="metric-value">{pct}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Model</span>
                <span className="metric-value">Random Forest</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Accuracy</span>
                <span className="metric-value">85.7%</span>
              </div>
            </div>

            <div className="prob-bar-section">
              <div className="prob-bar-labels">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
              <div className="prob-bar-track">
                <div className="prob-bar-zone low" />
                <div className="prob-bar-zone mid" />
                <div className="prob-bar-zone high" />
                <div
                  className="prob-bar-marker"
                  style={{ left: `${result.probability * 100}%` }}
                />
              </div>
              <div className="prob-bar-legend">
                <span style={{ color: '#38a169' }}>Low</span>
                <span style={{ color: '#d69e2e' }}>Medium</span>
                <span style={{ color: '#e53e3e' }}>High</span>
              </div>
            </div>
          </div>
        </div>

        {formData && (
          <div className="result-card inputs-card">
            <h3>Input Summary</h3>
            <div className="inputs-grid">
              {Object.entries(formData).map(([k, v]) => (
                <div key={k} className="input-item">
                  <span className="input-key">{k}</span>
                  <span className="input-val">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="result-card disclaimer-card">
          <p>⚕️ <strong>Medical Disclaimer:</strong> This tool is for educational purposes only. The prediction is based on a machine learning model trained on a limited dataset. It is not a clinical diagnosis. Always consult a qualified healthcare professional for medical advice.</p>
        </div>

        <div className="result-actions">
          <button onClick={() => navigate('/predict')} className="btn-primary">New Prediction</button>
          <Link to="/history" className="btn-secondary">View History</Link>
        </div>
      </div>
    </div>
  )
}