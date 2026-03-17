document.addEventListener("DOMContentLoaded", () => {

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

      const text = document.createElement("span");
      text.innerText = `${key} -> ${scripts[key]}`;

      const btn = document.createElement("button");
      btn.innerText = "X";
      btn.style.marginLeft = "10px";

      //  botão de deletar
      btn.onclick = () => {
        delete scripts[key];

        chrome.storage.local.set({ scripts }, () => {
          loadScripts(); // recarrega lista
        });
      };

      div.appendChild(text);
      div.appendChild(btn);

      listDiv.appendChild(div);
    }
  });
    let scripts = result.scripts;

    if (!scripts) {
        scripts = {
        "/teste": "Isso é um teste",
        "/clip": "Conteúdo: {clipboard}"
    };

    chrome.storage.local.set({ scripts });
}
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

div.style.display = "flex";
div.style.justifyContent = "space-between";
div.style.marginBottom = "5px";


  loadScripts();
});