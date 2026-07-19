(() => {
  // Prevent double-init if injected more than once
  if (window.__HSD_CONTENT_LOADED__) return;
  window.__HSD_CONTENT_LOADED__ = true;

  function removeExistingOverlay() {
  const existing = document.getElementById("hsd-overlay");
  if (existing) {
    existing.remove();
  }
}

function createOverlay(title, bodyHtml, tone = "info") {
  removeExistingOverlay();

  const overlay = document.createElement("div");
  overlay.id = "hsd-overlay";
  overlay.className = `hsd-overlay hsd-${tone}`;
  overlay.innerHTML = `
    <div class="hsd-card" role="dialog" aria-label="Hate speech analysis result">
      <button class="hsd-close" aria-label="Close">&times;</button>
      <h3>${title}</h3>
      ${bodyHtml}
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector(".hsd-close").addEventListener("click", removeExistingOverlay);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      removeExistingOverlay();
    }
  });
}

function formatPercent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function renderResult(text, result) {
  const isHate = result.prediction === 1;
  const tone = isHate ? "hate" : "safe";
  const bodyHtml = `
    <p class="hsd-preview">"${text.slice(0, 180)}${text.length > 180 ? "..." : ""}"</p>
    <div class="hsd-badge ${isHate ? "hsd-badge-hate" : "hsd-badge-safe"}">${result.label}</div>
    <div class="hsd-stats">
      <span>Confidence: <strong>${formatPercent(result.confidence)}</strong></span>
      <span>Non-Hate: <strong>${formatPercent(result.probabilities.non_hate)}</strong></span>
      <span>Hate: <strong>${formatPercent(result.probabilities.hate)}</strong></span>
    </div>
  `;

  createOverlay("Hate Speech Analysis", bodyHtml, tone);
}

function renderError(message) {
  createOverlay(
    "Analysis Failed",
    `<p class="hsd-error">${message}</p><p class="hsd-hint">Start the API with: python -m api.server</p>`,
    "error"
  );
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "SHOW_RESULT") {
    renderResult(message.payload.text, message.payload.result);
  }

  if (message.type === "SHOW_ERROR") {
    renderError(message.payload.message);
  }
});
})();
