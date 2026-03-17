const DEFAULT_SCRIPTS = {
  "/teste": "Isso é um teste",
  "/clip": "Conteúdo: {clipboard}"
};

export function getScripts() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["scripts"], (result) => {
      resolve(result.scripts || DEFAULT_SCRIPTS);
    });
  });
}

export function saveScripts(scripts) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ scripts }, () => {
      resolve();
    });
  });
}