const DEFAULT_API_URL = "http://127.0.0.1:8000";

function showStatus(message, type) {
  const statusMessage = document.getElementById("statusMessage");
  statusMessage.textContent = message;
  statusMessage.className = `status ${type}`;
}

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("settingsForm");
  const apiUrlInput = document.getElementById("apiUrl");
  const thresholdInput = document.getElementById("confidenceThreshold");
  const scanToggle = document.getElementById("instagramScanEnabled");
  const testBtn = document.getElementById("testBtn");

  const stored = await chrome.storage.sync.get({
    apiUrl: DEFAULT_API_URL,
    confidenceThreshold: 0.55,
    instagramScanEnabled: true,
  });

  apiUrlInput.value = stored.apiUrl;
  thresholdInput.value = stored.confidenceThreshold;
  scanToggle.checked = stored.instagramScanEnabled;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const apiUrl = apiUrlInput.value.trim().replace(/\/$/, "");
    const confidenceThreshold = Number(thresholdInput.value);
    const instagramScanEnabled = scanToggle.checked;

    await chrome.storage.sync.set({
      apiUrl,
      confidenceThreshold,
      instagramScanEnabled,
    });
    showStatus("Settings saved.", "success");
  });

  testBtn.addEventListener("click", async () => {
    const apiUrl = apiUrlInput.value.trim().replace(/\/$/, "");

    try {
      const response = await fetch(`${apiUrl}/health`);
      if (!response.ok) {
        throw new Error("Health check failed");
      }

      const data = await response.json();
      showStatus(
        data.model_loaded ? "Connected. Model is loaded." : "Connected. Model is still loading.",
        "success"
      );
    } catch {
      showStatus("Could not connect to the API. Start the Python server first.", "error");
    }
  });
});
