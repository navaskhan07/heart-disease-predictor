import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export const predictHeartDisease = async (formData) => {
  const payload = {
    Age: parseInt(formData.Age),
    Sex: parseInt(formData.Sex),
    ChestPainType: parseInt(formData.ChestPainType),
    RestingBP: parseInt(formData.RestingBP),
    Cholesterol: parseInt(formData.Cholesterol),
    FastingBS: parseInt(formData.FastingBS),
    RestingECG: parseInt(formData.RestingECG),
    MaxHR: parseInt(formData.MaxHR),
    ExerciseAngina: parseInt(formData.ExerciseAngina),
    Oldpeak: parseFloat(formData.Oldpeak),
    ST_Slope: parseInt(formData.ST_Slope),
  };

  const response = await apiClient.post('/predict', payload);
  return response.data;
};