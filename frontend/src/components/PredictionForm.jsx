import { useState } from 'react';
import { predictHeartDisease } from '../api/predict';

const numberFields = [
  { name: 'Age', label: 'Age', placeholder: '36' },
  { name: 'RestingBP', label: 'Resting Blood Pressure (mmHg)', placeholder: '120' },
  { name: 'Cholesterol', label: 'Cholesterol (mg/dl)', placeholder: '166' },
  { name: 'MaxHR', label: 'Maximum Heart Rate', placeholder: '138' },
  { name: 'Oldpeak', label: 'Oldpeak (ST Depression)', placeholder: '0.0', step: '0.1' },
];

const selectFields = [
  {
    name: 'Sex', label: 'Sex',
    options: [{ value: 1, label: 'Male' }, { value: 0, label: 'Female' }]
  },
  {
    name: 'ChestPainType', label: 'Chest Pain Type',
    options: [
      { value: 1, label: 'Typical Angina' },
      { value: 2, label: 'Atypical Angina' },
      { value: 3, label: 'Non-Anginal Pain' },
      { value: 0, label: 'Asymptomatic' },
    ]
  },
  {
    name: 'FastingBS', label: 'Fasting Blood Sugar > 120 mg/dl',
    options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }]
  },
  {
    name: 'RestingECG', label: 'Resting ECG',
    options: [
      { value: 1, label: 'Normal' },
      { value: 2, label: 'ST-T Abnormality' },
      { value: 0, label: 'LV Hypertrophy' },
    ]
  },
  {
    name: 'ExerciseAngina', label: 'Exercise Induced Angina',
    options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }]
  },
  {
    name: 'ST_Slope', label: 'ST Slope',
    options: [
      { value: 2, label: 'Up' },
      { value: 1, label: 'Flat' },
      { value: 0, label: 'Down' },
    ]
  },
];

export default function PredictionForm({ onResult, onLoading }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    [...numberFields, ...selectFields].forEach(f => {
      if (formData[f.name] === undefined || formData[f.name] === '') {
        newErrors[f.name] = 'Required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    onLoading(true);
    try {
      const result = await predictHeartDisease(formData);
      onResult(result);
    } catch (err) {
      onResult({ error: err.response?.data?.detail || 'Prediction failed. Try again.' });
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Enter Patient Details</h2>

      {numberFields.map(f => (
        <div key={f.name} className="field">
          <label>{f.label}</label>
          <input
            type="number"
            name={f.name}
            placeholder={f.placeholder}
            step={f.step || '1'}
            onChange={handleChange}
          />
          {errors[f.name] && <span className="error">{errors[f.name]}</span>}
        </div>
      ))}

      {selectFields.map(f => (
        <div key={f.name} className="field">
          <label>{f.label}</label>
          <select name={f.name} onChange={handleChange} defaultValue="">
            <option value="" disabled>Select...</option>
            {f.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors[f.name] && <span className="error">{errors[f.name]}</span>}
        </div>
      ))}

      <button type="submit">Predict Risk</button>
    </form>
  );
}