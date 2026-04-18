import { Link } from 'react-router-dom'
import './LandingPage.css'

const stats = [
  { value: '85.7%', label: 'Model Accuracy' },
  { value: '918', label: 'Training Samples' },
  { value: '11', label: 'Clinical Features' },
  { value: '<1s', label: 'Prediction Time' },
]

const steps = [
  { icon: '📋', title: 'Enter Data', desc: 'Fill in 11 clinical parameters from a patient report' },
  { icon: '🤖', title: 'AI Analysis', desc: 'Our Random Forest model analyzes the data instantly' },
  { icon: '📊', title: 'Get Results', desc: 'View risk level, probability and detailed insights' },
]

export default function LandingPage() {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">AI-Powered Healthcare Tool</div>
          <h1>Heart Disease Risk <span className="text-red">Predictor</span></h1>
          <p className="hero-desc">
            Enter patient clinical data and get an instant cardiovascular risk assessment
            powered by machine learning. Built for education and research purposes.
          </p>
          <div className="hero-actions">
            <Link to="/predict" className="btn-primary">Check Your Risk</Link>
            <Link to="/about" className="btn-secondary">Learn More</Link>
          </div>
          <p className="hero-disclaimer">
            ⚕️ For educational purposes only. Not a substitute for medical advice.
          </p>
        </div>
        <div className="hero-visual">
          <div className="heart-card">
            <div className="heart-icon">♥</div>
            <p>AI Risk Assessment</p>
            <div className="risk-bars">
              <div className="risk-bar-item">
                <span>Low Risk</span>
                <div className="bar"><div className="bar-fill green" style={{width:'30%'}}></div></div>
              </div>
              <div className="risk-bar-item">
                <span>Medium Risk</span>
                <div className="bar"><div className="bar-fill yellow" style={{width:'55%'}}></div></div>
              </div>
              <div className="risk-bar-item">
                <span>High Risk</span>
                <div className="bar"><div className="bar-fill red" style={{width:'85%'}}></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          {steps.map((s, i) => (
            <div key={i} className="step-card">
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to assess cardiovascular risk?</h2>
        <p>Takes less than 2 minutes. No account required.</p>
        <Link to="/predict" className="btn-primary">Start Prediction</Link>
      </section>
    </div>
  )
}