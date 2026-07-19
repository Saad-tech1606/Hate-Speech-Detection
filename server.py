"""FastAPI server exposing the hate speech classifier for the Chrome extension."""

from __future__ import annotations

import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from api.inference import HateSpeechClassifier

classifier: HateSpeechClassifier | None = None


@asynccontextmanager
async def lifespan(_: FastAPI):
    global classifier
    print("Loading hate speech model...")
    classifier = HateSpeechClassifier()
    print("Model ready.")
    yield


app = FastAPI(
    title="Hate Speech Classifier API",
    description="XLM-RoBERTa binary hate speech detection",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000)


class BatchPredictRequest(BaseModel):
    texts: list[str] = Field(..., min_length=1, max_length=32)


class PredictResponse(BaseModel):
    prediction: int
    label: str
    confidence: float
    probabilities: dict[str, float]


@app.get("/health")
def health():
    return {
        "status": "ok",
        "model_loaded": classifier is not None,
    }


@app.post("/predict", response_model=PredictResponse)
def predict(request: PredictRequest):
    if classifier is None:
        raise HTTPException(status_code=503, detail="Model is not loaded yet")

    try:
        return classifier.predict(request.text)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.post("/predict/batch")
def predict_batch(request: BatchPredictRequest):
    if classifier is None:
        raise HTTPException(status_code=503, detail="Model is not loaded yet")

    results = []
    for text in request.texts:
        try:
            results.append(classifier.predict(text))
        except ValueError as exc:
            results.append({"error": str(exc), "text": text})
    return {"results": results}


if __name__ == "__main__":
    import uvicorn

    host = os.getenv("API_HOST", "127.0.0.1")
    port = int(os.getenv("API_PORT", "8000"))
    uvicorn.run("api.server:app", host=host, port=port, reload=False)
