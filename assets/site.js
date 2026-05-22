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

  document.querySelectorAll(".pill-row").forEach((row) => {
    const dropdowns = Array.from(row.querySelectorAll(".inline-dropdown"));
    if (!dropdowns.length) return;

    const slot = document.createElement("div");
    slot.className = "dropdown-slot";
    slot.hidden = true;
    row.append(slot);

    dropdowns.forEach((dropdown) => {
      const panel = dropdown.querySelector(".dropdown-panel");
      if (!panel) return;

      panel.hidden = true;
      dropdown.panel = panel;

      dropdown.addEventListener("toggle", () => {
        if (dropdown.open) {
          dropdowns.forEach((otherDropdown) => {
            if (otherDropdown !== dropdown) {
              otherDropdown.open = false;
            }
            if (otherDropdown.panel) {
              otherDropdown.panel.hidden = true;
            }
          });

          slot.append(panel);
          panel.hidden = false;
          slot.hidden = false;
          return;
        }

        panel.hidden = true;
        if (!dropdowns.some((otherDropdown) => otherDropdown.open)) {
          slot.hidden = true;
        }
      });
    });
  });
});
