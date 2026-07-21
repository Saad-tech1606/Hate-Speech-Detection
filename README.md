<div align="center">

# 🚀 Hate Speech Detection using XLM-RoBERTa

### AI-Powered Binary Hate Speech Detection System (English)

<p align="center">
Fine-Tuned XLM-RoBERTa Model for Accurate Binary Hate Speech Classification
</p>

---

![Python](https://img.shields.io/badge/Python-3.10-blue?style=for-the-badge&logo=python)

![PyTorch](https://img.shields.io/badge/PyTorch-2.1-red?style=for-the-badge&logo=pytorch)

![Transformers](https://img.shields.io/badge/HuggingFace-Transformers-yellow?style=for-the-badge)

![XLM-RoBERTa](https://img.shields.io/badge/Model-XLM--RoBERTa-success?style=for-the-badge)

![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

![GitHub Repo stars](https://img.shields.io/github/stars/Saad-tech1606/Hate-Speech-Detection?style=for-the-badge)

![GitHub forks](https://img.shields.io/github/forks/Saad-tech1606/Hate-Speech-Detection?style=for-the-badge)

![GitHub last commit](https://img.shields.io/github/last-commit/Saad-tech1606/Hate-Speech-Detection?style=for-the-badge)

</div>

---

# 📖 Table of Contents

- Project Overview
- Features
- System Workflow
- XLM-RoBERTa Architecture
- Dataset
- Performance
- Results
- Tech Stack
- Project Structure
- Installation
- Usage
- Offline Prediction
- Chrome Extension
- Future Scope
- Contributing
- Author
- License

---

# 📌 Project Overview

Social media platforms generate millions of user comments every day. While these platforms enable communication and collaboration, they also facilitate the spread of hate speech, abusive language, cyberbullying, and offensive content.

This project presents a **Binary Hate Speech Detection System** built using the **XLM-RoBERTa Transformer Model**. The system classifies English text into two categories:

- ✅ Non-Hate Speech
- ❌ Hate Speech

The primary objective is to develop a practical, deployment-ready solution that can later be integrated into browser extensions, moderation systems, and content filtering applications.

---

# ✨ Features

- Fine-Tuned XLM-RoBERTa Model
- Binary Hate Speech Classification
- English Language Support
- Custom Merged Dataset
- Transformer-based Contextual Learning
- High Prediction Accuracy
- Offline Prediction Support
- Google Colab Training
- PyTorch Implementation
- Hugging Face Transformers
- Confusion Matrix
- ROC Curve
- Precision-Recall Curve
- Training & Validation Loss Curve
- Classification Report
- Chrome Extension Ready

---

# 🏗️ System Workflow

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
          Hate / Non-Hate Prediction
                         │
                         ▼
          Probability & Confidence Score
```

---

# 🧠 Model Architecture

The proposed system utilizes **XLM-RoBERTa**, a transformer-based multilingual language model developed by Meta AI.

Although XLM-RoBERTa supports multiple languages, this implementation is specifically fine-tuned for **Binary English Hate Speech Detection**.

### Architecture

- Input Text
- Tokenizer
- Embedding Layer
- Multi-Head Self Attention
- Transformer Encoder
- Classification Head
- Softmax Layer
- Binary Prediction

---

## 📷 XLM-RoBERTa Architecture

> Place your architecture image here.

```
Images/
└── XLM-Roberta_architecture.png
```

Example:

```markdown
<p align="center">
<img src="D:\Hate_Speech/XLM-Roberta_architecture.png" width="850">
</p>
```

---

# 📊 Dataset

The dataset used for this project was created by merging multiple publicly available hate speech datasets.

### Dataset Characteristics

| Property | Value |
|----------|--------|
| Language | English |
| Classes | Binary |
| Hate Speech | 1 |
| Non-Hate Speech | 0 |
| Format | CSV |

### Data Processing

- Duplicate Removal
- Missing Value Handling
- Label Standardization
- Data Cleaning
- Context Preservation
- Binary Label Conversion

---

# 📈 Model Performance

The final fine-tuned model achieved excellent classification performance.

| Metric | Score |
|---------|--------|
| Accuracy | ~92% |
| Precision | ~87% |
| Recall | ~91% |
| F1 Score | ~89% |
| ROC-AUC | ~97% |

---

# 📷 Evaluation Results

The following evaluation metrics are included:

- ✅ Confusion Matrix
- ✅ Classification Report
- ✅ ROC Curve
- ✅ Precision-Recall Curve
- ✅ Accuracy Curve
- ✅ Loss Curve
- ✅ F1 Score Curve
- ✅ Precision Curve
- ✅ Recall Curve

---

## Example

```markdown
<p align="center">
<img src="Results/confusion_matrix.png" width="600">
</p>

<p align="center">
<img src="Results/ROC_Curve.png" width="600">
</p>

<p align="center">
<img src="Results/Loss_Curve.png" width="600">
</p>
```

---

# 🛠️ Tech Stack

| Category | Technology |
|------------|----------------|
| Programming | Python |
| Framework | PyTorch |
| NLP | Hugging Face Transformers |
| Model | XLM-RoBERTa |
| ML Library | Scikit-Learn |
| Data Processing | Pandas |
| Numerical Computing | NumPy |
| Visualization | Matplotlib |
| IDE | VS Code |
| Training Platform | Google Colab |
| Version Control | Git |
| Repository | GitHub |

---

# 📂 Project Structure

```text
Hate-Speech-Detection
│
├── Dataset
│
├── Images
│
├── Results
│
├── predict.py
├── test.py
├── test_model.py
├── version.py
│
├── PRD_Hate_Speech.docx
│
├── README.md
│
└── .gitignore
```

---
# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/Saad-tech1606/Hate-Speech-Detection.git
```

Move into the project directory.

```bash
cd Hate-Speech-Detection
```

---

## Create Virtual Environment (Recommended)

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install torch
pip install transformers==4.53.3
pip install sentencepiece
pip install scikit-learn
pip install pandas
pip install numpy
pip install matplotlib
pip install seaborn
```

or simply

```bash
pip install -r requirements.txt
```

---

# 🚀 Running the Project

## Train the Model

Open the training notebook in Google Colab and execute all cells.

```
Notebook/
└── English_HateSpeech_Training.ipynb
```

---

## Offline Prediction

Run

```bash
python predict.py
```

Example

```
Enter text:

I hate you.

Prediction:
Hate Speech

Confidence:
98.74%
```

---

# 💻 Example Predictions

### Example 1

Input

```
You are a wonderful person.
```

Output

```
Prediction:
Non-Hate Speech

Confidence:
99.84%
```

---

### Example 2

Input

```
Kill all Muslims.
```

Output

```
Prediction:
Hate Speech

Confidence:
99.32%
```

---

### Example 3

Input

```
I hope you have a great day.
```

Output

```
Prediction:
Non-Hate Speech

Confidence:
99.71%
```

---

# 📷 Project Demonstration

### Confusion Matrix

```markdown
<p align="center">
<img src="Results/confusion_matrix.png" width="700">
</p>
```

---

### ROC Curve

```markdown
<p align="center">
<img src="Results/ROC_Curve.png" width="700">
</p>
```

---

### Precision Recall Curve

```markdown
<p align="center">
<img src="Results/Precision_Recall.png" width="700">
</p>
```

---

### Training & Validation Loss

```markdown
<p align="center">
<img src="Results/Loss_Curve.png" width="700">
</p>
```

---

### Accuracy Curve

```markdown
<p align="center">
<img src="Results/Accuracy_Curve.png" width="700">
</p>
```

---

# 🌐 Chrome Extension (In Progress)

The trained model is being integrated into a Chrome Extension that will:

- Detect Hate Speech on Web Pages
- Analyze User Comments
- Display Prediction Confidence
- Provide Real-Time Moderation
- Highlight Harmful Content

Future releases will support seamless browser-based hate speech detection using the trained XLM-RoBERTa model.

---

# 📊 Future Enhancements

- Chrome Extension Deployment
- Explainable AI (XAI)
- Real-Time Web API
- REST API using Flask/FastAPI
- Docker Deployment
- Mobile Application
- Cloud Deployment
- Batch Prediction
- Dashboard Analytics
- Advanced Moderation Tools

---

# 🔬 Research Contribution

This project demonstrates the application of transformer-based contextual language models for binary hate speech detection.

Unlike many benchmark-focused studies, this work emphasizes:

- Practical deployment
- Context-preserving preprocessing
- Modular architecture
- Offline inference
- Future browser integration

---

# 📂 Repository

```
Hate-Speech-Detection/
│
├── Dataset/
├── Images/
├── Results/
├── predict.py
├── test.py
├── test_model.py
├── version.py
├── PRD_Hate_Speech.docx
├── README.md
└── .gitignore
```

---

# 🤝 Contributing

Contributions are welcome.

If you would like to improve this project:

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push the branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Author

## Md Saad Alam

**B.Tech – Computer Science & Engineering**

Calcutta Institute of Engineering & Management

### Skills

- Artificial Intelligence
- Machine Learning
- Deep Learning
- Natural Language Processing
- Python
- PyTorch
- Hugging Face
- Data Science
- SQL
- Git
- GitHub

---

## Connect with Me

### GitHub

https://github.com/Saad-tech1606

### LinkedIn

> Add your LinkedIn Profile Here

---

# 📚 References

- XLM-RoBERTa
- Hugging Face Transformers
- PyTorch
- Scikit-Learn
- Google Colab
- Pandas
- NumPy

---

# ⭐ Support

If you found this project useful:

⭐ Star this repository

🍴 Fork this repository

🛠️ Contribute to the project

📢 Share it with others

---

# 📜 License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this project with proper attribution.

---

<div align="center">

## ❤️ Thank You for Visiting

### If you like this project, don't forget to ⭐ Star the Repository!

Made with ❤️ by the collaborative efforts of **Md Saad Alam, Harsh Sharma, Fatima Zafar Rizvi & Sneha Singh**

</div>
