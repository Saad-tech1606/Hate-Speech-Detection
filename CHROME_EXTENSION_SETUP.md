# Chrome Extension Setup Guide

This project uses a **local Python API** to run the ~1 GB XLM-RoBERTa model, and a **Chrome Extension** that sends text to that API for classification.

## Architecture

```
Chrome Extension  -->  FastAPI (localhost:8000)  -->  XLM-RoBERTa model
     |                         |
  popup / context menu    POST /predict
  selected text analysis  GET /health
```

The model cannot run directly inside the browser at this size, so the extension talks to your local Python server.

---

## Prerequisites

- Python 3.10+
- Google Chrome
- ~2 GB free disk space (model + dependencies)
- The model folder: `HateSpeech_XLMRoBERTa_Final/`

---

## Step 1: Install Python Dependencies

Open a terminal in the project root (`D:\Hate_Speech`):

```powershell
cd D:\Hate_Speech
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

First run will download PyTorch and Transformers packages. This may take several minutes.

---

## Step 2: Generate Extension Icons

```powershell
python generate_icons.py
```

This creates `Chrome Extension/icons/icon16.png`, `icon48.png`, and `icon128.png`.

---

## Step 3: Start the API Server

From the project root with the virtual environment activated:

```powershell
python -m api.server
```

Wait until you see:

```
Loading hate speech model...
Model ready.
```

The server runs at **http://127.0.0.1:8000**.

### Verify the API

Open in browser or run:

```powershell
curl http://127.0.0.1:8000/health
curl -X POST http://127.0.0.1:8000/predict -H "Content-Type: application/json" -d "{\"text\": \"Hello world\"}"
```

Expected response:

```json
{
  "prediction": 0,
  "label": "Non-Hate",
  "confidence": 0.98,
  "probabilities": {
    "non_hate": 0.98,
    "hate": 0.02
  }
}
```

---

## Step 4: Load the Chrome Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the folder: `D:\Hate_Speech\Chrome Extension`
5. Pin the extension from the puzzle icon in the toolbar

---

## Step 5: Use the Extension

### Instagram live highlighting (main feature)
1. Start the API server (`python -m api.server`)
2. Open [https://www.instagram.com](https://www.instagram.com) and log in
3. Reload the extension if you just updated files (`chrome://extensions` → Reload)
4. Browse posts / open comments
5. A floating panel appears (bottom-right): **Hate Speech Detector**
6. Hate comments/captions get a **red highlight** + a `Hate XX%` badge

Controls:
- **Pause / Resume** on the floating panel or in the extension popup
- **Rescan** to clear highlights and re-analyze the page
- **Confidence threshold** in the popup (default 55%)

### Popup analysis
1. Click the extension icon
2. Paste or type text (max ~128 tokens / roughly 100 words)
3. Click **Analyze** (or press Ctrl+Enter)

### Right-click on selected text
1. Select text on any webpage
2. Right-click → **Analyze for hate speech**
3. A result overlay appears on the page

### Settings
- Open extension popup → **Settings**
- Change API URL if your server runs on a different host/port
- Toggle Instagram scanning and confidence threshold

---

## Environment Variables (Optional)

| Variable | Default | Description |
|----------|---------|-------------|
| `MODEL_PATH` | `./HateSpeech_XLMRoBERTa_Final` | Path to model folder |
| `API_HOST` | `127.0.0.1` | Server bind address |
| `API_PORT` | `8000` | Server port |
| `CORS_ORIGINS` | `*` | Comma-separated allowed origins |

Example:

```powershell
$env:MODEL_PATH = "D:\Hate_Speech\HateSpeech_XLMRoBERTa_Final"
$env:API_PORT = "8000"
python -m api.server
```

---

## File Structure

```
D:\Hate_Speech\
├── api\
│   ├── inference.py      # Model loading + prediction
│   └── server.py         # FastAPI REST API
├── Chrome Extension\
│   ├── manifest.json     # Extension config (Manifest V3)
│   ├── popup.html/js/css # Main UI
│   ├── background.js     # Context menu + API calls
│   ├── content.js/css    # On-page result overlay
│   ├── options.html/js   # API URL settings
│   └── icons\            # Extension icons
├── HateSpeech_XLMRoBERTa_Final\  # Model weights
├── predict.py            # Original CLI script
├── requirements.txt
└── generate_icons.py
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| **API offline** in popup | Start `python -m api.server` and wait for "Model ready" |
| **Model path not found** | Set `MODEL_PATH` env var or keep model in `HateSpeech_XLMRoBERTa_Final/` |
| **CORS error** | Server includes CORS middleware; ensure URL in settings matches server |
| **Slow first prediction** | Normal — model loads once at startup (~30–60s on CPU) |
| **Extension won't load** | Run `python generate_icons.py` to create missing icons |

---

## Production Deployment (Optional)

For use beyond localhost:

1. Deploy the FastAPI app on a cloud VM (AWS, GCP, Azure) with GPU optional
2. Use HTTPS (nginx + Let's Encrypt)
3. Update extension `host_permissions` in `manifest.json` with your domain
4. Set the API URL in extension Settings

For Chrome Web Store publishing, you'll need a publicly reachable HTTPS API endpoint.

---

## API Reference

### `GET /health`
Returns server and model status.

### `POST /predict`
**Request:**
```json
{ "text": "string to classify" }
```

**Response:**
```json
{
  "prediction": 1,
  "label": "Hate",
  "confidence": 0.9123,
  "probabilities": {
    "non_hate": 0.0877,
    "hate": 0.9123
  }
}
```

Labels: `0` = Non-Hate, `1` = Hate
