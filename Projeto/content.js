const triggers = {
  "/teste": "Isso é um teste",
  "/clip": "Conteúdo: {clipboard}"
  "/oi": "Olá, tudo bem com você, la la la la la la"
};

document.addEventListener("input", async (e) => {
  const el = e.target;

  if (el.tagName !== "TEXTAREA" && el.tagName !== "INPUT") return;

  const value = el.value;

  for (let trigger in triggers) {
    if (value.endsWith(trigger)) {

      let text = triggers[trigger];

      // CLIPBOARD
      if (text.includes("{clipboard}")) {
        try {
          const clip = await navigator.clipboard.readText();
          text = text.replace("{clipboard}", clip);
        } catch (err) {
          text = text.replace("{clipboard}", "[erro clipboard]");
        }
      }

      const newValue = value.replace(trigger, text);

      el.value = newValue;

      // importante pra frameworks tipo React
      el.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
});