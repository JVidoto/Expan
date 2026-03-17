const triggers = {
  "/teste": "Isso é um teste",
  "/clip": "Conteúdo: {clipboard}"
};

document.addEventListener("input", async (e) => {
  const el = e.target;

  const isInput =
    el.tagName === "TEXTAREA" ||
    el.tagName === "INPUT" ||
    el.isContentEditable;

  if (!isInput) return;

  let value = el.isContentEditable ? el.innerText : el.value;

  for (let trigger in triggers) {
    if (value.endsWith(trigger)) {
      let text = triggers[trigger];

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
    }
  }
});

console.log("CONTENT SCRIPT RODANDO");