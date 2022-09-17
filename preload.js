const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("MetaAPI", {
  setDir: (dir) => ipcRenderer.send("set-dir", dir),
  getFirst: () => ipcRenderer.invoke("get-first"),
  getLyrics: (title) => ipcRenderer.invoke("get-lyrics", title),
});
