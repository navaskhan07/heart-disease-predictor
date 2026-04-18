from pydantic import BaseModel, Field

class HeartDiseaseInput(BaseModel):
    Age: int = Field(..., ge=1, le=120)
    Sex: int = Field(..., ge=0, le=1)
    ChestPainType: int = Field(..., ge=0, le=3)
    RestingBP: int = Field(..., ge=60, le=250)
    Cholesterol: int = Field(..., ge=0, le=600)
    FastingBS: int = Field(..., ge=0, le=1)
    RestingECG: int = Field(..., ge=0, le=2)
    MaxHR: int = Field(..., ge=50, le=250)
    ExerciseAngina: int = Field(..., ge=0, le=1)
    Oldpeak: float = Field(..., ge=-10.0, le=10.0)
    ST_Slope: int = Field(..., ge=0, le=2)

class PredictionOutput(BaseModel):
    prediction: str
    probability: float
    message: str