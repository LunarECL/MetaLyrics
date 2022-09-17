const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("MetaAPI", {
  setDir: (dir) => ipcRenderer.send("set-dir", dir),
  changeDir: () => ipcRenderer.send("change-dir"),

  getFirst: () => ipcRenderer.invoke("get-first"),
  getLyrics: (title) => ipcRenderer.invoke("get-lyrics", title),
});
