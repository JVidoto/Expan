{
  "manifest_version": 3,
  "name": "Expan",
  "version": "1.0",
  "description": "Expansor de texto com IA"
  
  "permissions": [
    "storage",
    "activeTab",
    "scripting",
    "clipboardRead"
  ],

  "host_permissions": [
    "<all_urls>"
  ],

  "background": {
    "service_worker": "background.js"
  },

  "action": {
    "default_popup": "popup/popup.html"
  },

  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "run_at": "document_idle"
    }
  ]
}