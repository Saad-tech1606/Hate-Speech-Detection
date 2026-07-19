"""Shared inference logic for the hate speech classifier."""

from __future__ import annotations

import os
from pathlib import Path

import torch
import torch.nn.functional as F
from transformers import AutoModelForSequenceClassification, AutoTokenizer

LABEL_MAP = {
    0: "Non-Hate",
    1: "Hate",
}

DEFAULT_MODEL_PATH = Path(__file__).resolve().parent.parent / "HateSpeech_XLMRoBERTa_Final"
MAX_LENGTH = 128


class HateSpeechClassifier:
    def __init__(self, model_path: str | Path | None = None, device: str | None = None):
        self.model_path = Path(model_path or os.getenv("MODEL_PATH", DEFAULT_MODEL_PATH))
        self.device = device or ("cuda" if torch.cuda.is_available() else "cpu")

        if not self.model_path.exists():
            raise FileNotFoundError(f"Model path not found: {self.model_path}")

        self.tokenizer = AutoTokenizer.from_pretrained(self.model_path)
        self.model = AutoModelForSequenceClassification.from_pretrained(self.model_path)
        self.model.to(self.device)
        self.model.eval()

    def predict(self, text: str) -> dict:
        text = (text or "").strip()
        if not text:
            raise ValueError("Text cannot be empty")

        inputs = self.tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            padding=True,
            max_length=MAX_LENGTH,
        )
        inputs = {key: value.to(self.device) for key, value in inputs.items()}

        with torch.no_grad():
            outputs = self.model(**inputs)

        probabilities = F.softmax(outputs.logits, dim=1)[0]
        prediction = int(torch.argmax(probabilities).item())
        confidence = float(probabilities[prediction].item())

        return {
            "prediction": prediction,
            "label": LABEL_MAP[prediction],
            "confidence": round(confidence, 4),
            "probabilities": {
                "non_hate": round(float(probabilities[0].item()), 4),
                "hate": round(float(probabilities[1].item()), 4),
            },
        }
