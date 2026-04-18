# Heart Disease Risk Predictor

🔗 Live Demo: https://heart-disease-predictor-umber.vercel.app
📡 API Docs:  https://heart-disease-predictor-api-plfi.onrender.com/docs

A full-stack ML web application that predicts cardiovascular disease risk
using clinical parameters.

🔗 Live Demo: (add after deployment)
📡 API Docs: (add after deployment)

## Tech Stack
| Layer | Technology |
|-------|-----------|
| ML Model | scikit-learn (Random Forest) |
| Backend | FastAPI + Python |
| Frontend | React + Vite |
| Deployment | Render (API) + Vercel (Frontend) |

## Model Performance
| Metric | Score |
|--------|-------|
| Test Accuracy | 85.7% |
| Cross-Val Score | 87.4% |

## Local Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Architecture

