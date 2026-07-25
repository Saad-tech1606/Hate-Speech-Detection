<p align="center">
    <img src="https://raw.githubusercontent.com/Saad-tech1606/Hate-Speech-Detection/main/assets/banner.png" alt="Hate Speech Detection Banner" width="100%">
</p>

<h1 align="center">🚨 Hate Speech Detection using XLM-RoBERTa</h1>

<h3 align="center">
A Transformer-Based Hate Speech Detection System with FastAPI & Chrome Extension
</h3>

<p align="center">

<img src="https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white">

<img src="https://img.shields.io/badge/PyTorch-Deep%20Learning-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white">

<img src="https://img.shields.io/badge/HuggingFace-Transformers-FFD21E?style=for-the-badge">

<img src="https://img.shields.io/badge/XLM--RoBERTa-NLP-7B61FF?style=for-the-badge">

<img src="https://img.shields.io/badge/FastAPI-API-009688?style=for-the-badge&logo=fastapi&logoColor=white">

<img src="https://img.shields.io/badge/Chrome-Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white">

<img src="https://img.shields.io/badge/Status-Completed-success?style=for-the-badge">

<img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge">

</p>

---

# 🌟 Project Overview

The rapid growth of online social media platforms has significantly increased the spread of **hate speech, abusive language, offensive comments, and toxic content**. Detecting such harmful content manually is extremely challenging because of the enormous volume of user-generated content published every second.

This project presents a **Transformer-Based Hate Speech Detection System** built using **XLM-RoBERTa**, a powerful contextual language model capable of accurately classifying English text into two categories:

- ✅ Non-Hate Speech
- 🚫 Hate Speech

Unlike traditional keyword-based approaches, this project captures the **context and semantic meaning** of sentences, enabling more accurate predictions even when offensive language is expressed indirectly.

To demonstrate a real-world application, the trained model is deployed through a **FastAPI backend** and integrated with a **Chrome Extension** that scans Instagram comments in real time, predicts whether each comment is hateful, and displays confidence scores instantly.

This project combines **Natural Language Processing (NLP)**, **Deep Learning**, **FastAPI**, and **Chrome Extension Development** into a complete, modular, and deployment-ready solution.

---

# ✨ Key Features

- 🚀 Fine-Tuned **XLM-RoBERTa Transformer Model**
- 🌐 Real-Time Hate Speech Detection
- 🧠 Context-Aware Text Understanding
- 📊 High Accuracy Binary Classification
- ⚡ FastAPI REST API
- 🌍 Chrome Extension Integration
- 📈 Confidence Score Prediction
- 📉 Complete Performance Evaluation
- 🔥 Instagram Comment Detection
- 🧩 Modular Project Architecture
- 📂 Clean Repository Structure
- ☁️ Easy Deployment
- 📱 Easily Extendable to Other Platforms

---

# 🎯 Problem Statement

Online platforms receive millions of comments every day, making manual moderation nearly impossible.

Traditional keyword-based systems often fail to understand the actual context of a sentence. As a result, harmless comments may be incorrectly flagged while genuinely hateful content may go undetected.

This project addresses these limitations by leveraging **Transformer-based contextual language understanding** through XLM-RoBERTa. Instead of relying solely on keywords, the model learns semantic relationships between words, leading to significantly improved hate speech detection performance.

---

# 📸 Project Preview

## 🌐 Chrome Extension in Action

<p align="center">
    <img src="https://raw.githubusercontent.com/Saad-tech1606/Hate-Speech-Detection/main/assets/screenshots/instagram_demo_1.png" alt="Instagram Demo 1" width="48%">
    <img src="https://raw.githubusercontent.com/Saad-tech1606/Hate-Speech-Detection/main/assets/screenshots/instagram_demo_2.png" alt="Instagram Demo 2" width="48%">
</p>

The Chrome Extension continuously scans Instagram comments in real time and highlights potentially hateful content while displaying the predicted label, confidence score, and scan statistics.

---

## 🤖 Prediction Examples

### Hate Speech Detection

![Prediction Hate](assets/screenshots/prediction_hate.png)

### Non-Hate Speech Detection

![Prediction Non Hate](assets/screenshots/prediction_non_hate.png)

### Successful Prediction

![Prediction Success](assets/screenshots/prediction_success.png)

