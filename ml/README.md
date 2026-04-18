# ML Model — Heart Disease Prediction

## Algorithm
Random Forest Classifier (scikit-learn 1.6.1)

## Dataset
- Source: UCI Heart Disease Dataset (Kaggle)
- Samples: 918 rows
- Features: 11 clinical parameters
- Target: HeartDisease (0 = No, 1 = Yes)

## Model Performance
| Metric | Score |
|--------|-------|
| Test Accuracy | 85.7% |
| Cross-Val Score | 87.4% |
| Algorithm | Random Forest |
| Trees | 100 |

## Why Random Forest?
Benchmarked 4 algorithms:
- Random Forest → 85.7% test, 87.4% CV ✅ chosen
- Gradient Boosting → 86.1% test, 87.2% CV
- Logistic Regression → 83.0% test, 85.0% CV
- GaussianNB → 84.8% test, 86.2% CV

Random Forest was chosen based on highest CV score,
indicating better generalization on unseen data.

## Features Used
| Feature | Description |
|---------|-------------|
| Age | Patient age in years |
| Sex | Gender (0=Female, 1=Male) |
| ChestPainType | Type of chest pain (0-3) |
| RestingBP | Resting blood pressure (mmHg) |
| Cholesterol | Serum cholesterol (mg/dl) |
| FastingBS | Fasting blood sugar > 120 mg/dl |
| RestingECG | Resting ECG results (0-2) |
| MaxHR | Maximum heart rate achieved |
| ExerciseAngina | Exercise induced angina (0/1) |
| Oldpeak | ST depression value |
| ST_Slope | Slope of peak exercise ST segment |

## How to Run
1. Open `heart_disease_model.ipynb` in Google Colab or Jupyter
2. Upload `dataset/heart.csv`
3. Run all cells
4. Model saves as `heart_disease_model.pkl`