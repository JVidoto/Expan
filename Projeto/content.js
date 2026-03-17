const triggers = {
  "/teste": "Isso é um teste",
  "/clip": "Conteúdo: {clipboard}"
};

// tempo máximo entre teclas (ms)
const MAX_DELAY = 800;

let lastTyped = "";
let lastTime = Date.now();

document.addEventListener("input", async (e) => {
  const el = e.target;

  const isInput =
    el.tagName === "TEXTAREA" ||
    el.tagName === "INPUT" ||
    el.isContentEditable;

  if (!isInput) return;

  let now = Date.now();

  let value = el.isContentEditable ? el.innerText : el.value;

  // pega só o último pedaço digitado
  let current = value.slice(-10);

  // verifica tempo entre digitação
  if (now - lastTime > MAX_DELAY) {
    lastTyped = "";
  }

  lastTyped += current.slice(-1);
  lastTime = now;

  for (let trigger in triggers) {
    if (lastTyped.endsWith(trigger)) {

      let text = triggers[trigger];

      // 🔒 evita execução em cadeia
      text = text.replace(/\/\w+/g, (match) => {
        return match; // mantém como texto normal
      });

      // clipboard
      if (text.includes("{clipboard}")) {
        try {
          const clip = await navigator.clipboard.readText();
          text = text.replace("{clipboard}", clip);
        } catch {
          text = text.replace("{clipboard}", "[erro clipboard]");
        }
      }

      let newValue = value.replace(trigger, text);

      if (el.isContentEditable) {
        el.innerText = newValue;
      } else {
        el.value = newValue;
      }

      el.dispatchEvent(new Event("input", { bubbles: true }));

      // 🧹 reseta buffer (ESSENCIAL)
      lastTyped = "";

      break;
    }
  }
});

console.log("Content script carregado");