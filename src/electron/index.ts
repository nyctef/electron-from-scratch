import { app, BrowserWindow, ipcMain } from "electron";
import { runWebserver } from "./webserver";

console.log("starting webserver task...");
const runWebserverTask = runWebserver();

app.on("ready", async () => {
  // once electron has started up, create a window.
  const window = new BrowserWindow({ width: 800, height: 600 });

  // hide the default menu bar that comes with the browser window
  window.setMenuBarVisibility(false);

  window.loadURL(`file://${__dirname}/../website/index.html`);

  console.log("waiting for browser to be ready for webserver details...");
  ipcMain.on("ready-for-webserver-started", async (event: any) => {
    console.log("waiting for backend server to start up...");
    const webserverDetails = await runWebserverTask;

    console.log("webserver start completed. Sending details to browser...");
    event.sender.send("webserver-started", webserverDetails);
  });
});

app.on(
  "certificate-error",
  (event, webContents, url, error, certificate, callback) => {
    // todo: check certificate.fingerprint is what we expect
    event.preventDefault();
    callback(true); // everything is fine
  }
);
