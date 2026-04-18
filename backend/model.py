import joblib
import numpy as np
from pathlib import Path

BASE  = Path(__file__).parent / "models"
model = joblib.load(BASE / "heart_disease_model.pkl")

print("✅ Model loaded:", type(model))
print("✅ Features expected:", model.n_features_in_)

FEATURE_ORDER = [
    'Age', 'Sex', 'ChestPainType', 'RestingBP', 'Cholesterol',
    'FastingBS', 'RestingECG', 'MaxHR', 'ExerciseAngina',
    'Oldpeak', 'ST_Slope'
]

def predict(data: dict) -> dict:
    values      = [data[f] for f in FEATURE_ORDER]
    input_array = np.array([values])

    prediction  = int(model.predict(input_array)[0])
    probability = float(model.predict_proba(input_array)[0][1])

    label   = "High Risk" if prediction == 1 else "Low Risk"
    message = (
        f"Prediction: {label}. "
        f"The model estimates a {probability * 100:.1f}% probability "
        f"of heart disease. This is not a medical diagnosis."
    )

    return {
        "prediction": label,
        "probability": round(probability, 4),
        "message": message
    }