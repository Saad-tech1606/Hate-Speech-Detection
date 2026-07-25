from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F

model_path = r"D:\Hate_Speech\HateSpeech_XLMRoBERTa_Final"

print("Loading tokenizer...")
tokenizer = AutoTokenizer.from_pretrained(model_path)

print("Loading model...")
model = AutoModelForSequenceClassification.from_pretrained(model_path)

model.eval()

labels = {
    0: "Non-Hate",
    1: "Hate"
}

print("\n✅ Model Ready!\n")

while True:

    text = input("Enter text (or type 'exit'): ")

    if text.lower() == "exit":
        break

    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    )

    with torch.no_grad():
        outputs = model(**inputs)

    probabilities = F.softmax(outputs.logits, dim=1)

    confidence, prediction = torch.max(probabilities, dim=1)

    print("-"*60)
    print("Prediction :", labels[prediction.item()])
    print("Confidence :", f"{confidence.item()*100:.2f}%")
    print("-"*60)