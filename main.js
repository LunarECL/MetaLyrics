const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");
const config = require("electron-json-config").factory();

const path = require("path");
var fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const loc = config.get("loc");
  if (loc) {
    win.loadFile("main.html");
  } else {
    win.loadFile("index.html");
  }

  ipcMain.on("change-dir", (event) => {
    win.loadFile("index.html");
  });

  ipcMain.on("set-dir", (event, dir) => {
    config.set("loc", path.dirname(dir));
    win.loadFile("main.html");
  });

  ipcMain.handle("get-first", () => {
    var files = fs.readdirSync(config.get("loc"));
    var myOptions = [];
    for (var i in files) {
      if (path.extname(files[i]) === ".txt") {
        var song = {
          title: path.basename(files[i], ".txt"),
          data: fs.readFileSync(config.get("loc") + "/" + files[i], "utf8"),
        };
        myOptions.push(song);
      }
    }
    return myOptions;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
