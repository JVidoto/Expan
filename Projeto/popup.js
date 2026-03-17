console.log("POPUP JS CARREGOU");
1
function loadScripts() {
  chrome.storage.local.get(["scripts"], (result) => {

    let scripts = result.scripts;

    // AQUI ESTÁ A CORREÇÃO
    if (!scripts) {
      scripts = {
        "/teste": "Isso é um teste",
        "/clip": "Conteúdo: {clipboard}"
      };

      chrome.storage.local.set({ scripts });
    }

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