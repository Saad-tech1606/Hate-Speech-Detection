/**
 * Live Instagram hate-speech scanner (robust).
 * Collects visible post/comment text, classifies via local API, highlights hate.
 */

(() => {
  if (!/(^|\.)instagram\.com$/i.test(window.location.hostname)) {
    return;
  }

  if (window.__HSD_IG_LOADED__) {
    console.log("[HSD] Instagram scanner already active");
    return;
  }
  window.__HSD_IG_LOADED__ = true;

  console.log("[HSD] Instagram scanner loaded");

  const MIN_TEXT_LENGTH = 5;
  const MAX_TEXT_LENGTH = 2000;
  const SCAN_DEBOUNCE_MS = 800;
  const MAX_CONCURRENT = 2;
  const DEFAULT_API_URL = "http://127.0.0.1:8000";
  const DEFAULTS = {
    instagramScanEnabled: true,
    confidenceThreshold: 0.5,
    showSafeHighlights: true,
  };

  const SKIP_EXACT = new Set([
    "follow", "following", "message", "share", "like", "liked", "reply",
    "replies", "comment", "comments", "post", "save", "saved", "more",
    "see more", "see translation", "view replies", "view all comments",
    "hide", "edit", "delete", "report", "block", "mute", "log in", "sign up",
    "explore", "reels", "home", "search", "notifications", "create", "profile",
    "for you", "following", "suggested", "new post", "add a comment…",
    "add a comment...", "add a comment",
  ]);

  const SKIP_PREFIXES = [
    "liked by", "view all", "view replies", "see translation",
    "suggested for you", "sponsored",
  ];

  /** @type {Map<string, object>} */
  const resultCache = new Map();
  /** @type {WeakMap<Element, string>} */
  const lastTextByEl = new WeakMap();

  let settings = { ...DEFAULTS };
  let apiUrl = DEFAULT_API_URL;
  let scanTimer = null;
  let activeJobs = 0;
  /** @type {Array<{element: Element, text: string, key: string}>} */
  const queue = [];
  /** @type {Set<string>} */
  const queuedKeys = new Set();
  let stats = { found: 0, scanned: 0, hate: 0, safe: 0, errors: 0 };
  let lastError = "";
  let panel = null;
  let observer = null;
  let running = false;
  let processing = false;

  function normalizeText(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function textKey(text) {
    return text.toLowerCase();
  }

  function shouldSkipText(text) {
    const lower = text.toLowerCase();
    if (text.length < MIN_TEXT_LENGTH || text.length > MAX_TEXT_LENGTH) return true;
    if (SKIP_EXACT.has(lower)) return true;
    if (SKIP_PREFIXES.some((p) => lower.startsWith(p))) return true;
    if (/^\d+[smhdw]$/i.test(text)) return true;
    if (/^[\d.,\sKMB]+$/i.test(text)) return true;
    if (/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(lower) && text.length < 20) {
      return true;
    }
    // username-only
    if (/^@?[a-z0-9._]{1,30}$/i.test(text) && !text.includes(" ")) return true;
    return false;
  }

  function isVisible(el) {
    if (!(el instanceof Element)) return false;
    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return false;
    if (rect.bottom < 0 || rect.top > window.innerHeight + 200) return false;
    const style = window.getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0.05;
  }

  function isEditableOrInput(el) {
    return Boolean(
      el.closest("textarea, input, [contenteditable='true'], [role='textbox'], form")
    );
  }

  function getCleanText(el) {
    if (el.dataset.hsdOriginalText) return el.dataset.hsdOriginalText;
    const clone = el.cloneNode(true);
    clone.querySelectorAll(".hsd-inline-badge, .hsd-safe-badge").forEach((n) => n.remove());
    return normalizeText(clone.innerText || clone.textContent || "");
  }

  function pickElementForTextNode(textNode) {
    let el = textNode.parentElement;
    if (!el) return null;

    // Prefer a nearby span/div that mainly holds this text
    for (let i = 0; i < 4 && el; i += 1) {
      if (el.matches("span, div, p, h1, li, blockquote")) {
        const text = getCleanText(el);
        if (text.length >= MIN_TEXT_LENGTH && text.length <= MAX_TEXT_LENGTH) {
          return el;
        }
      }
      el = el.parentElement;
    }
    return textNode.parentElement;
  }

  /**
   * Broad collection: walk visible text inside main feed / articles / dialogs.
   */
  function collectTextCandidates() {
    const roots = [
      ...document.querySelectorAll("main, article, [role='dialog'], [role='main']"),
    ];
    if (roots.length === 0) roots.push(document.body);

    /** @type {Map<Element, string>} */
    const found = new Map();

    // Strategy A: Instagram classic comment/caption spans
    document.querySelectorAll('span[dir="auto"], h1[dir="auto"], div[dir="auto"]').forEach((el) => {
      if (el.closest("#hsd-ig-panel, #hsd-overlay")) return;
      if (el.classList.contains("hsd-inline-badge") || el.classList.contains("hsd-safe-badge")) return;
      if (isEditableOrInput(el)) return;
      if (!isVisible(el)) return;
      if (el.querySelector('span[dir="auto"]')) return;

      const text = getCleanText(el);
      if (shouldSkipText(text)) return;
      found.set(el, text);
    });

    // Strategy B: TreeWalker over feed roots (catches newer DOM layouts)
    for (const root of roots) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const value = normalizeText(node.nodeValue);
          if (value.length < MIN_TEXT_LENGTH) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (parent.closest("#hsd-ig-panel, #hsd-overlay, script, style, noscript, svg")) {
            return NodeFilter.FILTER_REJECT;
          }
          if (isEditableOrInput(parent)) return NodeFilter.FILTER_REJECT;
          if (!isVisible(parent)) return NodeFilter.FILTER_REJECT;
          if (shouldSkipText(value)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      let node = walker.nextNode();
      while (node) {
        const el = pickElementForTextNode(node);
        if (el && !found.has(el)) {
          const text = getCleanText(el);
          if (!shouldSkipText(text)) {
            // Avoid giant containers (whole post card)
            if (text.length <= 400 || el.matches("span, p, h1")) {
              found.set(el, text);
            }
          }
        }
        node = walker.nextNode();
      }
    }

    return Array.from(found.entries()).map(([element, text]) => ({
      element,
      text,
      key: textKey(text),
    }));
  }

  function removeBadges(el) {
    el.querySelectorAll(".hsd-inline-badge, .hsd-safe-badge").forEach((b) => b.remove());
  }

  function applyHateHighlight(element, result) {
    element.dataset.hsdOriginalText = lastTextByEl.get(element) || getCleanText(element);
    element.classList.remove("hsd-safe-highlight");
    element.classList.add("hsd-hate-highlight");
    element.setAttribute(
      "title",
      `Hate speech detected (${Math.round(result.confidence * 100)}% confidence)`
    );
    removeBadges(element);
    const badge = document.createElement("span");
    badge.className = "hsd-inline-badge";
    badge.textContent = `Hate ${Math.round(result.confidence * 100)}%`;
    element.appendChild(badge);
  }

  function applySafeHighlight(element, result) {
    if (!settings.showSafeHighlights) return;
    if (element.classList.contains("hsd-hate-highlight")) return;

    element.dataset.hsdOriginalText = lastTextByEl.get(element) || getCleanText(element);
    element.classList.add("hsd-safe-highlight");
    element.setAttribute(
      "title",
      `Non-hate (${Math.round(result.confidence * 100)}% confidence)`
    );
    removeBadges(element);
    const badge = document.createElement("span");
    badge.className = "hsd-safe-badge";
    badge.textContent = "OK";
    element.appendChild(badge);
  }

  function clearHighlights() {
    document.querySelectorAll(".hsd-hate-highlight, .hsd-safe-highlight").forEach((el) => {
      el.classList.remove("hsd-hate-highlight", "hsd-safe-highlight");
      el.removeAttribute("title");
      delete el.dataset.hsdLabel;
      delete el.dataset.hsdConfidence;
      delete el.dataset.hsdOriginalText;
      delete el.dataset.hsdDone;
      removeBadges(el);
    });
    queuedKeys.clear();
    stats = { found: 0, scanned: 0, hate: 0, safe: 0, errors: 0 };
    lastError = "";
    updatePanel();
  }

  async function getApiUrl() {
    try {
      const stored = await chrome.storage.sync.get({ apiUrl: DEFAULT_API_URL });
      return String(stored.apiUrl || DEFAULT_API_URL).replace(/\/$/, "");
    } catch {
      return DEFAULT_API_URL;
    }
  }

  async function analyzeText(text) {
    // Prefer direct fetch from content script (works with host_permissions).
    try {
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const detail = payload.detail;
        throw new Error(typeof detail === "string" ? detail : `API HTTP ${response.status}`);
      }
      return payload;
    } catch (directError) {
      // Fallback: background service worker
      return new Promise((resolve) => {
        try {
          chrome.runtime.sendMessage({ type: "ANALYZE_TEXT", text }, (response) => {
            if (chrome.runtime.lastError) {
              resolve({
                error: `${directError.message} | ${chrome.runtime.lastError.message}`,
              });
              return;
            }
            resolve(response || { error: "No response from background" });
          });
        } catch (err) {
          resolve({ error: `${directError.message} | ${err.message}` });
        }
      });
    }
  }

  async function processQueue() {
    if (processing) return;
    processing = true;

    while (running && queue.length > 0) {
      while (running && activeJobs < MAX_CONCURRENT && queue.length > 0) {
        const item = queue.shift();
        if (!item) break;
        queuedKeys.delete(item.key + "::" + (item.element.dataset.hsdId || ""));

        if (!document.contains(item.element)) continue;

        activeJobs += 1;
        updatePanel();

        (async () => {
          try {
            let result = resultCache.get(item.key);
            if (!result) {
              const response = await analyzeText(item.text);
              if (response?.error) {
                stats.errors += 1;
                lastError = response.error;
                console.warn("[HSD] analyze failed:", response.error);
                // Allow retry later
                delete item.element.dataset.hsdDone;
                return;
              }
              result = response;
              resultCache.set(item.key, result);
              if (resultCache.size > 600) {
                const first = resultCache.keys().next().value;
                resultCache.delete(first);
              }
            }

            stats.scanned += 1;
            item.element.dataset.hsdDone = "1";

            const isHate =
              Number(result.prediction) === 1 &&
              Number(result.confidence) >= Number(settings.confidenceThreshold);

            if (isHate) {
              stats.hate += 1;
              applyHateHighlight(item.element, result);
            } else {
              stats.safe += 1;
              applySafeHighlight(item.element, result);
            }
          } catch (err) {
            stats.errors += 1;
            lastError = err.message || String(err);
            console.warn("[HSD] process error:", err);
          } finally {
            activeJobs -= 1;
            updatePanel();
          }
        })();
      }

      // Wait briefly for in-flight jobs before pulling more
      await new Promise((r) => setTimeout(r, 120));
      if (activeJobs >= MAX_CONCURRENT) {
        await new Promise((r) => setTimeout(r, 200));
      }
    }

    processing = false;
    updatePanel();
  }

  function enqueueCandidates(candidates) {
    stats.found = candidates.length;

    for (const { element, text, key } of candidates) {
      if (element.dataset.hsdDone === "1" && lastTextByEl.get(element) === text) {
        continue;
      }

      const id =
        element.dataset.hsdId ||
        `hsd-${Math.random().toString(36).slice(2, 9)}`;
      element.dataset.hsdId = id;
      const queueKey = `${key}::${id}`;
      if (queuedKeys.has(queueKey)) continue;

      lastTextByEl.set(element, text);
      queuedKeys.add(queueKey);
      queue.push({ element, text, key });
    }

    updatePanel();
    processQueue();
  }

  function scheduleScan(immediate = false) {
    if (!running) return;
    clearTimeout(scanTimer);
    const run = () => {
      try {
        const candidates = collectTextCandidates();
        console.log(`[HSD] found ${candidates.length} text candidates`);
        enqueueCandidates(candidates);
      } catch (err) {
        lastError = err.message || String(err);
        console.error("[HSD] scan error:", err);
        updatePanel();
      }
    };
    if (immediate) run();
    else scanTimer = setTimeout(run, SCAN_DEBOUNCE_MS);
  }

  function ensurePanel() {
    if (panel && document.body.contains(panel)) return;

    panel = document.createElement("div");
    panel.id = "hsd-ig-panel";
    panel.innerHTML = `
      <div class="hsd-ig-title">Hate Speech Detector</div>
      <div class="hsd-ig-status" id="hsd-ig-status">Starting…</div>
      <div class="hsd-ig-stats">
        <span><strong id="hsd-ig-found">0</strong> found</span>
        <span><strong id="hsd-ig-scanned">0</strong> scanned</span>
      </div>
      <div class="hsd-ig-stats">
        <span><strong id="hsd-ig-hate">0</strong> hate</span>
        <span><strong id="hsd-ig-safe">0</strong> safe</span>
      </div>
      <div class="hsd-ig-error" id="hsd-ig-error" hidden></div>
      <div class="hsd-ig-actions">
        <button type="button" id="hsd-ig-toggle">Pause</button>
        <button type="button" id="hsd-ig-rescan" class="hsd-ig-secondary">Rescan</button>
      </div>
      <div class="hsd-ig-actions" style="margin-top:6px">
        <button type="button" id="hsd-ig-test" class="hsd-ig-secondary">Test API</button>
      </div>
      <div class="hsd-ig-hint">API must be running · refresh IG after reload</div>
    `;
    document.documentElement.appendChild(panel);

    panel.querySelector("#hsd-ig-toggle").addEventListener("click", async () => {
      const enabled = !settings.instagramScanEnabled;
      settings.instagramScanEnabled = enabled;
      await chrome.storage.sync.set({ instagramScanEnabled: enabled });
      if (enabled) startScanner();
      else stopScanner(false);
      updatePanel();
    });

    panel.querySelector("#hsd-ig-rescan").addEventListener("click", () => {
      clearHighlights();
      resultCache.clear();
      queue.length = 0;
      if (!running) startScanner();
      else scheduleScan(true);
    });

    panel.querySelector("#hsd-ig-test").addEventListener("click", async () => {
      const statusEl = panel.querySelector("#hsd-ig-status");
      statusEl.textContent = "Testing API…";
      try {
        apiUrl = await getApiUrl();
        const health = await fetch(`${apiUrl}/health`);
        if (!health.ok) throw new Error(`Health HTTP ${health.status}`);
        const predict = await analyzeText("You are worthless and should die");
        if (predict.error) throw new Error(predict.error);
        lastError = "";
        statusEl.textContent = `API OK · sample=${predict.label} (${Math.round(predict.confidence * 100)}%)`;
        statusEl.className = "hsd-ig-status idle";
        console.log("[HSD] API test result:", predict);
      } catch (err) {
        lastError = err.message || String(err);
        statusEl.textContent = "API failed";
        statusEl.className = "hsd-ig-status paused";
        updatePanel();
      }
    });
  }

  function updatePanel() {
    ensurePanel();
    const statusEl = panel.querySelector("#hsd-ig-status");
    const toggleBtn = panel.querySelector("#hsd-ig-toggle");
    const errorEl = panel.querySelector("#hsd-ig-error");

    panel.querySelector("#hsd-ig-found").textContent = String(stats.found);
    panel.querySelector("#hsd-ig-scanned").textContent = String(stats.scanned);
    panel.querySelector("#hsd-ig-hate").textContent = String(stats.hate);
    panel.querySelector("#hsd-ig-safe").textContent = String(stats.safe);

    if (lastError) {
      errorEl.hidden = false;
      errorEl.textContent = lastError.slice(0, 160);
    } else {
      errorEl.hidden = true;
      errorEl.textContent = "";
    }

    if (!settings.instagramScanEnabled) {
      statusEl.textContent = "Paused";
      statusEl.className = "hsd-ig-status paused";
      toggleBtn.textContent = "Resume";
      return;
    }

    if (activeJobs > 0 || queue.length > 0) {
      statusEl.textContent = `Scanning… queue ${queue.length}`;
      statusEl.className = "hsd-ig-status scanning";
    } else if (stats.errors > 0 && stats.scanned === 0) {
      statusEl.textContent = "API errors — click Test API";
      statusEl.className = "hsd-ig-status paused";
    } else if (stats.found === 0) {
      statusEl.textContent = "No text found — open a post/comments";
      statusEl.className = "hsd-ig-status paused";
    } else {
      statusEl.textContent = "Watching Instagram";
      statusEl.className = "hsd-ig-status idle";
    }
    toggleBtn.textContent = "Pause";
  }

  function startObserver() {
    if (observer) return;
    observer = new MutationObserver(() => scheduleScan(false));
    const target = document.body || document.documentElement;
    observer.observe(target, { childList: true, subtree: true });
  }

  function stopObserver() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  function startScanner() {
    running = true;
    settings.instagramScanEnabled = true;
    ensurePanel();
    startObserver();
    scheduleScan(true);
    updatePanel();
  }

  function stopScanner(clear = true) {
    running = false;
    clearTimeout(scanTimer);
    stopObserver();
    queue.length = 0;
    queuedKeys.clear();
    if (clear) clearHighlights();
    updatePanel();
  }

  async function loadSettings() {
    const stored = await chrome.storage.sync.get({
      ...DEFAULTS,
      apiUrl: DEFAULT_API_URL,
    });
    settings = {
      instagramScanEnabled: stored.instagramScanEnabled !== false,
      confidenceThreshold: Number(stored.confidenceThreshold ?? 0.5),
      showSafeHighlights: stored.showSafeHighlights !== false,
    };
    apiUrl = String(stored.apiUrl || DEFAULT_API_URL).replace(/\/$/, "");
  }

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    if (changes.instagramScanEnabled) {
      settings.instagramScanEnabled = changes.instagramScanEnabled.newValue;
      if (settings.instagramScanEnabled) startScanner();
      else stopScanner(false);
    }
    if (changes.confidenceThreshold) {
      settings.confidenceThreshold = Number(changes.confidenceThreshold.newValue);
    }
    if (changes.apiUrl) {
      apiUrl = String(changes.apiUrl.newValue || DEFAULT_API_URL).replace(/\/$/, "");
    }
    if (changes.showSafeHighlights) {
      settings.showSafeHighlights = changes.showSafeHighlights.newValue !== false;
    }
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "IG_TOGGLE_SCAN") {
      if (message.enabled) startScanner();
      else stopScanner(false);
      updatePanel();
    }
    if (message.type === "IG_RESCAN") {
      clearHighlights();
      resultCache.clear();
      if (!running) startScanner();
      else scheduleScan(true);
    }
  });

  async function init() {
    await loadSettings();
    ensurePanel();
    console.log("[HSD] init", { settings, apiUrl });
    if (settings.instagramScanEnabled) startScanner();
    else updatePanel();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