### Additional Hate Speech Example

![Prediction Hate Example](assets/screenshots/prediction_hate_example.png)

These examples demonstrate the model's ability to accurately classify both hateful and non-hateful text while providing prediction confidence.

---

# 📑 Table of Contents

- [🌟 Project Overview](#-project-overview)
- [✨ Key Features](#-key-features)
- [🎯 Problem Statement](#-problem-statement)
- [🧠 Why XLM-RoBERTa?](#-why-xlm-roberta)
- [🏗️ Model Architecture](#️-model-architecture)
- [⚙️ Project Workflow](#️-project-workflow)
- [🛠️ Technology Stack](#️-technology-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Installation](#-installation)
- [▶️ Running the Project](#️-running-the-project)
- [🌐 Chrome Extension Setup](#-chrome-extension-setup)
- [🔌 API Documentation](#-api-documentation)
- [📦 Dataset](#-dataset)
- [🤖 Model Details](#-model-details)
- [📈 Performance Evaluation](#-performance-evaluation)
- [📸 Screenshots](#-screenshots)
- [🎯 Applications](#-applications)
- [🚀 Future Enhancements](#-future-enhancements)
- [🤝 Contributors](#-contributors)
- [📜 License](#-license)
- [📚 Citation](#-citation)
- [👨‍💻 Author](#-author)
- [🙏 Acknowledgements](#-acknowledgements)

---
# 🧠 Why XLM-RoBERTa?

Traditional machine learning algorithms such as **Naïve Bayes**, **Support Vector Machine (SVM)**, and **Logistic Regression**, as well as sequential deep learning models like **RNN** and **LSTM**, often struggle to understand the contextual meaning of words. These models generally rely on handcrafted features or process text sequentially, which limits their ability to capture long-range dependencies and subtle semantic relationships.

**XLM-RoBERTa (Cross-lingual Language Model - RoBERTa)** is a Transformer-based language model developed by Meta AI that utilizes the self-attention mechanism to learn contextual representations of text. Instead of focusing only on keywords, it understands the complete sentence context, making it highly effective for hate speech detection.

Although this project is trained on an **English binary hate speech dataset**, XLM-RoBERTa's multilingual architecture provides flexibility for future expansion into multilingual moderation systems.

---

## 🌟 Advantages of XLM-RoBERTa

| Feature | Benefit |
|----------|----------|
| 🧠 Contextual Embeddings | Understands sentence meaning rather than isolated words |
| ⚡ Transformer Architecture | Captures long-range dependencies efficiently |
| 🎯 High Accuracy | Produces highly accurate hate speech predictions |
| 🌍 Multilingual Capability | Easily extendable to multilingual datasets |
| 🚀 Pre-trained Knowledge | Fine-tuning requires less training time |
| 🔍 Semantic Understanding | Detects implicit and contextual hate speech |
| 📈 Better Generalization | Performs well on unseen text |

---

# 🏗️ Model Architecture

The proposed system uses a **fine-tuned XLM-RoBERTa Transformer** for binary hate speech classification. The architecture follows a complete NLP pipeline that transforms raw user text into contextual embeddings before generating a prediction.

<p align="center">
<img src="docs/XLM-Roberta_architecture.png" width="95%">
</p>

---

## 📌 Architecture Pipeline

```text
                 User Input Text
                        │
                        ▼
             Text Preprocessing
                        │
                        ▼
          XLM-RoBERTa Tokenizer
                        │
                        ▼
      Contextual Embedding Generation
                        │
                        ▼
      XLM-RoBERTa Transformer Encoder
                        │
                        ▼
      Classification Head (Linear Layer)
                        │
                        ▼
            Softmax Probability Layer
                        │
                        ▼
     Hate Speech / Non-Hate Prediction
```

---

## 🧩 Major Components

| Component | Description |
|-----------|-------------|
| **Input Layer** | Receives raw user text from API or Chrome Extension |
| **Text Preprocessing** | Cleans and normalizes text while preserving contextual information |
| **Tokenizer** | Converts text into numerical token IDs using the XLM-RoBERTa tokenizer |
| **Transformer Encoder** | Learns contextual semantic representations |
| **Classification Head** | Generates logits for binary classification |
| **Softmax Layer** | Converts logits into prediction probabilities |
| **Prediction Module** | Returns final class label and confidence score |

---

# ⚙️ System Workflow

The complete system follows an end-to-end pipeline from user input to real-time hate speech prediction.

```text
                    User Comment
                          │
                          ▼
                Text Preprocessing
                          │
                          ▼
             XLM-RoBERTa Tokenizer
                          │
                          ▼
          Fine-Tuned XLM-RoBERTa Model
                          │
                          ▼
             Probability Calculation
                          │
                          ▼
         Hate / Non-Hate Classification
                          │
                          ▼
            FastAPI JSON Response
                          │
                          ▼
          Chrome Extension Interface
                          │
                          ▼
          Prediction Display to User
```

---

## 🔄 Complete Processing Pipeline

1. User submits text through the Chrome Extension.
2. The extension sends the text to the FastAPI backend.
3. The backend preprocesses the input.
4. The tokenizer converts text into token IDs.
5. XLM-RoBERTa processes the contextual embeddings.
6. The classification layer predicts the class.
7. Softmax calculates confidence scores.
8. FastAPI returns a JSON response.
9. The Chrome Extension displays the prediction and confidence.

---

# 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Programming Language** | Python 3.10 |
| **Deep Learning Framework** | PyTorch |
| **NLP Framework** | Hugging Face Transformers |
| **Transformer Model** | XLM-RoBERTa |
| **Backend Framework** | FastAPI |
| **API Server** | Uvicorn |
| **Browser Extension** | Chrome Extension (Manifest V3) |
| **Data Processing** | Pandas |
| **Numerical Computing** | NumPy |
| **Model Evaluation** | Scikit-learn |
| **Development Environment** | Jupyter Notebook |
| **Version Control** | Git & GitHub |

---

# 📂 Project Structure

```text
📦 Hate-Speech-Detection
│
├── 📁 api
│   ├── inference.py
│   ├── server.py
│   └── __init__.py
│
├── 📁 assets
│   ├── banner.png
│   ├── screenshots
│   │   ├── instagram_demo_1.png
│   │   ├── instagram_demo_2.png
│   │   ├── prediction_hate.png
│   │   ├── prediction_non_hate.png
│   │   ├── prediction_success.png
│   │   └── prediction_hate_example.png
│   ├── Validation Accuracy Curve.png
│   ├── Training vs Validation Loss Curve.png
│   ├── Loss Curve.png
│   ├── ROC curve.png
│   ├── Precision-Recall Curve.png
│   ├── Confusion_matrix.png
│   ├── Confidence Histogram curve.png
│   └── Validation F1 Score Curve.png
│
├── 📁 Chrome Extension
├── 📁 datasets
├── 📁 docs
├── 📁 HateSpeech_XLMRoBERTa_Final
├── 📁 model
├── 📁 notebooks
├── 📁 scripts
├── requirements.txt
└── README.md
```

---

# 🚀 Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Saad-tech1606/Hate-Speech-Detection.git
```

---

## 2️⃣ Navigate to the Project Directory

```bash
cd Hate-Speech-Detection
```

---

## 3️⃣ Create a Virtual Environment (Optional)

### Windows

```bash
python -m venv venv
```

Activate:

```bash
venv\Scripts\activate
```

---

### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 4️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

# ▶️ Running the Project

Start the FastAPI server:

```bash
python -m api.server
```

or

```bash
uvicorn api.server:app --reload
```

The server will start at:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

ReDoc documentation:

```text
http://127.0.0.1:8000/redoc
```

---
# 🌐 Chrome Extension Setup

The project includes a custom **Chrome Extension** that communicates with the FastAPI backend to analyze Instagram comments in real time. The extension scans visible comments, sends them to the trained XLM-RoBERTa model, and displays prediction results along with confidence scores.

---

## 📌 Installation Steps

### Step 1: Open Chrome Extensions

Navigate to:

```text
chrome://extensions
```

---

### Step 2: Enable Developer Mode

Enable **Developer Mode** from the top-right corner.

---

### Step 3: Load the Extension

Click on:

```text
Load unpacked
```

Select the following folder:

```text
Chrome Extension/
```

---

### Step 4: Start the Backend

Run the FastAPI server:

```bash
python -m api.server
```

or

```bash
uvicorn api.server:app --reload
```

---

### Step 5: Open Instagram

Visit:

```text
https://www.instagram.com/
```

Refresh the page.

The extension will automatically begin scanning visible comments.

---

## 🚀 Extension Features

- 🔍 Automatic Instagram comment detection
- ⚡ Real-time prediction
- 🧠 XLM-RoBERTa inference
- 📊 Confidence score display
- 🚫 Hate Speech highlighting
- ✅ Non-Hate Speech identification
- 📈 Live statistics
- 🔄 Fast API communication
- 💻 Lightweight user interface

---

# 🔌 API Documentation

The backend is implemented using **FastAPI**, providing RESTful endpoints for inference and health monitoring.

---

## 📍 Base URL

```text
http://127.0.0.1:8000
```

---

## ❤️ Health Check Endpoint

### Request

```http
GET /health
```

### Response

```json
{
  "status": "ok",
  "model_loaded": true
}
```

---

## 🤖 Predict Single Text

### Endpoint

```http
POST /predict
```

### Request Body

```json
{
    "text": "Go kill your father."
}
```

---

### Successful Response

```json
{
    "prediction": 1,
    "label": "Hate",
    "confidence": 0.9911
}
```

---

## 📚 Batch Prediction

### Endpoint

```http
POST /predict/batch
```

### Request

```json
{
  "texts": [
    "You are amazing.",
    "Go kill yourself.",
    "Have a wonderful day."
  ]
}
```

---

### Response

```json
[
  {
    "prediction": 0,
    "label": "Non-Hate",
    "confidence": 0.998
  },
  {
    "prediction": 1,
    "label": "Hate",
    "confidence": 0.996
  },
  {
    "prediction": 0,
    "label": "Non-Hate",
    "confidence": 0.999
  }
]
```

---

## 📋 API Summary

| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/health` | GET | Health check |
| `/predict` | POST | Predict single text |
| `/predict/batch` | POST | Predict multiple texts |

---

# 📦 Dataset

The model was trained using an **English Hate Speech Dataset** containing manually labeled text samples.

Each sample belongs to one of two categories:

| Label | Description |
|--------|-------------|
| **0** | Non-Hate Speech |
| **1** | Hate Speech |

---

## 🧹 Data Preprocessing

The dataset underwent several preprocessing steps before training.

### ✔️ Duplicate Removal

Repeated text samples were removed.

---

### ✔️ Missing Value Handling

Incomplete records were discarded.

---

### ✔️ Text Cleaning

Basic normalization was performed while preserving contextual information.

---

### ✔️ Label Encoding

Labels were converted into binary values.

---

### ✔️ Context Preservation

Unlike many traditional NLP pipelines, punctuation, emojis, and expressive symbols were preserved because they often contribute to the emotional meaning of text.

---

### ✔️ Train-Test Split

The processed dataset was divided into training and validation sets for model evaluation.

---

# 🤖 Model Details

This project employs a **fine-tuned XLM-RoBERTa Transformer** model for binary hate speech classification.

Instead of relying on handcrafted linguistic features, the model learns contextual semantic relationships directly from text.

---

## ⚙️ Model Configuration

| Parameter | Value |
|------------|---------|
| Model | XLM-RoBERTa |
| Task | Binary Text Classification |
| Framework | Hugging Face Transformers |
| Backend | PyTorch |
| Maximum Sequence Length | 128 Tokens |
| Output Classes | Hate / Non-Hate |
| Tokenizer | XLM-RoBERTa Tokenizer |

---

## 🏋️ Training Pipeline

```text
Raw Dataset
      │
      ▼
Data Cleaning
      │
      ▼
Text Normalization
      │
      ▼
Tokenization
      │
      ▼
Train Validation Split
      │
      ▼
Fine-Tune XLM-RoBERTa
      │
      ▼
Model Evaluation
      │
      ▼
Model Saving
      │
      ▼
FastAPI Deployment
      │
      ▼
Chrome Extension Integration
```

---

# 📈 Performance Evaluation

The trained model was evaluated using multiple standard classification metrics.

| Metric | Purpose |
|---------|----------|
| Accuracy | Overall correctness |
| Precision | Correct hate predictions |
| Recall | Ability to detect hate speech |
| F1 Score | Balance between precision and recall |
| ROC-AUC | Classification capability |
| Confusion Matrix | Error analysis |

---

# 📊 Validation Accuracy

![Validation Accuracy](assets/Validation%20Accuracy%20Curve.png)

The validation accuracy steadily improved throughout training, indicating effective learning and strong generalization performance.

---

# 📉 Training vs Validation Loss

![Training vs Validation Loss](assets/Training%20vs%20Validation%20Loss%20Curve.png)

The training and validation loss curves demonstrate stable convergence with no major signs of overfitting.

---

# 📉 Loss Curve

![Loss Curve](assets/Loss%20Curve.png)

The training loss consistently decreased as the model learned increasingly meaningful contextual representations.

---

# 📊 ROC Curve

![ROC Curve](assets/ROC%20curve.png)

The ROC curve illustrates the model's ability to distinguish between hate speech and non-hate speech across different thresholds.

---

# 📊 Precision–Recall Curve

![Precision Recall Curve](assets/Precision-Recall%20Curve.png)

The Precision–Recall curve highlights the model's effectiveness in identifying hate speech while maintaining high precision.

---

# 📊 Confusion Matrix

![Confusion Matrix](assets/Confusion_matrix.png)

The confusion matrix summarizes the classification results.

### Highlights

- ✅ High True Positives
- ✅ High True Negatives
- ✅ Low False Positives
- ✅ Low False Negatives

---

# 📊 Confidence Distribution

![Confidence Histogram](assets/Confidence%20Histogram%20curve.png)

The confidence histogram shows that the model generally makes predictions with high confidence, indicating reliable performance.

---

# 📊 Validation F1 Score

![Validation F1 Score](assets/Validation%20F1%20Score%20Curve.png)

The validation F1-score remained consistently high during training, demonstrating a strong balance between precision and recall.

---# 📸 Screenshot Gallery

## 🌐 Chrome Extension Dashboard

![Instagram Demo 1](assets/screenshots/instagram_demo_1.png)

The extension continuously scans Instagram comments and detects potentially hateful content in real time.

---

## 📊 Live Comment Analysis

![Instagram Demo 2](assets/screenshots/instagram_demo_2.png)

Each detected comment is classified as **Hate Speech** or **Non-Hate Speech** along with a confidence score generated by the XLM-RoBERTa model.

---

## 🤖 Prediction Examples

### Hate Speech Prediction

![Prediction Hate](assets/screenshots/prediction_hate.png)

---

### Hate Speech Example

![Prediction Hate Example](assets/screenshots/prediction_hate_example.png)

---

### Non-Hate Speech Prediction

![Prediction Non Hate](assets/screenshots/prediction_non_hate.png)

---

### Successful Detection

![Prediction Success](assets/screenshots/prediction_success.png)

These screenshots demonstrate the practical deployment of the trained model through the Chrome Extension.

---

# 🎯 Applications

The proposed system can be applied to a wide variety of real-world Natural Language Processing (NLP) and content moderation scenarios.

## 🌐 Social Media Moderation

Automatically detect hateful comments on platforms such as Instagram, Facebook, Twitter (X), and YouTube.

---

## 💬 Online Community Management

Assist moderators by identifying offensive posts before they become publicly visible.

---

## 🛡️ Cyberbullying Detection

Protect users from abusive language and online harassment.

---

## 🎮 Gaming Platforms

Moderate toxic chat messages during online gameplay.

---

## 📰 News Websites

Filter abusive comments from discussion sections.

---

## 🎓 Educational Platforms

Maintain respectful communication in discussion forums.

---

## ☁️ Moderation APIs

Deploy the model as a REST API for integration into existing applications.

---

## 📊 Social Media Analytics

Analyze large collections of comments to identify trends in abusive language.

---

# 🚀 Future Enhancements

Although the current implementation focuses on English binary hate speech detection, the modular architecture allows easy expansion.

### Planned Improvements

- 🌍 Multilingual Hate Speech Detection
- 🧠 Explainable AI (XAI)
- 😊 Emotion Detection
- 😀 Sentiment Analysis
- 🎭 Hate Severity Classification
- 📱 Android & iOS Applications
- ☁️ Cloud Deployment (AWS, Azure, GCP)
- 🐳 Docker Containerization
- 🔐 JWT Authentication
- 📊 Interactive Analytics Dashboard
- ⚡ Streaming Prediction
- 🤖 LLM-Assisted Moderation
- 📈 Active Learning Pipeline
- 🔄 Continuous Model Retraining

---

# 🗺️ Roadmap

| Status | Feature |
|----------|---------|
| ✅ | Dataset Collection |
| ✅ | Data Preprocessing |
| ✅ | Fine-Tuning XLM-RoBERTa |
| ✅ | Model Evaluation |
| ✅ | FastAPI Backend |
| ✅ | Chrome Extension |
| ✅ | GitHub Documentation |
| 🔄 | Docker Support |
| 🔄 | Cloud Deployment |
| 🔄 | Explainable AI |
| 🔄 | Multilingual Extension |
| 🔄 | Mobile Application |

---

# 👥 Contributors

This project was developed collaboratively.

| GitHub | Name | Role |
|----------|------|------|
| [@Saad-tech1606](https://github.com/Saad-tech1606) | **Md Saad Alam** | Project Lead • AI Model Development • FastAPI Backend • Documentation |
| [@fatimazafarrizvi](https://github.com/fatimazafarrizvi) | **Fatima Rizvi** | Chrome Extension Development |
| [@harshsharma1927](https://github.com/harshsharma1927) | **Harsh Sharma** | Testing & Validation |
| [@snehasingh-3](https://github.com/snehasingh-3) | **Sneha Singh** | Dataset Preparation & Documentation |

---

# 📜 License

This project is licensed under the **MIT License**.

You are free to:

- ✅ Use
- ✅ Modify
- ✅ Distribute
- ✅ Contribute

Please retain the original license and attribution when redistributing this project.

---

# 📚 Citation

If you use this project in your research or academic work, please cite it as:

```bibtex
@misc{hate_speech_detection_xlmroberta,
  author    = {Md Saad Alam},
  title     = {Hate Speech Detection using XLM-RoBERTa with FastAPI and Chrome Extension},
  year      = {2026},
  publisher = {GitHub},
  url       = {https://github.com/Saad-tech1606/Hate-Speech-Detection}
}
```

---

# 📊 Project Statistics

| Category | Details |
|------------|---------|
| Domain | Natural Language Processing (NLP) |
| Task | Binary Hate Speech Detection |
| Model | XLM-RoBERTa |
| Framework | PyTorch |
| NLP Library | Hugging Face Transformers |
| Backend | FastAPI |
| Browser Extension | Manifest V3 |
| Programming Language | Python |
| Deployment | Local REST API |
| Classification | Binary |

---

# 💡 Skills Demonstrated

This project demonstrates practical experience in:

- Python Programming
- PyTorch
- Hugging Face Transformers
- XLM-RoBERTa
- Natural Language Processing
- Deep Learning
- Transfer Learning
- FastAPI
- REST API Development
- Chrome Extension Development
- Machine Learning Model Deployment
- Data Preprocessing
- Model Evaluation
- Git
- GitHub

---

# 👨‍💻 Author

## Md Saad Alam

**B.Tech Computer Science Engineering Graduate**

Passionate about:

- 🤖 Artificial Intelligence
- 🧠 Machine Learning
- 💬 Natural Language Processing
- 📊 Data Science
- 🌐 Software Development

### Connect with Me

- **GitHub:** https://github.com/Saad-tech1606
- **LinkedIn:** *(Add your LinkedIn profile URL)*
- **Email:** *(Add your professional email)*

---

# 🙏 Acknowledgements

Special thanks to the open-source community and the technologies that made this project possible.

- Meta AI
- Hugging Face
- PyTorch
- FastAPI
- Uvicorn
- Scikit-learn
- NumPy
- Pandas
- GitHub

Their tools and libraries made the development of this project possible.

---

# ⭐ Support the Project

If you found this repository useful,

⭐ Star this repository

🍴 Fork the project

🐛 Report Issues

💡 Suggest Improvements

🤝 Submit Pull Requests

Your support helps improve the project and motivates future development.

---

<p align="center">

# 🚀 Building Safer Online Communities with AI

### Made with ❤️ using Python, XLM-RoBERTa, FastAPI & Chrome Extension

⭐ **If you found this project useful, don't forget to Star the repository!**

</p>
