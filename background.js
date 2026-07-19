const DEFAULT_API_URL = "http://127.0.0.1:8000";

async function getApiUrl() {
  const { apiUrl } = await chrome.storage.sync.get({ apiUrl: DEFAULT_API_URL });
  return apiUrl.replace(/\/$/, "");
}

function isInstagramUrl(url = "") {
  try {
    const host = new URL(url).hostname;
    return /(^|\.)instagram\.com$/i.test(host);
  } catch {
    return false;
  }
}

async function injectIntoTab(tabId) {
  try {
    await chrome.scripting.insertCSS({
      target: { tabId },
      files: ["content.css"],
    });
  } catch (err) {
    console.warn("[HSD] CSS inject:", err.message);
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js", "instagram.js"],
    });
    console.log("[HSD] Scripts injected into tab", tabId);
    return { ok: true };
  } catch (err) {
    console.warn("[HSD] Script inject failed:", err.message);
    return { ok: false, error: err.message };
  }
}

chrome.runtime.onInstalled.addListener(async () => {
  try {
    await chrome.contextMenus.removeAll();
  } catch {
    // ignore
  }

  chrome.contextMenus.create({
    id: "analyze-selection",
    title: "Analyze for hate speech",
    contexts: ["selection"],
  });

  // Inject into any already-open Instagram tabs
  const tabs = await chrome.tabs.query({ url: ["*://*.instagram.com/*", "*://instagram.com/*"] });
  for (const tab of tabs) {
    if (tab.id) await injectIntoTab(tab.id);
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete") return;
  if (!tab?.url || !isInstagramUrl(tab.url)) return;
  await injectIntoTab(tabId);
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "analyze-selection" || !info.selectionText?.trim()) {
    return;
  }

  const text = info.selectionText.trim();

  try {
    const apiUrl = await getApiUrl();
    const response = await fetch(`${apiUrl}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.detail || "Prediction failed");
    }

    if (tab?.id) {
      await injectIntoTab(tab.id);
      chrome.tabs.sendMessage(tab.id, {
        type: "SHOW_RESULT",
        payload: { text, result },
      });
    }
  } catch (error) {
    if (tab?.id) {
      chrome.tabs.sendMessage(tab.id, {
        type: "SHOW_ERROR",
        payload: { message: error.message },
      });
    }
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "ANALYZE_TEXT") {
    analyzeAndRespond(message.text)
      .then(sendResponse)
      .catch((error) => {
        sendResponse({ error: error.message });
      });
    return true;
  }

  if (message.type === "ANALYZE_BATCH") {
    analyzeBatch(message.texts)
      .then(sendResponse)
      .catch((error) => {
        sendResponse({ error: error.message });
      });
    return true;
  }

  if (message.type === "INJECT_NOW") {
    (async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id) {
        sendResponse({ ok: false, error: "No active tab" });
        return;
      }
      if (!isInstagramUrl(tab.url || "")) {
        sendResponse({ ok: false, error: "Open Instagram first (instagram.com)" });
        return;
      }
      const result = await injectIntoTab(tab.id);
      sendResponse(result);
    })();
    return true;
  }

  if (message.type === "OPEN_POPUP_WITH_TEXT") {
    chrome.storage.local.set({ pendingText: message.text });
    sendResponse({ ok: true });
  }
});

async function analyzeAndRespond(text) {
  const apiUrl = await getApiUrl();
  const response = await fetch(`${apiUrl}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const payload = await response.json();
  if (!response.ok) {
    const detail = payload.detail;
    const message = typeof detail === "string" ? detail : "Prediction failed";
    throw new Error(message);
  }

  return payload;
}

async function analyzeBatch(texts) {
  const apiUrl = await getApiUrl();
  const response = await fetch(`${apiUrl}/predict/batch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texts }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.detail || "Batch prediction failed");
  }

  return payload;
}
