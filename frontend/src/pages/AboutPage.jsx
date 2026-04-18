import './AboutPage.css'

const metrics = [
  { label: 'Accuracy', value: '85.7%' },
  { label: 'Cross-Val Score', value: '87.4%' },
  { label: 'Algorithm', value: 'Random Forest' },
  { label: 'Trees', value: '100' },
  { label: 'Dataset Size', value: '918 rows' },
  { label: 'Features', value: '11' },
]

const features = [
  { name: 'Age', desc: 'Patient age in years' },
  { name: 'Sex', desc: 'Gender (Male/Female)' },
  { name: 'ChestPainType', desc: 'Type of chest pain experienced' },
  { name: 'RestingBP', desc: 'Resting blood pressure (mmHg)' },
  { name: 'Cholesterol', desc: 'Serum cholesterol (mg/dl)' },
  { name: 'FastingBS', desc: 'Fasting blood sugar > 120 mg/dl' },
  { name: 'RestingECG', desc: 'Resting electrocardiogram results' },
  { name: 'MaxHR', desc: 'Maximum heart rate achieved' },
  { name: 'ExerciseAngina', desc: 'Exercise-induced angina' },
  { name: 'Oldpeak', desc: 'ST depression induced by exercise' },
  { name: 'ST_Slope', desc: 'Slope of peak exercise ST segment' },
]

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-hero">
          <h1>About This Project</h1>
          <p>A machine learning-powered heart disease risk assessment tool built as a final-year computer science project.</p>
        </div>

        <div className="about-section">
          <h2>Model Performance</h2>
          <div className="metrics-grid">
            {metrics.map(m => (
              <div key={m.label} className="metric-card">
                <div className="metric-val">{m.value}</div>
                <div className="metric-lbl">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section">
          <h2>Tech Stack</h2>
          <div className="tech-grid">
            {[
              { layer: 'ML Model', tech: 'scikit-learn (Random Forest)', color: '#f0fff4', border: '#68d391', text: '#276749' },
              { layer: 'Backend', tech: 'FastAPI + Python', color: '#ebf8ff', border: '#63b3ed', text: '#2c5282' },
              { layer: 'Frontend', tech: 'React + Vite', color: '#e9d8fd', border: '#b794f4', text: '#553c9a' },
              { layer: 'Deployment', tech: 'Render + Vercel', color: '#fff5f5', border: '#fc8181', text: '#9b2c2c' },
            ].map(t => (
              <div key={t.layer} className="tech-card" style={{ background: t.color, border: `1px solid ${t.border}` }}>
                <div className="tech-layer" style={{ color: t.text }}>{t.layer}</div>
                <div className="tech-name">{t.tech}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section">
          <h2>Input Features</h2>
          <div className="features-list">
            {features.map(f => (
              <div key={f.name} className="feature-item">
                <span className="feature-name">{f.name}</span>
                <span className="feature-desc">{f.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section limitations">
          <h2>⚠️ Limitations & Disclaimer</h2>
          <ul>
            <li>This tool is for <strong>educational purposes only</strong> and is not intended for clinical use.</li>
            <li>The model was trained on the UCI Heart Disease dataset with 918 samples — a small clinical dataset.</li>
            <li>Predictions should <strong>never replace</strong> professional medical diagnosis.</li>
            <li>Model accuracy is 85.7% — meaning it can be wrong in 1 out of 7 cases.</li>
            <li>Always consult a qualified cardiologist for heart-related health concerns.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}