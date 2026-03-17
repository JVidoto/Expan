console.log("POPUP JS CARREGOU");

document.addEventListener("DOMContentLoaded", () => {

  const triggerInput = document.getElementById("trigger");
  const contentInput = document.getElementById("content");
  const listDiv = document.getElementById("list");
  const saveBtn = document.getElementById("save");

  function loadScripts() {
    chrome.storage.local.get(["scripts"], (result) => {

      let scripts = result.scripts;

      // inicializa se não existir
      if (!scripts) {
        scripts = {
          "/teste": "Isso é um teste",
          "/clip": "Conteúdo: {clipboard}"
        };

        chrome.storage.local.set({ scripts });
      }

      console.log("scripts carregados:", scripts);

      listDiv.innerHTML = "";

      for (let key in scripts) {
        const div = document.createElement("div");

        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.marginBottom = "5px";

        const text = document.createElement("span");
        text.innerText = `${key} --> ${scripts[key]}`;

        const btn = document.createElement("button");
        btn.innerText = "X";

        btn.onclick = () => {
          delete scripts[key];

          chrome.storage.local.set({ scripts }, () => {
            loadScripts();
          });
        };

        div.appendChild(text);
        div.appendChild(btn);

        listDiv.appendChild(div);
      }
    });
  }

  //  BOTÃO SALVAR (isso que faltava)
  saveBtn.onclick = () => {
    const trigger = triggerInput.value.trim();
    const content = contentInput.value;

    if (!trigger) return;

    chrome.storage.local.get(["scripts"], (result) => {
      const scripts = result.scripts || {};

      scripts[trigger] = content;

      chrome.storage.local.set({ scripts }, () => {
        triggerInput.value = "";
        contentInput.value = "";
        loadScripts();
      });
    });
  };

  // carregar ao abrir
  setTimeout(loadScripts, 100);

  // escutar mudanças
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.scripts) {
      loadScripts();
    }
  });

});