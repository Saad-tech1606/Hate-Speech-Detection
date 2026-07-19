const DEFAULT_API_URL = "http://127.0.0.1:8000";

async function getApiUrl() {
  const { apiUrl } = await chrome.storage.sync.get({ apiUrl: DEFAULT_API_URL });
  return apiUrl.replace(/\/$/, "");
}

function formatPercent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function setStatus(message, type = "info") {
  const statusSection = document.getElementById("statusSection");
  statusSection.textContent = message;
  statusSection.className = `status ${type}`;
  statusSection.classList.remove("hidden");
}

function hideStatus() {
  document.getElementById("statusSection").classList.add("hidden");
}

function showResult(result) {
  const resultSection = document.getElementById("resultSection");
  const badge = document.getElementById("resultBadge");
  const isHate = result.prediction === 1;

  badge.textContent = result.label;
  badge.className = `badge ${isHate ? "hate" : "non-hate"}`;

  document.getElementById("confidenceValue").textContent = formatPercent(result.confidence);
  document.getElementById("nonHateValue").textContent = formatPercent(result.probabilities.non_hate);
  document.getElementById("hateValue").textContent = formatPercent(result.probabilities.hate);
  document.getElementById("hateBar").style.width = `${result.probabilities.hate * 100}%`;

  resultSection.classList.remove("hidden");
}

async function checkApiHealth() {
  const apiStatus = document.getElementById("apiStatus");

  try {
    const apiUrl = await getApiUrl();
    const response = await fetch(`${apiUrl}/health`, { method: "GET" });
    if (!response.ok) {
      throw new Error("API unavailable");
    }

    const data = await response.json();
    if (data.model_loaded) {
      apiStatus.textContent = "API online";
      apiStatus.className = "api-status online";
    } else {
      apiStatus.textContent = "Model loading...";
      apiStatus.className = "api-status";
    }
  } catch {
    apiStatus.textContent = "API offline";
    apiStatus.className = "api-status offline";
  }
}

async function analyzeText(text) {
  const apiUrl = await getApiUrl();
  const response = await fetch(`${apiUrl}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.detail || "Prediction failed");
  }

  return payload;
}

async function getActiveInstagramTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !tab.url || !/instagram\.com/i.test(tab.url)) {
    return null;
  }
  return tab;
}

document.addEventListener("DOMContentLoaded", async () => {
  const textInput = document.getElementById("textInput");
  const analyzeBtn = document.getElementById("analyzeBtn");
  const clearBtn = document.getElementById("clearBtn");
  const igScanToggle = document.getElementById("igScanToggle");
  const thresholdInput = document.getElementById("thresholdInput");
  const thresholdValue = document.getElementById("thresholdValue");
  const rescanBtn = document.getElementById("rescanBtn");
  const activateBtn = document.getElementById("activateBtn");

  await checkApiHealth();

  const stored = await chrome.storage.sync.get({
    instagramScanEnabled: true,
    confidenceThreshold: 0.5,
  });

  igScanToggle.checked = stored.instagramScanEnabled;
  thresholdInput.value = String(Math.round(stored.confidenceThreshold * 100));
  thresholdValue.textContent = `${thresholdInput.value}%`;

  igScanToggle.addEventListener("change", async () => {
    const enabled = igScanToggle.checked;
    await chrome.storage.sync.set({ instagramScanEnabled: enabled });

    const tab = await getActiveInstagramTab();
    if (tab) {
      chrome.tabs.sendMessage(tab.id, { type: "IG_TOGGLE_SCAN", enabled });
    }
  });

  thresholdInput.addEventListener("input", () => {
    thresholdValue.textContent = `${thresholdInput.value}%`;
  });

  thresholdInput.addEventListener("change", async () => {
    const confidenceThreshold = Number(thresholdInput.value) / 100;
    await chrome.storage.sync.set({ confidenceThreshold });
  });

  activateBtn.addEventListener("click", async () => {
    setStatus("Injecting scanner into this tab...", "info");
    chrome.runtime.sendMessage({ type: "INJECT_NOW" }, (response) => {
      if (chrome.runtime.lastError) {
        setStatus(chrome.runtime.lastError.message, "error");
        return;
      }
      if (!response?.ok) {
        setStatus(response?.error || "Injection failed", "error");
        return;
      }
      setStatus("Activated. Hard-refresh Instagram (Ctrl+Shift+R) if panel is missing, then open comments.", "info");
    });
  });

  rescanBtn.addEventListener("click", async () => {
    const tab = await getActiveInstagramTab();
    if (!tab) {
      setStatus("Open an Instagram tab first, then click Rescan.", "error");
      return;
    }
    chrome.tabs.sendMessage(tab.id, { type: "IG_RESCAN" });
    setStatus("Rescan started on the current Instagram tab.", "info");
  });

  chrome.storage.local.get(["pendingText"], ({ pendingText }) => {
    if (pendingText) {
      textInput.value = pendingText;
      chrome.storage.local.remove("pendingText");
    }
  });

  analyzeBtn.addEventListener("click", async () => {
    const text = textInput.value.trim();
    if (!text) {
      setStatus("Please enter some text to analyze.", "error");
      return;
    }

    analyzeBtn.disabled = true;
    hideStatus();
    setStatus("Analyzing text...", "info");

    try {
      const result = await analyzeText(text);
      hideStatus();
      showResult(result);
    } catch (error) {
      document.getElementById("resultSection").classList.add("hidden");
      setStatus(
        `${error.message}. Make sure the Python API server is running.`,
        "error"
      );
    } finally {
      analyzeBtn.disabled = false;
    }
  });

  clearBtn.addEventListener("click", () => {
    textInput.value = "";
    hideStatus();
    document.getElementById("resultSection").classList.add("hidden");
  });

  textInput.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      analyzeBtn.click();
    }
  });
});
