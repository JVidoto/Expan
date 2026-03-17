const triggerInput = document.getElementById("trigger");
const contentInput = document.getElementById("content");
const listDiv = document.getElementById("list");
const saveBtn = document.getElementById("save");

function loadScripts() {
  chrome.storage.local.get(["scripts"], (result) => {
    const scripts = result.scripts || {};
    listDiv.innerHTML = "";

    for (let key in scripts) {
      const div = document.createElement("div");
      div.innerText = `${key} → ${scripts[key]}`;
      listDiv.appendChild(div);
    }
  });
}

saveBtn.onclick = () => {
  const trigger = triggerInput.value.trim();
  const content = contentInput.value;

  if (!trigger) return;

  chrome.storage.local.get(["scripts"], (result) => {
    const scripts = result.scripts || {};
    scripts[trigger] = content;

    chrome.storage.local.set({ scripts }, () => {
      loadScripts();
    });
  });
};

loadScripts();