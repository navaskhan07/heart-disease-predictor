import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { predictHeartDisease } from '../api/predict'
import './PredictPage.css'

const STEPS = [
  {
    title: 'Basic Information',
    fields: [
      { name: 'Age', label: 'Age (years)', type: 'number', placeholder: '45', tip: 'Patient age in years' },
      { name: 'Sex', label: 'Sex', type: 'select', options: [{ value: 1, label: 'Male' }, { value: 0, label: 'Female' }] },
      { name: 'RestingBP', label: 'Resting Blood Pressure (mmHg)', type: 'number', placeholder: '120', tip: 'Measured in mmHg at rest' },
      { name: 'Cholesterol', label: 'Cholesterol (mg/dl)', type: 'number', placeholder: '200', tip: 'Serum cholesterol in mg/dl' },
    ]
  },
  {
    title: 'Heart Indicators',
    fields: [
      { name: 'FastingBS', label: 'Fasting Blood Sugar > 120 mg/dl', type: 'select', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { name: 'MaxHR', label: 'Maximum Heart Rate', type: 'number', placeholder: '150', tip: 'Maximum heart rate achieved during exercise' },
      { name: 'Oldpeak', label: 'Oldpeak (ST Depression)', type: 'number', placeholder: '1.0', step: '0.1', tip: 'ST depression induced by exercise relative to rest' },
      { name: 'ExerciseAngina', label: 'Exercise Induced Angina', type: 'select', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
    ]
  },
  {
    title: 'ECG & Clinical',
    fields: [
      { name: 'ChestPainType', label: 'Chest Pain Type', type: 'select', options: [
        { value: 1, label: 'Typical Angina' }, { value: 2, label: 'Atypical Angina' },
        { value: 3, label: 'Non-Anginal Pain' }, { value: 0, label: 'Asymptomatic' }
      ]},
      { name: 'RestingECG', label: 'Resting ECG Results', type: 'select', options: [
        { value: 1, label: 'Normal' }, { value: 2, label: 'ST-T Abnormality' }, { value: 0, label: 'LV Hypertrophy' }
      ]},
      { name: 'ST_Slope', label: 'ST Slope', type: 'select', options: [
        { value: 2, label: 'Upsloping' }, { value: 1, label: 'Flat' }, { value: 0, label: 'Downsloping' }
      ]},
    ]
  }
]

export default function PredictPage({ setResult, setFormData }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const currentStep = STEPS[step]

  const handleChange = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const validateStep = () => {
    const newErrors = {}
    currentStep.fields.forEach(f => {
      if (data[f.name] === undefined || data[f.name] === '') {
        newErrors[f.name] = 'This field is required'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) setStep(s => s + 1)
  }

  const handleBack = () => setStep(s => s - 1)

  const handleSubmit = async () => {
    if (!validateStep()) return
    setLoading(true)
    try {
      const result = await predictHeartDisease(data)
      const entry = { ...result, inputs: data, date: new Date().toLocaleString() }
      const history = JSON.parse(localStorage.getItem('heartHistory') || '[]')
      localStorage.setItem('heartHistory', JSON.stringify([entry, ...history].slice(0, 10)))
      setResult(result)
      setFormData(data)
      navigate('/result')
    } catch (err) {
      setResult({ error: err.response?.data?.detail || 'Prediction failed.' })
      navigate('/result')
    } finally {
      setLoading(false)
    }
  }

  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <div className="predict-page">
      <div className="predict-container">
        <div className="predict-header">
          <h1>Risk Assessment</h1>
          <p>Step {step + 1} of {STEPS.length}: {currentStep.title}</p>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="step-indicators">
          {STEPS.map((s, i) => (
            <div key={i} className={`step-dot ${i <= step ? 'active' : ''}`}>
              <div className="dot">{i < step ? '✓' : i + 1}</div>
              <span>{s.title}</span>
            </div>
          ))}
        </div>

        <div className="form-card">
          <h2>{currentStep.title}</h2>
          <div className="fields-grid">
            {currentStep.fields.map(f => (
              <div key={f.name} className="field-group">
                <label>
                  {f.label}
                  {f.tip && <span className="tooltip" title={f.tip}>ⓘ</span>}
                </label>
                {f.type === 'select' ? (
                  <select
                    name={f.name}
                    value={data[f.name] ?? ''}
                    onChange={handleChange}
                    className={errors[f.name] ? 'error' : ''}
                  >
                    <option value="" disabled>Select...</option>
                    {f.options.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    name={f.name}
                    value={data[f.name] ?? ''}
                    placeholder={f.placeholder}
                    step={f.step || '1'}
                    onChange={handleChange}
                    className={errors[f.name] ? 'error' : ''}
                  />
                )}
                {errors[f.name] && <span className="error-msg">{errors[f.name]}</span>}
              </div>
            ))}
          </div>

          <div className="form-actions">
            {step > 0 && (
              <button className="btn-back" onClick={handleBack}>← Back</button>
            )}
            {step < STEPS.length - 1 ? (
              <button className="btn-next" onClick={handleNext}>Next →</button>
            ) : (
              <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Analyzing...' : '🔍 Get Prediction'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}