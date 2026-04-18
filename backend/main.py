from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import HeartDiseaseInput, PredictionOutput
from model import predict

app = FastAPI(
    title="Heart Disease Predictor API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
    "https://heart-disease-predictor.vercel.app",
    "https://*.vercel.app",],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/predict", response_model=PredictionOutput)
def make_prediction(data: HeartDiseaseInput):
    try:
        return predict(data.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))