<p align="center">
  <img src="assets/banner.png" alt="Hate Speech Detection Banner" width="100%">
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

The rapid growth of online social media platforms has significantly increased the spread of **hate speech, abusive language, offensive comments, and toxic content**. Detecting such harmful content manually is challenging due to the enormous volume of user-generated data.

This project presents a **Transformer-Based Hate Speech Detection System** built using **XLM-RoBERTa**, capable of accurately classifying text into:

- ✅ Non-Hate Speech
- 🚫 Hate Speech

Unlike traditional text classifiers, this project also demonstrates a **real-world deployment** through a **Chrome Extension** that scans Instagram comments in real time and highlights potentially hateful content with confidence scores.

The project combines **Natural Language Processing (NLP)**, **Deep Learning**, **FastAPI**, and a **Chrome Extension** into a complete, modular, and deployment-ready solution.

---

# ✨ Key Features

- 🚀 Fine-tuned **XLM-RoBERTa Transformer Model**
- 🌐 Real-Time Hate Speech Detection
- 🧠 Context-Aware Text Understanding
- 📊 High Accuracy Binary Classification
- 🔥 Chrome Extension for Instagram
- ⚡ FastAPI Backend
- 📈 Confidence Score Prediction
- 📉 Performance Evaluation
- 📂 Modular Project Structure
- 🧩 Easy Integration with Other Applications

---

# 🎯 Problem Statement

Online platforms receive millions of comments every day, making manual moderation nearly impossible.

Traditional keyword-based systems fail to understand context and often produce inaccurate results.

This project addresses these challenges by leveraging **Transformer-based contextual language understanding** to improve hate speech detection while demonstrating practical deployment through a browser extension.

---

# 📸 Project Preview

## 🌐 Chrome Extension in Action

<p align="center">
  <img src="assets/screenshots/instagram_demo_1.png" width="48%" alt="Instagram Demo 1">
  <img src="assets/screenshots/instagram_demo_2.png" width="48%" alt="Instagram Demo 2">
</p>

The Chrome Extension continuously scans Instagram comments and highlights potentially hateful content while displaying prediction confidence and scan statistics.

---

## 🤖 Prediction Examples

<p align="center">

<img src="assets/screenshots/prediction_hate.png" width="45%">

<img src="assets/screenshots/prediction_non_hate.png" width="45%">

</p>

<p align="center">

<img src="assets/screenshots/prediction_success.png" width="45%">

<img src="assets/screenshots/prediction_hate_example.png" width="45%">

</p>

These examples demonstrate the model's ability to classify both hateful and non-hateful text with associated confidence scores.

---

# 📑 Table of Contents

