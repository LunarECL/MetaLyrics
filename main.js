const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");
const path = require("path");
var fs = require("fs");
const { title } = require("process");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  try {
    var data = fs.readFileSync("./config.json"),
      myObj;
    myObj = JSON.parse(data);
    console.dir(myObj);
    win.loadFile("main.html");
  } catch (err) {
    win.loadFile("index.html");
  }

  ipcMain.on("change-dir", (event) => {
    win.loadFile("index.html");
  });

  ipcMain.on("set-dir", (event, dir) => {
    var myOptions = {
      loc: path.dirname(dir),
    };
    var data = JSON.stringify(myOptions);
    fs.writeFile("./config.json", data, function (err) {
      if (err) {
        console.log("There has been an error saving your configuration data.");
        console.log(err.message);
        return;
      }
      console.log("Configuration saved successfully.");
    });
    myObj = JSON.parse(data);
    win.loadFile("main.html");
  });

  ipcMain.handle("get-first", () => {
    console.log(myObj["loc"]);
    var files = fs.readdirSync(myObj["loc"]);
    var myOptions = [];
    for (var i in files) {
      if (path.extname(files[i]) === ".txt") {
        var song = {
          title: path.basename(files[i], ".txt"),
          data: fs.readFileSync(myObj["loc"] + "/" + files[i], "utf8"),
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
