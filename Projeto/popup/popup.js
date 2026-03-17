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
        div.style.flexDirection = "column";
        div.style.marginBottom = "10px";
        div.style.padding = "5px";
        div.style.border = "1px solid #ccc";
        div.style.borderRadius = "5px";

        const triggerInputEdit = document.createElement("input");
        triggerInputEdit.value = key;

        const contentInputEdit = document.createElement("textarea");
        contentInputEdit.value = scripts[key];

        const actions = document.createElement("div");

        const saveBtnEdit = document.createElement("button");
        saveBtnEdit.innerText = "Salvar";

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Excluir";

        actions.appendChild(saveBtnEdit);
        actions.appendChild(deleteBtn);

        //  salvar edição
        saveBtnEdit.onclick = () => {
          const newTrigger = triggerInputEdit.value.trim();
          const newContent = contentInputEdit.value;

          delete scripts[key]; // remove antigo
          scripts[newTrigger] = newContent;

          chrome.storage.local.set({ scripts }, loadScripts);
        };

        //  deletar
        deleteBtn.onclick = () => {
          delete scripts[key];
          chrome.storage.local.set({ scripts }, loadScripts);
        };

        div.appendChild(triggerInputEdit);
        div.appendChild(contentInputEdit);
        div.appendChild(actions);

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