document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".cite-dropdown .dropdown-panel").forEach((panel) => {
    if (panel.querySelector(".copy-button")) return;
    const pre = panel.querySelector("pre");
    if (!pre) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-button";
    button.textContent = "copy/paste";
    button.addEventListener("click", async () => {
      const text = pre.innerText.trim();
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = "copied";
      } catch (_error) {
        const range = document.createRange();
        range.selectNodeContents(pre);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
        button.textContent = "copied";
      }
      window.setTimeout(() => {
        button.textContent = "copy/paste";
      }, 1400);
    });

    panel.prepend(button);
  });
});