- [✨ Key Features](#-key-features)
- [🧠 Model Architecture](#-model-architecture)
- [⚙️ Project Workflow](#️-project-workflow)
- [📂 Project Structure](#-project-structure)
- [🛠️ Technologies Used](#️-technologies-used)
- [🚀 Installation](#-installation)
- [▶️ Running the Project](#️-running-the-project)
- [🌐 Chrome Extension](#-chrome-extension)
- [📊 Dataset](#-dataset)
- [🤖 Model Details](#-model-details)
- [📈 Performance Evaluation](#-performance-evaluation)
- [📸 Screenshots](#-screenshots)
- [🎯 Applications](#-applications)
- [🔮 Future Enhancements](#-future-enhancements)
- [👨‍💻 Author](#-author)
- [📜 License](#-license)

---

# 💡 Why XLM-RoBERTa?

XLM-RoBERTa is a Transformer-based language model that captures contextual relationships between words far more effectively than traditional machine learning and recurrent neural network models.

### Advantages

- ✅ Contextual Understanding
- ✅ Better Semantic Representation
- ✅ Handles Complex Sentence Structures
- ✅ Strong Generalization Capability
- ✅ High Performance in Hate Speech Detection
- ✅ Easily Extendable to Multilingual Detection

---
# 🧠 Model Architecture

The proposed system utilizes **XLM-RoBERTa (Cross-lingual Language Model - RoBERTa)**, a Transformer-based language model developed by Meta AI. The model is fine-tuned for **binary hate speech classification**, enabling it to understand contextual meaning rather than relying on keyword matching.

<p align="center">
    <img src="docs/XLM-Roberta_architecture.png" width="95%">
</p>

### Architecture Pipeline

```text
                    Input Text
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
             Classification Head (Linear)
                         │
                         ▼
         Hate Speech / Non-Hate Prediction
```

### Key Components

| Component | Description |
|------------|-------------|
| **Tokenizer** | Converts raw text into token IDs understandable by the model. |
| **Transformer Encoder** | Learns contextual semantic relationships between words. |
| **Classification Layer** | Produces binary prediction (Hate / Non-Hate). |
| **Softmax Layer** | Calculates prediction probabilities and confidence score. |

---

# ⚙️ System Workflow

The project follows an end-to-end NLP pipeline that transforms raw user text into hate speech predictions.

```text
                        User Input
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
         FastAPI Response → Chrome Extension
```

---

# 🛠️ Technology Stack

| Category | Technology |
|------------|------------|
| Programming Language | Python 3.10 |
| Deep Learning | PyTorch |
| NLP Framework | Hugging Face Transformers |
| Transformer Model | XLM-RoBERTa |
| Backend | FastAPI |
| Browser Extension | Chrome Extension (Manifest V3) |
| API Server | Uvicorn |
| Development | Jupyter Notebook |
| Version Control | Git & GitHub |

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
│   ├── Validation Accuracy Curve.png
│   ├── Loss Curve.png
│   ├── ROC curve.png
│   ├── Precision-Recall Curve.png
│   ├── Confusion_matrix.png
│   ├── Confidence Histogram curve.png
│   ├── Training vs Validation Loss Curve.png
│   └── Validation F1 Score Curve.png
│
├── 📁 Chrome Extension
│
├── 📁 datasets
│
├── 📁 docs
│
├── 📁 HateSpeech_XLMRoBERTa_Final
│
├── 📁 model
│
├── 📁 notebooks
│
├── 📁 scripts
│
├── requirements.txt
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Saad-tech1606/Hate-Speech-Detection.git
```

---

## Navigate into the Project

```bash
cd Hate-Speech-Detection
```

---

## Create Virtual Environment (Optional)

Windows

```bash
python -m venv venv
```

Activate

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# ▶️ Running the API Server

Run the FastAPI backend:

```bash
python -m api.server
```

or

```bash
uvicorn api.server:app --reload
```

Server starts at:

```text
http://127.0.0.1:8000
```

Swagger Documentation

```text
http://127.0.0.1:8000/docs
```

ReDoc

```text
http://127.0.0.1:8000/redoc
```

---

# 🌐 Chrome Extension Setup

1. Open **Google Chrome**
2. Navigate to:

```text
chrome://extensions
```

3. Enable **Developer Mode**
4. Click **Load Unpacked**
5. Select the **Chrome Extension** folder
6. Start the FastAPI backend
7. Open Instagram
8. Refresh the page
9. The extension will automatically begin scanning comments.

---

# 🔌 API Endpoints

## Health Check

```http
GET /health
```

Example Response

```json
{
  "status": "ok",
  "model_loaded": true
}
```

---

## Predict Single Text

```http
POST /predict
```

Example Request

```json
{
  "text": "Go kill your father."
}
```

Example Response

```json
{
  "prediction": 1,
  "label": "Hate",
  "confidence": 0.9911
}
```

---

## Batch Prediction

```http
POST /predict/batch
```

Example

```json
{
  "texts": [
      "You are amazing.",
      "Go kill yourself."
  ]
}
```

---

# 📦 Dependencies

Major libraries used in this project:

- PyTorch
- Transformers
- FastAPI
- Uvicorn
- NumPy
- Pandas
- Scikit-learn
- Pydantic
- TorchVision

All required dependencies are available in:

```text
requirements.txt
```

---

# 🔥 Highlights

✅ Fine-Tuned XLM-RoBERTa

✅ FastAPI REST API

✅ Chrome Extension Integration

✅ Real-Time Instagram Comment Detection

✅ Context-Aware NLP

✅ High Confidence Prediction

✅ Modular Project Architecture

✅ Easy Deployment
# 📊 Dataset

The model was trained on a carefully curated **English Hate Speech Dataset** consisting of labeled text samples categorized into two classes:

| Label | Description |
|--------|-------------|
| **0** | Non-Hate Speech |
| **1** | Hate Speech |

### Dataset Processing

The dataset underwent several preprocessing steps to improve data quality while preserving contextual information.

✔️ Removal of duplicate samples

✔️ Handling of missing values

✔️ Text normalization

✔️ Label encoding

✔️ Preservation of contextual elements such as punctuation and emojis

✔️ Train-Test split for evaluation

---

# 🤖 Model Details

The project employs a **fine-tuned XLM-RoBERTa** Transformer model for binary hate speech classification.

Unlike traditional machine learning approaches that rely on handcrafted features, XLM-RoBERTa captures deep semantic and contextual relationships within text, enabling significantly better performance on offensive and hateful language detection.

## Model Configuration

| Parameter | Value |
|------------|---------|
| Model | XLM-RoBERTa |
| Task | Binary Text Classification |
| Framework | Hugging Face Transformers |
| Backend | PyTorch |
| Maximum Sequence Length | 128 Tokens |
| Output Classes | Hate / Non-Hate |

---

# 🏋️ Model Training Pipeline

```text
Raw Dataset
      │
      ▼
Data Cleaning
      │
      ▼
Tokenization
      │
      ▼
Train / Validation Split
      │
      ▼
Fine-Tuning XLM-RoBERTa
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
Chrome Extension
```

---

# 📈 Model Performance

The model was evaluated using multiple standard classification metrics to assess its effectiveness and reliability.

| Metric | Description |
|---------|-------------|
| Accuracy | Overall prediction correctness |
| Precision | Correct hate speech predictions |
| Recall | Ability to identify hate speech |
| F1-Score | Balance between Precision and Recall |
| ROC-AUC | Classification capability |
| Confusion Matrix | Prediction distribution |

---

# 📊 Training Results

## Validation Accuracy

<p align="center">
<img src="assets/Validation Accuracy Curve.png" width="90%">
</p>

The validation accuracy consistently improved during training, indicating effective learning and good generalization.

---

## Training & Validation Loss

<p align="center">
<img src="assets/Training vs Validation Loss Curve.png" width="90%">
</p>

The loss curves demonstrate stable convergence with no significant signs of overfitting.

---

## Loss Curve

<p align="center">
<img src="assets/Loss Curve.png" width="90%">
</p>

Training loss steadily decreases as the model learns meaningful contextual representations.

---

# 📊 ROC Curve

<p align="center">
<img src="assets/ROC curve.png" width="90%">
</p>

The ROC Curve illustrates the model's ability to effectively distinguish between hate speech and non-hate speech across different classification thresholds.

---

# 📊 Precision-Recall Curve

<p align="center">
<img src="assets/Precision-Recall Curve.png" width="90%">
</p>

The Precision-Recall Curve demonstrates strong performance in identifying hate speech while maintaining high precision.

---

# 📊 Confusion Matrix

<p align="center">
<img src="assets/Confusion_matrix.png" width="70%">
</p>

The confusion matrix provides a detailed view of the model's prediction distribution across both classes.

It highlights:

- High True Positive Rate
- High True Negative Rate
- Low False Positives
- Low False Negatives

---

# 📊 Confidence Distribution

<p align="center">
<img src="assets/Confidence Histogram curve.png" width="90%">
</p>

The confidence histogram indicates that the model generally makes predictions with high confidence, suggesting reliable classification performance.

---

# 📊 Validation F1 Score

<p align="center">
<img src="assets/Validation F1 Score Curve.png" width="90%">
</p>

The F1-score remained consistently high throughout training, reflecting a balanced trade-off between precision and recall.

---

# 🌐 Chrome Extension Demonstration

The project includes a browser extension that demonstrates the practical deployment of the trained model.

### Features

- Real-time Instagram comment analysis
- Binary hate speech prediction
- Confidence score display
- Lightweight interface
- Fast API communication
- Easy installation

---

## Instagram Monitoring

<p align="center">
<img src="assets/screenshots/instagram_demo_1.png" width="47%">
<img src="assets/screenshots/instagram_demo_2.png" width="47%">
</p>

The extension continuously monitors visible comments and highlights potentially hateful content.

---

# 🧪 Prediction Examples

## Hate Speech Detection

<p align="center">
<img src="assets/screenshots/prediction_hate.png" width="46%">
<img src="assets/screenshots/prediction_hate_example.png" width="46%">
</p>

The model successfully identifies hateful and abusive language with high confidence.

---

## Non-Hate Speech Detection

<p align="center">
<img src="assets/screenshots/prediction_non_hate.png" width="46%">
<img src="assets/screenshots/prediction_success.png" width="46%">
</p>

The classifier correctly recognizes normal conversational text as non-hateful while maintaining low false positive rates.

---

# 🎯 Key Outcomes

✔️ Successfully fine-tuned an XLM-RoBERTa model for hate speech detection.

✔️ Built a complete FastAPI backend for real-time inference.

✔️ Developed a Chrome Extension for practical deployment.

✔️ Achieved reliable binary text classification.

✔️ Demonstrated contextual understanding beyond keyword matching.

✔️ Designed a modular architecture suitable for future expansion.
# 🎯 Applications

This project can be adapted for a wide range of real-world content moderation and NLP applications, including:

- 🌐 Social Media Content Moderation
- 💬 Online Community Management
- 🛡️ Cyberbullying Detection
- 📱 Comment & Chat Filtering
- 🎮 Gaming Platform Moderation
- 📰 News Website Comment Analysis
- 🏫 Educational Platform Moderation
- 🤖 AI-powered Content Monitoring
- ☁️ Cloud-based Moderation APIs
- 📊 Social Media Analytics

---

# 🚀 Future Enhancements

The modular design of this project makes it easy to extend with additional capabilities.

### Planned Improvements

- 🌍 Multilingual Hate Speech Detection
- 🧠 Explainable AI (XAI) for prediction interpretation
- 😊 Emotion & Sentiment Analysis
- 🎭 Offensive Language Severity Classification
- 📱 Mobile Application Integration
- ⚡ Real-Time Streaming Detection
- ☁️ Cloud Deployment (AWS, Azure, GCP)
- 🐳 Docker Containerization
- 🔐 User Authentication & API Security
- 📈 Interactive Analytics Dashboard

---

# 👥 Contributors

This project was developed collaboratively by:

| GitHub | Name | Role |
|--------|------|------|
| [@Saad-tech1606](https://github.com/Saad-tech1606) | Md Saad Alam | Project Lead |
| [@fatimazafarrizvi](https://github.com/fatimazafarrizvi) | Fatima Rizvi | 
| [@harshsharma1927](https://github.com/harshsharma1927) | Harsh Sharma | 
| [@snehasingh-3](https://github.com/snehasingh-3) | Sneha Singh | 

# 📜 License

This project is licensed under the **MIT License**.

You are free to:

- ✅ Use
- ✅ Modify
- ✅ Distribute
- ✅ Contribute

Please include the original license and attribution when redistributing the project.

---

# 📚 Citation

If you use this project in your research or academic work, please cite it as:

```bibtex
@misc{hate_speech_detection_xlmroberta,
  author = {Md Saad Alam},
  title = {Hate Speech Detection using XLM-RoBERTa with FastAPI and Chrome Extension},
  year = {2026},
  publisher = {GitHub},
  url = {https://github.com/Saad-tech1606/Hate-Speech-Detection}
}
```

---

# 📈 Roadmap

- [x] Dataset Preparation
- [x] Data Preprocessing
- [x] Fine-Tune XLM-RoBERTa
- [x] Model Evaluation
- [x] FastAPI Integration
- [x] Chrome Extension
- [x] GitHub Documentation
- [ ] Docker Support
- [ ] Cloud Deployment
- [ ] Explainable AI (XAI)
- [ ] Multilingual Extension
- [ ] Web Dashboard

---

# 📊 Project Statistics

| Category | Details |
|----------|---------|
| **Domain** | Natural Language Processing (NLP) |
| **Task** | Binary Hate Speech Detection |
| **Model** | XLM-RoBERTa |
| **Framework** | PyTorch & Hugging Face Transformers |
| **Backend** | FastAPI |
| **Frontend** | Chrome Extension |
| **Language** | English |
| **Deployment** | Local API + Browser Extension |

---

# 💡 Skills Demonstrated

This project demonstrates practical experience with:

- Python
- PyTorch
- Hugging Face Transformers
- XLM-RoBERTa
- Natural Language Processing
- Deep Learning
- FastAPI
- REST APIs
- Chrome Extension Development
- Git & GitHub
- Model Evaluation
- Data Preprocessing
- Deployment of AI Models

---

# 👨‍💻 Author

## Md Saad Alam

**Computer Science Engineering Graduate**

Passionate about:

- 🤖 Artificial Intelligence
- 🧠 Machine Learning
- 💬 Natural Language Processing
- 📊 Data Science
- 🌐 Full Stack Development

### Connect with Me

- **GitHub:** https://github.com/Saad-tech1606
- **LinkedIn:** *(Add your LinkedIn profile URL here)*
- **Email:** *(Add your professional email here)*

---

# 🙏 Acknowledgements

This project was made possible with the help of the following open-source technologies and communities:

- Meta AI — XLM-RoBERTa
- Hugging Face Transformers
- PyTorch
- FastAPI
- Uvicorn
- Scikit-learn
- NumPy
- Pandas
- GitHub

Special thanks to the open-source community for providing powerful tools that make modern NLP research and development accessible.

---

# ⭐ Support the Project

If you found this project helpful or interesting:

⭐ Star the repository

🍴 Fork it

🐛 Report issues

💡 Suggest improvements

🤝 Contribute new features

Your support helps improve the project and encourages future development.

---

<p align="center">

## 🚀 Building Safer Online Communities with AI

**Made with ❤️ using Python, XLM-RoBERTa, FastAPI, and Chrome Extension**

</p>

> ⭐ **If you find this project useful, consider giving it a Star on GitHub!**
